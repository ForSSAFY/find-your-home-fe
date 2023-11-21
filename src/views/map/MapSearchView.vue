<script setup lang="ts">
import { debounce } from '@/utils/debounce'
import { inject, ref, shallowRef, watch } from 'vue'
import type { LatLng } from 'vue-kakao-maps'
import type { MapViewContext } from './MapView.vue'
import SearchBox from './SearchBox.vue'
import { useRoute, useRouter } from 'vue-router'
import { searchAnything, type SearchResult } from '@/api/place'

const { center, level } = inject<MapViewContext>('mapView')!

const route = useRoute()
const router = useRouter()

// ========== 검색 처리 ==========
const input = ref('');
const result = shallowRef<SearchResult | undefined>()
watch(() => route.query.search, search => {
  if (!search) return
  searchAnything(search.toString())
    .then(res => result.value = res.data)
    .catch(() => result.value = undefined)
}, { immediate: true })

function handleSubmit(query: string) {
  input.value = query
  router.push({
    name: 'search',
    query: { search: query.trim(), lat: center.value.lat, lng: center.value.lng, level: level.value }
  })
}

// ========== 화면 좌표 업데이트 ==========
const updateUrl = (center: LatLng, level: number) => {
  const search = input.value ? { search: input.value } : {};
  router.replace({ query: { ...search, lat: center.lat, lng: center.lng, level } })
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
      <SearchBox @search="handleSubmit" />

      <v-divider />
      <div v-if="result?.length ?? 0 > 0" class="search-label">검색 결과</div>
    </div>
    <div v-if="result?.length ?? 0 > 0" class="search-result">
      <template v-for="res, i in result" :key="i">
        <v-btn elevation="0" rounded="0" class="search-item-btn">
          <div class="search-item">
            <v-icon v-if="res.type === 'location'" icon="location_on" />
            <v-icon v-if="res.type === 'subway'" icon="subway" />
            <v-icon v-if="res.type === 'apt'" icon="house" />
            <div class="search-item__content">
              <div class="search-item__title">{{ res.name }}</div>
              <div v-if="res.address" class="search-item__desc">{{ res.address }}</div>
            </div>
          </div>
        </v-btn>
        <v-divider />
      </template>
    </div>

    <!-- <div v-if="result === undefined" class="ma-6" style="color: rgba(0, 0, 0, 0.7)">검색어를 입력해주세요.</div> -->

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
