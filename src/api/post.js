import request from '@/utils/request'

export const postRenderService = () => request.get('/post/read')

export const postRenderTopicService = (topic) =>
  request.get(`/post/readByCategory/${topic}`)

export const postRenderPlateService = (Plate) =>
  request.get(`/post/readByPlate/${Plate}`)

export const postRenderIdService = (Id) => request.get(`/post/readById/${Id}`)
