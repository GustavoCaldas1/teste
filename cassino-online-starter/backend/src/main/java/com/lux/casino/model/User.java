package com.lux.casino.model;

public class User {
    private String username;
    private String password;
    private double balance;
    private double totalWon;
    private double totalLost;
    private String role; // 👈 Novo campo

    public User(String username, String password, double balance, double totalWon, double totalLost, String role) {
        this.username = username;
        this.password = password;
        this.balance = balance;
        this.totalWon = totalWon;
        this.totalLost = totalLost;
        this.role = role;
    }

    // Getters e Setters
    public String getUsername() { return username; }
    public String getPassword() { return password; }
    public double getBalance() { return balance; }
    public double getTotalWon() { return totalWon; }
    public double getTotalLost() { return totalLost; }
    public String getRole() { return role; }

    public void setRole(String role) { this.role = role; }
}
