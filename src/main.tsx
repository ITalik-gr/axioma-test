import { Helmet } from 'react-helmet';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Helmet>
      <title>Axios Test</title>
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <meta name="description" content="Axios Test Description" />
      <meta property="og:title" content="Axios Test" />
      <meta property="og:description" content="Axios Test Description" />
    </Helmet>

    <App />
  </StrictMode>,
)
