package com.coala.backend.store.api.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.coala.backend.store.db.entity.StoreImage;
import com.coala.backend.store.db.entity.StorePost;
import com.coala.backend.store.db.repository.StoreImageRepository;
import com.coala.backend.store.db.repository.StorePostRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@Service
public class FileService {

    private final AmazonS3Client amazonS3Client;
    private final StoreImageRepository storeImageRepository;
    private final StorePostRepository storePostRepository;

    public FileService(AmazonS3Client amazonS3Client, StoreImageRepository storeImageRepository, StorePostRepository storePostRepository) {
        this.amazonS3Client = amazonS3Client;
        this.storeImageRepository = storeImageRepository;
        this.storePostRepository = storePostRepository;
    }

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Transactional
    public void delete(Long id , String directory) throws Exception{
        StorePost storePost = storePostRepository.findById(id)
                .orElseThrow(() -> new IllegalAccessException("게시글이 존재하지 않습니다."));

        String key = directory + "/" + convert(id) + "/" ;

        List<StoreImage> storeImageList = storeImageRepository.findByStorePost(storePost);

        Integer idx = 1;

        // delete
        for(StoreImage storeImage : storeImageList){
            storeImageRepository.delete(storeImage);
            amazonS3Client.deleteObject(bucket, key + convert(idx++));
        }

    }

    @Transactional
    public void file(MultipartFile multipartFile, String directory, Long id, Integer num) throws Exception {
        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentType((multipartFile.getContentType()));
        objectMetadata.setContentLength(multipartFile.getSize());

        StorePost storePost = storePostRepository.findById(id)
                .orElseThrow(() -> new IllegalAccessException("게시글이 존재하지 않습니다."));

        String key = directory + "/" + convert(id) + "/" + convert(num);

        // add
        try(InputStream inputStream = multipartFile.getInputStream()){
            amazonS3Client.putObject(new PutObjectRequest(bucket, key, inputStream, objectMetadata)
                    .withCannedAcl(CannedAccessControlList.PublicRead));
        }

        String url = amazonS3Client.getUrl(bucket, key).toString();
        StoreImage storeImage = new StoreImage(url);
        storeImage.setStorePost(storePost);
        storeImageRepository.save(storeImage);

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
