package com.todolist.todolist.controller;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.todolist.todolist.dto.TodoDTO;
import com.todolist.todolist.model.Todo;
import com.todolist.todolist.service.TodoService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/todolist")
public class TodoController {

  @Autowired
  private TodoService todoService;

  // Método auxiliar para converter de Todo para TodoDTO
  private TodoDTO convertToDTO(Todo todo) {
    TodoDTO dto = new TodoDTO();
    dto.setId(todo.getId()); // Agora inclui o id
    dto.setTitulo(todo.getTitulo());
    dto.setDescricao(todo.getDescricao());
    dto.setConcluida(todo.isConcluida());
    dto.setCreatedDate(todo.getCreatedDate());
    dto.setCompletedDate(todo.getCompletedDate());
    dto.setPriority(todo.getPriority());
    return dto;
  }

  // Método auxiliar para converter de TodoDTO para Todo
  private Todo convertToEntity(TodoDTO dto) {
    Todo todo = new Todo();
    todo.setTitulo(dto.getTitulo());
    todo.setDescricao(dto.getDescricao());
    todo.setConcluida(dto.isConcluida());
    todo.setCreatedDate(dto.getCreatedDate());
    todo.setCompletedDate(dto.getCompletedDate());
    todo.setPriority(dto.getPriority());
    return todo;
  }

  // Endpoint para listar todas as tarefas
  @GetMapping
  public List<TodoDTO> listarTodas() {
    return todoService.listarTodas()
        .stream()
        .map(this::convertToDTO)
        .collect(Collectors.toList());
  }

  // Endpoint para buscar uma tarefa por ID
  @GetMapping("/{id}")
  public ResponseEntity<TodoDTO> buscarPorId(@PathVariable Long id) {
    return todoService.buscarPorId(id)
        .map(this::convertToDTO)
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
  }

  // Endpoint para criar uma nova tarefa
  @PostMapping
  public ResponseEntity<TodoDTO> criarTodo(@Valid @RequestBody TodoDTO todoDTO) {
    Todo novaTodo = convertToEntity(todoDTO);
    novaTodo.setCreatedDate(java.time.LocalDateTime.now()); // Definir a data de criação
    Todo todoSalvo = todoService.salvarTodo(novaTodo);
    return ResponseEntity.ok(convertToDTO(todoSalvo));
  }

  // Endpoint para atualizar uma tarefa existente
  @PutMapping("/{id}")
  public ResponseEntity<TodoDTO> atualizarTodo(@PathVariable Long id, @Valid @RequestBody TodoDTO novaTodoDTO) {
    Todo novaTodo = convertToEntity(novaTodoDTO);
    Todo todoAtualizado = todoService.atualizar(id, novaTodo);
    return ResponseEntity.ok(convertToDTO(todoAtualizado));
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

  @PatchMapping("/{id}/status")
  public ResponseEntity<Todo> updateStatus(@PathVariable Long id, @RequestBody Map<String, Boolean> request) {
    Boolean concluida = request.get("concluida");
    if (concluida == null) {
      return ResponseEntity.badRequest().build();
    }
    Todo updatedTodo = todoService.updateStatus(id, concluida);
    return ResponseEntity.ok(updatedTodo);
  }

  @PatchMapping("/{id}/priority")
  public ResponseEntity<Todo> updatePriority(
      @PathVariable Long id,
      @RequestBody Map<String, String> request) {

    String newPriority = request.get("priority");
    if (newPriority == null || newPriority.isEmpty()) {
      return ResponseEntity.badRequest().body(null);
    }

    try {
      // Converter a string recebida para o enum correspondente
      Todo.PriorityEnum priorityEnum = Todo.PriorityEnum.valueOf(newPriority.toUpperCase());

      // Atualizar a prioridade no serviço
      Todo updatedTodo = todoService.updatePriority(id, priorityEnum);
      return ResponseEntity.ok(updatedTodo);

    } catch (IllegalArgumentException e) {
      // Caso o valor recebido não seja válido no Enum
      return ResponseEntity.badRequest().body(null);
    }
  }
}
