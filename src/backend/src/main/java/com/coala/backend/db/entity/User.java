package com.coala.backend.db.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

/*
    user 엔터티 => 패스워드는 암호화 해야함. 일단 임시로 테이블 생성용도
 */
@Entity
@Getter
@Setter
@Table(name = "user_table")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 기본키 생성을 데이터베이스에 위임, IDENTITY => AutoIncrememt
    private Long id;

    @Column(name = "email")
    private String email;

    @Column(name = "name")
    private String name;

    @Column(name = "nickname")
    private String nickname;

    @Column(name = "student_id")
    private String studentId;

    @Column(name = "depart")
    private String depart;

    @Column(name = "ordinal")
    private String ordinal;

    @Column(name = "phone_no")
    private String phoneNo;

    @Column(name = "image_path")
    private String imagePath;

    @Column


    // password 암호화 저장
    @JsonIgnore
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    String password;

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", name='" + name + '\'' +
                ", nickname='" + nickname + '\'' +
                ", studentId='" + studentId + '\'' +
                ", depart='" + depart + '\'' +
                ", ordinal='" + ordinal + '\'' +
                ", phoneNo='" + phoneNo + '\'' +
                ", imagePath='" + imagePath + '\'' +
                '}';
    }
}