import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
// import '@szhsin/react-menu/dist/index.css';
// import '@szhsin/react-menu/dist/transitions/slide.css';

import { GlobalStyles } from "./styles/GlobalStyles"
import { defaultTheme } from './styles/themes/default'

import Router from './routes'

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <GlobalStyles />
        <Router />
        <ToastContainer theme="colored" />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
