package com.todolist.todolist.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

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

  public Todo updateStatus(Long id, Boolean concluida) {
    // Busca a tarefa no banco de dados
    Todo todo = todoRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Tarefa não encontrada"));

    // Atualiza o status
    todo.setConcluida(concluida);

    // Salva as mudanças no banco
    return todoRepository.save(todo);
  }

  public Todo updatePriority(Long id, Todo.PriorityEnum newPriority) {
    // Localizar a tarefa pelo ID
    Todo todo = todoRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Tarefa não encontrada com o ID: " + id));

    // Atualizar a prioridade
    todo.setPriority(newPriority);

    // Salvar a tarefa atualizada no banco
    return todoRepository.save(todo);
  }
}
