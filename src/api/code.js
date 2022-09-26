import request from '@/utils/request'
export function codeAPI(Num) {
  return request({
    url: `/api/user-service/user/imageCode/${Num}`,
    responseType: 'blob'
  })
}

