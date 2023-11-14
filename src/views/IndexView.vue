<script setup lang="ts">
import HeaderView from "@/components/layout/HeaderView.vue"
import FooterView from "@/components/layout/FooterView.vue"
</script>

<template>
    <HeaderView/>
    <router-view></router-view>
    <FooterView/>
</template>

<style scoped>

</style>