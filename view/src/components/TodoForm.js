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
      // Chama a função que veio como prop para adicionar a tarefa
      await onTaskAdded(newTask);

      // Limpa os campos após a adição
      setNewTaskTitle('');
      setNewTaskDescription('');
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
