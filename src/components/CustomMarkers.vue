<script setup lang="ts">
import { inject, watch } from 'vue';
import '@/assets/marker.css'

interface Marker {
  id: string
  name: string
  lat: number
  lng: number
}

export interface Props {
  markers?: Marker[],
  LatLng?: any
  CustomOverlay?: any
}

const props = withDefaults(defineProps<Props>(), {
  markers: () => []
})

const emit = defineEmits<{
  marker_click: [{ lat: number, lng: number, level?: number }]
}>()

const map = (inject('map') as any).map

const ZINDEX = 0
const ZINDEX_HOVER = 40

let overlays: Record<Marker['id'], typeof props.CustomOverlay> = {}

watch(() => props.markers, markers => {
  const oldOverlays = overlays
  overlays = {}
  if (Array.isArray(markers)) {
    for (const marker of markers) {
      if (marker.id in oldOverlays) {
        overlays[marker.id] = oldOverlays[marker.id]
        delete oldOverlays[marker.id]
      } else {
        const overlay = new props.CustomOverlay({
          map: map.value,
          clickable: true,
          xAnchor: 0.5,
          yAnchor: 1.24,
          position: new props.LatLng(marker.lat, marker.lng),
          zIndex: ZINDEX
        })
        overlay.setContent(createContent(marker, overlay))
        overlays[marker.id] = overlay
      }
    }
  }
  for (const [, overlay] of Object.entries(oldOverlays)) {
    overlay.setMap(null)
  }
}, { flush: 'post' })

function createContent(marker: Marker, overlay: typeof props.CustomOverlay) {
  const wrapper = document.createElement('div')
  wrapper.classList.add('marker__wrapper')
  const title = document.createElement('div')
  title.classList.add('marker__title')
  const desc = document.createElement('div')
  desc.classList.add('marker__desc')
  wrapper.appendChild(title)
  wrapper.appendChild(desc)
  wrapper.addEventListener('mouseenter', () => {
    overlay.setZIndex(ZINDEX_HOVER)
  })
  wrapper.addEventListener('mouseleave', () => {
    overlay.setZIndex(ZINDEX)
  })
  wrapper.addEventListener('click', () => {
    const level = 'level' in marker ? { level: marker.level as number } : {}
    console.log('marker click', marker)
    emit('marker_click', {
      ...level,
      lat: marker.lat,
      lng: marker.lng,
    })
  })
  // 내용 설정
  if ('cnt' in marker) {
    desc.innerText = marker.name
    title.innerText = marker.cnt as string + '건'
  } else {
    title.innerText = marker.name
    desc.innerText = '123m²'
  }
  return wrapper
}
</script>

<template>
  <slot></slot>
</template>

<style></style>