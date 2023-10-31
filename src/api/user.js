import request from '@/utils/request'

export const userRegisterService = ({ username, password, repassword }) =>
  request.post('/user/register', { username, password, repassword })

export const userLoginService = ({ username, password }) =>
  request.post('/user/login', { username, password })
