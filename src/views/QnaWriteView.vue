<script setup lang="ts">
import { writeQna } from "@/api/qna";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

interface WriteQnaReq {
    subject: string
    content: string
}

const qnaReq = ref<WriteQnaReq>({
    subject: '',
    content: ''
});

function post() {
    if (qnaReq.value.subject.trim().length < 1) {
        alert("제목을 작성해주세요");
        return;
    }
    if (qnaReq.value.content.trim().length < 1) {
        alert("내용을 작성해주세요");
        return;
    }

    writeQna(qnaReq.value)
        .then(() => router.push({ name: 'list' }))
        .catch((err) => alert("글 작성 에러!: " + err))
}

</script>

<template>
    <v-main>
        <h1>Q&A</h1>
        <v-text-field label="제목" v-model="qnaReq.subject"></v-text-field>
        <!-- <div>작성자: (나중에 넣기)</div> -->
        <hr>
        <v-textarea label="내용" v-model="qnaReq.content"></v-textarea>
        <v-btn @click="post">작성</v-btn>
        <router-link :to="{ name: 'list' }">
            <v-btn>취소</v-btn>
        </router-link>
    </v-main>
</template>

<style scoped></style>