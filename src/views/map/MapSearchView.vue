<script setup lang="ts">
import router from '@/router';
import { debounce } from '@/utils/debounce';
import { inject, watch } from 'vue';
import type { LatLng } from 'vue-kakao-maps';
import type { MapViewContext } from './MapView.vue';
import SearchBox from './SearchBox.vue';

const { center, level } = inject<MapViewContext>('mapView')!

const updateUrl = (center: LatLng, level: number) => {
  router.replace({ query: { lat: center.lat, lng: center.lng, level } })
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
      <SearchBox
        @search="(value) => $router.push({ name: 'search', query: { search: value, lat: center.lat, lng: center.lng, level } })" />

      <v-divider />
      <div class="search-label">검색 결과</div>
    </div>
    <div class="search-result">
      <v-btn elevation="0" rounded="0" class="search-item-btn">
        <div class="search-item">
          <v-icon icon="location_on" />
          <div class="search-item__content">
            <div class="search-item__title">서울시 강남구 역삼동</div>
          </div>
        </div>
      </v-btn>
      <v-divider />
      <v-btn elevation="0" rounded="0" class="search-item-btn">
        <div class="search-item">
          <v-icon icon="subway" />
          <div class="search-item__content">
            <div class="search-item__title">역삼역</div>
            <div class="search-item__desc">서울시 강남구 역삼동</div>
          </div>
        </div>
      </v-btn>
      <v-divider />
      <v-btn elevation="0" rounded="0" class="search-item-btn">
        <div class="search-item">
          <v-icon icon="home" />
          <div class="search-item__content">
            <div class="search-item__title">멀티캠퍼스 역삼</div>
            <div class="search-item__desc">서울시 강남구 역삼동</div>
          </div>
        </div>
      </v-btn>
      <v-divider />
      <v-btn elevation="0" rounded="0" class="search-item-btn">
        <div class="search-item">
          <v-icon icon="home" />
          <div class="search-item__content">
            <div class="search-item__title">이재용의 집</div>
            <div class="search-item__desc">서울시 무슨구 어딘가동</div>
          </div>
        </div>
      </v-btn>
      <v-divider />
    </div>

    <div class="ma-6" style="color: rgba(0, 0, 0, 0.7)">
      검색어를 입력해주세요.
    </div>

    <div class="ma-6" style="color: rgba(0, 0, 0, 0.7)">
      검색 결과가 없습니다.
    </div>
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