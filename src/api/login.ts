import { localAxios } from "@/utils/http-commons";

const axios = localAxios();
const path = import.meta.env.VITE_VUE_API_URL + '/user/login'

/*
    POST    /user/login 로그인 하기
*/

export function login(LoginReq:{ id: string; password: string; }) {
    return axios.post(path,LoginReq)
}