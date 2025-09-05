package com.lux.casino.model;

import java.time.LocalDateTime;

public class Tx {
    private long id;
    private String type;
    private double amount;
    private String method;
    private LocalDateTime date;

    public Tx() {}

    // Construtor que o controller espera
    public Tx(long id, String type, double amount, String method) {
        this.id = id;
        this.type = type;
        this.amount = amount;
        this.method = method;
        this.date = LocalDateTime.now();
    }

    public Tx(String type, double amount, String method) {
        this.type = type;
        this.amount = amount;
        this.method = method;
        this.date = LocalDateTime.now();
    }

    // Getters e Setters
    public long getId() { return id; }
    public String getType() { return type; }
    public double getAmount() { return amount; }
    public String getMethod() { return method; }
    public LocalDateTime getDate() { return date; }
}
