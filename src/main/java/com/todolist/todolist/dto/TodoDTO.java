package com.todolist.todolist.dto;

import java.time.LocalDateTime;

import com.todolist.todolist.model.Todo.PriorityEnum;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TodoDTO {

  private Long id;

  private String titulo;
  private String descricao;
  private boolean concluida;

  private LocalDateTime createdDate;
  private LocalDateTime completedDate;
  private PriorityEnum priority;

}
