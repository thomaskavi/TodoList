package com.todolist.todolist.service;

import java.time.format.DateTimeFormatter;
import java.time.LocalDateTime;

public class DateFormatter {
  public static void main(String[] args) {
    LocalDateTime now = LocalDateTime.now();

    // Define o formato desejado
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    // Formata a data para o formato desejado
    String formattedDate = now.format(formatter);

    System.out.println(formattedDate);
  }
}
