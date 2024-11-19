import React from 'react';
import { updateTaskPriority, updateTaskStatus } from '../api'; // Funções de API para atualização

const TodoList = ({ tasks, setTasks }) => {
  const handlePriorityChange = async (id, priority) => {
    try {
      // Envia a alteração da prioridade para a API
      await updateTaskPriority(id, priority);

      // Atualiza o estado local da tarefa com a nova prioridade
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === id ? { ...task, priority } : task))
      );
    } catch (error) {
      console.error('Erro ao atualizar a prioridade:', error);
    }
  };

  const handleStatusChange = async (id, completed) => {
    try {
      // Envia a alteração do status para a API
      await updateTaskStatus(id, completed);

      // Atualiza o estado local da tarefa com o novo status
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === id ? { ...task, completed } : task))
      );
    } catch (error) {
      console.error('Erro ao atualizar o status:', error);
    }
  };

  return (
    <div>
      <h2>Lista de Tarefas</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <div>
              <strong>Prioridade:</strong>
              <select
                value={task.priority}
                onChange={(e) => handlePriorityChange(task.id, e.target.value)}
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
                onChange={(e) => handleStatusChange(task.id, e.target.checked)}
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
