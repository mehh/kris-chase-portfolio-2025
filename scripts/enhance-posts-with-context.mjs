import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read processed posts
const processedPath = path.join(__dirname, '../src/blog_temp/processed-posts.json');
const posts = JSON.parse(fs.readFileSync(processedPath, 'utf-8'));

// Add exec-tech.tools context to each post
const enhancedPosts = posts.map(post => {
  // Add intro paragraph about exec-tech.tools if not already present
  const execTechIntro = `[exec-tech.tools](https://exec-tech.tools) is a repository of tools and frameworks designed specifically for executives and engineering leaders to make better decisions, run their companies more effectively, and navigate complex technical and organizational challenges. `;
  
  // Check if content already mentions exec-tech.tools in intro
  if (!post.content.includes('exec-tech.tools is a repository')) {
    // Find the first link to exec-tech.tools and add context before it
    const firstLinkMatch = post.content.match(/\[([^\]]+)\]\(https:\/\/exec-tech\.tools\/[^\)]+\)/);
    if (firstLinkMatch) {
      // Add intro right before the first mention
      const linkIndex = post.content.indexOf(firstLinkMatch[0]);
      const beforeLink = post.content.substring(0, linkIndex);
      const afterLink = post.content.substring(linkIndex);
      
      // Only add if we're in the first paragraph or two
      if (beforeLink.split('\n\n').length <= 2) {
        post.content = beforeLink + execTechIntro + afterLink;
      }
    }
  }
  
  return post;
});

// Write enhanced posts
fs.writeFileSync(
  path.join(__dirname, '../src/blog_temp/enhanced-posts.json'),
  JSON.stringify(enhancedPosts, null, 2)
);

console.log(`Enhanced ${enhancedPosts.length} posts with exec-tech.tools context`);
