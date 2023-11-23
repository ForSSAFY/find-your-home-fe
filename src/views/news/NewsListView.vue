<script lang="ts" setup>
import NewsView from '@/components/template/NewsView.vue'

const today = new Date()
const date = today.getFullYear() + '년 ' + (today.getMonth() + 1) + '월 ' + today.getDate() + '일'

const articles = [
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
  },
  {
    title: '[단독] 현관문 안 열리고 엘베 갇히고…공포의 새 아파트 어디',
    description:
      '인천 송도국제신도시에서 지난 9월 27일 입주를 시작한 디에트르송도시그니처뷰 입주자들이 시공사의 미시공과 하자로 불안에 떨고 있다. 송도 워터프론트 호수 조망이 가능한 이 아파트는 주상복합(578가구) 및 오피스텔(',
    imgurl: 'https://imgnews.pstatic.net/image/025/2023/11/23/0003323587_001_20231123090001253.jpg',
    href: 'https://n.news.naver.com/article/025/0003323587'
  },
  {
    title: '“내가 아파트 사자 그랬지!” 빌라, 오피스텔, 지산, 상가는 최악입니다 [부동산360]',
    description:
      '보상안 협의 소극적 태도 일관 붕괴사고로 입주가 지연된 인천 검단 아파트(AA13) 입주예정자의 보상안 테이블에 앉은 한국토지주택공사(LH)가 소극적인 태도로 논의에 임하고 있다. LH는 단지 공급의 주체임에도 ',
    imgurl:
      'https://imgnews.pstatic.net/image/016/2023/11/22/20230831000357_0_20231122155501325.jpg',
    href: 'https://n.news.naver.com/article/016/0002228500'
  },
  {
    title: "고금리에 한줄기 빛…우리집으로 '13월의 보너스' 받는 법[실전재테크]",
    description:
      '고물가·고금리에 주머니 사정이 팍팍한 연말이다. 들어올 돈은 뻔한데, 나가야 할 돈은 늘어가니 초겨울이 더 춥게 느껴진다. 마음속 한파를 녹일 희망이 하나 있다면 바로 13월의 보너스, 연말정산이다. 연말정산 시',
    imgurl: 'https://imgnews.pstatic.net/image/277/2023/11/22/0005344418_001_20231122154903962.png',
    href: 'https://n.news.naver.com/article/277/0005344418'
  },
  {
    title: '“추석 이후 문의전화 한통이 없어요”…삼성동 아파트 매매시장도 임시휴업[부동산360][르포]',
    description:
      '“추석 이후로 집을 알아보는 전화가 단 한통도 없었어요. 11·12월은 원래도 이사 비수기니 사실상 올해는 끝났다고 봐야죠. 삼성동도 힘든건 마찬가지에요”(강남구 삼성동 A공인중개사무소 대표) 집값이 반등하며 신고가',
    imgurl:
      'https://imgnews.pstatic.net/image/016/2023/11/22/20231122000780_0_20231122190203321.jpg',
    href: 'https://n.news.naver.com/article/016/0002228585'
  },
  {
    title: '김포, 서울 편입에 5호선까지…설움 씻을까[팔도부동산]',
    description:
      '서울 편입 그리고 5호선 연장. 김포시에 대한 관심이 어느 때보다 높아지고 있습니다. 여야가 내년 총선을 앞두고 경쟁적으로 공약을 쏟아내고 있는데요. 특히 국민의힘이 내놓은 김포시의 서울 편입론이 큰 화제가 됐습니다',
    imgurl: 'https://imgnews.pstatic.net/image/648/2023/11/22/0000021209_001_20231122140801659.jpg',
    href: 'https://n.news.naver.com/article/648/0000021209'
  },
  {
    title: "'내 집 마련 꿈' 물거품 되나…'부동산 황금기 막 내렸다'",
    description:
      '이 기사는 국내 최대 해외 투자정보 플랫폼 한경 글로벌마켓에 게재된 기사입니다. 미국 기존 주택 판매량이 13년 만에 최저치로 떨어졌다. 주택담보대출(모기지) 금리가 연 8%에 육박하면서 수요가 급감한 데다 기존 주',
    imgurl: 'https://imgnews.pstatic.net/image/015/2023/11/22/0004916989_001_20231122161301068.jpg',
    href: 'https://n.news.naver.com/article/015/0004916989'
  },
  {
    title: "'신고가·신저가'가 대체 왜 중요하죠? [현장 써머리]",
    description:
      '“신고가는 맞는 데 의미가 있는 것인지는 모르겠어요.” 연이은 신고가 기록에도 강남권 집주인들의 근심이 더 커지고 있다. 집을 팔고 싶어 매물을 내놔도 사겠다는 사람이 없기 때문이다. 이따금 나오는 신고가 기록도 매',
    imgurl: 'https://imgnews.pstatic.net/image/031/2023/11/23/0000790451_001_20231123050601103.jpg',
    href: 'https://n.news.naver.com/article/031/0000790451'
  }
]
</script>

<template>
  <v-container class="container">
    <div class="header">
      <h2>오늘의 뉴스</h2>
      <div class="header-more-box">
        <div>{{ date }}</div>
      </div>
    </div>
    <NewsView v-for="a in articles" v-bind="a" :key="a.title" />
  </v-container>
</template>

<style scoped>
.container {
  max-width: 1200px;
  width: 100%;
  flex-direction: column;
  padding: 0 1rem;
  margin: 0 auto;
  display: flex;
}

/* 헤더 */
.header {
  padding: 2rem 0;
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
</style>
