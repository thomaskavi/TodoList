package com.todolist.todolist.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.todolist.todolist.model.Todo;

public interface TodoRepository extends JpaRepository<Todo, Long> {

}
