package com.todolist.todolist.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

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
}
