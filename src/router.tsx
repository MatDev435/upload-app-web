import { createBrowserRouter } from 'react-router-dom'
import { Download } from './pages/Download'
import { NotFound } from './pages/404'
import { Home } from './pages/Home'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },

  {
    path: '/download/:fileId',
    element: <Download />,
  },

  {
    path: '*',
    element: <NotFound />,
  },
])
