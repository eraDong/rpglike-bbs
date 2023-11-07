import request from '@/utils/request'

export const plateRenderService = () => request.get('/plate/read')

export const userJoinPlateService = (userId, plateId) =>
  request.post('/plate/join', { userId, plateId })

export const getPlateIdService = (name) =>
  request.get(`/plate/getPlateIdByName/${name}`)
