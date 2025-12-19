import { createBrowserRouter } from 'react-router-dom'
import { Home } from './pages/Home'
import { Download } from './pages/Download'
import { NotFound } from './pages/404'

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
