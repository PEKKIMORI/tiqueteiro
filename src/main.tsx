import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ReactDOM from 'react-dom/client'
import Room from './pages/room.tsx';
import Pagamento from './pages/pagamento.tsx';
import Adm from './pages/adm.tsx';
import Door from './pages/door.tsx';
import TicketValidation from './pages/validar.tsx';
import ConfirmEmail from './pages/confirmar.tsx';

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
    path: "/pagamento/:ticket",
    element: <Pagamento />
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

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)