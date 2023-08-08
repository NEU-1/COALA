package com.coala.backend.product.db.repository;

import com.coala.backend.product.db.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {

}
