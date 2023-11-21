<script setup lang="ts">
import { getAptsInArea, getSidogunInArea, type Apt, type Sidogun } from '@/api/place'
import CustomMarkers from '@/components/CustomMarkers.vue'
import { debounce } from '@/utils/debounce'
import { provide, ref, shallowRef, watch } from 'vue'
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
const center = ref(signalCenter.value)
function setCenter(center: LatLng) {
  signalCenter.value = center;
}
const signalLevel = ref(Number(route.query.level ?? 4))
const level = ref(signalLevel.value)
function setLevel(level: number) {
  signalLevel.value = level
}
const bounds = shallowRef<LatLngBounds>({ ne: { lat: 0, lng: 0 }, sw: { lat: 0, lng: 0 } })
function updateVisibleMarkers(options?: { bounds?: LatLngBounds, level?: number }) {
  const b = options?.bounds ?? bounds.value
  const l = options?.level ?? level.value
  if (l <= 4) {
    getAptsInArea(...flatLatLngBounds(b), l)
      .then((res) => (markers.value = res.data))
      .then(console.log)
      .catch(() => (markers.value = []))
  } else {
    getSidogunInArea(...flatLatLngBounds(b), l)
      .then((res) => (markers.value = res.data.result.map(item => ({ ...item, level: res.data.level }))))
      .catch(() => (markers.value = []))
  }
}

// ========== 지도의 마커 관리 ==========
const markers = ref<(Apt | Sidogun & { level: number })[]>([])
const activeId = ref<string | undefined>('');
const context = { center, signalCenter, setCenter, level: level, signalLevel, setLevel, bounds: bounds, updateVisibleMarkers, activeId }
provide('mapView', context)
export type MapViewContext = typeof context
// 지도 범위 변경 시 마커 업데이트
const debounceUpdateVisibleMarkers = debounce(updateVisibleMarkers, 200)
watch(bounds, () => {
  debounceUpdateVisibleMarkers()
  console.log("update")
}, { flush: 'post' })

// ========== 경로 접속 시 URL로부터 지도 위치 설정 ==========
// index: MapIndexView에서 설정
// apt: MapAptInfoView에서 설정
// search: MapSearchView에서 설정



// ---------- 아파트|시도군요약 정보들 요청 ----------
// updateApts: KakaoMap.load 이벤트에 한 번 호출됨
// 현재 화면 zoom zoom에 따라 다른 API 요청해야 함


const KakaoLatLng = shallowRef(undefined)
const CustomOverlay = shallowRef(undefined)

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
    router.push({ name: 'apt', params: { id: marker.id } })
  }
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
      <router-view />
    </v-navigation-drawer>
    <!-- Main -->
    <v-main style="height: 100%">
      <!-- Map -->
      <KakaoMap pan :center="signalCenter" :level="signalLevel" style="height: 100%"
        @center_changed="({ center: c }) => (center = c)" @zoom_changed="({ level: l }) => (level = l)"
        @bounds_changed="({ bounds: b }) => (bounds = b)" @load="onMapLoad">
        <!-- <Marker v-for="m in markers" :key="m.id" :position="m" :z-index="8000" /> -->
        <CustomMarkers :markers="markers" :LatLng="KakaoLatLng" :CustomOverlay="CustomOverlay" :active-id="activeId"
          @marker_click="onMarkerClick" />
        <ZoomControl position="BOTTOMRIGHT" />
      </KakaoMap>
    </v-main>
  </div>
</template>

<style scoped></style>
