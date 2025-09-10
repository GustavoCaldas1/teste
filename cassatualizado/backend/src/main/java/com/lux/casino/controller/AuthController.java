package com.lux.casino.controller;

import com.lux.casino.model.User;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicReference;

public class AuthController {
    private static final AtomicReference<User> currentUser = new AtomicReference<>();
    private static final List<User> users = new ArrayList<>();

    static {
        // 👇 Usuários fixos para teste
        users.add(new User("moderador", "12345", 1000.0, 0.0, 0.0, "MODERATOR"));
        users.add(new User("admin", "admin123", 5000.0, 0.0, 0.0, "ADMIN"));
        users.add(new User("teste", "teste123", 500.0, 0.0, 0.0, "USER"));
    }

    // 🔹 Login do usuário
    public static boolean login(String username, String password) {
        return users.stream()
                .filter(u -> u.getUsername().equals(username) && u.getPassword().equals(password))
                .findFirst()
                .map(u -> {
                    currentUser.set(u);
                    return true;
                })
                .orElse(false);
    }

    // 🔹 Logout
    public static void logout() {
        currentUser.set(null);
    }

    // 🔹 Pegar usuário logado
    public static User getCurrentUser() {
        return currentUser.get();
    }

    // 🔹 Verifica se está logado
    public static boolean isLoggedIn() {
        return currentUser.get() != null;
    }

    // 🔹 Lista todos os usuários cadastrados (apenas para debug)
    public static List<User> listUsers() {
        return users;
    }
}
