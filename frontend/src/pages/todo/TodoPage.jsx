import React, { useState, useEffect } from 'react';
import { TextField, Button, List, ListItem, ListItemText, IconButton, Typography, Checkbox } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import axios from 'axios';
import './TodoPage.css';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';



const TodoPage = () => {
  const navigate = useNavigate();
  const { project_id } = useParams();
  const { project_name } = useParams();
  const BaseURL = 'http://localhost:8000/';
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState('');
  const token = localStorage.getItem('access');
  const gitToken = import.meta.env.VITE_API_GIT_TOKEN;

  // Fetching todos
  const fetchTodos = async () => {
    try {
      const response = await axios.get(BaseURL + `project/${project_id}/todos/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAddTodo = async () => {
    if (inputValue.trim()) {
      try {
        const response = await axios.post(
          `${BaseURL}project/${project_id}/todos/create/`, 
          { title: inputValue, project: project_id }, // Ensure the key matches your API's expected key
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
        setTodos([...todos, response.data]);
        setInputValue('');
      } catch (error) {
        console.error('Error adding todo:', error);
      }
    }
  };

  const handleCompleteTodo = async (id) => {
    try {
      const response = await axios.patch(BaseURL + `project/todos/${id}/complete/`, {},
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      setTodos(todos.map(todo =>
        todo.id === id ? { ...todo, status: response.data.status } : todo
      ));
    } catch (error) {
      console.error('Error completing todo:', error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(BaseURL + `project/todos/${id}/delete/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleEditTodo = (id, title) => {
    setEditId(id);
    setEditValue(title);
  };

  const handleSaveEdit = async (id) => {
    try {
      const response = await axios.patch(BaseURL + `project/todos/${id}/update/`, { title: editValue },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      setTodos(todos.map(todo =>
        todo.id === id ? { ...todo, title: response.data.title } : todo
      ));
      setEditId(null);
      setEditValue('');
    } catch (error) {
      console.error('Error saving todo edit:', error);
    }
  };

  const handleNavigateBack = () => {
    navigate('/');
  };

  const handleCreateGist = async () => {
    try {
      // Generate project summary in markdown format
      const projectTitle = `${project_name}`
      const completedTodos = todos.filter(todo => todo.status === 'completed').length;
      const totalTodos = todos.length;
  
      const summary = `# ${projectTitle}\n\n`
        + `## Summary: ${completedTodos} / ${totalTodos} completed\n\n`
        + `### Pending Todos\n`
        + todos.filter(todo => todo.status !== 'completed')
          .map(todo => `- [ ] ${todo.title}`)
          .join('\n') + `\n\n`
        + `### Completed Todos\n`
        + todos.filter(todo => todo.status === 'completed')
          .map(todo => `- [x] ${todo.title}`)
          .join('\n');
  
      const response = await axios.post(
        'https://api.github.com/gists',
        {
          files: {
            [`${projectTitle}.md`]: {
              content: summary
            }
          },
          description: `Todos for project ${project_id}`,
          public: false // Secret gist
        },
        {
          headers: {
            'Authorization': `Bearer ${gitToken}`, // Replace with your GitHub access token
            'Content-Type': 'application/json'
          }
        }
      );
     
      window.open(response.data.html_url, '_blank');
    } catch (error) {
      toast.error('Something went wrong')
    }
  };

  return (
    <div className="todo-container">
      <Typography variant="h4">{project_name} Todos</Typography>
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
          {todos.filter(todo => todo.status !== 'completed').map(todo => (
            <ListItem key={todo.id} className="todo-item">
              <Checkbox
                checked={todo.status === 'completed'}
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
                    primary={todo.title}
                    style={{ textDecoration: todo.status === 'completed' ? 'line-through' : 'none' }}
                  />
                  <IconButton onClick={() => handleEditTodo(todo.id, todo.title)}>
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
          {todos.filter(todo => todo.status === 'completed').map(todo => (
            <ListItem key={todo.id} className="todo-item">
              <Checkbox
                checked={todo.status === 'completed'}
                onChange={() => handleCompleteTodo(todo.id)}
              />
              <ListItemText
                primary={todo.title}
                style={{ textDecoration: todo.status === 'completed' ? 'line-through' : 'none' }}
              />
              <IconButton onClick={() => handleDeleteTodo(todo.id)}>
                <Delete />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </section>
      <div className="button-container">
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleNavigateBack}
          className="back-button"
        >
          Back to Projects
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleCreateGist}
          className="gist-button"
        >
          Create Gist
        </Button>
      </div>
    </div>
  );
};

export default TodoPage;
