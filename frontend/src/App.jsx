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
      <Route path='/index.html' element={ <HomePage /> } />
      <Route path='/prompt' element={ <PromptPage />} />
      <Route path='*' element={ <div><b>404 Not Found</b></div> } />
    </Route>
  )
)


function App() {
  return (
    <RouterProvider router={router} />
  )


}



export default App
