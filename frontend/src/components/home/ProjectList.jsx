import * as React from 'react';
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import axios from 'axios'

// Define your columns
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
      <Button variant="contained" color="error">
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



export default function DataTable() {

  const [rows, setRows] = useState([])
  const BaseURL = 'http://localhost:8000/';


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day} - ${month} - ${year}`;
  };

  // fatch project function that fatches all projects 
  const fatchProjects = async ()=>{
    const token = localStorage.getItem('access')
    const response = await axios.get(BaseURL + 'project/', {
      headers: {
        'Authorization': `Bearer ${token}` // Include the token in the headers
      }
    });
    const formattedData = response.data.map(project => ({
      ...project,
      created_at: formatDate(project.created_at),
      updated_at: formatDate(project.updated_at),
    }));
    setRows(formattedData);
  }
  useEffect(()=>{
    fatchProjects()
  },[])



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
            backgroundColor:'white'
            // color: 'white', // Change pagination item text color to white
          },
        }}
      />
    </div>
  );
}
