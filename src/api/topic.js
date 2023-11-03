import request from '@/utils/request'

export const topicRenderService = () => request.get('/topic/read')
