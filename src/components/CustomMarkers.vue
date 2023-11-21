<script setup lang="ts">
import { inject, watch } from 'vue'
import '@/assets/marker.css'

import type { Apt, Sidogun } from '@/api/place'

export interface Props {
  markers: (Apt | (Sidogun & { level: number }))[]
  LatLng: any
  CustomOverlay: any
  activeId: string
}

const props = withDefaults(defineProps<Partial<Props>>(), {
  markers: () => []
})

const emit = defineEmits<{
  marker_click: [apt: Props['markers'][0]]
}>()

const map = (inject('map') as any).map

const ZINDEX = 0
const ZINDEX_HOVER = 40

let overlays: Record<Props['markers'][0]['id'], typeof props.CustomOverlay> = {}

watch(
  () => props.markers,
  (markers) => {
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
  },
  { flush: 'post' }
)

watch(
  [() => props.markers, () => props.activeId],
  ([, activeId]) => {
    for (const [id, overlay] of Object.entries(overlays)) {
      if (id === activeId) {
        overlay.getContent().classList.add('marker--hover')
      } else {
        overlay.getContent().classList.remove('marker--hover')
      }
    }
  }, { immediate: true, flush: 'post' }
)

const formatter = Intl.NumberFormat('ko-KR', { notation: 'compact' })

function createContent(marker: Apt | Sidogun & { level: number }, overlay: typeof props.CustomOverlay) {
  const wrapper = document.createElement('div')

  const base = document.createElement('div')
  base.classList.add('marker__base')

  const title = document.createElement('div')
  title.classList.add('marker__title')
  const desc = document.createElement('div')
  desc.classList.add('marker__desc')

  wrapper.appendChild(base)
  base.appendChild(title)
  base.appendChild(desc)

  base.addEventListener('mouseenter', () => {
    overlay.setZIndex(ZINDEX_HOVER)
  })
  base.addEventListener('mouseleave', () => {
    overlay.setZIndex(ZINDEX)
  })
  base.addEventListener('click', () => {
    emit('marker_click', marker)
  })

  // 내용 설정
  if ('cnt' in marker) {
    desc.innerText = marker.name
    title.innerText = marker.cnt + '건'
  } else {
    const name = document.createElement('div')
    name.classList.add('marker__name')
    wrapper.appendChild(name)

    title.innerText = formatter.format(marker.price * 10000)
    desc.innerText = Math.round(marker.area * 10) / 10 + 'm²'
    name.innerText = marker.name
  }
  return wrapper
}
</script>

<template>
  <slot></slot>
</template>

<style></style>
