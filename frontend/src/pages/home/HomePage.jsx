import React, {useState, useEffect} from 'react'
import axios from 'axios'

// import components
import Navbar from '../../components/home/Navbar'
import DataTable from '../../components/home/ProjectList'



const HomePage = () => {

  const [rows, setRows] = useState([])
  const BaseURL = 'http://localhost:8000/';


  // for formating date 
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${year} - ${month} - ${day}`;
  };

  // fatch project function that fatches all projects 
  const fatchProjects = async ()=>{
    const token = localStorage.getItem('access')
    const response = await axios.get(BaseURL + 'project/', {
      headers: {
        'Authorization': `Bearer ${token}` // Include the token in the headers
      }
    });

    const formattedData = response.data.map((project, index) => ({
      ...project,
      index: index + 1, // Adding sequential number
      created_at: formatDate(project.created_at),
      updated_at: formatDate(project.updated_at),
    }));
    setRows(formattedData);
  }
  useEffect(()=>{
    fatchProjects()
  },[])


  return (
    <div>
      <Navbar fatchProjects={fatchProjects}/>
      <div style={{ marginTop: '30px' }}>

      <DataTable rows={rows} setRows={setRows}/>
      </div>
    </div>
  )
}

export default HomePage
