import { localAxios } from '@/utils/http-commons'

const axios = localAxios()
const path = '/qna'

/*
  userId는 세션에서 처리
  GET    /qna = 목록 가져오기
  GET    /qna/:no = no 글 가져오기
  POST   /qna = 글 작성하기, json = { subject, content }
  PUT    /qna/:no = no 글 수정하기, json = { subject, content }
  DELETE /qna/:no = no 글 삭제하기
 */

export function listQna() {
  return axios.get(path)
}

export function writeQna(writeQnaDto: { subject: string; content: string }) {
  return axios.post(path, writeQnaDto)
}

export function getQna(no: number | string) {
  return axios.get(path + '/' + no)
}

export function editQna(no: number | string, editQnaDto: { subject: string; content: string }) {
  return axios.put(path + '/' + no, editQnaDto)
}

export function deleteQna(no: number | string) {
  return axios.delete(path + '/' + no)
}
