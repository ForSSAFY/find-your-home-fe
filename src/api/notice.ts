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

export function listQna() {
  return axios.get(path)
}

export function writeQna(writeNoticeDto: noticeReq) {
  return axios.post(path, writeNoticeDto)
}

export function getQna(no: number | string) {
  return axios.get(path + '/' + no)
}

export function getEditQna(no: number | string) {
  return axios.get(path + '/modify/' + no)
}

export function editQna(no: number | string, editNoticeDto: noticeReq) {
  return axios.put(path + '/' + no, editNoticeDto)
}

export function deleteQna(no: number | string) {
  return axios.delete(path + '/' + no)
}

