import * as React from 'react';
import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';

const BaseURL = 'http://localhost:8000/';

export default function DataTable({ rows, setRows }) {

  const deleteProject = async (id) => {
    const token = localStorage.getItem('access');
    console.log(`Attempting to delete project with id: ${id}`);
    try {
      const response = await axios.delete(BaseURL + `project/delete/${id}/`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('Response:', response);
      if (response.status === 204) {
        toast.success('Project Deleted!');
        setRows(prevRows => prevRows.filter(row => row.id !== id));
      }
    } catch (error) {
      console.log('Error:', error);
      toast.warning('Something went wrong!');
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Project Name', width: 300 },
    { field: 'created_at', headerName: 'Create Date', type: 'Date', width: 200 },
    {
      field: 'editName',
      headerName: 'Edit Name',
      width: 200,
      renderCell: (params) => (
        <Button variant="outlined" color="primary">
          Edit
        </Button>
      ),
    },
    {
      field: 'deleteProject',
      headerName: 'Delete Project',
      width: 200,
      renderCell: (params) => (
        <Button variant="contained" color="error" onClick={() => deleteProject(params.row.id)}>
          Delete
        </Button>
      ),
    },
    {
      field: 'logIntoProject',
      headerName: 'Log into Project',
      width: 200,
      renderCell: (params) => (
        <Button variant="contained" color="success">
          Log In
        </Button>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        sx={{
          '& .MuiDataGrid-cell': {
            color: 'white', // Change text color to white
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            // color: 'white', // Change header text color to white
          },
          '& .MuiPaginationItem-root': {
            backgroundColor: 'white'
            // color: 'white', // Change pagination item text color to white
          },
        }}
      />
    </div>
  );
}
