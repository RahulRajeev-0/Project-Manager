import * as React from 'react';
import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';

import LogoutIcon from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';




function Navbar({fatchProjects}) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);
  const [projectName, setProjectName] = React.useState('');
  const navigate = useNavigate()
  const BaseURL = 'http://localhost:8000/';

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // logout function 
  const logout = ()=> {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    navigate('/login')

  }
  // create new project 
  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData()
    formData.append('name', projectName)
    const token = localStorage.getItem('access')
    
    const response = await axios.post(BaseURL + 'project/create/', formData, {headers:{
       'Authorization': `Bearer ${token}`,
       'Content-Type': 'application/json'
    }})

    if (response.status == 201){
      toast.success("Project Created !")
      fatchProjects()
      setProjectName("")

    }

    console.log(response);
    console.log('Project Name:', projectName);
    
    handleCloseModal();
  };

  return (
    <>
      <AppBar position="static" sx={{
        backgroundColor:'#3f51b5',
        borderRadius: '8px',
        }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Project Manager
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                <MenuItem onClick={handleOpenModal}>
                  <Typography textAlign="center">Start Project</Typography>
                </MenuItem>
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Project Manager
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button
                color='secondary'
                variant='contained'
                onClick={handleOpenModal}
              >
                Start Project
              </Button>
              
            </Box>

            <Box sx={{ flexGrow: 0 }}>
            <IconButton aria-label="logout" onClick={logout} size="small" sx={{ color: 'black' }}>
                  <LogoutIcon fontSize="large" fontColor='white' />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>


      {/* Modal for creating new project  */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Create Project</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Project Name"
            type="text"
            fullWidth
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button onClick={(e)=>{handleSubmit(e)}}>Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Navbar;
