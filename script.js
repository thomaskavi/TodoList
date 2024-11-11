const backendUrl = 'http://localhost:8080/api/todolist';

// Função para formatar a data
function formatDate(dateString) {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
  const date = new Date(dateString);
  return date.toLocaleString('pt-BR', options);
}

// Função para exibir as tarefas na tabela
async function fetchTodos() {
  try {
    const response = await fetch(backendUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      const todos = await response.json();
      const tableBody = document.getElementById('todoTable').getElementsByTagName('tbody')[0];
      tableBody.innerHTML = ''; // Limpa a tabela antes de preencher

      todos.forEach(todo => {
        const row = document.createElement('tr');
        row.classList.add(todo.concluida ? 'completed' : 'not-completed');

        // Converte as datas para o formato legível
        const createdAt = todo.createdAt ? formatDate(todo.createdAt) : 'Data inválida';
        const concludedAt = todo.concluida && todo.concludedAt ? formatDate(todo.concludedAt) : 'Ainda não concluída';

        row.innerHTML = `
          <td>${todo.titulo}</td>
          <td>${todo.descricao}</td>
          <td>${todo.priority}</td>
          <td>${todo.concluida ? 'Concluída' : 'Pendente'}</td>
          <td>${createdAt}</td>
          <td>${concludedAt}</td>
          <td>
            <button onclick="toggleConcluida(${todo.id}, ${todo.concluida})">
              ${todo.concluida ? 'Desmarcar' : 'Concluir'}
            </button>
            <button onclick="editTodo(${todo.id})">Editar</button>
            <button onclick="deleteTodo(${todo.id})">Excluir</button>
          </td>
        `;

        tableBody.appendChild(row);
      });
    } else {
      console.error('Erro ao buscar tarefas:', response.status);
    }
  } catch (error) {
    console.error('Erro ao conectar com o backend:', error);
  }
}

// Função para adicionar uma nova tarefa
async function addTodo(titulo, descricao, priority) {
  const newTodo = {
    titulo,
    descricao,
    concluida: false,
    priority,
    createdAt: new Date().toISOString(), // Adiciona a data de criação
    concludedAt: null // Inicialmente não tem data de conclusão
  };

  try {
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTodo)
    });

    if (response.ok) {
      alert('Tarefa adicionada com sucesso!');
      fetchTodos(); // Atualiza a lista de tarefas
    } else {
      console.error('Erro ao adicionar a tarefa:', response.status);
      alert('Erro ao adicionar a tarefa.');
    }
  } catch (error) {
    console.error('Erro ao conectar com o backend:', error);
    alert('Erro ao conectar com o servidor.');
  }
}

// Função para editar uma tarefa
async function editTodo(id) {
  if (isNaN(id)) {
    alert('ID inválido');
    return;
  }

  try {
    const response = await fetch(`${backendUrl}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      const todo = await response.json();

      // Preencher o formulário de edição com os dados da tarefa
      document.getElementById('editId').value = todo.id;
      document.getElementById('editTitulo').value = todo.titulo;
      document.getElementById('editDescricao').value = todo.descricao;
      document.getElementById('editPriority').value = todo.priority;

      // Exibir o formulário de edição
      document.getElementById('todoForm').style.display = 'none';
      document.getElementById('editForm').style.display = 'block';
    } else {
      console.error('Erro ao buscar tarefa:', response.status);
    }
  } catch (error) {
    console.error('Erro ao conectar com o backend:', error);
  }
}

// Função para salvar a edição
document.getElementById('editForm').addEventListener('submit', async function (e) {
  e.preventDefault(); // Evitar recarregar a página

  const id = document.getElementById('editId').value;
  const titulo = document.getElementById('editTitulo').value;
  const descricao = document.getElementById('editDescricao').value;
  const priority = document.getElementById('editPriority').value;

  const updatedTodo = {
    titulo,
    descricao,
    priority
  };

  try {
    const response = await fetch(`${backendUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedTodo)
    });

    if (response.ok) {
      alert('Tarefa atualizada com sucesso!');
      fetchTodos(); // Atualiza a lista de tarefas

      // Oculta o formulário de edição e exibe o de adição novamente
      document.getElementById('editForm').style.display = 'none';
      document.getElementById('todoForm').style.display = 'block';
    } else {
      console.error('Erro ao atualizar a tarefa:', response.status);
      alert('Erro ao atualizar a tarefa.');
    }
  } catch (error) {
    console.error('Erro ao conectar com o backend:', error);
    alert('Erro ao conectar com o servidor.');
  }
});

// Função para excluir uma tarefa
async function deleteTodo(id) {
  if (isNaN(id)) {
    alert('ID inválido');
    return;
  }

  try {
    const response = await fetch(`${backendUrl}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      alert('Tarefa excluída com sucesso!');
      fetchTodos(); // Atualiza a lista de tarefas
    } else {
      console.error('Erro ao excluir tarefa:', response.status);
      alert('Erro ao excluir tarefa.');
    }
  } catch (error) {
    console.error('Erro ao conectar com o backend:', error);
    alert('Erro ao conectar com o servidor.');
  }
}

// Função para marcar ou desmarcar uma tarefa como concluída
async function toggleConcluida(id, concluida) {
  const updatedTodo = {
    concluida: !concluida,
    concludedAt: !concluida ? new Date().toISOString() : null
  };

  try {
    const response = await fetch(`${backendUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedTodo)
    });

    if (response.ok) {
      fetchTodos(); // Atualiza a lista de tarefas
    } else {
      console.error('Erro ao atualizar status da tarefa:', response.status);
    }
  } catch (error) {
    console.error('Erro ao conectar com o backend:', error);
  }
}

// Função para cancelar a edição
document.getElementById('cancelEdit').addEventListener('click', function () {
  document.getElementById('editForm').style.display = 'none';
  document.getElementById('todoForm').style.display = 'block';
});

// Adiciona o evento de submit para o formulário de adicionar tarefa
document.getElementById('todoForm').addEventListener('submit', function (e) {
  e.preventDefault(); // Evita recarregar a página

  const titulo = document.getElementById('titulo').value;
  const descricao = document.getElementById('descricao').value;
  const priority = document.getElementById('priority').value;

  addTodo(titulo, descricao, priority);

  // Limpar os campos após adicionar
  document.getElementById('titulo').value = '';
  document.getElementById('descricao').value = '';
});

// Inicializa a lista de tarefas quando a página carrega
fetchTodos();
