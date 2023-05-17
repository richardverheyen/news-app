import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/index.css'

import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

// https://mui.com/material-ui/customization/dark-mode/
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>

    <ThemeProvider theme={darkTheme}>
    <CssBaseline />

     <App />

    </ThemeProvider>
  </React.StrictMode>,
)
