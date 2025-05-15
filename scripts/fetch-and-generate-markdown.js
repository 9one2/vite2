const fs = require('fs-extra');
const path = require('path');
const fetch = require('node-fetch'); // npm install node-fetch

async function fetchAndGenerate() {
  const strapiApiUrl = process.env.STRAPI_API_URL;
  const strapiApiToken = process.env.STRAPI_API_TOKEN;
  const docsPath = path.join(__dirname, '../docs/guide'); // Markdown 파일 저장 경로

  if (!strapiApiUrl) {
    console.error('STRAPI_API_URL is not defined. Skipping Markdown generation.');
    return;
  }

  const headers = { 'Content-Type': 'application/json' };
  if (strapiApiToken) {
    headers['Authorization'] = `Bearer ${strapiApiToken}`;
  }

  try {
    console.log('Fetching documents from Strapi...');
    // Strapi API 엔드포인트 (예: /api/articles?populate=category,content)
    // 'content' 필드에 Markdown 본문이, 'title', 'slug' 등의 필드가 있다고 가정
    const res = await fetch(`${strapiApiUrl}/documents?populate=*&publicationState=live`, { headers });
    if (!res.ok) {
      console.error(`Failed to fetch documents: ${res.status} ${res.statusText}`);
      const errorBody = await res.text();
      console.error(`Error body: ${errorBody}`);
      return;
    }
    const { data } = await res.json();

    if (!data || !Array.isArray(data)) {
      console.error('No data received or data is not an array from Strapi.');
      return;
    }

    console.log(`Received ${data.length} documents. Generating Markdown files...`);

    // 기존 파일 삭제 (선택 사항)
    await fs.emptyDir(docsPath);
    // introduction.md 같은 고정 페이지는 유지하고 싶다면 특정 패턴만 삭제하거나,
    // Strapi에서 가져온 파일만 관리하는 하위 폴더를 만들 수 있습니다.
    // 예: await fs.emptyDir(path.join(docsPath, 'strapi-generated'));

    for (const item of data) {
      const attributes = item.attributes;
      if (!attributes.slug || !attributes.content) {
        console.warn(`Skipping item due to missing slug or content: ${attributes.title || 'Untitled'}`);
        continue;
      }

      const slug = attributes.slug;
      const filePath = path.join(docsPath, `${slug}.md`);
      const directory = path.dirname(filePath);
      await fs.ensureDir(directory); // slug가 'category/page-name' 형태일 경우 하위 디렉토리 생성

      // Frontmatter 구성
      let frontmatter = '---\n';
      frontmatter += `title: ${attributes.title || 'Untitled'}\n`;
      if (attributes.description) {
        frontmatter += `description: ${attributes.description}\n`;
      }
      if (attributes.createdAt) {
        frontmatter += `date: ${new Date(attributes.createdAt).toISOString().split('T')[0]}\n`;
      }
      // 필요한 다른 메타데이터 추가
      frontmatter += '---\n\n';

      const markdownContent = frontmatter + attributes.content; // 'content' 필드가 Markdown 본문이라고 가정

      await fs.writeFile(filePath, markdownContent);
      console.log(`Generated: ${filePath}`);
    }

    console.log('Markdown file generation complete.');

  } catch (error) {
    console.error('Error during fetch and generate process:', error);
    process.exit(1); // 오류 발생 시 빌드 실패 처리
  }
}

fetchAndGenerate(); 