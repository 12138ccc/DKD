
import request from '@/utils/request'
export function loginAPI(data) {
  return request({
    url: '/api/user-service/user/login',
    method: 'POST',
    data
  })
}
