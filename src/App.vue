<script setup lang="ts">
import { ref } from "vue";
import { InfoWindow, KakaoMap, Marker, useKakaoLoader } from "vue-kakao-maps";

setTimeout(() => useKakaoLoader({ appKey: import.meta.env.VITE_KAKAO_JAVASCRIPT_APP_KEY }), 100)
const open = ref(false)
</script>

<template>
  <div>
    <KakaoMap :center="{ lat: 37.5013, lng: 127.0395 }" style="width: 100%; height: 100vh;">
      <Marker :position="{ lat: 37.5013, lng: 127.0395 }" clickable @mouseover="() => open = true"
        @mouseout="() => open = false">
        <InfoWindow :open="open">
          <div style="width: 150px; padding: 5px">
            여기는 멀티캠퍼스 역삼
          </div>
        </InfoWindow>
      </Marker>
    </KakaoMap>
  </div>
</template>

<style scoped></style>
