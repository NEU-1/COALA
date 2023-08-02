package com.coala.backend.member.common.jwt;

import com.coala.backend.member.common.model.UserDetailsServiceImpl;
import com.coala.backend.member.db.entity.RefreshToken;
import com.coala.backend.member.db.repository.RefreshTokenRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Base64;
import java.util.Date;
import java.util.Optional;

@Slf4j
@Component
public class JwtTokenProvider {

    private final UserDetailsServiceImpl userDetailsService;

    private final RefreshTokenRepository refreshTokenRepository;

    public JwtTokenProvider(UserDetailsServiceImpl userDetailsService, RefreshTokenRepository refreshTokenRepository) {
        this.userDetailsService = userDetailsService;
        this.refreshTokenRepository = refreshTokenRepository;
    }


    private final Long ACCESS_TIME = 30 * 60 * 1000L; // 30 min
    private final Long REFRESH_TIME = 7 * 24 * 60 * 60 * 1000L; // 1week

    public static final String ACCESS_TOKEN = "Access_Token";
    public static final String REFRESH_TOKEN = "Refresh_Token";


    @Value("${jwt.secret.key}")
    private String secretKey;
    private Key key;
    private final SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;

    // bean
    @PostConstruct
    public void init(){
        byte[] bytes = Base64.getDecoder().decode(secretKey);
        key = Keys.hmacShaKeyFor(bytes);
    }

    // get Header Token
    public String getHeaderToken(HttpServletRequest request, String type){
        return type.equals("Access") ? request.getHeader(ACCESS_TOKEN) : request.getHeader(REFRESH_TOKEN);
    }

    // Create All token
    public TokenDto createAllToken(String email){
        return new TokenDto(createToken(email, "Access"), createToken(email, "Refresh"));
    }

    // Create Token
    public String  createToken(String email, String type){
        Date date = new Date();

        Long time = type.equals("Access") ? ACCESS_TIME : REFRESH_TIME;

        return Jwts.builder()
                .setSubject(email)
                .setExpiration(new Date(date.getTime() + time))
                .setIssuedAt(date)
                .signWith(key, signatureAlgorithm)
                .compact();
    }

    // certification token
    public Boolean tokenValidation(String token){
        try{
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        }catch(Exception e){
            log.error(e.getMessage());
            return false;
        }
    }

    // RefreshToken certification
    // DB 조회 방식이지만 나중에 Redis를 이용하는게 좋다.
    public Boolean refreshTokenValidation(String token){

        // 1st cetification
        if(!tokenValidation(token)) return false;

        // DB token compare
        Optional<RefreshToken> refreshToken = refreshTokenRepository.findByEmail(getEmailFromToken(token));

        return refreshToken.isPresent() && token.equals(refreshToken.get().getRefreshToken()); // token
    }

    // 인증 객체 생성
    public Authentication createAuthentication(String email){
        UserDetails userDetails = userDetailsService.loadUserByUsername(email);

        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }

    // 토큰에서 email 가져오는 기능
    public String getEmailFromToken(String token){
        return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody().getSubject();
    }

    // Access Token Header set
    public void setHeaderAccessToken(HttpServletResponse response, String accessToken){
        response.setHeader("Access_Token", accessToken);
    }

    // Refresh Token Header set
    public void setHeaderRefreshToken(HttpServletResponse response, String refreshToken){
        response.setHeader("Refresh_Token", refreshToken);
    }
}






















