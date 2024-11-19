import React, { useState } from 'react';
import { updateTaskPriority, updateTaskStatus, deleteTask, updateTask } from '../api'; // Funções de API para atualização

const TodoList = ({ tasks, setTasks }) => {
  const [editingTaskId, setEditingTaskId] = useState(null); // Para controlar qual tarefa está sendo editada
  const [updatedTask, setUpdatedTask] = useState({
    title: '',
    description: '',
    priority: 'LOW',
    completed: false,
  });

  // Função para editar a tarefa
  const handleEditClick = (task) => {
    setEditingTaskId(task.id); // Ativa a edição da tarefa
    setUpdatedTask({ ...task }); // Preenche os campos com os dados atuais da tarefa
  };

  // Função para cancelar a edição
  const handleCancelEdit = () => {
    setEditingTaskId(null); // Desativa o modo de edição
  };

  // Função para salvar as alterações
  const handleSaveEdit = async (id) => {
    try {
      await updateTask(id, updatedTask); // Chama a API para salvar as mudanças
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, ...updatedTask } : task // Atualiza a tarefa no estado local
        )
      );
      setEditingTaskId(null); // Desativa o modo de edição
    } catch (error) {
      console.error('Erro ao editar a tarefa:', error);
    }
  };

  const handlePriorityChange = async (id, priority) => {
    try {
      await updateTaskPriority(id, priority);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, priority } : task // Atualizando a prioridade
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
          task.id === id ? { ...task, completed } : task // Atualizando o status
        )
      );
    } catch (error) {
      console.error('Erro ao atualizar o status:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id); // Chama a função de delete
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id)); // Atualiza a lista localmente
    } catch (error) {
      console.error('Erro ao deletar a tarefa:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTask((prev) => ({
      ...prev,
      [name]: value, // Atualiza o campo sendo editado
    }));
  };

  return (
    <div>
      <h2>Lista de Tarefas</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {editingTaskId === task.id ? (
              // Campos de edição
              <div>
                <input
                  type="text"
                  name="title"
                  value={updatedTask.title}
                  onChange={handleInputChange}
                />
                <textarea
                  name="description"
                  value={updatedTask.description}
                  onChange={handleInputChange}
                />
                <button onClick={() => handleSaveEdit(task.id)}>Salvar</button>
                <button onClick={handleCancelEdit}>Cancelar</button>
              </div>
            ) : (
              // Exibe as informações da tarefa
              <div>
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
                <button onClick={() => handleEditClick(task)}>Editar</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
