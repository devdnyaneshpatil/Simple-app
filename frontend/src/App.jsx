import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Signup from './Pages/Signup'
import HomePage from './Pages/HomePage'
import Login from './Pages/Login.Jsx'
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  return (
    <>
      <Routes>
        <Route path='/sign-up' Component={Signup} />
        <Route path='/' Component={Login} />
        <Route path='/home' Component={HomePage}/>
      </Routes>
    </>
  )
}

export default App
