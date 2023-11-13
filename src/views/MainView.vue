<script lang="ts" setup>
import CardView from "@/components/template/CardView.vue"
const cards = [
  { title: '제목1', subtitle: '부제목1', imgurl: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg' },
  { title: '제목2', subtitle: '부제목2', imgurl: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg' },
  { title: '제목3', subtitle: '부제목3', imgurl: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg' },
  { title: '제목4', subtitle: '부제목4', imgurl: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg' }
]
const notices = [
  { title: '[공지] Find your house 개인정보처리방침 (2023/09/21) 개정안내' },
  { title: '[공지] Find your house 개인정보처리방침 (2023/08/21) 개정안내' },
  { title: '[공지] Find your house 개인정보처리방침 (2023/07/21) 개정안내' },
  { title: '[공지] Find your house 개인정보처리방침 (2023/06/21) 개정안내' },
]
</script>
<template>
  <v-main>
    <div class="initial-screen">
      <div class="main-video">
        <video src="\src\assets\cityview.mp4" muted loop autoplay playsinline></video>
        <!-- <img src="\src\assets\sample.jpg" /> -->
        <div class="main-video-container">
          <div class="main-video-text">
            <h1>Find Your Home</h1>
            <p>우리는 당신이 편하게 쉴 수 있는 집을 찾아 주고 싶습니다.</p>
            <br />
          </div>
          <div class="main-video-search pa-2">
            <v-text-field class="main-search-input" variant="solo" placeholder="검색어를 입력해주세요" hide-details="auto"></v-text-field>
            <v-btn icon><svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="4"/><path d="M13 4.069V2h-2v2.069A8.01 8.01 0 0 0 4.069 11H2v2h2.069A8.008 8.008 0 0 0 11 19.931V22h2v-2.069A8.007 8.007 0 0 0 19.931 13H22v-2h-2.069A8.008 8.008 0 0 0 13 4.069zM12 18c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6z"/></svg></v-btn>
            <v-btn>검색</v-btn>
          </div>
        </div>
      </div>
    </div>
    <div class="next-screen">
      <div class="main-news">
        <h2>부동산 뉴스</h2>
        <div class="main-news-detail">
          <CardView v-for="c in cards" v-bind="c" :key="c.title" class="main-news-detail-card"/>
        </div>
      </div>
      <div class="main-notice">
        <h2>공지 사항</h2>
        <table>
          <tr v-for="n in notices" :key="n.title">
            <td>{{ n.title }}</td>
          </tr>
        </table>
      </div>
    </div>
  </v-main>
</template>

<style scoped>
/* 초기 화면 */
.initial-screen{
  height: 100vh;
}
.main-video {
  position: relative;
  width: 100vw;
  height: 55vh;
  /* overflow-y: hidden; */
  /* overflow-x: hidden; */
}
.main-video-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  text-align: center;
  box-shadow: 1vw;
}

video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.main-video-search {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  margin: auto;
  gap: 0.5rem;
  width: 45vw;
  border: 1px solid #e2e0dd;
  border-radius: 8px;
}

.main-search-input{
  background-color:white;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
}

/* 두번째 화면 시작 */
.next-screen{
  margin: 5vw;
}
/* 뉴스 화면 */
.main-news {
  text-align: center;
}

.main-news-detail{
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-width: 1000px;
  margin: 2vh auto;
}

.main-news-detail-card{
  margin-left:1vh;
  margin-bottom:1vh;
}

/* 공지사항 화면 */
.main-notice {
  margin-top: 10%;
  text-align: center;
}

.main-notice table {
  margin-top: 10%;
  text-align: center;
  margin: 0 auto;
}
.main-notice table tr td {
  margin-top: 10%;
  text-align: center;
  padding: 1vh;
}


</style>
