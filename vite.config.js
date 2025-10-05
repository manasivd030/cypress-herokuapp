// Import Vite's defineConfig helper
import { defineConfig } from 'vite'
// Bring in the React plugin so JSX/TSX just works
import react from '@vitejs/plugin-react'

// Export the config object
export default defineConfig({
  plugins: [
    // Enable React fast refresh / JSX transform
    react()
  ]
})