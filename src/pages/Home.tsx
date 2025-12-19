import { FileTableRow } from '@/components/FileTableRow'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
} from '@/components/ui/table'
import { fetchFiles } from '@/http/fetch-files'
import { uploadFile } from '@/http/upload'
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip'
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query'
import { LoaderCircle } from 'lucide-react'
import { FormEvent } from 'react'

export function Home() {
  const queryClient = useQueryClient()

  const { data } = useQuery({
    queryKey: ['fetchFiles'],
    queryFn: fetchFiles,
  })

  const uploadFileMutation = useMutation({
    mutationFn: uploadFile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fetchFiles'] })
    },
  })

  function handleUploadSubmit(event: FormEvent) {
    event.preventDefault()

    const form = event.currentTarget as HTMLFormElement
    const fileInput = form.elements.namedItem('file') as HTMLInputElement
    const file = fileInput.files?.[0]

    if (!file) return

    const formData = new FormData()
    formData.append('file', file)

    uploadFileMutation.mutate({ formData })
  }

  function handleCopyUrl(url: string) {
    navigator.clipboard.writeText(url)

    alert('Link copiado')
  }

  return (
    <div className="w-full lg:max-w-1/2 mx-auto pt-10 px-4">
      <h1 className="text-center font-semibold text-5xl">Buxi</h1>

      <form
        onSubmit={handleUploadSubmit}
        className="mt-10 mx-auto w-full lg:max-w-1/3 flex justify-center items-center gap-4"
      >
        <Input type="file" name="file" required className="flex-1" />

        <Button
          type="submit"
          disabled={uploadFileMutation.isPending}
          className="cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {uploadFileMutation.isPending ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            'Upload'
          )}
        </Button>
      </form>

      <div className="flex items-center justify-center mt-4">
        {uploadFileMutation.data && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  className="cursor-pointer"
                  onClick={() =>
                    handleCopyUrl(uploadFileMutation.data.downloadUrl)
                  }
                >
                  Copiar link de compartilhamento
                </Button>
              </TooltipTrigger>

              <TooltipContent>
                {uploadFileMutation.data.downloadUrl}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>

      <div className="my-12">
        <h2 className="font-bold text-xl">Arquivos em nuvem</h2>

        <Table className="w-full table-fixed mt-4">
          <TableHeader>
            <TableRow>
              <TableHead className="w-2/3">Nome</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Data do upload</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data?.files.map(file => {
              return (
                <FileTableRow
                  key={file.id}
                  id={file.id}
                  originalName={file.originalName}
                  size={file.size}
                  type={file.mimetype}
                  createdAt={file.createdAt}
                />
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
