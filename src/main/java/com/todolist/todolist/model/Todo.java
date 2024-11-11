package com.todolist.todolist.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Todo {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank(message = "O título é obrigatório e não pode ser vazio")
  private String titulo;

  private String descricao;
  private boolean concluida;

  @Column(updatable = false)
  @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
  private LocalDateTime createdDate;

  @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
  private LocalDateTime completedDate;

  @Enumerated(EnumType.STRING)
  private PriorityEnum priority;

  public enum PriorityEnum {
    ALTA,
    MEDIA,
    BAIXA
  }

  // Garantir que a data de criação seja definida no momento da persistência.
  @PrePersist
  public void prePersist() {
    if (createdDate == null) {
      createdDate = LocalDateTime.now(); // Define a data de criação
    }

    if (concluida && completedDate == null) {
      completedDate = LocalDateTime.now(); // Define a data de conclusão
    }
  }

  // Atualiza a data de conclusão no momento da atualização
  @PreUpdate
  public void preUpdate() {
    if (concluida && completedDate == null) {
      completedDate = LocalDateTime.now(); // Define a data de conclusão
    } else if (!concluida) {
      completedDate = null; // Limpa a data de conclusão se a tarefa não for concluída
    }
  }
}
