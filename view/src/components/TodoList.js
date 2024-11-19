import React, { useState } from 'react';
import { updateTaskPriority, updateTaskStatus, deleteTask, updateTask } from '../api';
import { FaEdit, FaTrashAlt, FaCheckCircle, FaCircle } from 'react-icons/fa';
import styles from './TodoList.module.css'; // Importa os estilos do CSS Module

const TodoList = ({ tasks, setTasks }) => {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [updatedTask, setUpdatedTask] = useState({
    title: '',
    description: '',
    priority: 'LOW',
    completed: false,
  });

  const handleEditClick = (task) => {
    setEditingTaskId(task.id);
    setUpdatedTask({ ...task });
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
  };

  const handleSaveEdit = async (id) => {
    try {
      await updateTask(id, updatedTask);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, ...updatedTask } : task
        )
      );
      setEditingTaskId(null);
    } catch (error) {
      console.error('Erro ao editar a tarefa:', error);
    }
  };

  const handlePriorityChange = async (id, priority) => {
    try {
      await updateTaskPriority(id, priority);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, priority } : task
        )
      );
    } catch (error) {
      console.error('Erro ao atualizar a prioridade:', error);
    }
  };

  const handleStatusChange = async (id, completed) => {
    try {
      await updateTaskStatus(id, completed);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, completed } : task
        )
      );
    } catch (error) {
      console.error('Erro ao atualizar o status:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Erro ao deletar a tarefa:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className={styles.TodoList_container}>
      <h2 className={styles.title}>Lista de Tarefas</h2>
      <ul className={styles.list}>
        {tasks.map((task) => (
          <li key={task.id} className={styles.listItem}>
            {editingTaskId === task.id ? (
              <div className={`${styles.editForm} ${styles.show}`}>
                <input
                  type="text"
                  name="title"
                  className={styles.input}
                  value={updatedTask.title}
                  onChange={handleInputChange}
                />
                <textarea
                  name="description"
                  className={styles.textarea}
                  value={updatedTask.description}
                  onChange={handleInputChange}
                />
                <button
                  className={styles.saveButton}
                  onClick={() => handleSaveEdit(task.id)}
                >
                  Salvar
                </button>
                <button className={styles.cancelButton} onClick={handleCancelEdit}>
                  Cancelar
                </button>
              </div>
            ) : (
              <div className={styles.taskInfo}>
                <div className={styles.taskDetails}>
                  <h5>{task.title}</h5>
                  <p>{task.description}</p>

                  <div className={styles.priorityContainer}>
                    <strong>Prioridade:</strong>
                    <select
                      value={task.priority}
                      className={styles.select}
                      onChange={(e) => handlePriorityChange(task.id, e.target.value)}
                    >
                      <option value="HIGH">Alta</option>
                      <option value="MEDIUM">Média</option>
                      <option value="LOW">Baixa</option>
                    </select>
                  </div>

                  <div className={styles.statusContainer}>
                    <strong>Concluir:</strong>
                    <div className={styles.checkboxContainer}>
                      <button
                        type="button"
                        className={`${styles.checkboxButton} ${task.completed ? styles.completed : ''}`}
                        onClick={() => handleStatusChange(task.id, !task.completed)}
                      >
                        {task.completed ? (
                          <FaCheckCircle className={styles.iconSuccess} />
                        ) : (
                          <FaCircle className={styles.iconDanger} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className={styles.actions}>
                  <button
                    className={styles.editButton}
                    onClick={() => handleEditClick(task)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDelete(task.id)}
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
