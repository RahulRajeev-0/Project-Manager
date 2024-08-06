import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';

const BaseURL = 'http://localhost:8000/';

const EditProjectModal = ({ open, handleClose, project, setRows }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    if (project) {
      setName(project.name);
    }
  }, [project]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSave = async () => {
    const token = localStorage.getItem('access');
    try {
      const response = await axios.put(BaseURL + `project/update/${project.id}/`, { name }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        toast.success('Project Updated!');
        setRows(prevRows => prevRows.map(row => row.id === project.id ? { ...row, name } : row));
        handleClose();
      }
    } catch (error) {
      console.log('Error:', error);
      toast.warning('Something went wrong!');
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Project</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Project Name"
          type="text"
          fullWidth
          value={name}
          onChange={handleNameChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProjectModal;
