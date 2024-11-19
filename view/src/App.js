import React from 'react';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

const App = () => {
  return (
    <div>
      <TodoForm />
      <TodoList />
    </div>
  );
};

export default App;
