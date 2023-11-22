<script setup lang="ts">
import { searchAnything, type SearchResult } from '@/api/place'
import { debounce } from '@/utils/debounce'
import { inject, ref, shallowRef, watch } from 'vue'
import type { LatLng } from 'vue-kakao-maps'
import { useRoute, useRouter } from 'vue-router'
import type { MapViewContext } from './MapView.vue'
import SearchBox from './SearchBox.vue'

const { signalCenter, center, signalLevel, level } = inject<MapViewContext>('mapView')!

const route = useRoute()
const router = useRouter()

// ========== 검색 처리 ==========
const input = ref('');
const result = shallowRef<SearchResult | undefined>()
watch(() => route.query.search, search => {
  if (!search) {
    document.title = "FIND YOUR HOME"
    return
  }
  document.title = `${search} - 검색 결과`
  searchAnything(search.toString())
    .then(res => result.value = res.data)
    .catch(() => result.value = [])
}, { immediate: true })

function handleSubmit(query: string) {
  if (!query) {
    const { search, ...query } = route.query
    router.push({ query })
    result.value = undefined
    return
  }
  input.value = query
  router.push({
    name: 'search',
    query: { ...route.query, search: query.trim() }
  })
}

// ========== 검색 아이템 클릭 ==========
function handleClick(res: SearchResult[0]) {
  signalCenter.value = { lat: res.lat, lng: res.lng }
  if (res.type === 'apt') {
    const path = encodeURIComponent(route.fullPath)
    console.log(path)
    router.push({ name: 'apt', params: { id: res.id }, query: { back: path } })
  } else if (res.type === 'location') {
    signalLevel.value = 4
  } else {
    signalLevel.value = Math.min(4, level.value)
  }
}

// ========== 화면 좌표 업데이트 ==========
const updateUrl = (center: LatLng, level: number) => {
  router.replace({ query: { ...route.query, lat: center.lat, lng: center.lng, level } })
}
const debounceUpdateUrl = debounce(updateUrl, 100)

// 화면 좌표 변경 후 일정 시간 뒤에 url 업데이트
watch(center, (center) => {
  debounceUpdateUrl(center, level.value)
}, { flush: 'post' })
// Zoom 변경 완료 즉시 url 업데이트
watch(level, (level) => {
  updateUrl(center.value, level)
}, { flush: 'post' })
</script>

<template>
  <div class="sidebar-container">
    <div>
      <SearchBox :initial-value="$route.query.search?.toString()" @search="handleSubmit" />

      <v-divider />
      <div v-if="result?.length ?? 0 > 0" class="search-label">검색 결과</div>
    </div>
    <div v-if="result?.length ?? 0 > 0" class="search-result">
      <template v-for="res, i in result" :key="i">
        <v-btn elevation="0" rounded="0" class="search-item-btn" @click="() => handleClick(res)">
          <div class="search-item">
            <v-icon v-if="res.type === 'location'" icon="location_on" />
            <v-icon v-if="res.type === 'subway'" icon="tram" />
            <v-icon v-if="res.type === 'apt'" icon="home" />
            <div class="search-item__content">
              <div class="search-item__title">{{ res.name }}</div>
              <div v-if="res.address" class="search-item__desc">{{ res.address }}</div>
            </div>
          </div>
        </v-btn>
        <v-divider />
      </template>
    </div>

    <div v-if="result === undefined" class="ma-6" style="color: rgba(0, 0, 0, 0.7)">검색어를 입력해주세요.</div>

    <div v-if="result?.length === 0" class="ma-6" style="color: rgba(0, 0, 0, 0.7)">검색 결과가 없습니다.</div>
  </div>
</template>

<style scoped>
.sidebar-container {
  display: grid;
  grid-template-rows: min-content auto;
  height: 100%;
  overflow-y: hidden;
}

.search-label {
  padding: 1rem 1.5rem;
  color: rgba(0, 0, 0, 0.7);
  font-size: small;
}

.search-result {
  display: flex;
  flex-direction: column;
  max-height: 100%;
  overflow-y: auto;
}

.search-item-btn {
  height: auto;
  justify-content: start;
  font-size: 1rem;
  padding: 0;
}

.search-item {
  display: flex;
  align-items: center;
  padding: 1.5rem 1.5rem;
  gap: 1rem;
  line-height: 1;
  text-align: start;
}

.search-item__content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.search-item__title {
  font-weight: 500;
}

.search-item__desc {
  font-size: small;
  letter-spacing: normal;
  color: rgba(0, 0, 0, 0.7);
}
</style>
