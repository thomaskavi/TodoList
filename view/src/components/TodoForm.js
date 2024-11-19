import React, { useState } from 'react';
import api from '../api';

const TodoForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('MEDIUM');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newTask = { title, description, priority };
      const response = await api.post('/todolist', newTask);
      onTaskAdded(response.data); // Atualiza a lista ao adicionar nova tarefa
      setTitle('');
      setDescription('');
      setPriority('MEDIUM');
    } catch (error) {
      console.error('Erro ao adicionar tarefa:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Título:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Descrição:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>
      <div>
        <label>Prioridade:</label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="HIGH">Alta</option>
          <option value="MEDIUM">Média</option>
          <option value="LOW">Baixa</option>
        </select>
      </div>
      <button type="submit">Adicionar Tarefa</button>
    </form>
  );
};

export default TodoForm;
