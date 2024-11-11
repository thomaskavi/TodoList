package com.todolist.todolist.exceptions;

public class ResourceNotFoundException extends RuntimeException {
  public ResourceNotFoundException(String message) {
    super(message); // Chama o construtor da classe mãe com a mensagem
  }
}
