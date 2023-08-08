package com.coala.backend.member.db.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Certification {

    @Id
    @Column(name = "email" , nullable = false)
    private String email;

    @Column(name = "otp", nullable = true)
    private String otp;
}
