<script setup lang="ts">
import { editQna, getEditQna } from "@/api/qna";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

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
    const no = route.params.no.toString()!;
    getEditQna(no).then(res => qna.value = res.data).catch(console.error);
})

function modify() {
    if (!qna.value) return;
    if (qna.value.subject.trim().length < 1) {
        alert("제목을 작성해주세요");
        return;
    }
    if (qna.value.content.trim().length < 1) {
        alert("내용을 작성해주세요");
        return;
    }

    const no = route.params.no.toString()!;
    editQna(no, { subject: qna.value.subject, content: qna.value.content })
        .then(() => router.push({ name: 'view', query: { no } }))
        .catch(err => alert("글 수정 실패!: " + err))
}
</script>

<template>
    <v-main v-if="qna">
        <h1>Q&A</h1>
        <v-text-field label="제목" v-model="qna.subject"></v-text-field>
        <!-- <div>작성자: {{ qna.userName }}</div> -->
        <div>작성일: {{ qna.registerTime }}</div>
        <hr>
        <v-textarea label="내용" v-model="qna.content"></v-textarea>
        <v-btn @click="modify">저장</v-btn>
        <router-link :to="{ name: 'view', query: { no: route.query.no } }">
            <v-btn>취소</v-btn>
        </router-link>
    </v-main>
</template>

<style scoped></style>