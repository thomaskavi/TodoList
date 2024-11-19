import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import api from './api'; // Assuming this is where you manage API calls

const App = () => {
  const [tasks, setTasks] = useState([]);

  // Função para buscar as tarefas da API
  const fetchTasks = async () => {
    try {
      const response = await api.get('/todolist');
      setTasks(response.data); // Atualiza com as tarefas da API
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
    }
  };

  useEffect(() => {
    fetchTasks(); // Chama para carregar as tarefas ao iniciar o app
  }, []);

  // Função para adicionar nova tarefa
  const handleTaskAdded = async (newTask) => {
    try {
      await api.post('/todolist', newTask); // Adiciona a tarefa pela API
      setTasks((prevTasks) => [...prevTasks, newTask]); // Atualiza localmente
    } catch (error) {
      console.error('Erro ao adicionar a tarefa:', error);
    }
  };

  return (
    <div>
      <h1>Lista de Tarefas</h1>
      <TodoForm onTaskAdded={handleTaskAdded} />
      <TodoList tasks={tasks} setTasks={setTasks} />
    </div>
  );
};

export default App;
