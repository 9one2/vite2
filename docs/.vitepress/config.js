// import sidebarGenerator from 'vitepress-sidebar'; // 사용법에 따라
// 또는
// const { sidebarTree } = require('vitepress-sidebar');


// VitePress 설정은 ESM이므로, require 대신 import를 사용해야 합니다.
// vitepress-sidebar가 ESM을 지원하는지 확인 필요.
// 만약 CommonJS 모듈이라면, 동적 import() 또는 별도의 스크립트로 사이드바 데이터를 생성 후 가져와야 합니다.

// 여기서는 config.js가 빌드 시점에 실행되므로, Node.js 환경에서 API 호출이 가능합니다.
// async 함수를 사용하여 사이드바를 동적으로 생성할 수 있습니다.

async function getStrapiSidebar() {
  const strapiApiUrl = process.env.STRAPI_API_URL_FOR_SIDEBAR || process.env.STRAPI_API_URL; // 환경 변수 사용
  const strapiApiToken = process.env.STRAPI_API_TOKEN_FOR_SIDEBAR || process.env.STRAPI_API_TOKEN;

  if (!strapiApiUrl) {
    console.warn('STRAPI_API_URL_FOR_SIDEBAR is not defined. Using default sidebar.');
    return { // 기본 사이드바 또는 빈 사이드바
      '/guide/': [
        { text: '소개', link: '/guide/introduction' }
      ]
    };
  }

  const headers = { 'Content-Type': 'application/json' };
  if (strapiApiToken) {
    headers['Authorization'] = `Bearer ${strapiApiToken}`;
  }

  try {
    // Strapi에서 사이드바 구조를 위한 데이터를 가져옵니다.
    // 예: 카테고리별 문서 목록 또는 특정 필드를 기준으로 그룹화
    // 이 API 엔드포인트는 직접 구성해야 합니다.
    // 예시: /api/documents?fields[0]=title&fields[1]=slug&fields[2]=category&populate=category&sort=category.name:asc,title:asc
    const res = await fetch(`${strapiApiUrl}/documents?fields[0]=title&fields[1]=slug&fields[2]=category_slug&fields[3]=category_name&sort=category_name:asc,title:asc&publicationState=live`, { headers });
    if (!res.ok) {
      console.error(`Failed to fetch sidebar data: ${res.status} ${res.statusText}`);
      return {}; // 오류 시 빈 사이드바
    }
    const { data } = await res.json();

    if (!data || !Array.isArray(data)) {
      console.error('No data received or data is not an array from Strapi API for sidebar.');
      return {};
    }

    // Strapi 데이터를 VitePress 사이드바 형식으로 변환
    // 예시: 카테고리별로 그룹화
    const sidebar = {
      '/guide/': [] // 모든 동적 페이지가 /guide/ 하위에 있다고 가정
    };

    const categories = {}; // { 'category-slug': { text: 'Category Name', items: [] } }

    data.forEach(item => {
      const attrs = item.attributes;
      const categorySlug = attrs.category_slug || 'general'; // 카테고리 슬러그 필드가 있다고 가정
      const categoryName = attrs.category_name || '일반';   // 카테고리 이름 필드가 있다고 가정

      if (!categories[categorySlug]) {
        categories[categorySlug] = {
          text: categoryName,
          // collapsible: true, // 필요에 따라
          // collapsed: false,  // 필요에 따라
          items: []
        };
      }
      categories[categorySlug].items.push({
        text: attrs.title,
        link: `/guide/${attrs.slug}` // Markdown 파일 생성 방식과 일치해야 함
      });
    });

    sidebar['/guide/'] = Object.values(categories);
    return sidebar;

  } catch (error) {
    console.error('Error fetching or processing sidebar data from Strapi:', error);
    return {}; // 오류 시 빈 사이드바
  }
}


export default async () => {
  const dynamicSidebar = await getStrapiSidebar();

  return {
    title: '나의 디자인 위키',
    description: 'VitePress로 만든 멋진 디자인 위키입니다.',
    base: '/vite2/',
    themeConfig: {
      nav: [
        { text: '홈', link: '/' },
        { text: '가이드', link: '/guide/' }
      ],
      sidebar: dynamicSidebar, // 동적으로 생성된 사이드바
      socialLinks: [
        { icon: 'github', link: 'https://github.com/9one2/vite2' }
      ],
      footer: {
        message: 'Released under the MIT License.',
        copyright: 'Copyright © 2024-present 9one2'
      }
    },
    // 만약 Markdown 파일 생성 방식을 사용한다면, [...slug].paths.js는 필요 없습니다.
    // VitePress가 생성된 .md 파일들을 자동으로 감지합니다.
    // 하지만, 사이드바는 여전히 동적으로 생성해야 합니다.
  }
} 