export default {
  title: '나의 디자인 위키',
  description: 'VitePress로 만든 멋진 디자인 위키입니다.',
  base: '/vite2/', // GitHub 저장소 이름에 맞게 수정해주세요.
  themeConfig: {
    nav: [
      { text: '홈', link: '/' },
      { text: '가이드', link: '/guide/' } // 예시 링크, 실제 파일 경로에 맞게 수정
    ],
    sidebar: {
      '/guide/': [
        {
          text: '시작하기',
          items: [
            { text: '소개', link: '/guide/introduction' },
            { text: '새로운 가이드 페이지', link: '/guide/new-guide-page' },
            // 더 많은 페이지 추가 가능
          ]
        },
        {
          text: '디자인 시스템',
          items: [
            { text: '색상 팔레트', link: '/guide/new-guide-page' },
            { text: '타이포그래피', link: '/guide/new-guide-page' },
            { text: '아이콘', link: '/guide/new-guide-page' },
            { text: '그리드 시스템', link: '/guide/new-guide-page' }
          ]
        },
        {
          text: '컴포넌트',
          items: [
            { text: '버튼', link: '/guide/new-guide-page' },
            { text: '카드', link: '/guide/new-guide-page' }
          ]
        },
        {
          text: '패턴 라이브러리',
          items: [
            { text: '네비게이션', link: '/guide/new-guide-page' },
            { text: '폼 요소', link: '/guide/new-guide-page' },
            { text: '모달', link: '/guide/new-guide-page' },
            { text: '테이블', link: '/guide/new-guide-page' },
            { text: '알림', link: '/guide/new-guide-page' }
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/9one2/vite2' }
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present 9one2'
    }
  }
} 