import { localAxios } from '@/utils/http-commons'
const axios = localAxios()
const path = import.meta.env.VITE_VUE_API_URL + '/user'

/*
    Post /user/login 로그인하기, json = {id, password}
*/

export function doLogin(LoginReq: { username: string; password: string }) {
  return axios.post(path + '/login', LoginReq)
}
