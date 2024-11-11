package com.todolist.todolist.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.todolist.todolist.dto.TodoDTO;
import com.todolist.todolist.exceptions.ResourceNotFoundException;
import com.todolist.todolist.model.Todo;
import com.todolist.todolist.repository.TodoRepository;

@Service
public class TodoService {

  @Autowired
  private TodoRepository todoRepository;

  public List<Todo> listarTodas() {
    return todoRepository.findAll();
  }

  public Optional<Todo> buscarPorId(Long id) {
    return todoRepository.findById(id);
  }

  public Todo salvarTodo(Todo todo) {
    if (!StringUtils.hasText(todo.getTitulo())) {
      throw new IllegalArgumentException("O título não pode ser vazio ou conter apenas espaços.");
    }
    return todoRepository.save(todo);
  }

  public void deletarTodo(Long id) {
    todoRepository.deleteById(id);
  }

  public Todo atualizar(Long id, Todo novaTodo) {
    return todoRepository.findById(id)
        .map(todo -> {
          if (!StringUtils.hasText(novaTodo.getTitulo())) {
            throw new IllegalArgumentException("O título não pode ser vazio ou conter apenas espaços.");
          }
          todo.setTitulo(novaTodo.getTitulo());
          todo.setDescricao(novaTodo.getDescricao());
          todo.setConcluida(novaTodo.isConcluida());
          return todoRepository.save(todo);
        }).orElseThrow(() -> new RuntimeException("Todo não encontrada"));
  }

  public Todo updateStatusAndPriority(Long id, TodoDTO todoDTO) {
    Todo todo = todoRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Tarefa não encontrada com id " + id));

    // Atualiza o status `concluida` se estiver presente no DTO
    if (todoDTO.isConcluida() != todo.isConcluida()) {
      todo.setConcluida(todoDTO.isConcluida());

      // Define ou remove `completedDate` com base no status
      if (todoDTO.isConcluida()) {
        todo.setCompletedDate(LocalDateTime.now());
      } else {
        todo.setCompletedDate(null);
      }
    }

    // Atualiza a prioridade se fornecida no DTO
    if (todoDTO.getPriority() != null) {
      todo.setPriority(todoDTO.getPriority());
    }

    return todoRepository.save(todo);
  }

}
