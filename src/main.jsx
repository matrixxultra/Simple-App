import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import EquipmentsSlice from './redux/EquipmentsSlice.js'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Detail from './pages/Detail.jsx'
import NavBar from './pages/NavBar.jsx'

const store = configureStore({
  reducer : EquipmentsSlice
})
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    
    <BrowserRouter>
    <NavBar/>
     
     <Routes>
      <Route path='/' element={<App/>}></Route>
      <Route path='/details/:id' element={<Detail/>}></Route>
     </Routes>
    </BrowserRouter>
    </Provider>
    
  </React.StrictMode>,
)
