<script setup lang="ts">
import { getAptsInArea, getSidogunInArea } from '@/api/place'
import CustomMarkers from '@/components/CustomMarkers.vue'
import { debounce } from '@/utils/debounce'
import { provide } from 'vue'
import { ref, shallowRef, watch } from 'vue'
import {
  KakaoMap,
  ZoomControl,
  useKakaoLoader,
  type LatLng,
  type LatLngBounds
} from 'vue-kakao-maps'
import { useRoute, useRouter } from 'vue-router'

useKakaoLoader({ appKey: import.meta.env.VITE_KAKAO_JAVASCRIPT_APP_KEY, libraries: ['clusterer'] })

const route = useRoute()
const router = useRouter()

// ========== 지도 상태 변동하는 변수들 ==========
const signalCenter = shallowRef<LatLng>({
  lat: Number(route.query.lat ?? 37.5013),
  lng: Number(route.query.lng ?? 127.0395)
})
function setCenter(center: LatLng) {
  signalCenter.value = center;
}
const signalLevel = ref(Number(route.query.level ?? 4))
function setLevel(level: number) {
  signalLevel.value = level
}
const bounds = shallowRef<LatLngBounds>({ ne: { lat: 0, lng: 0 }, sw: { lat: 0, lng: 0 } })
function updateMarkers() {
  if (level.value <= 4) {
    getAptsInArea(...flatLatLngBounds(bounds.value), level.value)
      .then((res) => (markers.value = res.data))
      .catch(() => (markers.value = []))
  } else {
    getSidogunInArea(...flatLatLngBounds(bounds.value), level.value)
      .then((res) => (markers.value = res.data.result.map(item => ({ ...item, level: res.data.level }))))
      .catch(() => (markers.value = []))
  }
}
// CustomMarkers hover 상태
const selectedId = ref(0);
provide('mapView', { signalCenter, setCenter, signalLevel, setLevel, bounds, updateMarkers, selectedId })

// ========== 경로 접속 시 URL로부터 지도 위치 설정 ==========
// index: 자동으로 설정
// apt: router-view에서 설정
// search: router-view에서 설정

// ==========  ==========
// ==========  ==========
// ==========  ==========
// ==========  ==========

// ---------- 현재 지도 위치와 경로 동기화 ----------
const inputCenter = shallowRef({
  lat: Number(route.query.lat ?? 37.5013),
  lng: Number(route.query.lng ?? 127.0395)
})
const inputLevel = ref(Number(route.query.level ?? 4))
const center = shallowRef(inputCenter.value)
const level = ref(inputLevel.value)

const updateUrl = (center: LatLng, level: number) => {
  router.replace({ query: { lat: center.lat, lng: center.lng, level } })
}
const debounceUpdateUrl = debounce(updateUrl, 100)

// 화면 좌표 변경 200ms 후 url 업데이트
watch(
  center,
  (center) => {
    debounceUpdateUrl(center, level.value)
  },
  { flush: 'post' }
)
// Zoom 변경 완료 시 즉시 url 업데이트
watch(
  level,
  (level) => {
    updateUrl(center.value, level)
  },
  { flush: 'post' }
)

// ---------- 아파트|시도군요약 정보들 요청 ----------
const markers = ref<{ id: string; lat: number; lng: number; name: string }[]>([])
// updateApts: KakaoMap.load 이벤트에 한 번 호출됨
// 현재 화면 zoom zoom에 따라 다른 API 요청해야 함
const updateApts = (bounds: LatLngBounds) => {
  if (level.value <= 4) {
    getAptsInArea(...flatLatLngBounds(bounds), level.value)
      .then((res) => (markers.value = res.data))
      .then(console.log)
      .catch(() => (markers.value = []))
  } else {
    getSidogunInArea(...flatLatLngBounds(bounds), level.value)
      .then((res) => (markers.value = res.data.result.map(item => ({ ...item, level: res.data.level }))))
      .then(console.log)
      .catch(() => (markers.value = []))
  }
}

// 현재 화면 범위 추적
// const bounds = ref<LatLngBounds>({ ne: { lat: 0, lng: 0 }, sw: { lat: 0, lng: 0 } })
const debouncedBounds = ref(bounds.value)
// 일정 시간 동안 bounds 변화 없을 때 debouncedBounds 업데이트
const updateDebouncedBounds = debounce((bounds) => (debouncedBounds.value = bounds), 200)
watch(bounds, updateDebouncedBounds, { deep: true })
// debouncedBounds 업데이트 시 updateApts 호출
watch(debouncedBounds, (bounds) => {
  updateApts(bounds)
}, { flush: 'post' })

const KakaoLatLng = shallowRef(undefined)
const CustomOverlay = shallowRef(undefined)

// 유틸 함수
function flatLatLngBounds(bounds: LatLngBounds): [number, number, number, number] {
  return [bounds.sw.lat, bounds.sw.lng, bounds.ne.lat, bounds.ne.lng]
}

function onMapLoad({ bounds: b }: { bounds: LatLngBounds }) {
  updateApts(b)
  KakaoLatLng.value = window.kakao.maps.LatLng
  CustomOverlay.value = window.kakao.maps.CustomOverlay
}

function onMarkerClick({ lat, lng, level: lv }: { lat: number, lng: number, level?: number }) {
  inputCenter.value = { lat, lng }
  inputLevel.value = lv ?? level.value
}
</script>

<template>
  <div style="width: 100%; min-height: 100vh">
    <!-- Header -->
    <v-app-bar :elevation="0" :height="76" style="padding: 0 1rem; border-bottom: 1px solid rgba(0, 0, 0, 0.12)">
      <div style="
          display: flex;
          align-items: center;
          margin: 0 2rem 0 1rem;
          font-size: 24px;
          font-weight: 800;
        ">
        FIND YOUR HOME
      </div>
      <v-slide-group>
        <v-slide-group-item>
          <v-btn rounded="0" style="font-size: 16px">아파트</v-btn>
        </v-slide-group-item>
        <v-slide-group-item>
          <v-btn rounded="0" style="font-size: 16px">관심 지역</v-btn>
        </v-slide-group-item>
      </v-slide-group>
      <div style="display: flex; justify-content: end; margin-left: auto; gap: 1rem">
        <v-btn variant="outlined" rounded="0">로그인</v-btn>
        <v-btn variant="elevated" rounded="0" :elevation="0">회원가입</v-btn>
      </div>
    </v-app-bar>
    <!-- Sidebar -->
    <v-navigation-drawer permanent :width="384">
      <div class="sidebar-container">
        <nav class="apt-search">
          <v-text-field density="compact" variant="outlined" label="동, 지하철, 아파트 검색" append-inner-icon="search" rounded="0"
            single-line hide-details class="ma-6" @click:append-inner="(e) => console.log('검색 안돼~')">
          </v-text-field>
          <v-divider />
        </nav>

        <router-view />
      </div>
    </v-navigation-drawer>
    <!-- Main -->
    <v-main style="height: 100%">
      <!-- Map -->
      <KakaoMap pan :center="inputCenter" :level="inputLevel" style="height: 100%"
        @center_changed="({ center: c }) => (center = c)" @zoom_changed="({ level: l }) => (level = l)"
        @bounds_changed="({ bounds: b }) => (bounds = b)" @load="onMapLoad">
        <!-- <Marker v-for="m in markers" :key="m.id" :position="m" :z-index="8000" /> -->
        <CustomMarkers :markers="markers" :LatLng="KakaoLatLng" :CustomOverlay="CustomOverlay"
          @marker_click="onMarkerClick" />
        <ZoomControl position="BOTTOMRIGHT" />
      </KakaoMap>
    </v-main>
  </div>
</template>

<style scoped>
.sidebar-container {
  display: grid;
  grid-template-rows: min-content auto;
  height: 100%;
  max-height: 100%;
  overflow-y: hidden;
}
</style>
