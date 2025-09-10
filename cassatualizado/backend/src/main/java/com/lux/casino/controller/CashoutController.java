package com.lux.casino.controller;

import com.lux.casino.model.User;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/cashout")
public class CashoutController {
    private final SimpMessagingTemplate messagingTemplate;
    public CashoutController(SimpMessagingTemplate messagingTemplate){ this.messagingTemplate = messagingTemplate; }

    @PostMapping("/mines")
    public Map<String, Object> cashoutMines(@RequestBody Map<String, Object> body){
        return processCashout("mines", body);
    }

    @PostMapping("/plinko")
    public Map<String, Object> cashoutPlinko(@RequestBody Map<String, Object> body){
        return processCashout("plinko", body);
    }

    @PostMapping("/crash")
    public Map<String, Object> cashoutCrash(@RequestBody Map<String, Object> body){
        return processCashout("crash", body);
    }

    private Map<String, Object> processCashout(String game, Map<String, Object> body){
        User u = AuthController.getCurrentUser();
        double amount = ((Number)body.getOrDefault("amount", 0)).doubleValue();
        double mult = ((Number)body.getOrDefault("mult", 1)).doubleValue();
        if(u==null || amount<=0){ return Map.of("ok", false, "balance", u!=null? u.getBalance():0); }
        u.setBalance(u.getBalance() + amount);
        u.setTotalWon(u.getTotalWon() + amount);
        messagingTemplate.convertAndSend("/topic/wins", Map.of(
                "type", "win",
                "game", game,
                "user", u.getUsername(),
                "amount", amount,
                "mult", mult,
                "ts", System.currentTimeMillis()
        ));
        return Map.of("ok", true, "balance", u.getBalance());
    }
}


