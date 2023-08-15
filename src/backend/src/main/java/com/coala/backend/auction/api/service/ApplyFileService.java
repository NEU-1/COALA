package com.coala.backend.auction.api.service;


import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.coala.backend.auction.db.entity.AuctionApply;
import com.coala.backend.auction.db.entity.AuctionImage;
import com.coala.backend.auction.db.repository.AuctionApplyRepository;
import com.coala.backend.auction.db.repository.AuctionImageRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.List;
import java.util.NoSuchElementException;

@Service

public class ApplyFileService {


    private final AmazonS3 amazonS3Client;

    private final AuctionImageRepository auctionImageRepository;

    private final AuctionApplyRepository auctionApplyRepository;

    public ApplyFileService(AmazonS3 amazonS3Client, AuctionImageRepository auctionImageRepository, AuctionApplyRepository auctionApplyRepository) {
        this.amazonS3Client = amazonS3Client;
        this.auctionImageRepository = auctionImageRepository;
        this.auctionApplyRepository = auctionApplyRepository;
    }


    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Transactional
    public void delete(Long id, String directory) throws Exception{
        AuctionApply auctionApply = auctionApplyRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("제안이 존재하지 않습니다."));

        String key = directory + "/" + convert(auctionApply.getId()) + "/" + convert(id) + "/";

        List<AuctionImage> auctionImageList = auctionImageRepository.findByAuctionApply(auctionApply);

        Integer idx = 1;

        // delete
        for(AuctionImage auctionImage : auctionImageList){
            auctionImageRepository.delete(auctionImage);
            amazonS3Client.deleteObject(bucket, key + convert(idx++));
        }
    }

    @Transactional
    public void file(MultipartFile multipartFile, String directory, Long id, Long idx,  Integer num) throws Exception {
        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentType((multipartFile.getContentType()));
        objectMetadata.setContentLength(multipartFile.getSize());

        AuctionApply auctionApply = auctionApplyRepository.findById(idx)
                .orElseThrow(()-> new IllegalArgumentException("게시글이 존재하지 않습니다."));

        String key = directory + "/" + convert(id) + "/" + convert(idx) + "/" + convert(num);

        // add
        try(InputStream inputStream = multipartFile.getInputStream()){
            amazonS3Client.putObject(new PutObjectRequest(bucket, key, inputStream, objectMetadata)
                    .withCannedAcl(CannedAccessControlList.PublicRead));
        }

        System.out.println(id);


        String url = amazonS3Client.getUrl(bucket, key).toString();
        AuctionImage auctionImage = new AuctionImage(url);
        auctionImage.setAuctionApply(auctionApply);

        auctionImageRepository.save(auctionImage);

    }

    public String convert(Long id){
        if(id / 100 == 0){
            if(id / 10 == 0){
                return "00"+ id;
            }

            return "0"+id;
        }
        return ""+id;
    }

    public String convert(Integer id){
        if(id / 100 == 0){
            if(id / 10 == 0){
                return "00"+ id;
            }

            return "0"+id;
        }
        return ""+id;
    }
}
