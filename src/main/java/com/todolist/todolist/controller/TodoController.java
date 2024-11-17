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

  // Helper method to convert Todo to TodoDTO
  private TodoDTO convertToDTO(Todo todo) {
    TodoDTO dto = new TodoDTO();
    dto.setId(todo.getId()); // Now includes the id
    dto.setTitle(todo.getTitle());
    dto.setDescription(todo.getDescription());
    dto.setCompleted(todo.isCompleted());
    dto.setCreatedDate(todo.getCreatedDate());
    dto.setCompletedDate(todo.getCompletedDate());
    dto.setPriority(todo.getPriority());
    return dto;
  }

  // Helper method to convert TodoDTO to Todo
  private Todo convertToEntity(TodoDTO dto) {
    Todo todo = new Todo();
    todo.setTitle(dto.getTitle());
    todo.setDescription(dto.getDescription());
    todo.setCompleted(dto.isCompleted());
    todo.setCreatedDate(dto.getCreatedDate());
    todo.setCompletedDate(dto.getCompletedDate());
    todo.setPriority(dto.getPriority());
    return todo;
  }

  // Endpoint to list all tasks
  @GetMapping
  public List<TodoDTO> listAll() {
    return todoService.findAll()
        .stream()
        .map(this::convertToDTO)
        .collect(Collectors.toList());
  }

  // Endpoint to get a task by ID
  @GetMapping("/{id}")
  public ResponseEntity<TodoDTO> getById(@PathVariable Long id) {
    return todoService.findById(id)
        .map(this::convertToDTO)
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
  }

  // Endpoint to create a new task
  @PostMapping
  public ResponseEntity<TodoDTO> createTodo(@Valid @RequestBody TodoDTO todoDTO) {
    Todo newTodo = convertToEntity(todoDTO);
    newTodo.setCreatedDate(java.time.LocalDateTime.now()); // Set the creation date
    Todo savedTodo = todoService.saveTodo(newTodo);
    return ResponseEntity.ok(convertToDTO(savedTodo));
  }

  // Endpoint to update an existing task
  @PutMapping("/{id}")
  public ResponseEntity<TodoDTO> updateTodo(@PathVariable Long id, @Valid @RequestBody TodoDTO newTodoDTO) {
    Todo newTodo = convertToEntity(newTodoDTO);
    Todo updatedTodo = todoService.update(id, newTodo);
    return ResponseEntity.ok(convertToDTO(updatedTodo));
  }

  // Endpoint to delete a task
  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteTodo(@PathVariable Long id) {
    if (todoService.findById(id).isPresent()) {
      todoService.deleteTodo(id);
      return ResponseEntity.noContent().build();
    } else {
      return ResponseEntity.notFound().build();
    }
  }

  // Endpoint to update the completion status of a task
  @PatchMapping("/{id}/status")
  public ResponseEntity<Todo> updateStatus(@PathVariable Long id, @RequestBody Map<String, Boolean> request) {
    Boolean completed = request.get("completed");
    if (completed == null) {
      return ResponseEntity.badRequest().build();
    }
    Todo updatedTodo = todoService.updateStatus(id, completed);
    return ResponseEntity.ok(updatedTodo);
  }

  // Endpoint to update the priority of a task
  @PatchMapping("/{id}/priority")
  public ResponseEntity<Todo> updatePriority(
      @PathVariable Long id,
      @RequestBody Map<String, String> request) {

    String newPriority = request.get("priority");
    if (newPriority == null || newPriority.isEmpty()) {
      return ResponseEntity.badRequest().body(null);
    }

    try {
      // Convert the received string to the corresponding Enum
      Todo.PriorityEnum priorityEnum = Todo.PriorityEnum.valueOf(newPriority.toUpperCase());

      // Update the priority in the service
      Todo updatedTodo = todoService.updatePriority(id, priorityEnum);
      return ResponseEntity.ok(updatedTodo);

    } catch (IllegalArgumentException e) {
      // If the received value is not valid in the Enum
      return ResponseEntity.badRequest().body(null);
    }
  }
}
