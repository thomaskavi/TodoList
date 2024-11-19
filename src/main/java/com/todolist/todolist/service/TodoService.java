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

  public List<Todo> findAll() {
    return todoRepository.findAll();
  }

  public Optional<Todo> findById(Long id) {
    return todoRepository.findById(id);
  }

  public Todo saveTodo(Todo todo) {
    if (!StringUtils.hasText(todo.getTitle())) {
      throw new IllegalArgumentException("The title cannot be empty or contain only spaces.");
    }
    return todoRepository.save(todo);
  }

  public void deleteTodo(Long id) {
    todoRepository.deleteById(id);
  }

  public Todo update(Long id, Todo newTodo) {
    return todoRepository.findById(id)
        .map(todo -> {
          if (!StringUtils.hasText(newTodo.getTitle())) {
            throw new IllegalArgumentException("The title cannot be empty or contain only spaces.");
          }
          todo.setTitle(newTodo.getTitle());
          todo.setDescription(newTodo.getDescription());
          todo.setCompleted(newTodo.getCompleted());
          return todoRepository.save(todo);
        }).orElseThrow(() -> new RuntimeException("Todo not found"));
  }

  public Todo updateStatus(Long id, Boolean completed) {
    // Find the task in the database
    Todo todo = todoRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Task not found"));

    // Update the status
    todo.setCompleted(completed);

    // Save changes to the database
    return todoRepository.save(todo);
  }

  public Todo updatePriority(Long id, Todo.PriorityEnum newPriority) {
    // Find the task by ID
    Todo todo = todoRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Task not found with ID: " + id));

    // Update the priority
    todo.setPriority(newPriority);

    // Save the updated task to the database
    return todoRepository.save(todo);
  }
}
