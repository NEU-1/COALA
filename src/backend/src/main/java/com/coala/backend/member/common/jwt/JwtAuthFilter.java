package com.coala.backend.member.common.jwt;

import com.coala.backend.member.db.dto.response.BaseResponseDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider;

    // Http 요청이 오면 WAS가 request, response 객체를 생성해준다
    // 만든 모든 인자값 받아옴
    // 요청이 들어오면 dFilterInternal이 한번 실행됨
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        // WebSecurityConfig의 UsernamePasswordAuthenticationFilter 보다 먼저 동작

        // Access / Refresh 헤더에서 토큰을 가져옴
        String accessToken = jwtTokenProvider.getHeaderToken(request, "Access");
        String refreshToken = jwtTokenProvider.getHeaderToken(request, "Refresh");

        if(accessToken != null){
            // accessToken이 유효하다.

            // securityContext에 인증 정보 저장
            if(jwtTokenProvider.tokenValidation(accessToken)){
                // 토큰 유효성 검사에 통과
                // 토큰에서 이메일 정보 추출
                setAuthentication(jwtTokenProvider.getEmailFromToken(accessToken));
            }

            // accessToken이 만료된 상황
            else if(refreshToken != null){
                // refreshToken 검증 & RefreshToken이 DB에 존재하는지 유무 판단
                boolean isRefreshToken = jwtTokenProvider.refreshTokenValidation(refreshToken);

                // refreshToken 유효, DB의 refreshToken과 일치
                if(isRefreshToken){
                    // refreshToken에서 아이디 정보
                    String loginEmail = jwtTokenProvider.getEmailFromToken(refreshToken);

                    // new AccessToken
                    String newAccessToken = jwtTokenProvider.createToken(loginEmail, "Access");

                    // AccessToken add to header
                    jwtTokenProvider.setHeaderAccessToken(response, newAccessToken);

                    // Security context에 인증정보 넣기
                    setAuthentication(jwtTokenProvider.getEmailFromToken(newAccessToken));
                }
                // refreshToken 만료 || refreshToken이 DB와 다르다면
                else{
                    jwtExceptionHandler(response, "RefreshToken Expired", HttpStatus.BAD_REQUEST);
                    return;
                }
            }
        }
        filterChain.doFilter(request, response);
    }

    // SecurityContext에 Authentication 객체 저장
    public void setAuthentication(String email){
        Authentication authentication = jwtTokenProvider.createAuthentication(email);
        // security가 securitycontextHolder에서 인증 객체 확인
        // jwtAuthfilter에서 authentication을 넣어주면 UsernamePasswordAuthenticationFilter 내에서 인증 된 것을 확인하고 추가적인 작업을 진행하지 않는다.
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    // Jwt 예외 처리
    public void jwtExceptionHandler(HttpServletResponse response, String msg, HttpStatus status){
        response.setStatus(status.value());
        response.setContentType("application/json");
        try{
            String json = new ObjectMapper().writeValueAsString(new BaseResponseDto(msg, status.value()));
            response.getWriter().write(json);
        }catch(Exception e){
            log.error(e.getMessage());
        }
    }

}
