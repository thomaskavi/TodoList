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

  @NotBlank(message = "The title is required and cannot be empty")
  private String title;

  private String description;
  private Boolean completed;

  @Column(updatable = false)
  @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
  private LocalDateTime createdDate;

  @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
  private LocalDateTime completedDate;

  @Enumerated(EnumType.STRING)
  private PriorityEnum priority;

  public enum PriorityEnum {
    HIGH,
    MEDIUM,
    LOW
  }

  // Ensures the creation date is set during persistence.
  @PrePersist
  public void prePersist() {
    if (createdDate == null) {
      createdDate = LocalDateTime.now(); // Sets the creation date
    }

    if (completed && completedDate == null) {
      completedDate = LocalDateTime.now(); // Sets the completion date
    }
  }

  // Updates the completion date during updates
  @PreUpdate
  public void preUpdate() {
    if (completed && completedDate == null) {
      completedDate = LocalDateTime.now(); // Sets the completion date
    } else if (!completed) {
      completedDate = null; // Clears the completion date if the task is not completed
    }
  }
}
