<script setup lang="ts">
import { getAptInfo, type AptInfo } from '@/api/place';
import { inject, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { MapViewContext } from './MapView.vue';

const route = useRoute()
const router = useRouter()

const { signalCenter, center, signalLevel, level, activeId } = inject<MapViewContext>('mapView')!

const info = ref<AptInfo | null | undefined>(undefined)

watch(() => route.params.id, (id) => {
  activeId.value = id?.toString()
  if (!activeId.value) return
  getAptInfo(activeId.value)
    .then(res => info.value = res.data)
    .then(apt => {
      signalCenter.value = { lat: apt.lat, lng: apt.lng }
      signalLevel.value = Math.min(level.value, 4);
    })
    .catch(() => info.value = null)
}, { immediate: true })

function onCloseClick() {
  // 선택된 마커 제거
  activeId.value = '';
  // 현재 좌표로 메인화면으로 이동
  router.push({
    name: 'search',
    query: {
      lat: center.value.lat,
      lng: center.value.lng,
      level: level.value
    }
  })
}

function toPriceString(price: number): string {
  const 억 = Math.floor(price / 1_0000_0000)
  const 만 = Math.floor(price / 1_0000 % 1_0000)
  if (억 > 0) {
    if (만 > 0) {
      return `${억}억 ${만}만`
    } else {
      return `${억}억`
    }
  } else {
    return `${만}만`
  }
}
</script>

<template>
  <!-- Loading -->
  <div v-if="info === undefined" class="apt-loading">
    <v-progress-circular indeterminate :size="60" />
    <v-btn variant="text" icon="close" style="position: absolute; top: 1rem; right: 1rem;" @click="onCloseClick" />
  </div>
  <!-- Wrong id -->
  <div v-if="info === null">
    <div class="apt-info__top">
      <header class="apt-info__header">
        <h3 class="apt-info__title">
          <v-icon icon="error" />
          잘못된 아파트 주소입니다.
        </h3>
      </header>
      <v-btn variant="text" icon="close" class="mt-n2 mr-n2" @click="onCloseClick" />
    </div>
  </div>
  <!-- Ok -->
  <section class="apt-info" v-if="info">
    <div>
      <div class="apt-info__top">
        <header class="apt-info__header">
          <h3 class="apt-info__title">{{ info.name }}</h3>
          <p class="apt-info__address">{{ info.address }}</p>
          <p class="apt-info__desc">
            <span>{{ info.date }}</span>
            <v-divider vertical />
            <span>{{ info.area }}m²</span>
          </p>
        </header>
        <v-btn variant="text" icon="close" class="mt-n2 mr-n2" @click="onCloseClick" />
      </div>

      <div class="apt-price">
        <div class="apt-price__label">최근 거래가</div>
        <div class="apt-price__price">{{ toPriceString(info.price * 10000) }}</div>
      </div>

      <v-divider />
    </div>

    <div>
      <ul class="apt-nearby">
        <template v-for="(item, i) of info.nearby" :key="i">
          <li class="apt-nearby__item" v-if="item.type === 'subway'">
            <v-icon v-if="item.type === 'subway'" color="grey-darken-1" icon="subway" />
            <span>
              <span class="text-grey-darken-2 font-weight-bold">{{ item.name }}</span>까지 걸어서
              <span class="text-grey-darken-1 font-weight-bold">{{ item.minutes }}분</span>
            </span>
          </li>
          <li class="apt-nearby__item" v-if="item.type === 'store'">
            <v-icon color="blue" icon="store" />
            <span>
              편의점까지 걸어서
              <span class="text-blue font-weight-bold">{{ item.minutes }}분</span>
            </span>
          </li>
          <li class="apt-nearby__item" v-if="item.type === 'park'">
            <v-icon color="green" icon="nature_people" />
            <span>
              공원까지 걸어서
              <span class="text-green font-weight-bold">{{ item.minutes }}분</span>
            </span>
          </li>
          <li class="apt-nearby__item" v-if="item.type === 'charger'">
            <v-icon color="red" icon="ev_station" />
            <span>
              전기차 충전소까지 차로
              <span class="text-red font-weight-bold">{{ item.minutes }}분</span>
            </span>
          </li>
        </template>
      </ul>
      <v-divider />
      <div class="apt-deal-label">
        실거래가 {{ info.deals.length }}건
      </div>
    </div>

    <ul class="apt-deal">
      <template v-for="item, i of info.deals" :key="i">
        <li class="apt-deal__item">
          <div class="apt-deal__date">{{ item.date }}</div>
          <div class="apt-deal__name">{{ info.name }}</div>
          <div class="apt-deal__price">매매 {{ toPriceString(item.price * 10000) }}</div>
          <div class="apt-deal__info">
            <span>{{ item.floor }}층</span>
          </div>
        </li>
        <v-divider />
      </template>
    </ul>
  </section>
</template>

<style scoped>
.apt-info {
  display: grid;
  grid-template-rows: min-content min-content auto;
  height: 100%;
  overflow-y: hidden;
  line-height: 1;
}

.apt-info__top {
  width: 100%;
  padding: 1.5rem;
  display: flex;
  align-items: top;
  justify-content: space-between;
}

.apt-info__header {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.apt-info__title {
  font-size: larger;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.apt-info__address {
  margin-top: 0.5rem;
  font-weight: 400;
}

.apt-info__desc {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 300;
  color: rgba(0, 0, 0, 0.7);
}

.apt-info__placeholder {
  height: 91.2px;
}

.apt-price {
  padding: 0 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.apt-price__label {
  font-weight: 500;
}

.apt-price__price {
  font-size: x-large;
  font-weight: 700;
}

.apt-nearby {
  padding: 1rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.apt-nearby__item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.apt-deal-label {
  padding: 1rem 1.5rem;
}

.apt-deal {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  max-height: 100%;
}

.apt-deal__item {
  padding: 1rem 1.5rem;
  display: flex;
  flex-direction: column;
}

.apt-deal__date {
  font-size: small;
}

.apt-deal__name {
  margin-top: 0.5rem;
  font-size: large;
}

.apt-deal__info {
  margin-top: 0.5rem;
  display: flex;
  gap: 0.5rem;
  font-weight: 300;
  color: rgba(0, 0, 0, 0.7);
}

.apt-deal__price {
  margin-top: 0.5rem;
  font-size: large;
  font-weight: 700;
}

.apt-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
