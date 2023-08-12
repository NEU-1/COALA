package com.coala.backend.product.db.entity;

import com.coala.backend.store.db.entity.StorePost;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name" , columnDefinition = "varchar(255)")
    private String name;

    // store
    @OneToMany(mappedBy = "category")
    @JsonIgnore
    private List<StorePost> storePost = new ArrayList<>();

//    // auction
//    @OneToMany(mappedBy = "category")
//    private List<AuctionPost> auctionPost = new ArrayList<>();

    // my Product
    @OneToMany(mappedBy = "category")
    @JsonIgnore
    private List<MyProduct> myProduct = new ArrayList<>();
}
