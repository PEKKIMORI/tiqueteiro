import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   host: '31.220.31.254',
  //   // https: {
  //   //   key: '/etc/letsencrypt/live/tiqueteiro-etec.shop/privkey.pem',
  //   //   cert: '/etc/letsencrypt/live/tiqueteiro-etec.shop/fullchain.pem',
  //   // },
  // }
})
