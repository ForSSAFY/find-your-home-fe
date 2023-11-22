<script lang="ts" setup>
import CardView from '@/components/template/CardView.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const searchWord = ref('');
const lat = ref(0);
const lng = ref(0);

const cards = [
  {
    title: '제목1',
    description: '부제목1',
    imgurl: 'https://imgnews.pstatic.net/image/015/2023/11/17/0004915131_001_20231117082301050.jpg?type=w647',
    href: "https://n.news.naver.com/article/015/0004915131"
  },
  {
    title: '제목2',
    description: '부제목2',
    imgurl: 'https://imgnews.pstatic.net/image/023/2023/11/17/0003799646_001_20231117030316203.jpg?type=w647',
    href: "https://n.news.naver.com/article/015/0004915131"
  },
  {
    title: '제목3',
    description: '부제목3',
    imgurl: 'https://imgnews.pstatic.net/image/015/2023/11/17/0004915131_001_20231117082301050.jpg?type=w647',
    href: "https://n.news.naver.com/article/015/0004915131"
  }
]
const notices = [
  { date: 20231117, title: '[공지] Find your house 개인정보처리방침 (2023/09/21) 개정안내' },
  { date: 20231117, title: '[공지] Find your house 개인정보처리방침 (2023/08/21) 개정안내' },
  { date: 20231117, title: '[공지] Find your house 개인정보처리방침 (2023/07/21) 개정안내' },
  { date: 20231117, title: '[공지] Find your house 개인정보처리방침 (2023/06/21) 개정안내' }
]

/* 현재 위치 get*/
const currentPosition = () => {
  navigator.geolocation.getCurrentPosition((position) => {
    lat.value = position.coords.latitude
    lng.value = position.coords.longitude
    searchWord.value = "현재 위치"
    console.log(lat.value, lng.value)
  })
}

/* 검색 */
const search = () => {
  if (searchWord.value == "현재 위치") {
    router.push({ name: 'map', query: { lat: lat.value, lng: lng.value } })
  } else if (searchWord.value == "") {
    alert("검색어를 입력해주세요")
  }
  else {
    router.push({ name: 'search', query: { search: searchWord.value } })
  }
}
</script>
<template>
  <div class="main-video">
    <video src="\src\assets\cityview.mp4" muted loop autoplay playsinline></video>
    <!-- <img src="\src\assets\sample.jpg" /> -->
    <div class="main-video-container">
      <div class="main-video-text">
        <h1>FIND YOUR HOME</h1>
        <p>우리는 당신이 편하게 쉴 수 있는 집을 찾아 주고 싶습니다.</p>
        <br />
      </div>
      <div class="main-video-search pa-2">
        <v-text-field class="main-search-input ma-0 pa-0" variant="solo" placeholder="검색어를 입력해주세요" hide-details flat
          :model-value="searchWord" @update:model-value="newValue => searchWord = newValue"></v-text-field>
        <v-btn icon="my_location" :elevation="0" @click="currentPosition()"></v-btn>
        <v-btn rounded="0" class="main-search-button" @click="search()">검색</v-btn>
      </div>
    </div>
  </div>

  <div class="next-screen">
    <div class="main-news">
      <div class="header news-header">
        <h2>뉴스</h2>
        <div class="header-more-box">
          <router-link :to="{ name: 'news' }" class="header-more">더보기<v-icon icon="add"></v-icon></router-link>
        </div>
      </div>
      <div class="main-news-detail">
        <CardView v-for="c in cards" v-bind="c" :key="c.title" />
      </div>
    </div>
    <div class="main-notice">
      <div class="header">
        <h2>공지사항</h2>
        <div class="header-more-box">
          <router-link :to="{ name: 'notice' }" class="header-more">더보기<v-icon icon="add"></v-icon></router-link>
        </div>
      </div>
      <table>
        <tr v-for="n in notices" :key="n.title">
          <td>{{ n.date }}</td>
          <td>{{ n.title }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<style scoped>
/* 초기 화면 */
.main-video {
  position: relative;
  width: 100vw;
  height: 450px;
  margin-bottom: 165px;
}

.main-video-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  text-align: center;
  box-shadow: 10px;
  font-weight: 600;
}

video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.main-video-search {
  display: flex;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  justify-content: center;
  align-items: center;
  color: black;
  margin: auto;
  gap: 0.5rem;
  max-width: 500px;
  width: 100%;
  background-color: white;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.37);
}

.main-search-input {
  background-color: white;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  margin-bottom: 164px;
  font-size: 20px;
  font-weight: 400;
}

.main-search-button {
  background-color: black;
  color: white;
  font-size: 16px;
  font-weight: 700;
}

/* 두번째 화면 시작 */
.next-screen {
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  padding: 0 1rem;
  margin: 0 auto;
}

/* 뉴스 · 공지사항 헤더*/
.header {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
}

.header h2 {
  font-weight: 700;
  font-size: 32px;
  line-height: 1;
}

.header-more-box {
  /* (grow, shrink, basis) */
  display: flex;
  justify-content: end;
  flex: 1 0 0;
  border-bottom: 2px solid black;
}

.header-more {
  text-align: right;
  font-weight: 600;
  font-size: 20px;
  color: black;
  text-decoration: none;
}

/* 뉴스 화면 */
.news-header {
  margin-bottom: 1rem;
}

.main-news-detail {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin: 0 -1rem;
}

/* 공지사항 화면 */
.main-notice {
  text-align: center;
  margin: 100px 0;
}

.main-notice table {
  width: 100%;
  border-collapse: collapse;
  font-weight: 500;
  font-size: 20px;
}

.main-notice table tr {
  margin-top: 10%;
  padding: 1vh;
  text-align: left;
}

.main-notice table tr td {
  margin-top: 10%;
  padding: 20px;
  border-bottom: 2px solid black;
}
</style>
