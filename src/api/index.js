import axios from '@/utils/request'
// import { UserDetail } from '@/interface/user'
export const queryUserDetail = () => {
  return axios.get('v1/user/userInfo', {
    params: { token: 1111 }
  })
}
