package com.todolist.todolist.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.todolist.todolist.model.Todo;
import com.todolist.todolist.repository.TodoRepository;

@Service
public class TodoService {

  @Autowired
  private TodoRepository TodoRepository;

  public List<Todo> listarTodas() {
    return TodoRepository.findAll();
  }

  public Optional<Todo> buscarPorId(Long id) {
    return TodoRepository.findById(id);
  }

  public Todo salvarTodo(Todo Todo) {
    return TodoRepository.save(Todo);
  }

  public void deletarTodo(Long id) {
    TodoRepository.deleteById(id);
  }

  public Todo atualizar(Long id, Todo novaTodo) {
    return TodoRepository.findById(id)
        .map(Todo -> {
          Todo.setTitulo(novaTodo.getTitulo());
          Todo.setDescricao(novaTodo.getDescricao());
          Todo.setConcluida(novaTodo.isConcluida());
          return TodoRepository.save(Todo);
        }).orElseThrow(() -> new RuntimeException("Todo não encontrada"));
  }
}
