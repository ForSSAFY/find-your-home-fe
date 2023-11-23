<script lang="ts" setup>
import { listNotice } from '@/api/notice';
import CardView from '@/components/template/CardView.vue'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchWord = ref('')
const lat = ref(0)
const lng = ref(0)

const cards = [
  {
    title: '[르포] “대출이 안나오니 집살 엄두가 안나요” 영끌족 발길 끊긴 노도강 [부동산360]',
    description:
      '“9월에 50년 만기 주택담보대출(주담대)이 사라지고 특례보금자리론 일반형 공급이 끊기면서 거래도, 문의도 거의 없어졌다고 보면 됩니다. 두세 달 전에 가격이 바짝 반등했던 분위기가 있었으니 저렴하게 내놓을 집주인도',
    imgurl:
      'https://imgnews.pstatic.net/image/016/2023/11/23/20231123000097_0_20231123085801296.jpg',
    href: 'https://n.news.naver.com/article/016/0002228714'
  },
  {
    title: '"전셋값 또 내려야 하나"... 공시가만 쳐다보는 빌라 주인들',
    description:
      '정부의 공시가격 시세반영률(현실화율) 동결 방침에 빌라 집주인이 울상이다. 올해 공시가가 역대 최대 하락한 데 이어 내년에도 추가로 내려갈 가능성이 커졌기 때문이다. 공시가가 내려가면 그만큼 보유세 부담이 줄어 대부',
    imgurl: 'https://imgnews.pstatic.net/image/469/2023/11/23/0000771727_001_20231123043134634.jpg',
    href: 'https://n.news.naver.com/article/469/0000771727'
  },
  {
    title: "'검단구' 떼어내면 집값 더 오르려나…분양은 '훈풍'",
    description:
      '인천광역시 서구 집값이 26주 연속 상승세를 보인 가운데 30년 만에 행정구역 개편이 예고돼 눈길을 끈다. 행정구역 개편이 집값 상승으로 당장 이어지긴 어렵겠지만 검단신도시를 중심으로 대규모 입주가 이뤄지면서 기대감',
    imgurl: 'https://imgnews.pstatic.net/image/648/2023/11/23/0000021223_001_20231123063101687.jpg',
    href: 'https://n.news.naver.com/article/648/0000021223'
  }
]
// const notices = [
//   { no: 1, date: 20231117, title: '[공지] Find your house 개인정보처리방침 (2023/09/21) 개정안내' },
//   { no: 2, date: 20231117, title: '[공지] Find your house 개인정보처리방침 (2023/08/21) 개정안내' },
//   { no: 3, date: 20231117, title: '[공지] Find your house 개인정보처리방침 (2023/07/21) 개정안내' },
//   { no: 4, date: 20231117, title: '[공지] Find your house 개인정보처리방침 (2023/06/21) 개정안내' }
// ]

/* 현재 위치 get*/
const getCurrentPosition = () => {
  navigator.geolocation.getCurrentPosition((position) => {
    lat.value = position.coords.latitude
    lng.value = position.coords.longitude
    searchWord.value = '현재 위치'
  })
}

/* 검색 */
const search = () => {
  if (!searchWord.value) {
    alert('검색어를 입력해주세요')
  } else if (searchWord.value === '현재 위치') {
    router.push({ name: 'map', query: { lat: lat.value, lng: lng.value } })
  } else {
    router.push({ name: 'search', query: { search: searchWord.value } })
  }
}

/* 공지사항 */
type NoticeList = {
  id: number
  createdAt: number | null
  title: string
  content: string
}[]

const notices = ref<NoticeList>([])

onMounted(() => {
  listNotice()
    .then(res => notices.value = res.data.slice(0, 5))
    .catch(console.error)
})
</script>

<template>
  <div class="main-video">
    <video src="\src\assets\cityview.mp4" muted loop autoplay playsinline></video>
    <header class="main-video-container">
      <div class="main-video-text">
        <h1>FIND YOUR HOME</h1>
        <p>우리는 당신이 편하게 쉴 수 있는 집을 찾아 주고 싶습니다.</p>
        <br />
      </div>
      <div class="main-video-search">
        <v-text-field class="main-search-input" variant="solo" placeholder="검색어를 입력해주세요" hide-details single-line flat
          :model-value="searchWord" @update:model-value="(newValue) => (searchWord = newValue)" />
        <v-btn icon="my_location" :elevation="0" @click="getCurrentPosition()" />
        <v-btn rounded="0" class="main-search-button" @click="search()">검색</v-btn>
      </div>
    </header>
  </div>

  <article class="main-screen">
    <section>
      <div class="header">
        <h2>뉴스</h2>
        <div class="header-line">
          <router-link :to="{ name: 'news' }" class="header-more">
            더보기
            <v-icon icon="add" size="sm" />
          </router-link>
        </div>
      </div>

      <div class="main-news-detail">
        <CardView v-for="c in cards" v-bind="c" :key="c.title" />
      </div>
    </section>

    <section>
      <div class="header">
        <h2>공지사항</h2>
        <div class="header-line">
          <router-link :to="{ name: 'notice' }" class="header-more">
            더보기
            <v-icon icon="add" />
          </router-link>
        </div>
      </div>

      <router-link v-for="n in notices" v-bind="n" :key="n.title" :to="{ name: 'view', params: { id: n.id } }"
        class="notice">
        <div>{{ n.createdAt ?? new Date().toLocaleDateString() }}</div>
        <div>{{ n.title }}</div>
      </router-link>
    </section>
  </article>
</template>

<style scoped>
/* 초기 화면 */
.main-video {
  position: relative;
  width: 100%;
  height: 450px;
  margin-bottom: 6rem;
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
  max-width: 500px;
  width: 100%;
  position: absolute;
  left: 50%;
  top: 100%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem 0.5rem 0.5rem;
  background-color: white;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.37);
}

.main-search-button {
  background-color: black;
  color: white;
  font-size: 1rem;
  font-weight: 700;
  margin-left: 0.5rem;
}

/* 메인 화면 시작 */
.main-screen {
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
  margin: 0 auto;
}

.main-screen>section:not(:first-of-type) {
  margin-top: 6rem;
}

/* 뉴스 · 공지사항 헤더 */
.header {
  display: flex;
  align-items: start;
  gap: 0.5rem;
}

.header h2 {
  font-weight: 700;
  font-size: 2rem;
  line-height: 1;
}

.header-line {
  display: flex;
  align-items: end;
  justify-content: end;
  padding-bottom: 0.25rem;
  flex: 1 0 0;
  border-bottom: 2px solid black;
  height: 2rem;
}

.header-more {
  display: flex;
  align-items: center;
  gap: 0.125rem;
  font-weight: 500;
  font-size: 1.25rem;
  line-height: 1;
  color: black;
  text-decoration: none;
}

/* 뉴스 화면 */
.main-news-detail {
  /* max-width: 1200px;
  width: 100%; */
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: 1rem -1rem 0;
}

/* 공지사항 화면 */
.notice {
  display: flex;
  border-bottom: 2px solid black;
  gap: 3rem;
  padding: 1.5rem;
  color: black;
  text-decoration: none;
  font-size: large;
  font-weight: 500;
}
</style>
