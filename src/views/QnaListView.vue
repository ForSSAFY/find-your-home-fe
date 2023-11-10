<script setup lang="ts">
import { localAxios } from "@/utils/http-commons";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const axios = localAxios()
const router = useRouter()

type QnaList = {
    articleNo: number
    userName: string
    subject: string
    content: string
    hit: number
    registerTime: string
}[]

const list = ref<QnaList>([]);

onMounted(() => {
    axios.get("/board").then(res => list.value = res.data).catch(console.error);
    list.value = [9, 8, 7, 6, 5, 4, 3, 2, 1].map(no => ({
        articleNo: no, userName: "writer", subject: "subject", content: "content", hit: no, registerTime: new Date().toLocaleString()
    }))
})
</script>

<template>
    <h1>Q&A</h1>
    <v-main>
        <v-table density="compact">
            <thead>
                <tr>
                    <th>No</th>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>작성일</th>
                    <th>조회수</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(qna, index) in list" :key="index"
                    @click="router.push({ name: 'view', params: { no: qna.articleNo } })">
                    <td>{{ qna.articleNo }}</td>
                    <td>{{ qna.subject }}</td>
                    <td>{{ qna.userName }}</td>
                    <td>{{ qna.registerTime }}</td>
                    <td>{{ qna.hit }}</td>
                </tr>
            </tbody>
        </v-table>
        <router-link :to="{ name: 'write' }">
            <v-btn>글쓰기</v-btn>
        </router-link>
    </v-main>
</template>

<style scoped></style>