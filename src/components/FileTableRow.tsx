import { TableRow, TableCell } from './ui/table'
import { File } from 'lucide-react'
import dayjs from 'dayjs'
import { formatBytes } from '@/utils/format-bytes'
import { extension } from 'mime-types'
import { useNavigate } from 'react-router-dom'

interface FileTableRowProps {
  id: string
  originalName: string
  size: number
  type: string
  createdAt: string
}

export function FileTableRow(props: FileTableRowProps) {
  const navigate = useNavigate()

  function handleNavigate() {
    navigate(`/download/${props.id}`)
  }

  return (
    <TableRow className="text-base cursor-pointer" onClick={handleNavigate}>
      <TableCell className="flex gap-2 items-center overflow-hidden">
        <File className="size-8" />
        <span className="flex flex-col text-lg">
          {props.originalName.length > 50
            ? props.originalName.substring(0, 50).concat('...')
            : props.originalName}{' '}
          <span className="text-sm text-slate-300">
            {formatBytes(props.size)}
          </span>
        </span>
      </TableCell>
      <TableCell>{extension(props.type)}</TableCell>
      <TableCell>
        {dayjs(new Date(props.createdAt)).format('DD[/]MM[/]YYYY')}
      </TableCell>
    </TableRow>
  )
}
