package com.coala.backend.mypage.api.service;

import com.coala.backend.auction.db.entity.AuctionPost;
import com.coala.backend.auction.db.repository.AuctionPostRepository;
import com.coala.backend.community.freepost.db.entity.FreePost;
import com.coala.backend.community.freepost.db.repository.FreePostRepository;
import com.coala.backend.community.techpost.db.entity.TechPost;
import com.coala.backend.community.techpost.db.repository.TechPostRepository;
import com.coala.backend.member.db.dto.response.BaseResponseDto;
import com.coala.backend.member.db.entity.Member;
import com.coala.backend.member.db.repository.MemberRepository;
import com.coala.backend.mypage.db.repository.CustomMyPageRepository;
import com.coala.backend.store.db.dto.response.ListResponseDto;
import com.coala.backend.store.db.dto.response.StorePostResponseDto;
import com.coala.backend.store.db.entity.StoreLike;
import com.coala.backend.store.db.entity.StorePost;
import com.coala.backend.store.db.repository.StoreLikeRepository;
import com.coala.backend.store.db.repository.StorePostRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.NoSuchElementException;


@Service
public class MyPageServiceImpl implements MyPageService{

    private StorePostRepository storePostRepository;
    private AuctionPostRepository auctionPostRepository;
    private TechPostRepository techPostRepository;
    private FreePostRepository freePostRepository;
    private StoreLikeRepository storeLikeRepository;
    private MemberRepository memberRepository;

    private Logger logger = LoggerFactory.getLogger(MyPageServiceImpl.class);

    public MyPageServiceImpl(StorePostRepository storePostRepository, AuctionPostRepository auctionPostRepository, TechPostRepository techPostRepository, FreePostRepository freePostRepository, StoreLikeRepository storeLikeRepository, MemberRepository memberRepository) {
        this.storePostRepository = storePostRepository;
        this.auctionPostRepository = auctionPostRepository;
        this.techPostRepository = techPostRepository;
        this.freePostRepository = freePostRepository;
        this.storeLikeRepository = storeLikeRepository;
        this.memberRepository = memberRepository;
    }

    @Override
    public ListResponseDto myStore(Member member) {
        ListResponseDto response = new ListResponseDto();
        List<StorePost> list = storePostRepository.findByMember(member);
        response.setList(list);
        response.setSize(list.size());
        return response;
    }

    @Override
    public ListResponseDto myAuction(Member member) {
        ListResponseDto response = new ListResponseDto();
        List<AuctionPost> list = auctionPostRepository.findByMember(member);
        response.setList(list);
        response.setSize(list.size());
        return response;
    }

    @Override
    public ListResponseDto myFavorite(Member member) {
        ListResponseDto response = new ListResponseDto();
        List<StoreLike> list = storeLikeRepository.findByMember(member);
        response.setList(list);
        response.setSize(list.size());
        return response;
    }


    @Override
    public BaseResponseDto myProfile(MultipartFile file, Member member) {
        return null;
    }


}
