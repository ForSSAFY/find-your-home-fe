import { localAxios } from '@/utils/http-commons'
const axios = localAxios()
const path = import.meta.env.VITE_VUE_API_URL + '/user/register'

/*
    POST /user/register 회원가입 하기, json = {nickname, id, password}
*/

export function register(RegisterReq: {
  nickName: string
  email: string
  id: string
  password: string
}) {
  return axios.post(path, RegisterReq)
}

export function getInfo(id: string) {
  return axios.get(path + '/' + id)
}

export function getEditInfo(id: string) {
  return axios.get(path + '/edit/' + id)
}

export function editInfo(id: string, RegisterReq: { nickName: string
    email: string
    id: string
    password: string }) {
  return axios.put(path + '/' + id, RegisterReq)
}

export function deleteInfo(id: string) {
  return axios.delete(path + '/' + id)
}
