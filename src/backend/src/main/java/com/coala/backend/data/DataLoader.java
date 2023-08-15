package com.coala.backend.data;

import com.coala.backend.product.db.entity.Category;
import com.coala.backend.product.db.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {

    private final CategoryRepository categoryRepository;

    public DataLoader(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public void run(String... args) throws Exception {

        // 데이터 자동 입력
        Category keyboard = new Category();
        keyboard.setName("키보드");
        categoryRepository.save(keyboard);

        Category mouse = new Category();
        mouse.setName("마우스");
        categoryRepository.save(mouse);

        Category headphone = new Category();
        headphone.setName("헤드폰");
        categoryRepository.save(headphone);

        Category tablet = new Category();
        tablet.setName("태블릿");
        categoryRepository.save(tablet);
    }
}