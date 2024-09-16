import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignIn from './pages/auth/SignIn'
import SignUp from './pages/auth/SignUp'
import PrivateRoute from './guards/PrivateRoutes'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/sign_in' element={<SignIn />} />
        <Route path='/sign_up' element={<SignUp />} />
        <Route path='/reset_password' element={<SignUp />} />
        <Route path='/' element={<PrivateRoute> Hello World </PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
