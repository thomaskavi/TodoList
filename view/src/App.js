import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './App.module.css'; // Importação do CSS Module
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import api from './api'; // Supondo que você tem uma configuração da API

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');

  // Função para buscar as tarefas da API
  const fetchTasks = async () => {
    try {
      const response = await api.get('/todolist');
      setTasks(response.data);
    } catch (error) {
      setError('Erro ao carregar as tarefas.');
    }
  };

  useEffect(() => {
    fetchTasks(); // Carrega as tarefas ao iniciar
  }, []);

  // Função para adicionar nova tarefa
  const handleTaskAdded = async (newTask) => {
    try {
      const createdTask = await api.post('/todolist', newTask); // Cria tarefa na API
      setTasks((prevTasks) => [...prevTasks, createdTask.data]); // Atualiza localmente
    } catch (error) {
      setError('Erro ao adicionar a tarefa.');
    }
  };

  return (
    <div className={styles.container}> {/* Usando a classe 'container' do CSS Module */}
      <div className={styles.row}> {/* Substituindo as classes globais por estilos locais */}
        <div className={styles.col}> {/* Usando CSS Module em vez de col-md-8 */}
          {/* Exibir erro caso ocorra */}
          {error && (
            <div className={`alert alert-danger ${styles.alert}`}>{error}</div>
          )}

          {/* Formulário para adicionar tarefas */}
          <TodoForm addTask={handleTaskAdded} />

          {/* Lista de tarefas */}
          <div className={styles.todoListWrapper}>
            <TodoList tasks={tasks} setTasks={setTasks} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
