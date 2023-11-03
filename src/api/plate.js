import request from '@/utils/request'

export const plateRenderService = () => request.get('/plate/read')
