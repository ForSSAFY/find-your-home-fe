<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  modelValue?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'search': [value: string]
}>()

const value = ref('')
</script>

<template>
  <v-text-field density="compact" variant="outlined" label="동, 지하철, 아파트 검색" append-inner-icon="search" rounded="0"
    single-line hide-details class="ma-6" :model-value="props.modelValue"
    @update:model-value="(val) => { value = val; emit('update:modelValue', val) }"
    @click:append-inner="() => emit('search', value)">
  </v-text-field>
</template>
