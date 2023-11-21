import { localAxios } from '@/utils/http-commons'

/** 기본 마커 정보 */
export interface Apt {
  id: string
  lat: number
  lng: number
  name: string
  price: number
  area: number
}

export type AptsRes = Apt[]

export interface Sidogun {
  id: string
  lat: number
  lng: number
  name: string
  cnt: number
}

export type SidogunRes = {
  result: Sidogun[]
  level: number
}

export interface AptInfo {
  id: string
  buildYear: number
  // roadName: string
  // roadNameBonbun: string
  // roadNameBubun: string
  // roadNameSeq: string
  // roadNameBasementCode: string
  // roadNameCode: string
  dong: string
  bonbun: string
  bubun: string
  sigunguCode: string
  eubmyundongCode: string
  dongCode: string
  landCode: string
  apartmentName: string
  jibun: string
  lat: number
  lng: number
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

export type Nearby =
  | {
      type: 'store' | 'park' | 'charger'
      minutes: number
    }
  | {
      type: 'subway'
      name: string
      minutes: number
    }

export type Deal = {
  date: string
  price: number
  dong: number
  floor: number
}

export interface AptInfo {
  id: string
  name: string
  address: string
  date: string
  area: number
  price: number
  nearby: Nearby[]
  deals: Deal[]
}

export function getAptInfo(id: string) {
  return axios.get<AptInfo>(path + '/house/' + id)
}

export type SearchResult = {
  type: 'location' | 'subway' | 'apt'
  name: string
  /** 주소, location일 경우 undefined */
  address?: string
}

export function search(query: string) {
  return axios.get<AptInfo>(path + '/search', { params: { query } })
}
