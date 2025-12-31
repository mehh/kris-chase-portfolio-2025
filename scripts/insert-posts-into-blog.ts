import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the new posts TypeScript code
const newPostsPath = path.join(__dirname, '../src/blog_temp/new-posts-typescript.txt');
const newPostsCode = fs.readFileSync(newPostsPath, 'utf-8');

// Read the blog-posts.ts file
const blogPostsPath = path.join(__dirname, '../src/data/blog-posts.ts');
let blogPostsContent = fs.readFileSync(blogPostsPath, 'utf-8');

// Find the insertion point (right after "export const blogPosts: BlogPost[] = [")
const insertMarker = 'export const blogPosts: BlogPost[] = [\n';
const insertIndex = blogPostsContent.indexOf(insertMarker);

if (insertIndex === -1) {
  console.error('Could not find insertion point');
  process.exit(1);
}

// Insert the new posts
const beforeInsert = blogPostsContent.substring(0, insertIndex + insertMarker.length);
const afterInsert = blogPostsContent.substring(insertIndex + insertMarker.length);

const updatedContent = beforeInsert + newPostsCode + '\n\n' + afterInsert;

// Write back
fs.writeFileSync(blogPostsPath, updatedContent);

console.log('Successfully inserted 14 new blog posts into blog-posts.ts');
