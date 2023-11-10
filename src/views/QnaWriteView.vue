<script setup lang="ts">
import { localAxios } from "@/utils/http-commons";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const axios = localAxios()

interface QnaReq {
    subject: string
    content: string
}

const qna = ref<QnaReq>({
    subject: '',
    content: ''
});
</script>

<template>
    <h1>Q&A</h1>
    <v-main v-if="qna">
        <v-text-field label="제목" v-model="qna.subject"></v-text-field>
        <div>작성자: (나중에 넣기)</div>
        <hr>
        <v-textarea label="내용" v-model="qna.content"></v-textarea>
        <!-- <router-link :to="{ name: 'edit' }"> -->
        <v-btn disabled>작성</v-btn>
        <!-- </router-link> -->
        <router-link :to="{ name: 'list' }">
            <v-btn>취소</v-btn>
        </router-link>
    </v-main>
</template>

<style scoped></style>