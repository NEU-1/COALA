package com.coala.backend.member.db.entity;

import com.coala.backend.member.db.dto.request.MemberRequestDto;
import com.coala.backend.store.db.entity.StoreLike;
import com.coala.backend.store.db.entity.StorePost;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;


/*
    member Entity
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id", nullable=false, columnDefinition = "bigint")
    private Long id;

    // 이메일
    @Column(name = "email", nullable=false, columnDefinition = "varchar(255)", unique = true)
    private String email;

    // 이름
    @Column(name = "name", nullable=false, columnDefinition = "varchar(255)")
    private String name;

    // 별명
    @Column(name = "nickname", nullable=false, columnDefinition = "varchar(255)")
    private String nickname;

    // 학번
    @Column(name = "student_id", nullable=false, columnDefinition = "varchar(255)")
    private String studentId;

    // 지역
    @Column(name = "depart", nullable=false, columnDefinition = "varchar(255)")
    private String depart;

    // 기수
    @Column(name = "ordinal", nullable=false, columnDefinition = "varchar(255)")
    private String ordinal;

    // 핸드폰 번호
    @Column(name = "phone_no", nullable=false, columnDefinition = "varchar(255)")
    private String phoneNo;

    // 프로필 이미지 경로
    @Column(name = "image_path", nullable=true, columnDefinition = "varchar(255)")
    private String imagePath;

    // password 암호화 저장 필요
    @Column(name="password", nullable=false, columnDefinition = "varchar(255)")
    @JsonIgnore
    private String password;

    // Role Table 생성
    @ElementCollection(fetch = FetchType.EAGER)
    @Builder.Default
    private List<String> roles = new ArrayList<>();

    public Member(MemberRequestDto memberRequestDto){
        this.email = memberRequestDto.getEmail();
        this.password = memberRequestDto.getPassword();
    }

    public void setEncodePassword(String encodePassword){
        this.password = encodePassword;
    }


    // 연결관계
    // StorePost
    @OneToMany(mappedBy = "member")
    @JsonIgnore
    private List<StorePost> storePost = new ArrayList<>();

    // StoreLike
    @OneToMany(mappedBy = "member")
    @JsonIgnore
    private List<StoreLike> storeLike = new ArrayList<>();
}
