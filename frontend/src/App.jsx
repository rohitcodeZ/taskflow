import { useState } from 'react'
import NavBar from './compontents/NavBar'
import { Routes,Route } from 'react-router-dom'
import Add from './compontents/Add'
import List from './compontents/List'
import UpdateTask from './compontents/UpdateTask'

function App() {
  

  return (
   <>
   <NavBar/>
   <Routes>
    <Route path='/' element={<List/>}/>
    <Route path='/add' element={<Add/>}/>
    <Route path='/update/:id' element={<UpdateTask/>}/>
   </Routes>
   </>
  )
}

export default App
