// import sidebarGenerator from 'vitepress-sidebar'; // 사용법에 따라
// 또는
// const { sidebarTree } = require('vitepress-sidebar');


// VitePress 설정은 ESM이므로, require 대신 import를 사용해야 합니다.
// vitepress-sidebar가 ESM을 지원하는지 확인 필요.
// 만약 CommonJS 모듈이라면, 동적 import() 또는 별도의 스크립트로 사이드바 데이터를 생성 후 가져와야 합니다.

// 여기서는 config.js가 빌드 시점에 실행되므로, Node.js 환경에서 API 호출이 가능합니다.
// async 함수를 사용하여 사이드바를 동적으로 생성할 수 있습니다.

// async function getStrapiSidebar() {
//   const strapiApiUrl = process.env.STRAPI_API_URL_FOR_SIDEBAR || process.env.STRAPI_API_URL;
//   const strapiApiToken = process.env.STRAPI_API_TOKEN_FOR_SIDEBAR || process.env.STRAPI_API_TOKEN;
//
//   let strapiGeneratedSidebarItems = [];
//
//   if (strapiApiUrl) {
//     const headers = { 'Content-Type': 'application/json' };
//     if (strapiApiToken) {
//       headers['Authorization'] = `Bearer ${strapiApiToken}`;
//     }
//
//     try {
//       const res = await fetch(`${strapiApiUrl}/documents?fields[0]=title&fields[1]=slug&fields[2]=category_slug&fields[3]=category_name&sort=category_name:asc,title:asc&publicationState=live`, { headers });
//       if (!res.ok) {
//         console.error(`Failed to fetch sidebar data from Strapi: ${res.status} ${res.statusText}`);
//       } else {
//         const { data } = await res.json();
//         if (data && Array.isArray(data)) {
//           const categories = {};
//           data.forEach(item => {
//             const attrs = item.attributes;
//             const categorySlug = attrs.category_slug || 'general';
//             const categoryName = attrs.category_name || '일반';
//
//             if (!categories[categorySlug]) {
//               categories[categorySlug] = {
//                 text: categoryName,
//                 collapsible: true,
//                 items: []
//               };
//             }
//             categories[categorySlug].items.push({
//               text: attrs.title,
//               link: `/guide/${attrs.slug}`
//             });
//           });
//           strapiGeneratedSidebarItems = Object.values(categories);
//         } else {
//           console.error('No data received or data is not an array from Strapi API for sidebar.');
//         }
//       }
//     } catch (error) {
//       console.error('Error fetching or processing sidebar data from Strapi:', error);
//     }
//   } else {
//     console.warn('STRAPI_API_URL_FOR_SIDEBAR is not defined. Strapi sidebar items will be empty.');
//   }
//
//   // --- 로컬 정적 파일에 대한 사이드바 항목 정의 ---
//   const localStaticSidebarSection = {
//     text: '시작하기 (로컬)', // 또는 '기본 가이드' 등
//     collapsible: true,
//     items: [
//       { text: '소개 (Introduction)', link: '/guide/introduction' },
//       { text: '새로운 가이드 페이지', link: '/guide/new-guide-page' },
//       { text: '테스트 페이지', link: '/guide/test' },
//     ]
//   };
//   // --- 로컬 정적 파일 항목 정의 끝 ---
//
//   const sidebar = {
//     // '/guide/' 경로에 대한 사이드바 구성
//     // 로컬 정적 파일 섹션을 항상 먼저 표시하고, 그 다음에 Strapi에서 가져온 항목들을 표시합니다.
//     '/guide/': [
//       localStaticSidebarSection, // 로컬 파일 섹션 추가
//       ...strapiGeneratedSidebarItems // Strapi에서 생성된 항목들
//     ],
//     // 다른 경로에 대한 사이드바가 있다면 여기에 추가
//     // 예: '/api/': [/* ... */]
//   };
//
//   // 만약 Strapi에서 가져온 항목이 없을 경우, 로컬 섹션만 남게 됩니다.
//   // 또는, Strapi 항목이 특정 카테고리로만 오도록 하고 싶다면,
//   // localStaticSidebarSection을 strapiGeneratedSidebarItems 배열의 특정 위치에 삽입할 수도 있습니다.
//
//   return sidebar;
// }


export default {
  title: '나의 디자인 위키',
  description: 'VitePress로 만든 멋진 디자인 위키입니다.',
  base: '/vite2/',
  themeConfig: {
    nav: [
      { text: '홈', link: '/' },
      { text: '가이드', link: '/guide/' }
    ],
    // 동적 사이드바 대신 정적 사이드바 사용
    sidebar: {
      '/guide/': [
        {
          text: '시작하기 (로컬)',
          collapsible: true,
          items: [
            { text: '소개 (Introduction)', link: '/guide/introduction' },
            { text: '새로운 가이드 페이지', link: '/guide/new-guide-page' },
            { text: '테스트 페이지', link: '/guide/test' },
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