package com.lux.casino.controller;

import com.lux.casino.model.User;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/wallet")
public class WalletApiController {

    @PostMapping("/deposit")
    public Map<String, Object> deposit(@RequestBody Map<String, Object> body){
        User u = AuthController.getCurrentUser();
        double amount = ((Number)body.getOrDefault("amount", 0)).doubleValue();
        if(u!=null && amount>0){ u.setBalance(u.getBalance()+amount); }
        return Map.of("balance", u!=null? u.getBalance():0);
    }

    @PostMapping("/withdraw")
    public Map<String, Object> withdraw(@RequestBody Map<String, Object> body){
        User u = AuthController.getCurrentUser();
        double amount = ((Number)body.getOrDefault("amount", 0)).doubleValue();
        boolean ok=false;
        if(u!=null && amount>0 && u.getBalance()>=amount){ u.setBalance(u.getBalance()-amount); ok=true; }
        return Map.of("ok", ok, "balance", u!=null? u.getBalance():0);
    }
}


