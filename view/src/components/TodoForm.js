import React, { useState } from 'react';

const TodoForm = ({ onTaskAdded }) => {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newTaskTitle.trim() === '') return; // Verifica se o título não está vazio

    const newTask = {
      title: newTaskTitle,
      description: newTaskDescription,
      priority: 'LOW', // Valor inicial de prioridade
      completed: false, // Tarefa não concluída inicialmente
    };

    try {
      await onTaskAdded(newTask);  // Adiciona a tarefa
      setNewTaskTitle('');  // Limpa o campo do título
      setNewTaskDescription('');  // Limpa o campo da descrição
    } catch (error) {
      console.error('Erro ao adicionar a tarefa:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
        placeholder="Título da tarefa"
        required
      />
      <textarea
        value={newTaskDescription}
        onChange={(e) => setNewTaskDescription(e.target.value)}
        placeholder="Descrição da tarefa"
      />
      <button type="submit">Adicionar Tarefa</button>
    </form>
  );
};

export default TodoForm;
