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
  private LocalDateTime createdDate;

  private LocalDateTime completedDate;

  @Enumerated(EnumType.STRING)
  private PriorityEnum priority;

  public enum PriorityEnum {
    ALTA,
    MEDIA,
    BAIXA
  }

  @PrePersist
  @PreUpdate
  public void prePersistOrUpdate() {
    if (concluida && completedDate == null) {
      completedDate = LocalDateTime.now(); // Define a data de conclusão
    }
  }
}
