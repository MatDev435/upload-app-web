import { createBrowserRouter } from 'react-router-dom'
import { Download } from './pages/Download'
import { NotFound } from './pages/404'
import { Temp } from './pages/Temp'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Temp />,
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
