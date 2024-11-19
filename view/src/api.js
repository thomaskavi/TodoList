import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api', // Substitua pela URL da sua API
});

// Função para atualizar a prioridade de uma tarefa
export const updateTaskPriority = async (id, priority) => {
  try {
    const response = await api.patch(`/todolist/${id}/priority`, { priority });
    return response.data; // Retorna os dados da tarefa atualizada
  } catch (error) {
    console.error('Erro ao atualizar prioridade da tarefa:', error);
    throw error; // Lança o erro para ser tratado no componente
  }
};

// Função para atualizar o status de uma tarefa
export const updateTaskStatus = async (id, completed) => {
  try {
    const response = await api.patch(`/todolist/${id}/status`, { completed });
    return response.data; // Retorna os dados da tarefa atualizada
  } catch (error) {
    console.error('Erro ao atualizar status da tarefa:', error);
    throw error; // Lança o erro para ser tratado no componente
  }
};

export const fetchTasks = async () => {
  try {
    const response = await api.get('/todolist');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar tarefas', error);
    throw error;
  }
};
export default api;
