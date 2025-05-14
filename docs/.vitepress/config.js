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
            // 더 많은 페이지 추가 가능
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