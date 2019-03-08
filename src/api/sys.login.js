import request from '@/plugin/axios'
import IP from './ip'

export function AccountLogin (data) {
  return request({
    url: IP.IP + '/user/login',
    method: 'post',
    data
  })
}
