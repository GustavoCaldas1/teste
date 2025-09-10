package com.lux.casino.controller;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class WinsController {
    private final SimpMessagingTemplate messagingTemplate;

    public WinsController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @PostMapping("/wins")
    public Map<String, Object> publishWin(@RequestBody Map<String, Object> payload) {
        messagingTemplate.convertAndSend("/topic/wins", payload);
        return payload;
    }
}


