<script setup lang="ts">
import { localAxios } from "@/utils/http-commons";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const axios = localAxios()
const route = useRoute();

interface Qna {
    articleNo: number
    userName: string
    subject: string
    content: string
    hit: number
    registerTime: string
}

const qna = ref<Qna>();

onMounted(() => {
    axios.get("/board/" + route.query.no).then(res => qna.value = res.data).catch(console.error);
    qna.value = {
        articleNo: 1, userName: "writer", subject: "temp data subject", content: "content", hit: 1, registerTime: new Date().toLocaleString()
    }
})
</script>

<template>
    <h1>Q&A</h1>
    <v-main v-if="qna">
        <v-text-field label="제목" v-model="qna.subject"></v-text-field>
        <div>작성자: {{ qna.userName }}</div>
        <div>작성일: {{ qna.registerTime }}</div>
        <hr>
        <v-textarea label="내용" v-model="qna.content"></v-textarea>
        <!-- <router-link :to="{ name: 'edit' }"> -->
        <v-btn disabled>저장</v-btn>
        <!-- </router-link> -->
        <router-link :to="{ name: 'view', query: { no: route.query.no } }">
            <v-btn>취소</v-btn>
        </router-link>
    </v-main>
</template>

<style scoped></style>