import React, { useState, useEffect } from 'react';
import api from '../api';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);

  // Buscar tarefas ao carregar o componente
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get('/todolist');
        setTasks(response.data); // Supondo que a API retorna um array de tarefas
      } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
      }
    };

    fetchTasks();
  }, []);

  // Atualizar a prioridade da tarefa
  const updatePriority = async (id, priority) => {
    try {
      const response = await api.patch(`/todolist/${id}/priority`, { priority });
      console.log(`Prioridade atualizada:`, response.data);
      // Atualize as tarefas no estado
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, priority } : task
        )
      );
    } catch (error) {
      console.error('Erro ao atualizar a prioridade:', error);
    }
  };

  // Atualizar o status da tarefa
  const updateStatus = async (id, completed) => {
    try {
      const response = await api.patch(`/todolist/${id}/status`, { completed });
      console.log(`Status atualizado:`, response.data);
      // Atualize as tarefas no estado
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, completed } : task
        )
      );
    } catch (error) {
      console.error('Erro ao atualizar o status:', error);
    }
  };

  return (
    <div>
      <h1>Lista de Tarefas</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <div>
              <strong>Prioridade:</strong>
              <select
                value={task.priority}
                onChange={(e) => updatePriority(task.id, e.target.value)}
              >
                <option value="HIGH">Alta</option>
                <option value="MEDIUM">Média</option>
                <option value="LOW">Baixa</option>
              </select>
            </div>
            <div>
              <strong>Status:</strong>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={(e) => updateStatus(task.id, e.target.checked)}
              />
              {task.completed ? 'Concluído' : 'Pendente'}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
