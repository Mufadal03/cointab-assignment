import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'

const Allroutes = () => {
  return (
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/user-details' element={<h1>userDetails</h1>} />
          <Route path='*' element={<h1>404 NOT FOUND</h1>} />
   </Routes>
  )
}

export default Allroutes