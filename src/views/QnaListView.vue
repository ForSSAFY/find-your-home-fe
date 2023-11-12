<script setup lang="ts">
import { listQna } from "@/api/qna";
import { watch } from "vue";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

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
    listQna().then(res => { list.value = res.data.articles }).catch(console.error);
})
</script>

<template>
    <v-main>
        <h1>Q&A</h1>
        <v-table density="compact">
            <thead>
                <tr>
                    <th>No</th>
                    <th>제목</th>
                    <!-- <th>작성자</th> -->
                    <th>작성일</th>
                    <th>조회수</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(qna, index) in list" :key="index"
                    @click="router.push({ name: 'view', params: { no: qna.articleNo } })" style="cursor: pointer;">
                    <td>{{ qna.articleNo }}</td>
                    <td>{{ qna.subject }}</td>
                    <!-- <td>{{ qna.userName }}</td> -->
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