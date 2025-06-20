import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ReactDOM from 'react-dom/client'
import './css/global.css'
import Room from './pages/room.tsx';
// import Adm from './pages/adm.tsx';
import Door from './pages/door.tsx';
import TicketValidation from './pages/validar.tsx';
import ConfirmEmail from './pages/confirmar.tsx';
import Adm from './pages/adm.tsx';
import { Toaster } from 'react-hot-toast';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Door />
  },
  {
    path: "/room",
    element: <Room />
  },
  {
    path: "/adm",
    element: <Adm />
  },
  {
    path: "/validar",
    element: <TicketValidation/>
  },
  {
    path: "/confirmar-email/:token",
    element: <ConfirmEmail/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Toaster />
    <RouterProvider router={router} />
  </React.StrictMode>,
)