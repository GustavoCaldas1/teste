package com.lux.casino;

import com.lux.casino.controller.AuthController;
import com.lux.casino.model.User;

public class Main {
    public static void main(String[] args) {
        boolean loginOk = AuthController.login("moderador", "12345");

        if (loginOk) {
            User logged = AuthController.getCurrentUser();
            System.out.println("✅ Login feito: " + logged.getUsername() + " (Role: " + logged.getRole() + ")");
        } else {
            System.out.println("❌ Login falhou!");
        }
    }
}
