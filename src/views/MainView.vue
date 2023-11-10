<script lang="ts" setup>
import CardView from "@/components/template/CardView.vue"
const cards = [
  { title: '안녕', subtitle: '음하핳', text: '1' },
  { title: '안녕', subtitle: '음하핳', text: '1' },
  { title: '안녕', subtitle: '음하핳', text: '1' },
  { title: '안녕', subtitle: '음하핳', text: '1' }
]
</script>
<template>
  <v-main>
    <div class="main-video">
      <video src="\src\assets\cityview.mp4" muted loop autoplay playsinline></video>
      <!-- <img src="\src\assets\sample.jpg" /> -->
      <div class="main-video-text">
        <h1>Find Your House</h1>
        <p>우리는 당신이 편하게 쉴 수 있는 집을 찾아 주고 싶습니다.</p>
        <br />
        <div class="main-search p-4">
          <v-text-field class="pa-1 " placeholder="검색어를 입력해주세요" hide-details="auto"></v-text-field>
          <v-btn icon><svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="4"/><path d="M13 4.069V2h-2v2.069A8.01 8.01 0 0 0 4.069 11H2v2h2.069A8.008 8.008 0 0 0 11 19.931V22h2v-2.069A8.007 8.007 0 0 0 19.931 13H22v-2h-2.069A8.008 8.008 0 0 0 13 4.069zM12 18c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6z"/></svg></v-btn>
          <v-btn>검색</v-btn>
        </div>
      </div>
    </div>
    <div class="main-news">
      <h3>부동산 뉴스</h3>
      <div class="main-news-detail">
        <CardView/>
        <CardView/>
        <CardView/>
        <CardView/>
      </div>
    </div>
    <div class="main-notice">
      <h3>공지 사항</h3>
      <ul>
        <li>[공지] Find your house 개인정보처리방침 (2023/09/21) 개정안내</li>
        <li>[공지] Find your house 개인정보처리방침 (2023/08/21) 개정안내</li>
        <li>[공지] Find your house 개인정보처리방침 (2023/07/21) 개정안내</li>
        <li>[공지] Find your house 개인정보처리방침 (2023/06/21) 개정안내</li>
      </ul>
    </div>
  </v-main>
</template>

<style scoped>
.main-video {
  position: relative;
  width: 100vw;
  height: 460px;
  overflow-y: hidden;
  overflow-x: hidden;
}
.main-video-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  text-align: center;
  box-shadow: 5px;
}

video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
/* 
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
} */

.main-search {
  text-align: center;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
}

.main-news {
  text-align: center;
}

.main-news-detail{
   display: grid;
   grid-template-columns: 1fr 1fr;
   max-width: 1000px;
   margin: 0 auto;
}
.main-notice {
    margin-top: 10%;
  text-align: center;
}


</style>
