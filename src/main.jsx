import React from 'react'
import ReactDOM from 'react-dom/client'
import DeatialPage from './routes/Datail.jsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import App from './App.jsx'
import Login from './routes/login.jsx'
import Create from './routes/CreateUser.jsx'
import Profile from './routes/Profile.jsx'

import Cart from './routes/Cart.jsx'
import './index.css'
const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    errorElement :<App/> 
  },
  {
    path:'/Phone/:id',
    element:<DeatialPage/>,
    errorElement :<App/>,
  },
  {
    path:'/login',
    element : <Login/>,
    errorElement :<App/>
  },{
    path:'/cart',
    element : <Cart/>,
    errorElement :<App/>
  },
  {
    path:'/create',
    element : <Create/>,
    errorElement : <App/>
  },{
    path : '/profile',
    element : <Profile/>
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
    <RouterProvider router={router}></RouterProvider>

    
    
  </React.StrictMode>,
)
