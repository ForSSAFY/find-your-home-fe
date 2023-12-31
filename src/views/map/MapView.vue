<script setup lang="ts">
import { getAptsInArea, getSidogunInArea, type Apt, type Sidogun } from '@/api/place'
import CustomMarkers from '@/components/CustomMarkers.vue'
import { useLoginStore } from '@/stores/loginStore'
import { debounce } from '@/utils/debounce'
import { provide, ref, shallowRef, watch } from 'vue'
import {
  KakaoMap,
  ZoomControl,
  useKakaoLoader,
  Tileset,
  type LatLng,
  type LatLngBounds
} from 'vue-kakao-maps'
import { useRoute, useRouter } from 'vue-router'

useKakaoLoader({ appKey: import.meta.env.VITE_KAKAO_JAVASCRIPT_APP_KEY, libraries: ['clusterer'] })

const route = useRoute()
const router = useRouter()

document.title = "FIND YOUR HOME"

// ========== 지도 상태 변동하는 변수들 ==========
const signalCenter = shallowRef<LatLng>({
  lat: Number(route.query.lat ?? 37.5013),
  lng: Number(route.query.lng ?? 127.0395)
})
const center = shallowRef(signalCenter.value)
const signalLevel = ref(Number(route.query.level ?? 4))
const level = ref(signalLevel.value)
const bounds = shallowRef<LatLngBounds>({ ne: { lat: 0, lng: 0 }, sw: { lat: 0, lng: 0 } })
function updateVisibleMarkers(options?: { bounds?: LatLngBounds, level?: number }) {
  const b = options?.bounds ?? bounds.value
  const l = options?.level ?? level.value
  if (l <= 4) {
    getAptsInArea(...flatLatLngBounds(b), l)
      .then((res) => (markers.value = res.data))
  } else {
    getSidogunInArea(...flatLatLngBounds(b), l)
      .then((res) => (markers.value = res.data.result.map(item => ({ ...item, level: res.data.level }))))
  }
}

// ========== 지도의 마커 관리 ==========
const markers = ref<(Apt | Sidogun & { level: number })[]>([])
const activeId = ref<string | undefined>('');
const context = { center, signalCenter, level: level, signalLevel, bounds: bounds, updateVisibleMarkers, activeId }
provide('mapView', context)
export type MapViewContext = typeof context
// 지도 범위 변경 시 마커 업데이트
const debounceUpdateVisibleMarkers = debounce(updateVisibleMarkers, 200)
watch(bounds, () => {
  debounceUpdateVisibleMarkers()
}, { flush: 'post' })

// ========== 경로 접속 시 URL로부터 지도 위치 설정 ==========
// index: MapIndexView에서 설정
// apt: MapAptInfoView에서 설정
// search: MapSearchView에서 설정

const KakaoLatLng = shallowRef(undefined)
const CustomOverlay = shallowRef(undefined)
const Coords = shallowRef(undefined)

// 유틸 함수
function flatLatLngBounds(bounds: LatLngBounds): [number, number, number, number] {
  return [bounds.sw.lat, bounds.sw.lng, bounds.ne.lat, bounds.ne.lng]
}

// 맵 로드 시 화면에 마커 로드
function onMapLoad({ bounds }: { bounds: LatLngBounds }) {
  updateVisibleMarkers({ bounds })
  // @ts-expect-error
  KakaoLatLng.value = window.kakao.maps.LatLng
  // @ts-expect-error
  CustomOverlay.value = window.kakao.maps.CustomOverlay
  // @ts-expect-error
  Coords.value = window.kakao.maps.Coords
}

// 마커 클릭 시 해당 아파트 세부 정보 화면으로 이동
function onMarkerClick(marker: Apt | Sidogun & { level: number }) {
  // Sidogun 마커 클릭
  if ('level' in marker) {
    signalCenter.value = { lat: marker.lat, lng: marker.lng }
    signalLevel.value = marker.level
    updateVisibleMarkers()
  } else { // Apt 마커 클릭
    // MapAptInfoView로 처리 위임
    signalCenter.value = { lat: marker.lat, lng: marker.lng }
    signalLevel.value = Math.min(4, level.value)
    router.push({ name: 'apt', params: { id: marker.id }, query: route.query.search ? { back: encodeURIComponent(route.fullPath) } : undefined })
  }
}

// ========== 오버레이 관리 ==========
const tiles = ref<'flood' | 'drug' | 'kill' | 'robbery' | 'castle' | 'hit' | undefined>()

// 좌표 변환 함수
function convertLatLng(x: number, y: number, z: number) {
  const _z = Math.pow(2, z) * 80
  const _x = x * _z - 75000
  const _y = y * _z - 150000
  // @ts-expect-error
  const ll1 = new Coords.value(_x, _y).toLatLng()
  // @ts-expect-error
  const ll2 = new Coords.value(_x + _z, _y + _z).toLatLng()
  return [ll1.getLng(), ll1.getLat(), ll2.getLng(), ll2.getLat()]
}

// ========== 로그인 헤더 관리 ==========
const store = useLoginStore()

function logout() {
  store.username = ''
  store.nickname = ''
}
</script>

<template>
  <v-layout style="min-height: 100vh; height: 100vh;">
    <!-- Header -->
    <v-app-bar :elevation="0" :height="72" style="border-bottom: solid 1px rgba(0, 0, 0, 0.12);">
      <div class="wrapper">
        <v-app-bar-title>
          <router-link :to="{ name: 'main' }" class="logo">
            FIND YOUR HOME
          </router-link>
        </v-app-bar-title>

        <nav class="menu">
          <v-btn rounded="0" class="menu-item">
            아파트
          </v-btn>
          <v-btn rounded="0" class="menu-item">
            관심 지역
            <v-tooltip activator="parent" location="bottom">추후 개발 예정</v-tooltip>
          </v-btn>
          <v-btn rounded="0" :to="{ name: 'news' }" class="menu-item">
            뉴스
          </v-btn>
        </nav>

        <template v-if="!store.username">
          <div class="login-wrapper">
            <v-btn variant="elevated" rounded="0" :to="{ name: 'login' }" class="login">로그인</v-btn>
            <v-btn variant="outlined" rounded="0" :to="{ name: 'join' }" class="join">회원가입</v-btn>
          </div>
        </template>
        <template v-if="store.username">
          <div class="login-wrapper">
            <div style="font-weight: 500; font-size: large; margin-right: 0.5rem;">
              <span style="font-weight: 700;">{{ store.nickname }}</span>님 안녕하세요.
            </div>
            <v-btn variant="outlined" rounded="0" class="join" @click="logout">로그아웃</v-btn>
          </div>
        </template>
      </div>
    </v-app-bar>
    <!-- Sidebar -->
    <v-navigation-drawer permanent :width="384">
      <router-view />
    </v-navigation-drawer>
    <!-- Main -->
    <v-main style="height: 100%; position: relative;">
      <!-- Map -->
      <KakaoMap pan :center="signalCenter" :level="signalLevel" style="width: 100%; height: 100%"
        @center_changed="({ center: c }) => (center = c)" @zoom_changed="({ level: l }) => (level = l)"
        @bounds_changed="({ bounds: b }) => (bounds = b)" @load="onMapLoad">
        <CustomMarkers :markers="markers" :LatLng="KakaoLatLng" :CustomOverlay="CustomOverlay" :active-id="activeId"
          @marker_click="onMarkerClick" />
        <ZoomControl position="BOTTOMRIGHT" />

        <Tileset :width="256" :height="256" :show="tiles === 'flood'"
          :url-func="(x, y, z) => `https://geo.safemap.go.kr/geoserver/safemap/wms?LAYERS=A2SM_FLUDMARKS&STYLES=A2SM_FludMarks&FORMAT=image%2Fpng&TRANSPARENT=TRUE&SERVICE=WMS&REQUEST=GetMap&SRS=EPSG%3A4326&BBOX=${convertLatLng(x, y, z).join(',')}&WIDTH=256&HEIGHT=256`" />
        <Tileset :width="256" :height="256" :show="tiles === 'drug'"
          :url-func="(x, y, z) => `https://geo.safemap.go.kr/geoserver/safemap/wms?LAYERS=A2SM_CRMNLSTATS&STYLES=A2SM_CrmnlStats_Nrctc&FORMAT=image%2Fpng&TRANSPARENT=TRUE&SERVICE=WMS&REQUEST=GetMap&SRS=EPSG%3A4326&BBOX=${convertLatLng(x, y, z).join(',')}&WIDTH=256&HEIGHT=256`" />
        <Tileset :width="256" :height="256" :show="tiles === 'kill'"
          :url-func="(x, y, z) => `https://geo.safemap.go.kr/geoserver/safemap/wms?LAYERS=A2SM_CRMNLSTATS&STYLES=A2SM_CrmnlStats_Murder&FORMAT=image%2Fpng&TRANSPARENT=TRUE&SERVICE=WMS&REQUEST=GetMap&SRS=EPSG%3A4326&BBOX=${convertLatLng(x, y, z).join(',')}&WIDTH=256&HEIGHT=256`" />
        <Tileset :width="256" :height="256" :show="tiles === 'robbery'"
          :url-func="(x, y, z) => `https://geo.safemap.go.kr/geoserver/safemap/wms?LAYERS=A2SM_CRMNLSTATS&STYLES=A2SM_CrmnlStats_Brglr&FORMAT=image%2Fpng&TRANSPARENT=TRUE&SERVICE=WMS&REQUEST=GetMap&SRS=EPSG%3A4326&BBOX=${convertLatLng(x, y, z).join(',')}&WIDTH=256&HEIGHT=256`" />
        <Tileset :width="256" :height="256" :show="tiles === 'castle'"
          :url-func="(x, y, z) => `https://geo.safemap.go.kr/geoserver/safemap/wms?LAYERS=A2SM_CRMNLSTATS&STYLES=A2SM_CrmnlStats_Rape&FORMAT=image%2Fpng&TRANSPARENT=TRUE&SERVICE=WMS&REQUEST=GetMap&SRS=EPSG%3A4326&BBOX=${convertLatLng(x, y, z).join(',')}&WIDTH=256&HEIGHT=256`" />
        <Tileset :width="256" :height="256" :show="tiles === 'hit'"
          :url-func="(x, y, z) => `https://geo.safemap.go.kr/geoserver/safemap/wms?LAYERS=A2SM_CRMNLSTATS&STYLES=A2SM_CrmnlStats_Violn&FORMAT=image%2Fpng&TRANSPARENT=TRUE&SERVICE=WMS&REQUEST=GetMap&SRS=EPSG%3A4326&BBOX=${convertLatLng(x, y, z).join(',')}&WIDTH=256&HEIGHT=256`" />
      </KakaoMap>

      <v-card variant="outlined" rounded="0" color="rgba(0,0,0,0.12)" hover
        style="position: absolute; top: calc(var(--v-layout-top) + 1.5rem); left: calc(var(--v-layout-left) + 1.5rem); display: flex; z-index: 1;">
        <v-btn-toggle v-model="tiles">
          <v-btn value="flood">침수</v-btn>
          <v-btn value="drug">마약</v-btn>
          <v-btn value="kill">살인</v-btn>
          <v-btn value="robbery">강도</v-btn>
          <v-btn value="castle">성폭력</v-btn>
          <v-btn value="hit">폭력</v-btn>
        </v-btn-toggle>
      </v-card>
    </v-main>
  </v-layout>
</template>

<style scoped>
.wrapper {
  display: grid;
  grid-template-columns: min-content auto auto;
  gap: 2rem;
  padding: 0 1rem;
  width: 100%;
  align-items: center;
  margin: 0 auto;
}

.logo {
  width: 15rem;
  font-weight: 900;
  font-size: 24px;
  color: rgba(0, 0, 0, 1);
  text-decoration: none;
  padding: 1rem 0.5rem;
}

.menu-item {
  font-size: 1rem;
  font-weight: 600;
}

.login-wrapper {
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 0.5rem;
}

.login {
  font-size: 1rem;
  font-weight: 700;
  padding: 0.5rem 1rem;
  height: auto;
  color: white;
  background-color: black;
}

.join {
  font-size: 1rem;
  font-weight: 700;
  padding: 0.5rem 1rem;
  height: auto;
}
</style>
