import React from 'react'
import Login from './pages/login'
import Signup from './pages/signUp'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
    </Routes>
  )
}

export default App
