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
    const no = route.params.no.toString()
    getQna(no).then(res => qna.value = res.data).catch(console.error);
})

function remove() {
    const no = route.params.no.toString()!
    deleteQna(no).then(() => router.push({ name: 'list' })).catch(err => alert("글 삭제 실패!: " + err))
}
</script>

<template>
    <v-main v-if="qna">
        <h1>Q&A</h1>
        <h2>{{ qna.subject }}</h2>
        <!-- <div>작성자: {{ qna.userName }}, 조회수: {{ qna.hit }}</div> -->
        <div>조회수: {{ qna.hit }}</div>
        <div>작성일: {{ qna.registerTime }}</div>
        <hr>
        <div class="content">{{ qna.content }}</div>
        <router-link :to="{ name: 'edit' }">
            <v-btn>글수정</v-btn>
        </router-link>
        <v-btn @click="remove">글삭제</v-btn>
        <router-link :to="{ name: 'list' }">
            <v-btn>글목록</v-btn>
        </router-link>
    </v-main>
</template>

<style scoped>
.content {
    white-space: pre;
}
</style>