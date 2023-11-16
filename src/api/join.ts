import { localAxios } from "@/utils/http-commons";
const axios = localAxios();
const path = import.meta.env.VITE_VUE_API_URL + 'user/register'


/*
    POST /user/register 회원가입 하기, json = {nickname, id, password}
*/

export function register(RegisterReq :{nickName:string, id : string, password:string}) {
    return axios.post(path,RegisterReq) 
}