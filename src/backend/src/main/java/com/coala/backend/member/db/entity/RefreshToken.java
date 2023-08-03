package com.coala.backend.member.db.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/*
    Refresh Token Entity
 */
@Getter
@Setter
@Entity
@NoArgsConstructor
public class RefreshToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "refreshToken", nullable=false, columnDefinition = "varchar(255)")
    private String refreshToken;

    @Column(name = "email", nullable=false, columnDefinition = "varchar(45)")
    private String email;

    public RefreshToken(String refreshToken, String email) {
        this.refreshToken = refreshToken;
        this.email = email;
    }

    public RefreshToken updateToken(String token){
        this.refreshToken = token;
        return this;
    }
}
