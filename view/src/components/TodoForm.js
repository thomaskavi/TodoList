import React, { useState } from 'react';
import styles from './TodoForm.module.css'; // Importando os estilos

// TodoForm.js

const TodoForm = ({ addTask }) => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    priority: 'LOW',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!task.title || !task.description) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    addTask(task); // Chama a função passada como prop
    setTask({
      title: '',
      description: '',
      priority: 'LOW',
    });
    setError('');
  };

  return (
    <div className={styles.TodoForm_container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>Adicionar Tarefa</h2>

        <input
          type="text"
          name="title"
          className={styles.input}
          value={task.title}
          onChange={handleChange}
          placeholder="Título da tarefa"
        />

        <textarea
          name="description"
          className={styles.textarea}
          value={task.description}
          onChange={handleChange}
          placeholder="Descrição da tarefa"
        />

        <select
          name="priority"
          className={styles.select}
          value={task.priority}
          onChange={handleChange}
        >
          <option value="HIGH">Alta</option>
          <option value="MEDIUM">Média</option>
          <option value="LOW">Baixa</option>
        </select>

        {error && <p className={styles.errorMessage}>{error}</p>}

        <button type="submit" className={styles.button}>
          Adicionar Tarefa
        </button>
        <button
          type="button"
          className={`${styles.button} ${styles.cancelButton}`}
          onClick={() => setTask({ title: '', description: '', priority: 'LOW' })}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
};


export default TodoForm;
