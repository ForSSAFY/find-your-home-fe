<script setup lang="ts">
import { deleteQna, getQna } from "@/api/qna";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute()
const router = useRouter();

interface Qna {
    articleNo: number
    userName: string
    subject: string
    content: string
    hit: number
    registerTime: string
}

const qna = ref<Qna>()

onMounted(() => {
    const no = route.query.no?.toString()!
    getQna(no).then(res => qna.value = res.data).catch(console.error);
    qna.value = {
        articleNo: 1, userName: "writer", subject: "temp data subject", content: "content", hit: 1, registerTime: new Date().toLocaleString()
    }
})

function remove() {
    const no = route.query.no?.toString()!
    deleteQna(no).then(() => router.push({ name: 'list' })).catch(err => alert("글 삭제 실패!: " + err))
}
</script>

<template>
    <h1>Q&A</h1>
    <v-main v-if="qna">
        <h2>{{ qna.subject }}</h2>
        <div>작성자: {{ qna.userName }}, 조회수: {{ qna.hit }}</div>
        <div>작성일: {{ qna.registerTime }}</div>
        <hr>
        <div>{{ qna.content }}</div>
        <router-link :to="{ name: 'edit' }">
            <v-btn>글수정</v-btn>
        </router-link>
        <v-btn @click="remove">글삭제</v-btn>
        <router-link :to="{ name: 'list' }">
            <v-btn>글목록</v-btn>
        </router-link>
    </v-main>
</template>

<style scoped></style>