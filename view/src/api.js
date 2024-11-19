import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
});

export const createTask = async (task) => {
  try {
    const response = await api.post('/todolist', task); // Supondo que o POST cria a tarefa
    return response.data; // Isso deve incluir o 'id' gerado pelo backend
  } catch (error) {
    console.error('Erro ao adicionar a tarefa:', error);
    throw error;
  }
};

export const updateTaskPriority = async (id, priority) => {
  try {
    const response = await api.patch(`/todolist/${id}/priority`, { priority });
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar prioridade da tarefa:', error);
    throw error;
  }
};

export const updateTaskStatus = async (id, completed) => {
  try {
    const response = await api.patch(`/todolist/${id}/status`, { completed });
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar status da tarefa:', error);
    throw error;
  }
};

// Função para deletar uma tarefa
export const deleteTask = async (id) => {
  try {
    const response = await api.delete(`/todolist/${id}`);
    return response.data; // A resposta pode ser usada caso você precise de alguma confirmação
  } catch (error) {
    console.error('Erro ao deletar a tarefa:', error);
    throw error;
  }
};

export default api;
