package com.coala.backend.api.controller;

import com.coala.backend.db.entity.User;
import com.coala.backend.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    UserRepository userRepository;

    @Autowired
    public UserController(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    // 데이터베이스 추가 더미데이터 "localhost:9999/add/숫자 " 해당 정보 입력 됨 DB연결 테스트용
    @GetMapping("/add/{num}")
    public void addUser(@PathVariable("num") long num){
        User user = new User();
        user.setId((long)num);
        user.setPassword("hello");
        user.setEmail("hello");
        user.setName("hello");
        user.setNickname("hello");
        user.setDepart("hello");
        user.setStudentId("hello");
        user.setOrdinal("hello");
        user.setPhoneNo("hello");
        user.setImagePath("");

        userRepository.save(user);
    }
}
