import React, { useState } from 'react';
import { TextField, Button, List, ListItem, ListItemText, IconButton, Typography, Checkbox } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import './TodoPage.css';

const TodoPage = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState('');

  const handleAddTodo = () => {
    if (inputValue.trim()) {
      setTodos([...todos, { id: Date.now(), text: inputValue, completed: false }]);
      setInputValue('');
    }
  };

  const handleCompleteTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleEditTodo = (id, text) => {
    setEditId(id);
    setEditValue(text);
  };

  const handleSaveEdit = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, text: editValue } : todo
    ));
    setEditId(null);
    setEditValue('');
  };

  return (
    <div className="todo-container">
      <div className="input-container">
        <TextField 
          label="Add a todo" 
          variant="outlined" 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)} 
          fullWidth
        />
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleAddTodo} 
          className="add-button"
        >
          Add Todo
        </Button>
      </div>
      <section className="todos-section">
        <Typography variant="h5" component="h2" className="section-heading">
          Todos
        </Typography>
        <List>
          {todos.filter(todo => !todo.completed).map(todo => (
            <ListItem key={todo.id} className="todo-item">
              <Checkbox 
                checked={todo.completed} 
                onChange={() => handleCompleteTodo(todo.id)} 
              />
              {editId === todo.id ? (
                <div className="edit-container">
                  <TextField 
                    variant="outlined" 
                    value={editValue} 
                    onChange={(e) => setEditValue(e.target.value)} 
                    fullWidth
                  />
                  <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => handleSaveEdit(todo.id)}
                  >
                    Save
                  </Button>
                </div>
              ) : (
                <>
                  <ListItemText 
                    primary={todo.text} 
                    style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                  />
                  <IconButton onClick={() => handleEditTodo(todo.id, todo.text)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteTodo(todo.id)}>
                    <Delete />
                  </IconButton>
                </>
              )}
            </ListItem>
          ))}
        </List>
      </section>
      <section className="completed-section">
        <Typography variant="h5" component="h2" className="section-heading">
          Completed
        </Typography>
        <List>
          {todos.filter(todo => todo.completed).map(todo => (
            <ListItem key={todo.id} className="todo-item">
              <Checkbox 
                checked={todo.completed} 
                onChange={() => handleCompleteTodo(todo.id)} 
              />
              <ListItemText 
                primary={todo.text} 
                style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
              />
              <IconButton onClick={() => handleDeleteTodo(todo.id)}>
                <Delete />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </section>
    </div>
  );
};

export default TodoPage;
