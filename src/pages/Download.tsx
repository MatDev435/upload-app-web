import { Button } from '@/components/ui/button'
import { api } from '@/lib/axios'
import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

export function Download() {
  const { fileId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (!fileId) {
      navigate('/')
    }

    async function startDownload() {
      try {
        const response = await api.get(`/download/${fileId}`, {
          responseType: 'blob',
        })

        const contentDisposition = response.headers['content-disposition']
        let fileName = 'downloaded-file'

        if (contentDisposition) {
          const fileNameMatch = contentDisposition.match(/filename="?(.+?)"?$/)
          if (fileNameMatch?.[1]) {
            fileName = fileNameMatch[1]
          }
        }

        const blob = new Blob([response.data])
        const url = window.URL.createObjectURL(blob)

        const a = document.createElement('a')
        a.href = url
        a.download = fileName

        document.body.appendChild(a)
        a.click()
        a.remove()

        window.URL.revokeObjectURL(url)
      } catch (error) {
        console.error('Something wrong', error)
      }
    }

    startDownload()
  }, [fileId, navigate])

  return (
    <div className="w-full lg:max-w-1/2 mx-auto pt-10 px-4">
      <h1 className="text-center font-semibold text-5xl">Buxi</h1>

      <p className="text-center text-lg mt-4">
        O download vai começar automaticamente
      </p>

      <div className="flex items-center justify-center p-4">
        <Button variant="link" asChild>
          <Link to="/">Home</Link>
        </Button>
      </div>
    </div>
  )
}
