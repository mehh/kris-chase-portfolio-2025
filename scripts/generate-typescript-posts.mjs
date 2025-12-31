import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read processed posts
const processedPath = path.join(__dirname, '../src/blog_temp/processed-posts.json');
const posts = JSON.parse(fs.readFileSync(processedPath, 'utf-8'));

// Function to escape template literal content
function escapeTemplateLiteral(str) {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\${/g, '\\${');
}

// Function to convert post to TypeScript
function postToTypeScript(post) {
  const content = escapeTemplateLiteral(post.content);
  const description = post.description.replace(/'/g, "\\'");
  
  return `  {
    slug: '${post.slug}',
    url: '${post.url}',
    title: '${post.title.replace(/'/g, "\\'")}',
    description: '${description}',
    content: \`${content}\`,
    category: '${post.category}',
    tags: [${post.tags.map(t => `'${t.replace(/'/g, "\\'")}'`).join(', ')}],
    publishedDate: '${post.publishedDate}',
    originalDate: '${post.originalDate}',
    ${post.featuredImage ? `featuredImage: '${post.featuredImage}',` : ''}
    seo: {
      metaTitle: '${post.seo.metaTitle.replace(/'/g, "\\'")}',
      metaDescription: '${post.seo.metaDescription.replace(/'/g, "\\'")}',
      ogTitle: '${post.seo.ogTitle.replace(/'/g, "\\'")}',
      ogDescription: '${post.seo.ogDescription.replace(/'/g, "\\'")}',
      ogImage: '${post.seo.ogImage}',
      twitterCard: '${post.seo.twitterCard}',
    },
    readingTime: ${post.readingTime},
    wordCount: ${post.wordCount},
    author: {
      name: '${post.author.name}',
      twitter: '${post.author.twitter}',
      email: '${post.author.email}',
    },
    metadata: {
      ${post.metadata.isUpdated ? `isUpdated: ${post.metadata.isUpdated},` : ''}
      ${post.metadata.updatedDate ? `updatedDate: '${post.metadata.updatedDate}',` : ''}
    },
  },`;
}

// Generate TypeScript code for all posts
const tsCode = posts.map(post => postToTypeScript(post)).join('\n\n');

// Write to file
const outputPath = path.join(__dirname, '../src/blog_temp/new-posts-typescript.txt');
fs.writeFileSync(outputPath, tsCode);

console.log(`Generated TypeScript code for ${posts.length} posts`);
console.log(`Output written to: ${outputPath}`);
