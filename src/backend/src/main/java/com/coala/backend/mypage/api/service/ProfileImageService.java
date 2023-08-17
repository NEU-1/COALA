package com.coala.backend.mypage.api.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.coala.backend.member.db.dto.response.BaseResponseDto;
import com.coala.backend.member.db.entity.Member;
import com.coala.backend.member.db.repository.MemberRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.Random;

@Service
public class ProfileImageService {

    private MemberRepository memberRepository;
    private AmazonS3 amazonS3Client;
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    public ProfileImageService(MemberRepository memberRepository, AmazonS3 amazonS3Client) {
        this.memberRepository = memberRepository;
        this.amazonS3Client = amazonS3Client;
    }

    @Transactional
    public BaseResponseDto file(MultipartFile multipartFile, Member member) throws Exception {
        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentType(multipartFile.getContentType());
        objectMetadata.setContentLength(multipartFile.getSize());


        String key = "member/" + convert(member.getId()) + "/" + createCode();

        // add
        try(InputStream inputStream = multipartFile.getInputStream()){
            amazonS3Client.putObject(new PutObjectRequest(bucket, key, inputStream, objectMetadata)
                    .withCannedAcl(CannedAccessControlList.PublicRead));
        }

        String url = amazonS3Client.getUrl(bucket, key).toString();
        member.setImagePath(url);

        memberRepository.save(member);
        return new BaseResponseDto("프로필 수정이 완료되었습니다.", 200);
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

    public String createCode() {
        Random random = new Random();
        StringBuffer key = new StringBuffer();

        for (int i = 0; i < 8; i++) {
            int index = random.nextInt(4);

            switch (index) {
                case 0: key.append((char) ((int) random.nextInt(26) + 97)); break;
                case 1: key.append((char) ((int) random.nextInt(26) + 65)); break;
                default: key.append(random.nextInt(9));
            }
        }
        return key.toString();
    }
}
