package com.lux.casino.controller;

import com.lux.casino.model.User;

public class GameController {

    public static boolean apostar(double valor) {
        User u = AuthController.getCurrentUser();
        if (u == null || u.getBalance() < valor) return false;

        u.setBalance(u.getBalance() - valor);
        return true;
    }

    public static void sacar(double ganho) {
        User u = AuthController.getCurrentUser();
        if (u != null) {
            u.setBalance(u.getBalance() + ganho);
        }
    }

    public static double saldoAtual() {
        User u = AuthController.getCurrentUser();
        return (u != null) ? u.getBalance() : 0.0;
    }
}


