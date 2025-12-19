import { api } from '@/lib/axios'

export interface UploadParams {
  formData: FormData
}

export interface UploadResponse {
  downloadUrl: string
}

export async function uploadFile({ formData }: UploadParams) {
  const response = await api.post<UploadResponse>('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return response.data
}
