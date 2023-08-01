package com.coala.backend.api.service;

import com.coala.backend.db.entity.EmailMessage;

public interface EmailService {

    String sendMail(String email, String type, String authNum);
}
