import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://api.buxi.com.br',
})
