import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to calculate word count
function calculateWordCount(content) {
  const text = content
    .replace(/[#*`\[\]()]/g, '')
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  return text.split(/\s+/).filter(word => word.length > 0).length;
}

// Helper to calculate reading time
function calculateReadingTime(wordCount) {
  return Math.max(1, Math.ceil(wordCount / 225));
}

// Map old URLs to new exec-tech.tools URLs
const urlMap = {
  'https://krischase.com/ai-adoption': 'https://exec-tech.tools/ai-adoption',
  'https://krischase.com/build-vs-buy': 'https://exec-tech.tools/build-vs-buy',
  'https://krischase.com/cms-decision': 'https://exec-tech.tools/cms-decision',
  'https://krischase.com/cto-need': 'https://exec-tech.tools/cto-need',
  'https://krischase.com/eos-cascade': 'https://exec-tech.tools/eos-cascade',
  'https://krischase.com/interview-integrity': 'https://exec-tech.tools/interview-integrity',
  'https://krischase.com/leadership-os': 'https://exec-tech.tools/leadership-os',
  'https://krischase.com/mvp-checker': 'https://exec-tech.tools/mvp-checker',
  'https://krischase.com/overbuild-reducer': 'https://exec-tech.tools/overbuild-reducer',
  'https://krischase.com/security-compliance': 'https://exec-tech.tools/security-compliance',
  'https://krischase.com/stakeholder-alignment': 'https://exec-tech.tools/stakeholder-alignment',
  'https://krischase.com/team-scaling': 'https://exec-tech.tools/team-scaling',
  'https://krischase.com/technical-debt': 'https://exec-tech.tools/technical-debt',
  'https://krischase.com/vendor-selection': 'https://exec-tech.tools/vendor-selection',
};

// Process all JSON files
const blogTempDir = path.join(__dirname, '../src/blog_temp');
const files = fs.readdirSync(blogTempDir).filter(f => f.endsWith('.json'));

const processedPosts = [];

for (const file of files) {
  const filePath = path.join(blogTempDir, file);
  const post = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  
  // Update URLs in content
  let updatedContent = post.content;
  for (const [oldUrl, newUrl] of Object.entries(urlMap)) {
    updatedContent = updatedContent.replace(new RegExp(oldUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newUrl);
  }
  
  // Recalculate word count and reading time
  const wordCount = calculateWordCount(updatedContent);
  const readingTime = calculateReadingTime(wordCount);
  
  // Update URLs in the post object
  post.url = post.url.replace('https://krischase.com/blog/', 'https://krischase.com/blog/');
  post.content = updatedContent;
  post.wordCount = wordCount;
  post.readingTime = readingTime;
  
  // Update featured image to use default if not set
  if (!post.featuredImage) {
    post.featuredImage = `/images/blog/${post.slug}.png`;
  }
  
  // Update ogImage in SEO
  if (post.seo && post.seo.ogImage) {
    post.seo.ogImage = post.seo.ogImage.replace('https://krischase.com/blog/', 'https://krischase.com/blog/');
  } else if (post.seo) {
    post.seo.ogImage = `https://krischase.com/images/blog/${post.slug}.png`;
  }
  
  processedPosts.push(post);
}

// Sort by published date (newest first)
processedPosts.sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));

// Output processed posts
console.log(`Processed ${processedPosts.length} blog posts`);
console.log('\nPosts by date:');
processedPosts.forEach(post => {
  console.log(`  ${post.publishedDate}: ${post.title} (${post.wordCount} words, ${post.readingTime} min)`);
});

// Write to a temporary file for review
fs.writeFileSync(
  path.join(__dirname, '../src/blog_temp/processed-posts.json'),
  JSON.stringify(processedPosts, null, 2)
);

console.log('\nProcessed posts written to src/blog_temp/processed-posts.json');
