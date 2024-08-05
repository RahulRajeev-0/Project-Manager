import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';

// Define your columns
const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'projectName', headerName: 'Project Name', width: 300 },
  { field: 'createDate', headerName: 'Create Date', type: 'Date', width: 200 },
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

// Example rows data
const rows = [
  { id: 1, projectName: 'Project A', createDate: '2024-01-01' },
  { id: 2, projectName: 'Project B', createDate: '2024-01-02' },
  { id: 3, projectName: 'Project C', createDate: '2024-01-03' },
  { id: 4, projectName: 'Project D', createDate: '2024-01-04' },
  { id: 5, projectName: 'Project E', createDate: '2024-01-05' },
];

export default function DataTable() {
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
