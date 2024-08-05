import React from 'react'

// import components
import Navbar from '../../components/home/Navbar'
import DataTable from '../../components/home/ProjectList'
const HomePage = () => {
  return (
    <div>
      <Navbar/>
      <div style={{ marginTop: '20px' }}>

      <DataTable/>
      </div>
    </div>
  )
}

export default HomePage
