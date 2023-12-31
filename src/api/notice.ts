import { localAxios } from '@/utils/http-commons'

const axios = localAxios()
const path = import.meta.env.VITE_VUE_API_URL + '/notice'

/*
  userId는 세션에서 처리
  GET    /notice = 목록 가져오기
  GET    /notice/:no = no 글 가져오기
  POST   /notice = 글 작성하기, json = { subject, content }
  PUT    /notice/:no = no 글 수정하기, json = { subject, content }
  DELETE /notice/:no = no 글 삭제하기
 */

export function listNotice() {
  return axios.get(path)
}

export function writeNotice(writeNoticeDto: { title: string; content: string }) {
  return axios.post(path, writeNoticeDto)
}

export function getNotice(id: number | string) {
  return axios.get(path + '/' + id)
}

export function getEditNotice(id: number | string) {
  return axios.get(path + '/modify/' + id)
}

export function editNotice(id: number | string, editNoticeDto: { title: string; content: string }) {
  return axios.put(path + '/' + id, editNoticeDto)
}

export function deleteNotice(id: number | string) {
  return axios.delete(path + '/' + id)
}
