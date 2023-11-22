<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{ initialValue?: string }>()

const emit = defineEmits<{
  'search': [value: string]
}>()

const value = ref(props.initialValue ?? '')
</script>

<template>
  <v-text-field density="compact" variant="outlined" label="동, 지하철, 아파트 검색" append-inner-icon="search" rounded="0"
    single-line hide-details clearable class="ma-6" v-model="value" @click:append-inner="() => emit('search', value)"
    @keydown.enter="() => emit('search', value)">
  </v-text-field>
</template>
