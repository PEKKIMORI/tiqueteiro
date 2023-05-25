import React from 'react'
import ReactDOM from 'react-dom/client'
import Door from './door.tsx'
import Room from './room.tsx'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Door />
  </React.StrictMode>,
)
