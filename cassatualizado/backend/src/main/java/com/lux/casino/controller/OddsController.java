package com.lux.casino.controller;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Component
@EnableScheduling
public class OddsController {
    private final SimpMessagingTemplate messagingTemplate;
    private final Random rnd = new Random();

    public OddsController(SimpMessagingTemplate messagingTemplate){
        this.messagingTemplate = messagingTemplate;
    }

    @Scheduled(fixedRate = 3000)
    public void pushOdds(){
        Map<String, Object> payload = new HashMap<>();
        payload.put("event", "oddsUpdate");
        payload.put("a", (1.5 + rnd.nextDouble()*2));
        payload.put("b", (1.5 + rnd.nextDouble()*2));
        payload.put("draw", (1.5 + rnd.nextDouble()*2));
        messagingTemplate.convertAndSend("/topic/odds", payload);
    }
}
