package com.lux.casino.controller;

import com.lux.casino.model.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class UserApiController {

    @GetMapping("/user")
    public Map<String, Object> getUser(){
        User u = AuthController.getCurrentUser();
        Map<String, Object> res = new HashMap<>();
        if(u==null){
            res.put("username", "guest");
            res.put("balance", 0);
            res.put("totalWon", 0);
            res.put("totalLost", 0);
        } else {
            res.put("username", u.getUsername());
            res.put("balance", u.getBalance());
            res.put("totalWon", u.getTotalWon());
            res.put("totalLost", u.getTotalLost());
        }
        return res;
    }
}


