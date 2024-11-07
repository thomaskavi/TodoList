package com.todolist.todolist.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.todolist.todolist.model.Todo;
import com.todolist.todolist.service.TodoService;

@RestController
@RequestMapping("/api/todolist")
@Validated
public class TodoController {

  @Autowired
  private TodoService todoService;

  // Endpoint para listar todas as tarefas
  @GetMapping
  public List<Todo> listarTodas() {
    return todoService.listarTodas();
  }

  // Endpoint para buscar uma tarefa por ID
  @GetMapping("/{id}")
  public ResponseEntity<Todo> buscarPorId(@PathVariable Long id) {
    return todoService.buscarPorId(id)
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
  }

  // Endpoint para criar uma nova tarefa
  @PostMapping
  public ResponseEntity<Todo> criarTodo(@Validated @RequestBody Todo todo) {
    Todo novaTodo = todoService.salvarTodo(todo);
    return ResponseEntity.ok(novaTodo);
  }

  // Endpoint para atualizar uma tarefa existente
  @PutMapping("/{id}")
  public ResponseEntity<Todo> atualizarTodo(@PathVariable Long id, @Validated @RequestBody Todo novaTodo) {
    try {
      Todo todoAtualizado = todoService.atualizar(id, novaTodo);
      return ResponseEntity.ok(todoAtualizado);
    } catch (RuntimeException e) {
      return ResponseEntity.notFound().build();
    }
  }

  // Endpoint para deletar uma tarefa
  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deletarTodo(@PathVariable Long id) {
    if (todoService.buscarPorId(id).isPresent()) {
      todoService.deletarTodo(id);
      return ResponseEntity.noContent().build();
    } else {
      return ResponseEntity.notFound().build();
    }
  }
}
