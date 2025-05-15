export default {
  async paths() {
    const strapiApiUrl = process.env.STRAPI_API_URL; // GitHub Actions에서 주입된 환경 변수
    const strapiApiToken = process.env.STRAPI_API_TOKEN; // GitHub Actions에서 주입된 환경 변수

    if (!strapiApiUrl) {
      console.warn('STRAPI_API_URL is not defined. Skipping dynamic route generation.');
      return [];
    }

    const headers = { 'Content-Type': 'application/json' };
    if (strapiApiToken) {
      headers['Authorization'] = `Bearer ${strapiApiToken}`;
    }

    try {
      // Strapi API 엔드포인트는 실제 설정에 맞게 수정해야 합니다.
      // 예: /api/articles?populate=category (카테고리 정보도 함께 가져오고 싶을 때)
      // 여기서는 모든 'documents' 컬렉션 타입의 'slug' 필드를 가져온다고 가정합니다.
      // 그리고 'publishedAt' 필드가 있는, 즉 발행된 문서만 가져오도록 필터링할 수 있습니다.
      const res = await fetch(`${strapiApiUrl}/documents?fields[0]=slug&publicationState=live`, { headers });
      if (!res.ok) {
        console.error(`Failed to fetch documents: ${res.status} ${res.statusText}`);
        const errorBody = await res.text();
        console.error(`Error body: ${errorBody}`);
        return [];
      }
      const { data } = await res.json();

      if (!data || !Array.isArray(data)) {
        console.error('No data received or data is not an array from Strapi API for paths.');
        return [];
      }

      return data.map(item => ({
        params: {
          // slug는 배열이어야 합니다. Strapi의 slug가 'my-page'라면 ['my-page']
          // 만약 slug가 'category/my-page' 형태라면 ['category', 'my-page']
          // 여기서는 단일 slug라고 가정합니다.
          slug: item.attributes.slug.split('/')
        }
      }));
    } catch (error) {
      console.error('Error fetching paths from Strapi:', error);
      return [];
    }
  }
} 