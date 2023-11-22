<script lang="ts" setup>
import NewsView from '@/components/template/NewsView.vue'

const today = new Date()
const date = today.getFullYear() + '년 ' + (today.getMonth() + 1) + '월 ' + today.getDate() + '일'

const articles = [
  {
    title: '내년 집값 오르는거야 떨어지는거야?…수도권 집값 엇갈린 전망',
    description: '3억 로또 아파트로 관심을 받은 송파구 문정동 힐스테이트 e편한세상 문정 당첨자가 발표됐다.가장 높은 당첨가점은 79점으로 앞서 분양한 용산구 한강로2가 용산 호반써밋 에이디션과 광진구 자양동 롯데캐슬',
    imgurl:
      'https://imgnews.pstatic.net/image/648/2023/11/22/0000021192_001_20231122063101610.jpg?type=w647',
    href: 'https://n.news.naver.com/article/648/0000021192',
    
  },
  {
    title: '내년 집값 오르는거야 떨어지는거야?…수도권 집값 엇갈린 전망',
    description: '3억 로또 아파트로 관심을 받은 송파구 문정동 힐스테이트 e편한세상 문정 당첨자가 발표됐다.가장 높은 당첨가점은 79점으로 앞서 분양한 용산구 한강로2가 용산 호반써밋 에이디션과 광진구 자양동 롯데캐슬',
    imgurl:
      'https://imgnews.pstatic.net/image/648/2023/11/22/0000021192_001_20231122063101610.jpg?type=w647',
    href: 'https://n.news.naver.com/article/648/0000021192',
    
  },
  {
    title: '내년 집값 오르는거야 떨어지는거야?…수도권 집값 엇갈린 전망',
    description: '3억 로또 아파트로 관심을 받은 송파구 문정동 힐스테이트 e편한세상 문정 당첨자가 발표됐다.가장 높은 당첨가점은 79점으로 앞서 분양한 용산구 한강로2가 용산 호반써밋 에이디션과 광진구 자양동 롯데캐슬',
    imgurl:
      'https://imgnews.pstatic.net/image/648/2023/11/22/0000021192_001_20231122063101610.jpg?type=w647',
    href: 'https://n.news.naver.com/article/648/0000021192',
    
  },
  {
    title: '내년 집값 오르는거야 떨어지는거야?…수도권 집값 엇갈린 전망',
    description: '3억 로또 아파트로 관심을 받은 송파구 문정동 힐스테이트 e편한세상 문정 당첨자가 발표됐다.가장 높은 당첨가점은 79점으로 앞서 분양한 용산구 한강로2가 용산 호반써밋 에이디션과 광진구 자양동 롯데캐슬',
    imgurl:
      'https://imgnews.pstatic.net/image/648/2023/11/22/0000021192_001_20231122063101610.jpg?type=w647',
    href: 'https://n.news.naver.com/article/648/0000021192',
    
  },
  {
    title: '내년 집값 오르는거야 떨어지는거야?…수도권 집값 엇갈린 전망',
    description: '3억 로또 아파트로 관심을 받은 송파구 문정동 힐스테이트 e편한세상 문정 당첨자가 발표됐다.가장 높은 당첨가점은 79점으로 앞서 분양한 용산구 한강로2가 용산 호반써밋 에이디션과 광진구 자양동 롯데캐슬',
    imgurl:
      'https://imgnews.pstatic.net/image/648/2023/11/22/0000021192_001_20231122063101610.jpg?type=w647',
    href: 'https://n.news.naver.com/article/648/0000021192',
    
  },
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
    <v-row>
      <NewsView v-for="a in articles" v-bind="a" :key="a.title"/>
    </v-row>
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
