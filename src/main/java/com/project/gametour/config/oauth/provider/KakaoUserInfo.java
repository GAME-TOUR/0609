package com.project.gametour.config.oauth.provider;

import java.util.Map;

public class KakaoUserInfo implements OAuth2UserInfo{

    private Map<String, Object> attributes;

    public KakaoUserInfo(Map<String, Object> attributes) {
        this.attributes = attributes;
    }

    @Override
    public String getProviderId() {
        return String.valueOf(attributes.get("id"));
    }

    @Override
    public String getProvider() {
        return "kakao";
    }

    @Override
    public String getEmail() {
        return "example@kakao.com"; // 개인정보동의항목 심사신청을 해야 이메일을 받을 수 있다.
    }

    @Override
    public String getName() {
        return (String) ((Map<String,Object>) attributes.get("properties")).get("nickname");
    }
}
