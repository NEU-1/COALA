package com.coala.backend.member.service;

public interface EmailService {

    String sendMail(String email, String type, String authNum);
}
