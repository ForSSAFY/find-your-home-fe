<script setup lang="ts">
import { onMounted } from 'vue';
import { ref } from 'vue';

const props = defineProps<{
  /** `[lat, lng]` */
  center: [number, number]
}>();

const map = ref<kakao.maps.Map | null>(null);
// const kakaoMarkers = ref<kakao.maps.Marker[]>([]);
const loaded = ref(false);

onMounted(() => {
  if (window.kakao && window.kakao.maps) {
    loadMap();
  } else {
    loadScript();
  }
})

// watch([loaded, () => props.markers], ([, newMarkers]) => {
//   if (!loaded.value) return;
//   for (const kakaoMarker of kakaoMarkers.value) {
//     kakaoMarker.setMap(null);
//   }
//   if (newMarkers) {
//     kakaoMarkers.value = newMarkers.map(addMarker);
//   }
// }, { immediate: true, deep: true });

function loadScript() {
  const script = document.createElement("script");
  script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=" + import.meta.env.VITE_KAKAO_JAVASCRIPT_APP_KEY + "&autoload=false";
  script.onload = () => window.kakao.maps.load(loadMap);
  document.head.appendChild(script);
}

function loadMap() {
  const container = document.getElementById("map")!;
  const options = {
    center: new window.kakao.maps.LatLng(...props.center),
    level: 3
  };
  map.value = new window.kakao.maps.Map(container, options);
  loaded.value = true;
}

// function addMarker(marker: MarkerInfo) {
//   const position = new window.kakao.maps.LatLng(...marker.position);
//   const kakaoMarker = new window.kakao.maps.Marker({ position });
//   kakaoMarker.setMap(map.value);
//   return kakaoMarker;
// }
</script>

<template>
  <div id="map"></div>
</template>

<style scoped>
#map {
  width: 100%;
  height: 350px;
}
</style>