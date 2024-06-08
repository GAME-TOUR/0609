package com.project.gametour.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LoginController {

    @GetMapping("/main")
    public String root() {
        return "main";
    }

    @GetMapping("/login")
    public String login() {
        return "login.html";
    }


}
