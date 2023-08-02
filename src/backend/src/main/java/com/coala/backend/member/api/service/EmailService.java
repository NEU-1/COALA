package com.coala.backend.member.api.service;

public interface EmailService {

    String sendMail(String email, String type, String authNum);
}
