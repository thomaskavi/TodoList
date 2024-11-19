import React from 'react';
import { updateTaskPriority, updateTaskStatus, deleteTask } from '../api'; // Funções de API para atualização

const TodoList = ({ tasks, setTasks }) => {
  const handlePriorityChange = async (id, priority) => {
    try {
      await updateTaskPriority(id, priority);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, priority } : task // Atualizando a prioridade sem usar variável extra
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
          task.id === id ? { ...task, completed } : task // Atualizando o status sem usar variável extra
        )
      );
    } catch (error) {
      console.error('Erro ao atualizar o status:', error);
    }
  };

  // Função para excluir a tarefa
  const handleDelete = async (id) => {
    try {
      await deleteTask(id); // Chama a função de delete
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id)); // Atualiza a lista localmente
    } catch (error) {
      console.error('Erro ao deletar a tarefa:', error);
    }
  };

  return (
    <div>
      <h2>Lista de Tarefas</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}> {/* Garantindo que cada item tem uma chave única */}
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
            <button onClick={() => handleDelete(task.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
