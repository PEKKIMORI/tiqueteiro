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
    path: "/pagamento",
    element: <Pagamento />
  },
  {
    path: "/adm",
    element: <Adm />
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)