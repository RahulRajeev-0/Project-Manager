import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import './App.css'

// pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import HomePage from './pages/home/HomePage';

// alert
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// private route
import PrivateRoute from './utils/PrivateRoutes';
function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/register' element={<RegisterPage/>} />

          {/* private routes */}
          <Route element={<PrivateRoute/>} >

              <Route path='/' element={<HomePage/>  } />

          </Route>
         
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={10000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition: Bounce
      />
    </>
  )
}

export default App
