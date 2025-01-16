import { useState } from 'react'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom'

import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import PromptPage from './pages/PromptPage'

import './App.css'



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainLayout/>}>
      <Route index element={ <HomePage /> }/>
      <Route path='/prompt' element={ <PromptPage />} />
    </Route>
  )
)


function App() {
  return (
    <RouterProvider router={router} />
  )


}



export default App
