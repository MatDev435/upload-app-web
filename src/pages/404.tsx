import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div className="w-full lg:max-w-1/2 mx-auto pt-10 px-4">
      <h1 className="text-center font-semibold text-5xl">404</h1>

      <div className="flex items-center justify-center p-4">
        <Button variant="link" asChild>
          <Link to="/">Home</Link>
        </Button>
      </div>
    </div>
  )
}
