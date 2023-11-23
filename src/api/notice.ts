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

type noticeReq = {
    no: number,
    date: number,
    title: string,
    content : string
}

export function listNotice() {
  return axios.get(path)
}

export function writeNotice(writeNoticeDto: {title: string,content : string}) {
  return axios.post(path, writeNoticeDto)
}

export function getNotice(no: number | string) {
  return axios.get(path + '/' + no)
}

export function getEditNotice(no: number | string) {
  return axios.get(path + '/modify/' + no)
}

export function editNotice(no: number | string, editNoticeDto: {title: string,content : string}) {
  return axios.put(path + '/' + no, editNoticeDto)
}

export function deleteNotice(no: number | string) {
  return axios.delete(path + '/' + no)
}

