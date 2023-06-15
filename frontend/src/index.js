import React from 'react'
//import ReactDOM from 'react-dom/client'
import ReactDOM from 'react-dom';
import './index.css'
//import App from './App'
import reportWebVitals from './reportWebVitals'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Trapper from './components/Trap/Manage_Traps';
import Login from './components/Login_Signup/login.component'
import SignUp from './components/Login_Signup/signup.component'
import { AuthProvider } from './components/Login_Signup/AuthContext';
import Appbee from './App_bee';
import MapTrap from './components/carte/carte_3'
import Logout from './components/Login_Signup/Lougout'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Appbee/>,
  },
  {
    path: "/trap",
    element: <Trapper/>,
  },
  {
    path: "/sign-in",
    element: <Login/>,
  },
  {
    path: "/sign-up",
    element: <SignUp/>,
  },
  {
    path: "/maptrap",
    element: <MapTrap/>,
  },
  {
    path: "/logout",
    element: <Logout/>,
  },
]);

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
