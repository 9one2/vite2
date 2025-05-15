/*
import { createContentLoader } from 'vitepress'

export default createContentLoader('guide/** /*.md', { // 이 파일과 매칭되는 Markdown 파일 패턴
  async transform(rawData) {
    // rawData는 매칭된 모든 Markdown 파일의 배열입니다.
    // 여기서는 params.slug를 사용하여 특정 페이지만 필터링하거나,
    // 또는 모든 데이터를 미리 로드하고 Markdown 파일 내에서 사용하도록 할 수 있습니다.
    // 이 예제에서는 Markdown 파일 자체에 콘텐츠가 있고, 추가 데이터만 로드한다고 가정합니다.
    // 만약 모든 콘텐츠를 Strapi에서 가져온다면, 이 파일의 로직이 더 복잡해집니다.

    // 이 파일은 VitePress가 Markdown 파일을 찾고, 그 파일에 대한 추가 데이터를 로드하는 데 사용됩니다.
    // 실제 Strapi 데이터 로딩은 Markdown 파일 자체 또는 전역 데이터 로딩으로 옮기는 것이 더 적합할 수 있습니다.
    // 아래는 params를 사용하여 특정 페이지 데이터를 로드하는 예시입니다.
    // 하지만 [...slug].paths.js에서 이미 경로를 생성했으므로,
    // 해당 경로에 대한 Markdown 파일이 존재해야 합니다.
    // Strapi에서 가져온 내용을 바탕으로 Markdown 파일을 동적으로 생성하는 로직이 필요하다면,
    // 빌드 스크립트(예: Node.js 스크립트)에서 처리하는 것이 더 일반적입니다.

    // 여기서는 VitePress의 데이터 로딩 기능을 활용하여,
    // 각 페이지의 frontmatter에 Strapi 데이터를 주입하는 방식을 고려해볼 수 있습니다.
    // 또는, Markdown 파일 내에서 <script setup>을 사용하여 데이터를 가져올 수도 있습니다.

    // 가장 간단한 접근 방식은, Strapi에서 가져온 데이터를 기반으로
    // 빌드 스크립트가 Markdown 파일을 생성하고, VitePress는 그 파일들을 빌드하는 것입니다.
    // 이 경우, 이 [...slug].data.js 파일은 필요 없을 수도 있습니다.

    // 제공해주신 플로우에서는 "각 경로(build 시)에서 Markdown 본문과 메타데이터를 로드"라고 되어 있으므로,
    // params를 사용하여 해당 slug의 데이터를 가져오는 로직을 구현합니다.
    // 이 데이터는 해당 slug에 대한 Markdown 파일의 frontmatter로 병합됩니다.
    return rawData.map(async (page) => {
      const slug = page.url.replace('/guide/', '').replace(/\.html$/, ''); // 현재 페이지의 slug 추출
      const strapiApiUrl = process.env.STRAPI_API_URL;
      const strapiApiToken = process.env.STRAPI_API_TOKEN;

      if (!strapiApiUrl) return page;

      const headers = { 'Content-Type': 'application/json' };
      if (strapiApiToken) {
        headers['Authorization'] = `Bearer ${strapiApiToken}`;
      }

      try {
        // Strapi에서 slug에 해당하는 문서를 가져옵니다.
        // populate=* 를 사용하여 모든 관련 필드를 가져오거나 필요한 필드만 명시합니다.
        const res = await fetch(`${strapiApiUrl}/documents?filters[slug][$eq]=${slug}&populate=*&publicationState=live`, { headers });
        if (!res.ok) {
          console.error(`Failed to fetch document for slug ${slug}: ${res.status} ${res.statusText}`);
          return page;
        }
        const { data } = await res.json();

        if (data && data.length > 0) {
          const item = data[0].attributes;
          // page.frontmatter에 Strapi 데이터를 병합합니다.
          // Markdown 파일에서는 page.frontmatter.title, page.frontmatter.content 등으로 접근 가능
          page.frontmatter = { ...page.frontmatter, ...item, strapiContent: item.content }; // 'content' 필드가 있다고 가정
        }
      } catch (error) {
        console.error(`Error fetching data for slug ${slug} from Strapi:`, error);
      }
      return page;
    });
  }
});

// 그리고 실제 페이지 렌더링을 위한 Markdown 파일이 필요합니다.
// docs/guide/[...slug].md (또는 다른 이름)
// ---
// title: {{ frontmatter.title }}  <-- Strapi에서 가져온 title
// ---
//
// {{ frontmatter.strapiContent }} <-- Strapi에서 가져온 content (Markdown 형식이어야 함)
//
// 또는 <script setup>을 사용하여 페이지 컴포넌트 내에서 직접 데이터를 사용할 수 있습니다. 
*/