import request from '../utils/request'

export async function login(loginData) {
  const response = await request.post('/api/user/login', {
    data: loginData,
  })
  return response
}

export async function logout() {
  const response = await request.post('/api/user/logout')
  return response
}
