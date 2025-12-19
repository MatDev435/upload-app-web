import { api } from '@/lib/axios'

export interface File {
  id: string
  originalName: string
  savedName: string
  size: number
  mimetype: string
  createdAt: string
}

export interface FetchFilesResponse {
  files: File[]
}

export async function fetchFiles() {
  const response = await api.get<FetchFilesResponse>('/files')

  return response.data
}
