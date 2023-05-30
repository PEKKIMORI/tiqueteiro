import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ReactDOM from 'react-dom/client'
import Login from './pages/door.tsx'
import Room from './pages/room.tsx';
import Poggerspagamenteiro from './pages/pagamento.tsx';
import Adm from './pages/adm.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/room",
    element: <Room />
  },
  {
    path: "/pagamento",
    element: <Poggerspagamenteiro />
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