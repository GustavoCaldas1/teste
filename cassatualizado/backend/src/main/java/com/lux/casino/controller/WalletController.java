package com.lux.casino.controller;

import com.lux.casino.model.User;

public class WalletController {

    // 🔹 Mostrar saldo
    public static double getBalance(User user) {
        return user != null ? user.getBalance() : 0.0;
    }

    // 🔹 Adicionar saldo
    public static void deposit(User user, double amount) {
        if (user != null && amount > 0) {
            user.setBalance(user.getBalance() + amount);
        }
    }

    // 🔹 Retirar saldo
    public static boolean withdraw(User user, double amount) {
        if (user != null && amount > 0 && user.getBalance() >= amount) {
            user.setBalance(user.getBalance() - amount);
            return true;
        }
        return false;
    }

    // 🔹 Atualizar ganhos
    public static void addWin(User user, double amount) {
        if (user != null && amount > 0) {
            user.setTotalWon(user.getTotalWon() + amount);
            user.setBalance(user.getBalance() + amount);
        }
    }

    // 🔹 Atualizar perdas
    public static void addLoss(User user, double amount) {
        if (user != null && amount > 0) {
            user.setTotalLost(user.getTotalLost() + amount);
            user.setBalance(user.getBalance() - amount);
        }
    }
}
