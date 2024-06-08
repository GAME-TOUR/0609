package com.project.gametour.config.oauth;

import com.project.gametour.config.auth.PrincipalDetails;
import com.project.gametour.config.oauth.provider.GoogleUserInfo;
import com.project.gametour.config.oauth.provider.KakaoUserInfo;
import com.project.gametour.config.oauth.provider.NaverUserInfo;
import com.project.gametour.config.oauth.provider.OAuth2UserInfo;
import com.project.gametour.entity.User;
import com.project.gametour.repository.UserRepository;
import com.project.gametour.role.UserRole;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class PrincipalOauth2UserService extends DefaultOAuth2UserService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        OAuth2UserInfo oAuth2UserInfo = null;
        if (userRequest.getClientRegistration().getRegistrationId().equals("google")) {
            System.out.println(oAuth2User.getAttributes());
            oAuth2UserInfo = new GoogleUserInfo(oAuth2User.getAttributes());
        } else if (userRequest.getClientRegistration().getRegistrationId().equals("naver")) {
            System.out.println(oAuth2User.getAttributes());
            oAuth2UserInfo = new NaverUserInfo((Map<String, Object>) oAuth2User.getAttributes().get("response"));
        } else if (userRequest.getClientRegistration().getRegistrationId().equals("kakao")){
            System.out.println(oAuth2User.getAttributes());
            oAuth2UserInfo = new KakaoUserInfo(oAuth2User.getAttributes());
        } else {
            System.out.println("구글과 네이버와 카카오만 지원합니다.");
        }

        // 회원가입을 강제로 진행
        String provider = oAuth2UserInfo.getProvider();
        String providerId = oAuth2UserInfo.getProviderId();
        String username = oAuth2UserInfo.getName();
        String password = passwordEncoder.encode(providerId);
        String email = oAuth2UserInfo.getEmail();
        String role = UserRole.USER.getValue();
        User user = userRepository.findByUsername(providerId + "_" + username).orElse(null);

        if (user == null) {
            user = User.builder()
                    .username(providerId + "_" + username)
                    .password(password)
                    .name(username)
                    .role(role)
                    .createDate(LocalDateTime.now())
                    .providerId(providerId)
                    .provider(provider)
                    .build();
            userRepository.save(user);
        }

        return new PrincipalDetails(user, oAuth2User.getAttributes());
    }
}
