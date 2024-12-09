# TodoList FullStack 📝
Uma aplicação de gerenciamento de tarefas desenvolvida com Java 17, Spring Boot, ReactJS e H2 Database.

## 🎥 Demonstração
![Fullstack demo](assets/demo-project-todolist.gif)

### Descrição
O projeto TodoList FullStack permite criar, editar, atualizar status, alterar prioridades e excluir tarefas de maneira intuitiva. Foi desenvolvido para praticar integração entre backend e frontend, além de implementar boas práticas no desenvolvimento de APIs RESTful e interfaces interativas.

## Tecnologias Utilizadas
#### Backend
- Java 17
- Spring Boot
- H2 Database
- Spring Data JPA
- API RESTful
#### Frontend
- ReactJS
- CSS
- Axios (para integração com a API)

## Funcionalidades
#### Gerenciamento de Tarefas:
- Adicionar novas tarefas.
- Editar o nome de tarefas existentes.
- Alterar a prioridade (Alta, Média, Baixa).
- Atualizar o status (Pendente, Concluída).
- Excluir tarefas.
- Registro de Data:
- Data de criação da tarefa.
- Data de conclusão da tarefa (quando finalizada).

## Como Rodar o Projeto
#### Pré-requisitos
- Java 17 ou superior.
- Node.js (versão recomendada: 18.x ou superior).
#### Passos para Executar o Backend
1 - Clone o repositório 
```
git clone https://github.com/thomaskavi/TodoList-FullStack.git
cd TodoList-FullStack/backend
```
2 - Compile o backend com:
```
./mvnw spring-boot:run
```
3 - Acesse o console H2 para visualizar os dados em memória:
- URL: http://localhost:8080/h2-console
- JDBC URL: jdbc:h2:mem:testdb
- Username: sa
- Password: (deixe vazio).
#### Passos para Executar o Frontend
1 - Acesse a pasta do backend
```
cd ../view
```
2 - Instale as dependências necessárias para o frontend:
```
npm install
```
3 - Inicie o servidor de desenvolvimento:
```
npm start
```
4 - Após iniciar, acesse a aplicação no navegador:
- URL: http://localhost:3000.


