import { localAxios } from '@/utils/http-commons'

interface AptsReq {
  minLat: number
  minLng: number
  maxLat: number
  maxLng: number
}

export interface Apt {
  id: string
  lat: number
  lng: number
  name: string
}

export type AptsRes = Apt[]

export interface SiDoGun {
  id: string
  lat: number
  lng: number
  name: string
}

export type SidogunRes = {
  result: SiDoGun[]
  level: number
}

const axios = localAxios()
const path = import.meta.env.VITE_VUE_API_URL + '/place'

let controller_getAptsInArea: AbortController
export function getAptsInArea(
  minLat: number,
  minLng: number,
  maxLat: number,
  maxLng: number,
  level: number
) {
  if (controller_getAptsInArea) {
    controller_getAptsInArea.abort()
  }
  controller_getAptsInArea = new AbortController()
  return axios.get<AptsRes>(path + '/house', {
    params: { minLat, minLng, maxLat, maxLng, level },
    signal: controller_getAptsInArea.signal
  })
}

let controller_getSidogunInArea: AbortController
export function getSidogunInArea(
  minLat: number,
  minLng: number,
  maxLat: number,
  maxLng: number,
  level: number
) {
  if (controller_getSidogunInArea) {
    controller_getSidogunInArea.abort()
  }
  controller_getSidogunInArea = new AbortController()
  return axios.get<SidogunRes>(path + '/sidogun', {
    params: { minLat, minLng, maxLat, maxLng, level },
    signal: controller_getSidogunInArea.signal
  })
}
