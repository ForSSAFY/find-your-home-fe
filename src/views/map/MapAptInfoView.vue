<script setup lang="ts">
import type { Ref } from 'vue'
import { inject } from 'vue'
import type { LatLng, LatLngBounds } from 'vue-kakao-maps'
import type { AptInfo } from '@/api/place'

const props = defineProps<AptInfo>()

const { signalCenter, setCenter, signalLevel, setLevel, bounds, updateMarkers, selectedId } =
  inject<{
    signalCenter: Ref<LatLng>
    setCenter: (center: LatLng) => void
    signalLevel: Ref<number>
    setLevel: (level: number) => void
    bounds: Ref<LatLngBounds>
    updateMarkers: () => void
    selectedId: Ref<string>
  }>('mapView')!

function toPriceString(price: number): string {
  const 억 = Math.floor(price / 1_0000_0000)
  const 만 = Math.floor(price / 1_0000)
  if (price > 1_0000_0000) {
    return `${억}억 ${만}`
  } else {
    return `${만}`
  }
}
</script>

<template>
  <section class="apt-info">
    <div>
      <div class="apt-info__top">
        <header class="apt-info__header">
          <h3 class="apt-info__title">{{ props.name }}</h3>
          <p class="apt-info__address">{{ props.address }}</p>
          <p class="apt-info__desc">
            <span>{{ props.date }}</span>
            <v-divider vertical />
            <span>{{ props.area }}m²</span>
          </p>
        </header>
        <v-btn variant="text" icon="close" class="mt-n3 mr-n2" @click="
          $router.push({
            name: 'index',
            query: {
              lat: signalCenter.lat,
              lng: signalCenter.lng,
              zoom: signalLevel
            }
          })
          " />
      </div>

      <div class="apt-price">
        <div class="apt-price__label">최근 거래가</div>
        <div class="apt-price__price">{{ toPriceString(props.price) }}</div>
      </div>

      <v-divider />
    </div>

    <div>
      <ul class="apt-nearby">
        {{
          props.nearby
        }}
        <template v-for="(item, i) of props.nearby" :key="i">
          <li class="apt-nearby__item" v-if="item.type === 'subway'">
            <v-icon v-if="item.type === 'subway'" color="grey-darken-1" icon="subway" />
            <span>
              {{ item.name }}까지 걸어서
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
        <v-divider />
      </ul>
    </div>

    <ul class="apt-deal">
      <template v-for="item, i of props.deals" :key="i">
        <li class="apt-deal__item">
          <div class="apt-deal__date">{{ item.date }}</div>
          <div class="apt-deal__name">{{ item.name }}</div>
          <div class="apt-deal__price">매매 {{ item.price }}</div>
          <div class="apt-deal__info">
            <span>{{ item.dong }}동</span>
            <v-divider vertical />
            <span>{{ item.floor }}층</span>
          </div>
        </li>
        <v-divider />
      </template>
      <li class="apt-deal__item">
        <div class="apt-deal__date">2023.11.20</div>
        <div class="apt-deal__name">기아아파트</div>
        <div class="apt-deal__price">매매 12억 1200</div>
        <div class="apt-deal__info">
          <span>101동</span>
          <v-divider vertical />
          <span>5층</span>
        </div>
      </li>
      <v-divider />
      <li class="apt-deal__item">
        <div class="apt-deal__date">2023.06.06</div>
        <div class="apt-deal__name">음지아파트</div>
        <div class="apt-deal__price">매매 22억 9687</div>
        <div class="apt-deal__info">
          <span>201동</span>
          <v-divider vertical />
          <span>13층</span>
        </div>
      </li>
      <v-divider />
      <li class="apt-deal__item">
        <div class="apt-deal__date">2023.07.05</div>
        <div class="apt-deal__name">삼성아파트</div>
        <div class="apt-deal__price">매매 3조 5000억</div>
        <div class="apt-deal__info">
          <span>333동</span>
          <v-divider vertical />
          <span>33층</span>
        </div>
      </li>
      <v-divider />
      <li class="apt-deal__item">
        <div class="apt-deal__date">2023.12.31.</div>
        <div class="apt-deal__name">뷰파트</div>
        <div class="apt-deal__price">매매 5300</div>
        <div class="apt-deal__info">
          <span>1205동</span>
          <v-divider vertical />
          <span>1층</span>
        </div>
      </li>
      <v-divider />
    </ul>
  </section>
</template>

<style scoped>
.apt-info {
  display: grid;
  grid-template-rows: min-content min-content auto;
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

.apt-deal {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  height: 100%;
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
</style>
