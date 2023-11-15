<script lang="ts" setup></script>

<template>
  <v-main>
    <div class = "main-container">
      <v-card ref="form">
        <v-card-text>
          <h2 class="pb-4">회원 가입</h2>
          <v-text-field placeholder="닉네임" required></v-text-field>
          <v-text-field placeholder="아이디" required></v-text-field>
          <v-text-field placeholder="비밀번호" required></v-text-field>
          <v-text-field placeholder="비밀번호 확인" required></v-text-field>
        </v-card-text>
      </v-card>
    </div>
  </v-main>
</template>
<style scoped>
.main-container{
  width: 100vw;
}
</style>
