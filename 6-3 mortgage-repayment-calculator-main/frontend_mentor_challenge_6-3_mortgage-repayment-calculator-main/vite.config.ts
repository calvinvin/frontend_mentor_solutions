import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/frontend_mentor_solutions/6-3 mortgage-repayment-calculator-main/dist/',
})
