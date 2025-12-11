/**
 * Blog posts scraped from wp.krischase.com/journal/
 * This file contains all blog posts with full metadata
 * Last updated: 2025-12-09
 */

export interface BlogPost {
  /** Unique slug/identifier for the post */
  slug: string;
  /** Full URL of the original post */
  url: string;
  /** Post title */
  title: string;
  /** Post excerpt/description */
  description: string;
  /** Full markdown content of the post */
  content: string;
  /** Category name */
  category: string;
  /** Array of tags */
  tags: string[];
  /** Publication date in ISO format (YYYY-MM-DD) */
  publishedDate: string;
  /** Original date string from WordPress */
  originalDate: string;
  /** Featured image URL */
  featuredImage?: string;
  /** First image from content (fallback) */
  firstImage?: string;
  /** SEO metadata */
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    twitterCard?: string;
  };
  /** Estimated reading time in minutes */
  readingTime: number;
  /** Word count */
  wordCount: number;
  /** Author information */
  author: {
    name: string;
    twitter?: string;
    email?: string;
  };
  /** Additional metadata */
  metadata: {
    /** Last updated date if different from published */
    updatedDate?: string;
    /** Whether this is an updated version of an older post */
    isUpdated?: boolean;
  };
}

/**
 * All blog posts, sorted by publication date (newest first)
 */
export const blogPosts: BlogPost[] = [
  {
    "slug": "engineering-leadership-in-the-age-of-ai",
    "url": "https://krischase.com/blog/engineering-leadership-in-the-age-of-ai",
    "title": "Engineering Leadership in the Age of AI",
    "description": "How AI is reshaping modern engineering leadership, accelerating decision-making, and redefining how teams design, build, and ship software.",
    "content": "# Engineering Leadership in the Age of AI\n\nAI is no longer an emerging trend—it’s the new operating system for engineering organizations. The leaders who thrive in this era aren’t the ones who simply *adopt* AI tools. They’re the ones who redesign how teams think, collaborate, and execute.\n\n## How AI Is Rewriting Engineering\nAI isn’t just improving development velocity—it’s fundamentally changing engineering strategy:\n- **AI pair programmers** shrink iteration cycles from days to minutes.\n- **Architecture decisions** become measurable, data-backed, and reversible.\n- **Leaders shift from gatekeepers to orchestrators**, creating systems where teams produce more with less friction.\n\nAI doesn’t replace strategic thinking. It **amplifies** it.\n\n## What Modern Engineering Leaders Must Adapt To\nAs AI accelerates delivery, the role of leadership changes. High-output teams now require:\n- **Radical clarity** — because ambiguity compounds faster at AI speed.\n- **Healthier guardrails**, not heavier process — AI-generated code needs direction, not bureaucracy.\n- **Outcome-driven culture** — value is in what ships, not what gets discussed.\n- **A bias toward iteration** — when AI reduces the cost of change, the cost of waiting increases.\n\nLeaders who previously optimized for control must now optimize for **enablement**.\n\n## A Modern AI-Infused Workflow\nHere's a simple example of how leaders can operationalize AI inside the development lifecycle:\n```javascript\nconst prompt = \"Generate a reusable API handler for a Node.js service. Include logging, retries, and error shaping.\";\nconst result = ai.generate(prompt);\n```\nInstead of producing artifacts manually, engineers design higher-level intent—and AI reduces the distance from idea to implementation.\n\n## What This Means for the Future of Engineering Teams\nAI compels leaders to:\n- Invest in foundational architecture that AI can extend safely.\n- Teach teams how to *collaborate with automation*.\n- Shift career paths toward systems thinking, product intuition, and taste.\n- Rethink productivity metrics entirely.\n\nThe organizations that win will be the ones that make AI a **team member**, not a tool.\n\n## Final Thought\nThe leaders who thrive in this era won’t be the ones who resist AI—they’ll be the ones who **define how it’s used**. Leadership in the age of AI is ultimately about judgment, clarity, and the courage to redesign how teams work.\n",
    "category": "Leadership",
    "tags": ["AI", "Engineering Leadership", "Velocity"],
    "publishedDate": "2025-11-15",
    "originalDate": "2025.11.15",
    "featuredImage": "/images/blog/engineering-leadership-in-the-age-of-ai.png",
    "seo": {
      "metaTitle": "Engineering Leadership in the Age of AI - Kris Chase",
      "metaDescription": "How AI is reshaping modern engineering leadership, decision-making, and the way high-performance teams design, build, and ship software.",
      "ogTitle": "Engineering Leadership in the Age of AI - Kris Chase",
      "ogDescription": "A deep dive into how AI is transforming engineering leadership, velocity, and decision-making at scale.",
      "ogImage": "https://krischase.com/images/ai-leadership.jpg",
      "twitterCard": "summary_large_image"
    },
    "readingTime": 4,
    "wordCount": 850,
    "author": {
      "name": "Kris Chase",
      "twitter": "@chasebadkids",
      "email": "hey@mehh.org"
    },
    "metadata": {
      "isUpdated": true
    }
  },
  {
    "slug": "vibe-coded-software-what-it-means",
    "url": "https://krischase.com/blog/vibe-coded-software-what-it-means",
    "title": "Vibe Coded Software: What It Really Means",
    "description": "A grounded explanation of vibe-coded software—how modern AI-native tools enable fast, fluid, high-quality software creation without requiring deep focus or hours of manual coding.",
    "content": "# Vibe Coded Software: What It Really Means\n\nThe definition of software development has fundamentally changed. Not because frameworks evolved, but because the *developer’s mental model* has. Tools like **Cursor**, **Windsurf**, **Bolt**, **v0**, **Lovable**, and **vZero** have created a new mode of building—one where developers can create high-quality applications without slipping into the old, narrow-flow, deeply focused state that traditional engineering demanded.\n\nThis new mode is called **vibe coding**.\n\nIt’s not about aesthetics. It’s not about UI feelings. It’s about **a different cognitive posture** for building software.\n\n## What Vibe Coding Actually Is\nVibe coding is the ability to:\n- Build faster and more fluidly using AI-native IDEs.\n- Generate high-quality starting points without manual boilerplate.\n- Switch contexts without losing momentum.\n- Ship continuously without requiring long, focus-intensive coding sessions.\n\nInstead of grinding through hours of hand-written code, developers prompt, refine, shape, and steer systems that generate the heavy lifting for them.\n\nVibe coding is **development with lowered cognitive load**.\n\nIt's writing real software while:\n- juggling multiple tasks,\n- context switching naturally,\n- working in a relaxed state,\n- keeping your head above the details rather than being buried underneath them.\n\nThis isn’t about being careless—it’s about being *amplified*.\n\n## The Shift: From Deep Focus to Light-Touch Creation\nTraditional engineering often required:\n- long uninterrupted blocks of focus,\n- memorizing APIs and syntax,\n- manually managing state and architecture,\n- switching mental models for every framework and layer.\n\nToday, vibe coding replaces that with:\n- **AI agents that scaffold entire features**,\n- **in-IDE refactoring assistants**,\n- **context-aware test generation**,\n- **auto-documented PRs**,\n- **instant style + component creation**,\n- **orchestration instead of rote typing**.\n\nInstead of saying, “Let me disappear for three hours and figure this out,” vibe coders say:\n> *“Give me 10 minutes and I’ll get a version working.”*\n\n## Why This Matters for CTOs and Engineering Leaders\nVibe coding changes operational assumptions:\n\n### 1. **It lowers the barrier to building great software**\nMore people—designers, PMs, founders, entrepreneurs—can express ideas in working form. That doesn’t make engineers obsolete; it makes them *force multipliers*.\n\n### 2. **It compresses development timelines**\nWhat used to be a sprint becomes a day. What used to take a day becomes an hour.\n\n### 3. **It reduces the cognitive tax on developers**\nInstead of fighting complexity, engineers steer systems that absorb it.\n\n### 4. **It unlocks parallel creativity**\nYou can build while:\n- on calls,\n- reviewing designs,\n- answering Slack messages,\n- switching between projects.\n\nDeep flow still exists—but now it’s optional.\n\n### 5. **It creates a new engineering culture**\nOne where:\n- prototypes are cheap,\n- iteration is constant,\n- experimentation is expected,\n- engineering feels lighter,\n- shipping becomes habitual.\n\nThis is the shift from *artisanal code* to **intent-driven creation**.\n\n## What Vibe-Coded Workflows Look Like\nA small example:\n```javascript\n// Instead of building this by hand…\nconst handler = createExpressHandler({\n  retries: 3,\n  validator: \"zod\",\n  db: \"postgres\"\n});\n\n// A vibe-coded workflow is:\nai.generate(\"Create a robust Express handler with retries, zod validation, and Postgres support.\");\n```\nThe developer becomes the director, not the typist.\n\n## The Bigger Picture: This Changes Who Can Build\nVibe coding democratizes creation.\n\nPeople who previously needed:\n- complete quiet,\n- long uninterrupted sessions,\n- deep framework-level thinking…\n\n…can now build production-grade products **while staying in a relaxed, conversational state**. The tools do the heavy lifting. The human provides direction, judgment, and taste.\n\nIt’s not that engineering becomes less valuable. It becomes *less rigid*.\n\n## Final Thought\nVibe coding represents a new era of software creation—where great things can be built quickly, fluidly, and without the old constraints of deep-focus, grind-heavy engineering. It lowers the barrier to entry, raises the ceiling on output, and lets teams ship more while thinking more strategically.\n\nIn a world where time-to-market is everything, vibe coding isn’t a trend. It’s the new baseline.\n",
    "category": "Product",
    "tags": ["AI", "Developer Tools", "Engineering", "Velocity"],
    "publishedDate": "2025-10-28",
    "originalDate": "2025.10.28",
    "featuredImage": "/images/blog/vibe-coded-software-what-it-means.png",
    "seo": {
      "metaTitle": "Vibe Coded Software - Kris Chase",
      "metaDescription": "A real definition of vibe-coded software—how AI-native development tools like Cursor, Windsurf, Bolt, and vZero lower cognitive load and let engineers build high-quality products faster.",
      "ogTitle": "Vibe Coded Software - Kris Chase",
      "ogDescription": "A CTO-level breakdown of vibe-coded development and how AI-native tools change the speed and cognitive posture of software creation.",
      "ogImage": "https://krischase.com/images/vibe-code.jpg",
      "twitterCard": "summary_large_image"
    },
    "readingTime": 5,
    "wordCount": 1050,
    "author": {
      "name": "Kris Chase",
      "twitter": "@chasebadkids",
      "email": "hey@mehh.org"
    },
    "metadata": {
      "isUpdated": true
    }
  },
  {
    "slug": "fractional-cto-vs-consultant",
    "url": "https://krischase.com/blog/fractional-cto-vs-consultant",
    "title": "Fractional CTO vs. Consultant: What's the Difference?",
    "description": "A clear, practical breakdown of how fractional CTOs differ from consultants—and how founders can choose the right model for their stage and risk profile.",
    "content": "# Fractional CTO vs. Consultant: What's the Difference?\n\nThe terms get mixed up constantly, but they represent fundamentally different modes of working. One delivers clarity. The other delivers leadership. Both are useful—but not for the same situations.\n\n## Consultants Solve Problems\nConsultants excel when you need a **defined outcome**:\n- Diagnose a problem\n- Recommend a path forward\n- Deliver documentation, analysis, or a scoped solution\n\nThey bring expertise, point-in-time insight, and pattern recognition. Their job is to **advise**, not own.\n\nA consultant helps you answer:\n- *“What should we do?”*\n- *“Why is this happening?”*\n- *“How do we fix this specific thing?”*\n\nThe engagement is bounded, tactical, and oriented around a deliverable—not around the long-term health of your engineering organization.\n\n## Fractional CTOs Own Outcomes\nA fractional CTO is very different. They’re not just solving a problem—they’re building the system that prevents the problem from happening again.\n\nA fractional CTO:\n- Sets engineering direction and long-term architecture\n- Manages or mentors teams\n- Creates the processes, cadences, and culture for predictable delivery\n- Represents engineering at the leadership table\n- Aligns roadmap, tech strategy, and business goals\n- Makes decisions that drive the company forward—not just the project\n\nWhere consultants focus on **insight**, fractional CTOs focus on **execution** and **transformation**.\n\nIf a consultant says “Here’s the map,” a fractional CTO says “Let’s go there together.”\n\n## When to Choose a Consultant\nConsultants are ideal when you need:\n- A fast diagnosis\n- A specific architectural review\n- A one-time audit or assessment\n- Research into tooling, vendors, or technical options\n- A roadmap or planning artifact\n- Expertise without long-term commitment\n\nThey’re the right call when the problem is **discrete**, not systemic.\n\n## When to Choose a Fractional CTO\nA fractional CTO is the right fit when you need:\n- Leadership, not just advice\n- Someone to manage and grow the engineering team\n- Real accountability for delivery velocity and quality\n- A partner who understands product, business, and engineering tradeoffs\n- A long-term technology strategy\n- A stabilizing force during hiring, restructuring, or rapid scaling\n\nFractional CTOs are **builders**, not consultants. They shape org design, create culture, set standards, and drive outcomes.\n\n## Quick Comparison Table\n| Role | Scope | Responsibility | Time Horizon |\n|------|--------|----------------|----------------|\n| Consultant | Tactical | Low | Short-term |\n| Fractional CTO | Strategic + Operational | High | Medium–Long term |\n\n## The Founder Lens: Which One Do You Actually Need?\nAsk yourself:\n1. **“Is this a one-time problem or a recurring pattern?”**\n2. **“Do I need expertise or leadership?”**\n3. **“Do we lack strategy, execution, or both?”**\n4. **“Is our biggest gap knowledge or accountability?”**\n\nYour answers determine whether you need someone who *advises*… or someone who *owns outcomes*.\n\n## Final Thought\nHire a consultant when you need clarity. Hire a fractional CTO when you need transformation.\n\nOne helps you understand the problem. The other helps you build the system that solves it—permanently.\n",
    "category": "Leadership",
    "tags": ["Fractional CTO", "Consulting", "Startups"],
    "publishedDate": "2025-09-20",
    "originalDate": "2025.09.20",
    "featuredImage": "/images/blog/fractional-vs-consultant.jpg",
    "seo": {
      "metaTitle": "Fractional CTO vs. Consultant - Kris Chase",
      "metaDescription": "A clear, practical breakdown of how fractional CTOs differ from consultants—and when founders should choose one over the other.",
      "ogTitle": "Fractional CTO vs. Consultant - Kris Chase",
      "ogDescription": "A straightforward explanation of the difference between fractional CTOs and consultants, tailored for founders and engineering leaders.",
      "ogImage": "https://krischase.com/images/blog/fractional-vs-consultant.jpg",
      "twitterCard": "summary_large_image"
    },
    "readingTime": 4,
    "wordCount": 825,
    "author": {
      "name": "Kris Chase",
      "twitter": "@chasebadkids",
      "email": "hey@mehh.org"
    },
    "metadata": {
      "isUpdated": true
    }
  },
  {
    "slug": "building-high-output-engineering-teams",
    "url": "https://krischase.com/blog/building-high-output-engineering-teams",
    "title": "Building High-Output Engineering Teams",
    "description": "A practical, modern framework for building engineering teams that consistently deliver high velocity, high quality, and low drama.",
    "content": "# Building High-Output Engineering Teams\n\nHigh-output engineering teams don’t emerge from raw talent or headcount—they emerge from clarity. When teams know exactly who owns what, how decisions are made, and how work flows, output becomes predictable and quality becomes repeatable.\n\nThe secret isn’t more people. It’s fewer questions.\n\n## The Three Ingredients of High Output\n### **1. Crystal-Clear Ownership**\nTeams slow down when nobody knows who owns a decision. High-output orgs create:\n- Clear lanes of responsibility\n- Lightweight decision-making frameworks\n- Team captains who remove ambiguity, not add to it\n\nWhen ownership is clear, velocity becomes a natural byproduct.\n\n### **2. Predictable Delivery Cycles**\nGreat engineering teams are steady—not chaotic. They:\n- Plan in realistic increments\n- Keep scope tight and movable\n- Align engineering and product around shared definitions of “done”\n\nPredictability builds trust. Trust accelerates everything.\n\n### **3. High-Trust Communication Loops**\nThe highest-performing teams communicate early, openly, and without ego. This looks like:\n- Engineers surfacing risks early\n- Product offering context, not mandates\n- Leaders removing blockers instead of adding meetings\n\nWhen trust is high, teams stop posturing and start solving.\n\n## Rituals That Actually Matter\nMost teams either under-ritualize (chaos) or over-ritualize (bureaucracy). High-output teams keep only what drives momentum:\n- **Daily standups with intent**, not status theater\n- **Weekly planning that reduces ambiguity**, not creates project management debt\n- **Monthly retros focused on behavior**, not blame\n\nRituals should serve the team—not the other way around.\n\n## The Leader’s Role\nHigh-output cultures are built by leaders who:\n- Provide context early and often\n- Enforce quality through example, not fear\n- Protect engineers from thrash and priority churn\n- Align incentives around outcomes, not activity\n\nGreat leaders create systems where engineers can do the best work of their careers.\n\n## Final Thought\nHigh-output teams aren’t accidents. They’re engineered structures where clarity, trust, and predictability compound into velocity. Build the environment, and the output takes care of itself.\n",
    "category": "Leadership",
    "tags": ["Engineering Teams", "Velocity", "Leadership"],
    "publishedDate": "2025-08-12",
    "originalDate": "2025.08.12",
    "featuredImage": "/images/blog/building-high-output-engineering-teams.png",
    "seo": {
      "metaTitle": "Building High-Output Engineering Teams - Kris Chase",
      "metaDescription": "A practical framework for creating engineering teams that consistently deliver high velocity, high quality, and low drama.",
      "ogTitle": "Building High-Output Engineering Teams - Kris Chase",
      "ogDescription": "A practical framework for creating engineering teams that consistently deliver high velocity, high quality, and low drama.",
      "ogImage": "https://krischase.com/images/high-output.jpg",
      "twitterCard": "summary_large_image"
    },
    "readingTime": 4,
    "wordCount": 780,
    "author": {
      "name": "Kris Chase",
      "twitter": "@chasebadkids",
      "email": "hey@mehh.org"
    },
    "metadata": {
      "isUpdated": true
    }
  },
  {
    "slug": "ai-assisted-software-development-workflows",
    "url": "https://krischase.com/blog/ai-assisted-software-development-workflows",
    "title": "AI-Assisted Software Development Workflows",
    "description": "A breakdown of modern AI-augmented engineering workflows—and how teams can ship faster with less cognitive load while maintaining quality.",
    "content": "# AI-Assisted Software Development Workflows\n\nAI has become the second brain of modern engineering teams. It doesn’t just speed up coding—it reshapes the entire workflow. The teams adopting AI-native development patterns aren’t just shipping faster; they’re reducing cognitive load, compressing iteration cycles, and protecting engineers from burnout.\n\nThis shift isn’t about automation replacing engineers. It’s about **engineers offloading the right work** so they can focus on judgment, strategy, and system thinking.\n\n## What AI Changes in the Development Lifecycle\n### **1. Faster Prototyping**\nEngineers can now move from concept to implementation in minutes. AI handles scaffolding, boilerplate, environment setup, and first drafts of core logic—freeing teams to explore ideas rapidly.\n\n### **2. Automatic Quality Layers**\nAI generates:\n- Tests\n- Docs\n- Edge-case handling\n- Better naming, structure, and pattern consistency\n\nQuality becomes integrated—not an afterthought.\n\n### **3. Smarter Refactoring and Modernization**\nLegacy codebases used to take weeks to untangle. Now AI can:\n- Propose modern patterns\n- Extract components\n- Improve readability\n- Enforce architectural consistency\n\nRefactoring becomes a continuous process, not a painful initiative.\n\n### **4. Parallelized Development**\nEngineers no longer need long cycles of deep focus for every task. AI enables parallel creation—teams can switch contexts without paying a massive cognitive tax.\n\nThis unlocks momentum.\n\n## How Teams Should Adapt\nTo get the most from AI workflows, engineering leaders must:\n- Set clear guardrails for safety and review\n- Define quality standards AI should target\n- Teach engineers how to prompt, refine, and steer AI outputs\n- Encourage iteration over perfection\n- Maintain human ownership of system design\n\nAI accelerates execution, but humans still own the architecture.\n\n## What This Means for Engineering Velocity\nVelocity used to be a function of time and team size. Now it’s a function of:\n- Leverage\n- Intent\n- Tooling\n- Architecture\n\nTeams using AI well aren’t just faster—they’re calmer. They do more with less stress because the heavy lifting is distributed.\n\n## Final Thought\nAI won’t replace engineers. But engineers who understand AI-native workflows will outperform those who don’t—by a wide margin. The future isn’t human vs. machine. It’s **humans leading, AI assisting, and teams shipping faster than ever before**.\n",
    "category": "AI",
    "tags": ["AI", "Engineering", "Workflows"],
    "publishedDate": "2025-07-05",
    "originalDate": "2025.07.05",
    "featuredImage": "/images/blog/ai-assisted-software-development-workflows.png",
    "seo": {
      "metaTitle": "AI-Assisted Software Development Workflows - Kris Chase",
      "metaDescription": "A breakdown of modern AI-augmented development workflows and how engineers can ship faster without sacrificing quality.",
      "ogTitle": "AI-Assisted Software Development Workflows - Kris Chase",
      "ogDescription": "A breakdown of modern AI-augmented development workflows and how engineers can ship faster without sacrificing quality.",
      "ogImage": "https://krischase.com/images/ai-workflows.jpg",
      "twitterCard": "summary_large_image"
    },
    "readingTime": 4,
    "wordCount": 820,
    "author": {
      "name": "Kris Chase",
      "twitter": "@chasebadkids",
      "email": "hey@mehh.org"
    },
    "metadata": {
      "isUpdated": true
    }
  },
  {
    "slug": "scaling-an-engineering-org-fast",
    "url": "https://krischase.com/blog/scaling-an-engineering-org-fast",
    "title": "Scaling an Engineering Org Fast—Without Breaking It",
    "description": "A blueprint for scaling an engineering team quickly while preserving culture, velocity, decision-making quality, and product stability.",
    "content": "# Scaling an Engineering Org Fast—Without Breaking It\n\nHypergrowth exposes every weakness in an engineering organization. The first things to break aren’t the systems—they’re communication lines, ownership boundaries, and quality standards. Scaling isn’t just about adding people; it’s about reinforcing the structure that enables people to work well together.\n\nGrowing fast is easy. Growing well is the actual skill.\n\n## What Breaks First During Hypergrowth\n### **1. Communication Channels**\nAs headcount rises, tribal knowledge collapses. Decisions get lost. Priorities diffuse. Teams begin optimizing for local objectives instead of company goals.\n\n### **2. Ownership Lines**\nMore people → more confusion about who owns what. Critical decisions stall. Accountability weakens.\n\n### **3. Review and Quality Standards**\nWhen teams rush to ship, quality debt piles up silently—slowing delivery months later.\n\nScaling highlights misalignment that previously went unnoticed.\n\n## How to Prevent Organizational Collapse\n### **1. Add Leaders Before You Need Them**\nMost companies wait until engineers are drowning before hiring managers or tech leads. By then, it’s too late. High-performing orgs add leadership *ahead* of demand to absorb complexity.\n\n### **2. Codify Decisions Early**\nDocument:\n- Tech principles\n- Decision frameworks\n- Ownership maps\n- Review standards\n\nThese aren’t bureaucracy—they’re stabilizers.\n\n### **3. Favor Iteration Over Reinvention**\nGrowing teams often reinvent systems instead of improving them. This creates fragmentation across codebases, architectures, and tooling. Champion consistency.\n\n### **4. Maintain Culture Through Behavior, Not Slogans**\nCulture isn’t words. It’s:\n- How leaders respond to incidents\n- How teams give feedback\n- How quality is enforced\n- How people treat each other under pressure\n\nGrowth reveals culture. It doesn’t create it.\n\n### **5. Preserve the Feedback Loop**\nHigh-output engineering orgs keep communication tight, even with headcount growth. Maintain:\n- Weekly alignment rituals\n- Fast escalations\n- Transparent decisions\n\nWhen communication slows, execution slows.\n\n## The Real Job of a CTO During Scaling\nA CTO’s mandate during hypergrowth is to:\n- Protect architecture from entropy\n- Protect teams from chaos\n- Protect culture from dilution\n- Protect the roadmap from thrash\n- Protect velocity through clarity\n\nScaling is an act of preservation as much as expansion.\n\n## Final Thought\nAnyone can scale an org quickly. Few can scale an org without breaking it. The companies that succeed are the ones that expand structure, clarity, and leadership *before* complexity demands it.\n",
    "category": "Leadership",
    "tags": ["Scaling Teams", "Leadership", "Org Design"],
    "publishedDate": "2025-06-18",
    "originalDate": "2025.06.18",
    "featuredImage": "/images/blog/scaling-an-engineering-org-fast.png",
    "seo": {
      "metaTitle": "Scaling an Engineering Org Fast - Kris Chase",
      "metaDescription": "A blueprint for scaling an engineering team quickly while maintaining culture, velocity, and product quality.",
      "ogTitle": "Scaling an Engineering Org Fast - Kris Chase",
      "ogDescription": "A blueprint for scaling an engineering team quickly while maintaining culture, velocity, and product quality.",
      "ogImage": "https://krischase.com/images/scaling-org.jpg",
      "twitterCard": "summary_large_image"
    },
    "readingTime": 4,
    "wordCount": 900,
    "author": {
      "name": "Kris Chase",
      "twitter": "@chasebadkids",
      "email": "hey@mehh.org"
    },
    "metadata": {
      "isUpdated": true
    }
  },
  {
    "slug": "the-art-of-technical-decision-making",
    "url": "https://krischase.com/blog/the-art-of-technical-decision-making",
    "title": "The Art of Technical Decision-Making",
    "description": "A practical decision-making framework for engineering leaders who need to move fast without creating long-term architectural pain.",
    "content": "# The Art of Technical Decision-Making\n\nEngineering leadership isn’t about having all the answers—it’s about making decisions that create momentum without jeopardizing the future. Good technical decisions aren’t the perfect ones. They’re the ones made with clarity, context, and appropriate speed.\n\n## The Three Inputs That Matter\n### **1. Constraints**\nEvery decision exists within real limits: time, budget, skills, legacy code, and market expectations. Leaders who understand their true constraints make faster, cleaner choices.\n\n### **2. Tradeoffs**\nEvery direction has a cost. Great leaders define the tradeoffs explicitly:\n- Speed vs. durability\n- Flexibility vs. simplicity\n- Innovation vs. predictability\n\nThe goal isn’t to avoid tradeoffs. It’s to choose the *right* ones.\n\n### **3. Time**\nThe urgency of a decision is often more important than its complexity. The longer a team waits, the more uncertainty compounds.\n\n## The Decision Formula\nThere’s a simple principle high-performing teams use to move fast without breaking things:\n\n- **If a decision is reversible → move fast**\n- **If it's irreversible → slow down**\n\nMost engineering decisions *are* reversible. The danger isn’t choosing wrong—it’s waiting too long.\n\n## Avoiding the Two Common Failure Modes\n### **1. Paralysis by Analysis**\nTeams overthink decisions that don’t matter, stalling progress. This usually points to fear or unclear ownership—not technical complexity.\n\n### **2. Unexamined Momentum**\nMoving fast without aligning on principles leads to rework. Speed only helps when direction is correct.\n\n## How Great Leaders Make Better Technical Decisions\nThey:\n- Push decisions down to the closest responsible engineer\n- Create technical principles that guide choices\n- Encourage small, iterative decisions instead of large, risky leaps\n- Communicate *why*, not just *what*\n- Hold teams accountable for learning, not perfection\n\nThe quality of decisions compounds across an organization.\n\n## Final Thought\nGreat technical decisions don’t come from certainty—they come from clarity. When leaders understand constraints, articulate tradeoffs, and match speed to risk, they create engineering orgs that move confidently and effectively.\n",
    "category": "Leadership",
    "tags": ["Architecture", "Leadership", "Decision Making"],
    "publishedDate": "2025-05-10",
    "originalDate": "2025.05.10",
    "featuredImage": "/images/blog/the-art-of-technical-decision-making.png",
    "seo": {
      "metaTitle": "The Art of Technical Decision-Making - Kris Chase",
      "metaDescription": "A guide to making high-quality technical decisions quickly and confidently as an engineering leader.",
      "ogTitle": "The Art of Technical Decision-Making - Kris Chase",
      "ogDescription": "A guide to making high-quality technical decisions quickly and confidently as an engineering leader.",
      "ogImage": "https://krischase.com/images/decision-making.jpg",
      "twitterCard": "summary_large_image"
    },
    "readingTime": 4,
    "wordCount": 780,
    "author": {
      "name": "Kris Chase",
      "twitter": "@chasebadkids",
      "email": "hey@mehh.org"
    },
    "metadata": {
      "isUpdated": true
    }
  },
  {
    "slug": "why-most-tech-debt-isnt-real-tech-debt",
    "url": "https://krischase.com/blog/why-most-tech-debt-isnt-real-tech-debt",
    "title": "Why Most Tech Debt Isn’t Real Tech Debt",
    "description": "A perspective shift on tech debt—why teams misuse the term and how to distinguish real strategic debt from simple code dissatisfaction.",
    "content": "# Why Most Tech Debt Isn't Real Tech Debt\n\nTech debt has become a catch-all phrase engineers use to describe any part of the codebase they don’t like. But real tech debt is far more specific—and far more useful—than that.\n\nMislabeling everything as “debt” creates noise. Understanding true debt creates leverage.\n\n## What Real Tech Debt Actually Is\nReal tech debt has three characteristics:\n### **1. It’s a documented decision**\nSomeone intentionally chose a shortcut or constraint based on context.\n\n### **2. It involves a known tradeoff**\nThe team understood what they were sacrificing—speed, flexibility, simplicity—in exchange for delivery.\n\n### **3. It carries interest**\nOver time, the choice imposes increasing cost on future development.\n\nThis type of debt is strategic. It creates acceleration today in exchange for known cleanup later.\n\n## What Fake Tech Debt Looks Like\nMost “tech debt” tickets fall into these categories:\n- “I don’t understand this code.”\n- “This isn’t written the way I prefer.”\n- “This architecture doesn’t match my ideal mental model.”\n- “Something feels messy, so let’s rewrite it.”\n\nThat’s not debt. That’s discomfort.\n\nCalling every annoyance “debt” hides the real issues and misdirects engineering energy.\n\n## Why This Distinction Matters for Teams\nWhen everything is labeled debt, teams:\n- Over-prioritize refactoring\n- Under-prioritize delivery\n- Spend cycles debating style instead of strategy\n- Erode trust with product and leadership\n\nWhen only *real* debt is documented, teams:\n- Align around strategic cleanup\n- Make intentional tradeoffs\n- Communicate technical risk clearly\n- Build roadmaps that balance innovation and stability\n\nPrecision leads to credibility.\n\n## How to Use Tech Debt Properly\nThink of it as a business concept, not an engineering complaint. Ask:\n- What was the decision?\n- What tradeoff was made?\n- What interest are we paying?\n- What is the cost of leaving this in place?\n- What is the opportunity unlocked by addressing it?\n\nDebt is a tool—one that lets teams ship faster when used intentionally.\n\n## Final Thought\nTech debt becomes dangerous only when it’s disguised as preference. When teams reserve the label for intentional, documented tradeoffs, it becomes a strategic instrument for speed—not a catch-all excuse for rewriting code.\n",
    "category": "Engineering",
    "tags": ["Tech Debt", "Engineering Process", "Leadership"],
    "publishedDate": "2025-04-22",
    "originalDate": "2025.04.22",
    "featuredImage": "https://krischase.com/images/tech-debt.jpg",
    "seo": {
      "metaTitle": "Why Most Tech Debt Isn't Real Tech Debt - Kris Chase",
      "metaDescription": "A perspective-shifting look at tech debt—why most teams misuse the term and how to use it correctly.",
      "ogTitle": "Why Most Tech Debt Isn't Real Tech Debt - Kris Chase",
      "ogDescription": "A perspective-shifting look at tech debt—why most teams misuse the term and how to use it correctly.",
      "ogImage": "https://krischase.com/images/tech-debt.jpg",
      "twitterCard": "summary_large_image"
    },
    "readingTime": 4,
    "wordCount": 780,
    "author": {
      "name": "Kris Chase",
      "twitter": "@chasebadkids",
      "email": "hey@mehh.org"
    },
    "metadata": {
      "isUpdated": true
    }
  },
  {
    "slug": "the-case-for-small-engineering-teams",
    "url": "https://krischase.com/blog/the-case-for-small-engineering-teams",
    "title": "The Case for Small Engineering Teams",
    "description": "Why small engineering teams consistently outperform large ones—and how to structure them for clarity, ownership, and execution.",
    "content": "# The Case for Small Engineering Teams\n\nSmall teams ship faster. Not because they work harder, but because they carry less overhead. Every additional person increases communication paths, slows decision-making, and adds coordination cost.\n\nLarge teams build large meetings. Small teams build large impact.\n\n## Why Small Teams Win\n### **1. Less Coordination Overhead**\nWith fewer people, there are fewer handoffs, fewer dependencies, and fewer opportunities for misalignment. Work flows directly from idea to execution.\n\n### **2. Faster Decision Loops**\nSmall teams don’t wait for committees. They:\n- Make decisions early\n- Own their outcomes\n- Iterate without drama\n\nSpeed becomes a natural property of the system.\n\n### **3. Clearer Ownership**\nWhen a team is 3–7 engineers, everyone knows:\n- Their role\n- Their domain\n- Their responsibilities\n- Their decision-making authority\n\nClarity increases accountability. Accountability increases velocity.\n\n## The Ideal Team Shape\nTeams in the **3–7 engineer range** consistently produce the most predictable output. That shape:\n- Protects autonomy\n- Minimizes coordination\n- Maximizes focus and ownership\n- Enables parallel exploration across pods\n\nThis model scales horizontally, not vertically.\n\n## How Leaders Can Support Small Teams\nLeaders should:\n- Provide clear context and success metrics\n- Remove blockers quickly\n- Resist unnecessary process\n- Let teams own their roadmap slices\n- Empower technical leads with decision authority\n\nSmall teams thrive under leaders who trust them.\n\n## Final Thought\nThe future of engineering isn’t massive org charts—it’s small, empowered pods with high trust and high clarity. Big teams build big meetings. Small teams build big products.\n",
    "category": "Org Design",
    "tags": ["Team Structure", "Leadership", "Velocity"],
    "publishedDate": "2025-03-15",
    "originalDate": "2025.03.15",
    "featuredImage": "/images/blog/the-case-for-small-engineering-teams.png",
    "seo": {
      "metaTitle": "The Case for Small Engineering Teams - Kris Chase",
      "metaDescription": "Why small engineering teams consistently outperform larger ones and how to structure them for success.",
      "ogTitle": "The Case for Small Engineering Teams - Kris Chase",
      "ogDescription": "Why small engineering teams consistently outperform larger ones and how to structure them for success.",
      "ogImage": "https://krischase.com/images/small-teams.jpg",
      "twitterCard": "summary_large_image"
    },
    "readingTime": 3,
    "wordCount": 650,
    "author": {
      "name": "Kris Chase",
      "twitter": "@chasebadkids",
      "email": "hey@mehh.org"
    },
    "metadata": {
      "isUpdated": true
    }
  },
  {
    "slug": "what-good-engineering-culture-actually-means",
    "url": "https://krischase.com/blog/what-good-engineering-culture-actually-means",
    "title": "What Good Engineering Culture Actually Means",
    "description": "A practical definition of engineering culture—and the behaviors that separate healthy, high-output teams from dysfunctional ones.",
    "content": "# What Good Engineering Culture Actually Means\n\nMost companies talk about engineering culture as if it’s perks, slogans, or office vibes. But real culture has nothing to do with ping-pong tables, fancy Slack emojis, or motivational posters.\n\nCulture is simply **how your team behaves when nobody is watching**.\n\nThe best engineering organizations don’t craft culture with branding—they enforce it through action. They build environments where engineers do the best work of their careers and where teams operate with clarity, trust, and momentum.\n\n## What Healthy Engineering Culture Looks Like\n### **1. Engineers Take Ownership**\nOwnership is the strongest predictor of output. In healthy cultures:\n- Engineers feel responsible for outcomes, not just tasks.\n- People escalate risks early instead of hiding them.\n- Team members design with the future in mind, not just the sprint.\n- Engineers ask, “What’s the right thing for the system?” rather than “What’s the fastest way to close this ticket?”\n\nOwnership turns teams into partners—not executors.\n\n### **2. Product and Engineering Trust Each Other**\nGreat teams break the cycle of blame. Instead:\n- Product offers context, not feature lists.\n- Engineering provides reality, not excuses.\n- Both sides align on goals and constraints.\n\nTrust eliminates friction and accelerates delivery.\n\n### **3. Leadership Communicates Context, Not Tasks**\nHealthy cultures aren’t led by micromanagers. They’re led by people who:\n- Share the “why” behind decisions\n- Set clear success criteria\n- Remove blockers instead of adding pressure\n- Empower engineers to make decisions\n\nWhen leaders provide context, teams move with confidence.\n\n## Signs of a Weak or Dysfunctional Culture\n### **1. Micromanagement**\nWhen leaders dictate every detail, engineers disengage. Autonomy disappears. Creativity dies.\n\n### **2. Blame Loops**\nIf the response to every incident is finger-pointing instead of learning, teams become defensive. Innovation slows. People stop taking risks.\n\n### **3. Meetings With No Outcomes**\nSlow cultures love meetings because they substitute conversation for progress. High-performing cultures optimize for action.\n\n## Culture Isn’t Built—It’s Enforced\nThis is the part teams often get wrong.\n\nCulture doesn’t come from:\n- Vision decks\n- Company values posters\n- CEO all-hands speeches\n- Brand books\n\nCulture comes from **what leaders reward, tolerate, and correct**.\n\nIf you reward clarity, your org becomes clear. If you tolerate chaos, your org becomes chaotic. If you correct disrespect, collaboration increases. If you ignore it, toxicity grows.\n\nBehavior is the culture.\n\n## The Leader's Responsibility\nEngineering leaders shape culture every day through:\n- How they respond to mistakes\n- How they give feedback\n- How they prioritize technical debt\n- How they communicate roadmap changes\n- How they handle conflict\n\nGreat leaders protect the environment in which high-quality engineering becomes possible.\n\n## Final Thought\nGood engineering culture isn't soft. It's structural. It's behavioral. It's the invisible system that determines how quickly and confidently teams move.\n\nAt its core, culture is the accumulation of everyday choices. Enforce the right behaviors consistently, and the culture you want becomes the culture you have.\n",
    "category": "Culture",
    "tags": ["Engineering Culture", "Leadership"],
    "publishedDate": "2025-02-08",
    "originalDate": "2025.02.08",
    "featuredImage": "/images/blog/what-good-engineering-culture-actually-means.png",
    "seo": {
      "metaTitle": "What Good Engineering Culture Actually Means - Kris Chase",
      "metaDescription": "A practical definition of engineering culture and the key behaviors that separate healthy engineering teams from dysfunctional ones.",
      "ogTitle": "What Good Engineering Culture Actually Means - Kris Chase",
      "ogDescription": "A practical definition of engineering culture and the key behaviors that separate healthy engineering teams from dysfunctional ones.",
      "ogImage": "https://krischase.com/images/engineering-culture.jpg",
      "twitterCard": "summary_large_image"
    },
    "readingTime": 4,
    "wordCount": 830,
    "author": {
      "name": "Kris Chase",
      "twitter": "@chasebadkids",
      "email": "hey@mehh.org"
    },
    "metadata": {
      "isUpdated": true
    }
  },
  {
    slug: 'updated-how-to-find-and-clean-up-infected-wordpress-files-over-ssh',
    url: 'https://wp.krischase.com/updated-how-to-find-and-clean-up-infected-wordpress-files-over-ssh/',
    title: 'Updated: How to find and clean up infected WordPress Files over SSH',
    description: "Several years ago, I wrote what was and still is one of my most popular blogs to date. It\'s an article where I provided some tips and tricks on finding infected WordPress files on your server.",
    content: `![](https://wp.krischase.com/media/Recover-Hacked-WordPress-website-ojkfzdr4rz0xip8xgokego8hjvqe9k19hpibt0fwy0-1024x449.jpg)

Several years ago, I wrote what was and still is one of my most popular blogs to date. It's an article where I provided some tips and tricks on finding infected WordPress files on your server.

These days I'm doing a lot less (practically none) WordPress development as I've moved over to static sites utilizing [GatsbyJS](https://www.gatsbyjs.org/).

Anyways, I recently was cleaning up an old server of mine and found quite a few hacked files.

Most of these files could be broken down into two different categories.. Files with random names like a6bu23.php and so on, while other files were a bit harder to find.. Like about.php gallery.php etc.

In order to track down as many of the files in as few commands as possible, I ended up with the following patterns:

\`\`\`
find . -name "*.php"  -print0 | xargs -0 egrep -Ri '($_COOKIE, $_POST) as' *| awk -F' = ' '{print $1}' >> infectedfiles.txt
\`\`\`

\`\`\`
find . -name "*.php"  -print0 | xargs -0 egrep -Ri '@include "\\\\' *|awk -F'e "' '{ print $1 }'|awk -F':@' '{ print $1 }' >> infectedfiles.txt
\`\`\`

With these two commands, I was quickly able to generate a list that I could sort, organize and filter which allowed me to decide on which files could easily be removed at a glance, and which files required further investigation/pruning.

Another handy tip I like to do is cd into each WordPress install on the command line and update everything (prevents me from having to manually login to WordPress in the browser for dozens of sites and update them manually)

## To Update the core

\`\`\`
wp core update --force
\`\`\`

## To Update the plugins

\`\`\`
wp plugin update --all
\`\`\`

This is usually a really good idea as it will ensure there's no traces of hacked files.. Even if you're running the most up to date version of WordPress, running the core update command above will ensure that all files are replaced with good, clean WordPress files.`,
    category: 'Linux',
    tags: ['Linux', 'WordPress', 'PHP', 'SSH', 'Security'],
    publishedDate: '2020-05-02',
    originalDate: '2020.05.02',
    featuredImage: 'https://wp.krischase.com/media/Recover-Hacked-WordPress-website-ojkfzdr4rz0xip8xgokego8hjvqe9k19hpibt0fwy0.jpg',
    firstImage: 'https://wp.krischase.com/media/Recover-Hacked-WordPress-website-ojkfzdr4rz0xip8xgokego8hjvqe9k19hpibt0fwy0-1024x449.jpg',
    seo: {
      metaTitle: 'Updated: How to find and clean up infected WordPress Files over SSH - Kris Chase',
      metaDescription: 'Several years ago, I wrote what was and still is one of my most popular blogs to date. It\'s an article where I provided some tips and tricks on finding infected WordPress files on your server.',
      ogTitle: 'Updated: How to find and clean up infected WordPress Files over SSH - Kris Chase',
      ogDescription: 'Several years ago, I wrote what was and still is one of my most popular blogs to date. It\'s an article where I provided some tips and tricks on finding infected WordPress files on your server. These days I\'m doing … Continued',
      ogImage: 'https://wp.krischase.com/media/Recover-Hacked-WordPress-website-ojkfzdr4rz0xip8xgokego8hjvqe9k19hpibt0fwy0.jpg',
      twitterCard: 'summary',
    },
    readingTime: 2,
    wordCount: 450,
    author: {
      name: 'Kris Chase',
      twitter: '@chasebadkids',
      email: 'hey@mehh.org',
    },
    metadata: {
      updatedDate: '2020-05-02',
      isUpdated: true,
    },
  },
  {
    slug: 'find-user-used-coupon-code-magento',
    url: 'https://wp.krischase.com/find-user-used-coupon-code-magento/',
    title: 'How to find out what user used what coupon code in Magento',
    description: 'Easily export a list of all orders and their associated coupon usage for Magento orders using SQL',
    content: `![](https://wp.krischase.com/media/Marketplace-Seller-Coupons-Blog-Banner.png)

## The Problem with Magento and Coupon Codes

Magento comes pre-built with a ton of great reporting options for things like sales, shopping cart, products, customer reviews and more. Unfortunately within Magento there is no easy way to get an exported list of all orders with the associated coupon code that was used. Thankfully a little magic, mixed with some SQL can solve that for us!

[View the SQL query on GitHub Gist](https://gist.github.com/mehh/d2a9420ce41a41a7e6ef448d84c031d8)`,
    category: 'Development',
    tags: ['Development', 'Magento', 'MySQL', 'SQL'],
    publishedDate: '2016-06-02',
    originalDate: '2016.06.02',
    featuredImage: 'https://wp.krischase.com/media/Marketplace-Seller-Coupons-Blog-Banner.png',
    firstImage: 'https://wp.krischase.com/media/Marketplace-Seller-Coupons-Blog-Banner.png',
    seo: {
      metaTitle: 'How to find out what user used what coupon code in Magento - Kris Chase',
      metaDescription: 'Easily export a list of all orders and their associated coupon usage for Magento orders using SQL',
      ogTitle: 'How to find out what user used what coupon code in Magento - Kris Chase',
      ogDescription: 'Easily export a list of all orders and their associated coupon usage for Magento orders using SQL',
      ogImage: 'https://wp.krischase.com/media/Marketplace-Seller-Coupons-Blog-Banner.png',
      twitterCard: 'summary',
    },
    readingTime: 2,
    wordCount: 200,
    author: {
      name: 'Kris Chase',
      twitter: '@chasebadkids',
      email: 'hey@mehh.org',
    },
    metadata: {
      updatedDate: '2020-04-22',
      isUpdated: true,
    },
  },
  {
    slug: 'use-wpcli-and-cron-to-unpublish-wordpress-page',
    url: 'https://wp.krischase.com/use-wpcli-and-cron-to-unpublish-wordpress-page/',
    title: 'Use wpcli and Cron to Unpublish WordPress page',
    description: 'Use the wpcli and system cron to automatically unpublish a blog article or page at a specific time.',
    content: `![](https://wp.krischase.com/media/wp-cli-1024x532.jpg)

## The Situation

Have you ever found yourself in a situation where you need to automatically unpublish a specific blog post or page in WordPress? Maybe you need to take down a contest late at night, remove a blog article or some other reason. Recently I found myself in this position and decided to put together a little one liner using the wpcli to make it happen. Automate All The Things!

## The Code

\`\`\`
59 23 * * * /usr/local/bin/wp post update 1310 --post_status=draft --path="/home/username/public_html/"
\`\`\`

[View the full script on GitHub Gist](https://gist.github.com/mehh/81724de9232852481e15353d885aaba2)

## How it works

### Cron Jobs

If you're not familiar with cron scheduling syntax, check out [this tool](http://crontab-generator.org/)

### The wpcli

In order to use the code above, you will also need to have the wp-cli binary installed locally on your system. It doesn't necessarily need to be installed globally, but it will need to be accessible by whichever user you are planning on executing the script as. You can read more about the wp-cli at their site [https://wp-cli.org/](https://wp-cli.org/)

Essentially, all you will need to do is make sure the path to your wp binary is fully qualified as the $PATH that cron uses can vary. You will also need to change the ID of the post or page you're looking to edit as well as the path to your actual WordPress installation.

## The Power of the wpcli

You can probably come up with a lot of other valuable ways to use this power. The wpcli gives you lots of power over WordPress. You could do things like automatically purge the WordPress cache, update WordPress core, update WordPress plugins, update WordPress themes, you can even use it to run the actual wpcron() itself! The wpcli even gives you the ability to import data and export data automatically. You could use some sort of WebService or API to dynamically populate pages or posts.

In the future I will publish more articles that relate to the power of the wpcli and how it can be used to make your day to day management of WordPress more efficient.`,
    category: 'Development',
    tags: ['Development', 'WordPress', 'Linux', 'Bash'],
    publishedDate: '2016-05-14',
    originalDate: '2016.05.14',
    featuredImage: 'https://wp.krischase.com/media/wp-cli.jpg',
    firstImage: 'https://wp.krischase.com/media/wp-cli-1024x532.jpg',
    seo: {
      metaTitle: 'Use wpcli and Cron to Unpublish WordPress page - Kris Chase',
      metaDescription: 'Use the wpcli and system cron to automatically unpublish a blog article or page at a specific time.',
      ogTitle: 'Use wpcli and Cron to Unpublish WordPress page - Kris Chase',
      ogDescription: 'Use the wpcli and system cron to automatically unpublish a blog article or page at a specific time.',
      ogImage: 'https://wp.krischase.com/media/wp-cli.jpg',
      twitterCard: 'summary',
    },
    readingTime: 2,
    wordCount: 350,
    author: {
      name: 'Kris Chase',
      twitter: '@chasebadkids',
      email: 'hey@mehh.org',
    },
    metadata: {
      updatedDate: '2020-04-22',
      isUpdated: true,
    },
  },
  {
    slug: 'easily-monitor-uptime-on-whm-cpanel-server-with-uptimerobot',
    url: 'https://wp.krischase.com/easily-monitor-uptime-on-whm-cpanel-server-with-uptimerobot/',
    title: 'Easily monitor uptime on WHM & cPanel Server with UptimeRobot',
    description: "It's all about UptimeRobot When managing multiple WHM servers with hundreds of cPanel accounts, sometimes you need a quick and easy way to monitor your sites uptime.",
    content: `![](https://wp.krischase.com/media/uptimeRobot-and-whm-2-1024x465.jpg)

## It's all about UptimeRobot

When managing multiple WHM servers with hundreds of cPanel accounts, sometimes you need a quick and easy way to monitor your sites uptime. many of you may be aware of the service [Uptime Robot](https://uptimerobot.com/). If not, then you should definitely check it out. Uptime Robot is a service which allows you to freely monitor the uptime and receive alerts for up to 50 domains. You can receive slack messages, emails, pushbullet notifications and more.

## API to the Rescue

Adding entries into WHM isn't all that difficult, however when managing sites using WHM and cPanel across multiple servers, adding and removing your entries can be time consuming. Thankfully that's where the API comes into play.

Bil Bas created an [UptimeRobot client](https://github.com/uptimerobot/uptimerobot-cli/) in python that allows us to easily interface with the UptimeRobot API.

## Setting up the UptimeRobot Client

### Install the required python packages

Debian, Ubuntu and other Debian-based distributions

\`\`\`
apt-get install python-pip python-yaml python-argparse
\`\`\`

Or

\`\`\`
yum install python-pip python-yaml python-argparse
\`\`\`

### Download and unpack the source code.

\`\`\`
wget https://github.com/uptimerobot/cli/archive/master.zip
unzip master.zip
\`\`\`

### Create a package from source and install

\`\`\`
cd uptimerobot-cli-master/
python build.py release
pip install dist/uptimerobot-*.tar.gz
\`\`\`

### Modify your default config file

Using defaults

It is annoying to have to add the api key to every single uptimerobot command line. Therefore it is possible to store it into a defaults file.

Copy the file cli-master/uptimerobot/.uptimerobot.yml to your home directory and edit it accordingly. It is also possible to copy it to the current directory. uptimerobot will look in the current directory first, then in the users's home directory. A command line setting will always override the default settings.

Now you're all installed. Here's the fun part

## Getting your monitors created

Drop the bash script below onto your server and execute it to add all domains from your system to Uptime Robot!

[View the bash script on GitHub Gist](https://gist.github.com/mehh/e09b8da70627c81af3ef6d67ea1df85b)`,
    category: 'Development',
    tags: ['Development', 'Linux', 'WHM', 'cPanel', 'Monitoring'],
    publishedDate: '2016-05-06',
    originalDate: '2016.05.06',
    featuredImage: 'http://wp.krischase.com/media/uptimeRobot-and-whm-2.jpg',
    firstImage: 'https://wp.krischase.com/media/uptimeRobot-and-whm-2-1024x465.jpg',
    seo: {
      metaTitle: 'Easily monitor uptime on WHM & cPanel Server with UptimeRobot - Kris Chase',
      metaDescription: "It's all about UptimeRobot When managing multiple WHM servers with hundreds of cPanel accounts, sometimes you need a quick and easy way to monitor your sites uptime.",
      ogTitle: 'Easily monitor uptime on WHM & cPanel Server',
      ogDescription: "It's all about UptimeRobot When managing multiple WHM servers with hundreds of cPanel accounts, sometimes you need a quick and easy way to monitor your sites uptime. many of you may be aware of the service Uptime Robot. If not, … Continued",
      ogImage: 'http://wp.krischase.com/media/uptimeRobot-and-whm-2.jpg',
      twitterCard: 'summary',
    },
    readingTime: 2,
    wordCount: 400,
    author: {
      name: 'Kris Chase',
      twitter: '@chasebadkids',
      email: 'hey@mehh.org',
    },
    metadata: {},
  },
  {
    slug: 'wordpress-bash-scripts',
    url: 'https://wp.krischase.com/wordpress-bash-scripts/',
    title: 'WordPress Bash Scripts',
    description: "I've been doing a lot of bash scripting with WordPress, especially with WP CLI. Here are some snippets I found useful.",
    content: `![](https://wp.krischase.com/media/fsck-1024x689.png)

I've been doing a lot of bash scripting with WordPress, especially with WP CLI. Here are some snippets I found useful.

All the scripts assume a standard \`wp-config.php\` file with the database variables set.

### Getting the Database table prefix

If you need to make any SQL queries using WP CLI, you will need the database prefix for table names

\`\`\`
cat wp-config.php | grep "\\$table_prefix" | cut -d \\' -f 2
\`\`\`

### Getting WP Config Database user and password

If you've just downloaded an install of WordPress, these will give you the details to retrieve the database

\`\`\`
WPDBNAME=\`cat wp-config.php | grep DB_NAME | cut -d \\' -f 4\`
WPDBUSER=\`cat wp-config.php | grep DB_USER | cut -d \\' -f 4\`
WPDBPASS=\`cat wp-config.php | grep DB_PASSWORD | cut -d \\' -f 4\`
\`\`\`

### Setting WP Config database user and password

If you download a copy of an install, you may have to modify the DB details, this will do that automatically

\`\`\`
sed -i "/DB_HOST/s/'[^']*'/'localhost'/2" wp-config.php
sed -i "/DB_NAME/s/'[^']*'/'databasename'/2" wp-config.php
sed -i "/DB_USER/s/'[^']*'/'user'/2" wp-config.php
sed -i "/DB_PASSWORD/s/'[^']*'/'password'/2" wp-config.php
\`\`\`

### Adding SUNRISE to wp-config.php

Modifying \`wp-config.php\` to add new items isn't as simple as appending to the end.

\`\`\`
sed -i "/define('BLOG_ID_CURRENT_SITE', 1);/ a\\
DEFINE( 'SUNRISE', true );\\
" wp-config.php
\`\`\`

### Getting a list of active plugins and looping over them

Here I export the active plugin list as a CSV with a single column and ignore the name entry, letting me iterate through active plugins

\`\`\`
active=$(wp plugin list --status=active --format=csv --fields=name)

for plugin in $active; do
	(
		if [ ! $plugin = 'name' ]; then
			echo $plugin
		fi
	)
done
\`\`\`

### List all blogs via WP CLI

Listing and processing all blogs and sites on a multisite network isn't as trivial as it's made out to be, here is how you get the site id, URL, and blog id individually

\`\`\`
blogs=$(wp site list --fields="site_id,blog_id,url" --format="csv")
for entry in $blogs
do
    site_id=$(echo $entry |cut -d ',' -f1 )
    blog_id=$(echo $entry |cut -d ',' -f2 )
    blog_url=$(echo $entry |cut -d ',' -f3 )
    echo "$blog_id: $blog_url in $site_id"
done
\`\`\`

### Installing Domain mapping via WP CLI

Simply installing and activating domain mapping isn't enough, you need to move \`sunrise.php\` and setup the necessary \`DEFINE\` in \`wp-config.php\`

\`\`\`
wp plugin install wordpress-mu-domain-mapping
cp wp-content/plugins/wordpress-mu-domain-mapping/sunrise.php wp-content/sunrise.php
sed -i "/define('BLOG_ID_CURRENT_SITE', 1);/ a\\
DEFINE( 'SUNRISE', true );\\
" wp-config.php
wp plugin activate wordpress-mu-domain-mapping
\`\`\`

### Getting the domain name of a WP site via WP CLI

If I'm in an install and want a clean URL such as tomjn.com without the trailing slash and protocol identifier, I would do this:

\`\`\`
siteurl=$(wp option get siteurl)
url=$(echo $siteurl | awk -F/ '{print $3}')
echo $url
\`\`\`

### Get the blog ID of a blog given a URL

WP CLI can list all sites for you, but sometimes you only have a URL to go by and need to find its blog ID

\`\`\`
dbprefix=$(cat wp-config.php | grep "\\$table_prefix" | cut -d \\' -f 2)
query1=$(wp db query "SELECT blog_id FROM \${dbprefix}blogs b WHERE b.domain LIKE \\"%\${fromdomain}%\\" LIMIT 1")
blog_id=$(echo $query1 |cut -d ' ' -f2)
echo $blog_id
\`\`\`

### Setting Up Domain Mapping via WP CLI

A manual SQL query is needed for this, followed by the setting of some options.

NOTE: Domain mapping only generates the table when you visit the domain mapping admin page, so if you setup a site and run the query it will fail if nobody has logged into the site and visited the network admin panel.

\`\`\`
fromdomain='...'
todomain='...'

dbprefix=$(cat wp-config.php | grep "\\$table_prefix" | cut -d \\' -f 2)
query1=$(wp db query "SELECT blog_id FROM \${dbprefix}blogs b WHERE b.domain LIKE \\"%\${fromdomain}%\\" LIMIT 1")
blog_id=$(echo $query1 |cut -d ' ' -f2)
echo $blog_id
wp db query "INSERT INTO \${dbprefix}domain_mapping ( blog_id, domain, active ) VALUES ( $blog_id, \\"\${todomain}\\", 1 )"

wp option update home "http://\${todomain}" --url="\${todomain}"
wp option update siteurl "http://\${todomain}" --url="\${todomain}"
\`\`\``,
    category: 'Development',
    tags: ['Development', 'WordPress', 'Linux', 'Bash', 'WP-CLI'],
    publishedDate: '2016-01-22',
    originalDate: '2016.01.22',
    featuredImage: 'https://wp.krischase.com/media/fsck.png',
    firstImage: 'https://wp.krischase.com/media/fsck-1024x689.png',
    seo: {
      metaTitle: 'WordPress Bash Scripts - Kris Chase',
      metaDescription: "I've been doing a lot of bash scripting with WordPress, especially with WP CLI. Here are some snippets I found useful.",
      ogTitle: 'WordPress Bash Scripts - Kris Chase',
      ogDescription: "I've been doing a lot of bash scripting with WordPress, especially with WP CLI. Here are some snippets I found useful. All the scripts assume a standard wp-config.php file with the database variables set. Getting the Database table prefix If you need … Continued",
      ogImage: 'https://wp.krischase.com/media/fsck.png',
      twitterCard: 'summary',
    },
    readingTime: 4,
    wordCount: 900,
    author: {
      name: 'Kris Chase',
      twitter: '@chasebadkids',
      email: 'hey@mehh.org',
    },
    metadata: {
      updatedDate: '2016-03-07',
      isUpdated: true,
    },
  },
  {
    slug: 'how-to-migrate-magento-customers-and-orders',
    url: 'https://wp.krischase.com/how-to-migrate-magento-customers-and-orders/',
    title: 'How to Migrate Magento Customers and Orders',
    description: 'When launching an existing Magento store, one of the last things you will need to do is migrate all of the current Customers and Orders from the production site, into development, prior to actually going live.',
    content: `When launching an existing Magento store, one of the last things you will need to do is migrate all of the current Customers and Orders from the production site, into development, prior to actually going live.

If you SSH to the server, you can execute the following:

\`\`\`
mysqldump -u <userName> -p <databaseName> customer_address_entity customer_address_entity_datetime customer_address_entity_decimal customer_address_entity_int customer_address_entity_text customer_address_entity_varchar customer_eav_attribute customer_eav_attribute_website customer_entity customer_entity_datetime customer_entity_decimal customer_entity_int customer_entity_text customer_entity_varchar customer_form_attribute customer_group sales_bestsellers_aggregated_daily sales_bestsellers_aggregated_monthly sales_bestsellers_aggregated_yearly sales_billing_agreement sales_billing_agreement_order sales_flat_creditmemo sales_flat_creditmemo_comment sales_flat_creditmemo_grid sales_flat_creditmemo_item sales_flat_invoice sales_flat_invoice_comment sales_flat_invoice_grid sales_flat_invoice_item sales_flat_order sales_flat_order_address sales_flat_order_grid sales_flat_order_item sales_flat_order_payment sales_flat_order_status_history sales_flat_quote sales_flat_quote_address sales_flat_quote_address_item sales_flat_quote_item sales_flat_quote_item_option sales_flat_quote_payment sales_flat_quote_shipping_rate sales_flat_shipment sales_flat_shipment_comment sales_flat_shipment_grid sales_flat_shipment_item sales_flat_shipment_track sales_invoiced_aggregated sales_invoiced_aggregated_order sales_order_aggregated_created sales_order_aggregated_updated sales_order_status sales_order_status_label sales_order_status_state sales_order_tax sales_order_tax_item sales_payment_transaction sales_recurring_profile sales_recurring_profile_order sales_refunded_aggregated sales_refunded_aggregated_order sales_shipping_aggregated sales_shipping_aggregated_order > dump.sql
\`\`\`

Have anything to add? Let me know!`,
    category: 'Magento',
    tags: ['Magento', 'MySQL', 'Development'],
    publishedDate: '2015-09-16',
    originalDate: '2015.09.16',
    featuredImage: 'https://wp.krischase.com/media/krischase.jpg',
    firstImage: undefined,
    seo: {
      metaTitle: 'How to Migrate Magento Customers and Orders - Kris Chase',
      metaDescription: 'When launching an existing Magento store, one of the last things you will need to do is migrate all of the current Customers and Orders from the production site, into development, prior to actually going live.',
      ogTitle: 'How to Migrate Magento Customers and Orders - Kris Chase',
      ogDescription: 'When launching an existing Magento store, one of the last things you will need to do is migrate all of the current Customers and Orders from the production site, into development, prior to actually going live. If you SSH to the server, you … Continued',
      ogImage: 'https://wp.krischase.com/media/krischase.jpg',
      twitterCard: 'summary',
    },
    readingTime: 1,
    wordCount: 150,
    author: {
      name: 'Kris Chase',
      twitter: '@chasebadkids',
      email: 'hey@mehh.org',
    },
    metadata: {
      updatedDate: '2015-10-08',
      isUpdated: true,
    },
  },
  {
    slug: 'tuning-and-benchmarking-apache-and-mysql',
    url: 'https://wp.krischase.com/tuning-and-benchmarking-apache-and-mysql/',
    title: 'Tuning and benchmarking Apache and MySQL',
    description: "Have you ever found yourself needing to speed up apache or mysql? Here's a quick writeup on some very useful tools when you first setup Apache and MySQL.",
    content: `![](https://wp.krischase.com/media/apachebuddy.png)

Have you ever found yourself needing to speed up apache or mysql? Here's a quick writeup on some very useful tools when you first setup Apache and MySQL. These will help you optimize and build out the absolute best configuration for your webserver.

**Apachebuddy:**

https://github.com/gusmaskowitz/apachebuddy.pl

To download and run ApacheBuddy, use the following:

\`\`\`
curl http://cloudfiles.fanatassist.com/apachebuddy.pl | perl
\`\`\`

When you see [ !! ] this indicates that there is an issue and suggests something to be changed.

**The Second Script is MySQL tuner**

https://github.com/major/MySQLTuner-perl

This script will give you all sorts of valuable information about your MySQL server

Simply run the following:

\`\`\`
wget https://raw.github.com/major/MySQLTuner-perl/master/mysqltuner.pl
./mysqltuner.pl --user root --pass YOURPASSWORD --forcemem 1024
\`\`\`

**Another great script is lazyscript**

https://github.com/hhoover/lazyscripts

Lazy script is filled with a number of invaluable resources including system information, MySQL tools, Apache tools, and more.

**And finally, recap**

https://github.com/rackerlabs/recap

Developed by Rackspace, there is many great tools to use.

Provides a combination of command outputs including: uptime, free, vmstat, iostat, df, as well as some information derived from the 'top' command including the top 10 cpu% using processes and the top 10 memory% using processes.

You can setup recap to run on a scheduled basis using cron. This is a great tool when it comes to troubleshooting servers at various points in time. Using this correctly, you can easily get an idea of what was going on on your server at a given time.

Have any great tools / resources to share? Add them in the comments below`,
    category: 'Linux',
    tags: ['Linux', 'Apache', 'MySQL', 'Development', 'Performance'],
    publishedDate: '2015-09-10',
    originalDate: '2015.09.10',
    featuredImage: 'https://wp.krischase.com/media/apachebuddy.png',
    firstImage: 'https://wp.krischase.com/media/apachebuddy.png',
    seo: {
      metaTitle: 'Tuning and benchmarking Apache and MySQL - Kris Chase',
      metaDescription: "Have you ever found yourself needing to speed up apache or mysql? Here's a quick writeup on some very useful tools when you first setup Apache and MySQL.",
      ogTitle: 'Tuning and benchmarking Apache and MySQL - Kris Chase',
      ogDescription: "Have you ever found yourself needing to speed up apache or mysql? Here's a quick writeup on some very useful tools when you first setup Apache and MySQL. These will help you optimize and build out the absolute best configuration … Continued",
      ogImage: 'https://wp.krischase.com/media/apachebuddy.png',
      twitterCard: 'summary',
    },
    readingTime: 3,
    wordCount: 650,
    author: {
      name: 'Kris Chase',
      twitter: '@chasebadkids',
      email: 'hey@mehh.org',
    },
    metadata: {
      updatedDate: '2020-05-03',
      isUpdated: true,
    },
  },
  {
    slug: 'remove-visual-composer-excerpt',
    url: 'https://wp.krischase.com/remove-visual-composer-excerpt/',
    title: 'Remove Visual Composer Shortcodes from WordPress Excerpt',
    description: 'Learn how to remove Visual Composer from your WordPress post excerpts using easy to drop in php functions which can be called anywhere in your site',
    content: `![](https://wp.krischase.com/media/armadaplugins-vc-1024x366.gif)

If you've ever been in a situation where you're using [Visual Composer](https://vc.wpbakery.com/) within a site and you need to pull in an excerpt in a way that doesn't include any shortcodes you can use the below functions to make that happen.

All you need to do is drop the following code into your functions.php file:

## The Code for removing Visual Composer

\`\`\`php
/** add this to your function.php child theme to remove ugly shortcode on excerpt */

if(!function_exists('remove_vc_from_excerpt'))  {
  function remove_vc_from_excerpt( $excerpt ) {
    $patterns = "/\\[[\\/]?vc_[^\\]]*\\]/";
    $replacements = "";
    return preg_replace($patterns, $replacements, $excerpt);
  }
}

/** * Original elision function mod by Paolo Rudelli */

if(!function_exists('kc_excerpt')) {

/** Function that cuts post excerpt to the number of word based on previosly set global * variable $word_count, which is defined below */

  function kc_excerpt($excerpt_length = 20) {

    global $word_count, $post;

    $word_count = isset($word_count) && $word_count != "" ? $word_count : $excerpt_length;

    $post_excerpt = $post->post_excerpt != "" ? $post->post_excerpt : strip_tags($post->post_content); $clean_excerpt = strpos($post_excerpt, '...') ? strstr($post_excerpt, '...', true) : $post_excerpt;

    /** add by PR */

    $clean_excerpt = strip_shortcodes(remove_vc_from_excerpt($clean_excerpt));

    /** end PR mod */

    $excerpt_word_array = explode (' ',$clean_excerpt);

    $excerpt_word_array = array_slice ($excerpt_word_array, 0, $word_count);

    $excerpt = implode (' ', $excerpt_word_array).'...'; echo ''.$excerpt.'';

  }

}
\`\`\`

After you insert the previous code into your functions.php file, you can call the function wherever it's needed.

## Note:

You can also pass in an argument to the function which will allow you to modify the length of your excerpt while excluding those Visual Composer shortcodes.

Is there any way you see this function for removing Visual Composer Shortcodes from WordPress could be improved? If so, shoot me an email and I'll work on getting it added!`,
    category: 'Development',
    tags: ['Development', 'WordPress', 'PHP'],
    publishedDate: '2016-05-04',
    originalDate: '2016.05.04',
    featuredImage: 'https://wp.krischase.com/media/armadaplugins-vc.gif',
    firstImage: 'https://wp.krischase.com/media/armadaplugins-vc-1024x366.gif',
    seo: {
      metaTitle: 'Remove Visual Composer Shortcodes from WordPress Excerpt',
      metaDescription: 'Learn how to remove Visual Composer from your WordPress post excerpts using easy to drop in php functions which can be called anywhere in your site',
      ogTitle: 'Remove Visual Composer Shortcodes from WordPress Excerpt',
      ogDescription: 'Learn how to remove Visual Composer from your WordPress post excerpts using easy to drop in php functions which can be called anywhere in your site',
      ogImage: 'https://wp.krischase.com/media/armadaplugins-vc.gif',
      twitterCard: 'summary',
    },
    readingTime: 2,
    wordCount: 400,
    author: {
      name: 'Kris Chase',
      twitter: '@chasebadkids',
      email: 'hey@mehh.org',
    },
    metadata: {
      updatedDate: '2018-12-06',
      isUpdated: true,
    },
  },
  {
    slug: 'create-options-pages-in-wordpress-with-advanced-custom-fields-acf',
    url: 'https://wp.krischase.com/create-options-pages-in-wordpress-with-advanced-custom-fields-acf/',
    title: 'Create options pages in WordPress with Advanced Custom Fields (ACF)',
    description: 'I searched low and high to figure out how to create options pages in the updated version of Advanced Custom Fields (version 5 of ACF)',
    content: `I searched low and high to figure out how to create options pages in the updated version of Advanced Custom Fields (version 5 of ACF)

\`\`\`php
if(function_exists("acf_add_options_page")) {
	acf_add_options_page();
}
if(function_exists("register_options_page")) {
	register_options_page('Various');
	register_options_page('Header');
	register_options_page('Footer');
}
\`\`\`

After creating the fields in your WordPress backend, to invoke the fields you can use syntax similar to the following:

\`\`\`php
<?php the_field('my_field','option'); ?>
\`\`\``,
    category: 'PHP',
    tags: ['PHP', 'WordPress', 'Development'],
    publishedDate: '2014-10-29',
    originalDate: '2014.10.29',
    featuredImage: 'https://wp.krischase.com/media/krischase.jpg',
    firstImage: undefined,
    seo: {
      metaTitle: 'Create options pages in WordPress with Advanced Custom Fields (ACF) - Kris Chase',
      metaDescription: 'I searched low and high to figure out how to create options pages in the updated version of Advanced Custom Fields (version 5 of ACF)',
      ogTitle: 'Create options pages in WordPress with Advanced Custom Fields (ACF) - Kris Chase',
      ogDescription: "I searched low and high to figure out how to create options pages in the updated version of Advanced Custom Fields (version 5 of ACF) if(function_exists('acf_add_options_page')) { acf_add_options_page(); } if(function_exists('register_options_page')) { register_options_page('Various'); register_options_page('Header'); register_options_page('Footer'); } After creating the fields … Continued",
      ogImage: 'https://wp.krischase.com/media/krischase.jpg',
      twitterCard: 'summary',
    },
    readingTime: 1,
    wordCount: 100,
    author: {
      name: 'Kris Chase',
      twitter: '@chasebadkids',
      email: 'hey@mehh.org',
    },
    metadata: {
      updatedDate: '2014-10-29',
      isUpdated: false,
    },
  },
  {
    slug: 'detect-and-prevent-malware-in-gravity-forms-file-upload-with-php-clamav',
    url: 'https://wp.krischase.com/detect-and-prevent-malware-in-gravity-forms-file-upload-with-php-clamav/',
    title: 'Detect and Prevent Malware in Gravity Forms File Upload with PHP ClamAV',
    description: "One of the best and most widely used form building plugins for WordPress is gravity forms. If you've ever needed to allow users to upload files to your site, but you want to make sure those files are not harmful, the following tutorial will help you with just that!",
    content: `One of the best and most widely used form building plugins for WordPress is **[gravity forms](http://www.gravityforms.com/)**. If you've ever needed to allow users to upload files to your site, but you want to make sure those files are not harmful, the following tutorial will help you with just that!

\`\`\`php
//	Custom Scan AV function by Kris Chase
//	Modify the number 13 throughout this function for your specific Gravity Form ID
add_filter("gform_validation_13", "scan_av");
function scan_av($validation_result){

	//	Grab the file while it's still in /tmp/
	//	You will need to change your input ID to the specific field ID in your form
		$fileLocation	=	$_FILES['input_1']['tmp_name'];

	//	Scan the file for malware
		$retcode = cl_scanfile($fileLocation, $virus_name);

	//	Conditional Logic
	if ($retcode === CL_VIRUS)
	{
		// set the form validation to false
			$validation_result["is_valid"]				= false;
			$form 									= $validation_result["form"];

			//  Custom error message for our form
			add_filter("gform_validation_message_13", "change_message", 10, 2);
			function change_message($message, $form){
			  return "<strong style=\\"color:red;\\">Error: Malicious File Detected.</strong>";
			}

		// update the form in the validation result with the form object you modified
		$validation_result["form"] = $form;

		return $validation_result;

	}
	else{
		return $validation_result;
	}
}
\`\`\`

In order to use this function you will have to have the ClamAV installed, as well as the PHP ClamAV Module. A great writeup on accomplished using the following for CentOS:

You just need to install ClamAV like normal (with the epel repo)…

\`\`\`bash
yum install clamav
yum install clamavdevel
\`\`\`

If you don't have EPEL you can get it from IUS community (if you want you can also grab the IUS repo and get the latest version of PHP) – _thank the RackSpace engineers for this!_

\`\`\`bash
wget http://dl.iuscommunity.org/pub/ius/stable/CentOS/6/x86_64/epel-release-6-5.noarch.rpm
rpm -ivh epel-release-6-5.noarch.rpm
\`\`\`

Then you download and install **[this library](http://php-clamav.sourceforge.net/)**, which will handle all the hard things for you.

\`\`\`bash
wget **the direct link you got**
tar -xvzf php-clamav_0.15.7.tar.gz
cd php-clamav-0.15.7
phpize
./configure
make
make install
\`\`\`

Now add the extension to your /etc/php.ini (the location of your php.ini file as well as your actual clamav file may vary depending on your linux distro / version)

\`\`\`ini
extension=/usr/lib64/php/modules/clamav.so
\`\`\`

Remember to change the path to what was given to you by \`make install\`

then restart your Apache

\`\`\`bash
service httpd restart
\`\`\`

Make a file with the contents:

\`\`\`php
<?php
    echo cl_info();
?>
\`\`\`

It should come up with something showing ClamAV information.

Now you should have access to all the library functions, you can now scan files like this:

\`\`\`php
$retcode = cl_scanfile($file, $virus_name);

if ($retcode === CL_VIRUS)
{
    echo "Virus Detected! {$virus_name}";
}
\`\`\`

Congratulations! You can find other functions [here](http://php-clamav.sourceforge.net/)

Let me know your thoughts, I'm going to be updating / enhancing this function as I come up with more ideas. I'd also like to make this function a lot more modular.

Thanks for reading!`,
    category: 'Gravity Forms',
    tags: ['Gravity Forms', 'WordPress', 'PHP', 'Security', 'ClamAV'],
    publishedDate: '2015-01-07',
    originalDate: '2015.01.07',
    featuredImage: 'http://i.stack.imgur.com/2lTeQ.png',
    firstImage: undefined,
    seo: {
      metaTitle: 'Detect and Prevent Malware in Gravity Forms File Upload with PHP ClamAV',
      metaDescription: "One of the best and most widely used form building plugins for WordPress is gravity forms. If you've ever needed to allow users to upload files to your site, but you want to make sure those files are not harmful, the following tutorial will help you with just that!",
      ogTitle: 'Detect and Prevent Malware in Gravity Forms File Upload with PHP ClamAV',
      ogDescription: "One of the best and most widely used form building plugins for WordPress is gravity forms. If you've ever needed to allow users to upload files to your site, but you want to make sure those files are not harmful, the … Continued",
      ogImage: 'http://i.stack.imgur.com/2lTeQ.png',
      twitterCard: 'summary',
    },
    readingTime: 2,
    wordCount: 500,
    author: {
      name: 'Kris Chase',
      twitter: '@chasebadkids',
      email: 'hey@mehh.org',
    },
    metadata: {
      updatedDate: '2015-01-07',
      isUpdated: false,
    },
  },
  {
    slug: 'laravel-force-https',
    url: 'https://wp.krischase.com/laravel-force-https/',
    title: 'Laravel Force HTTPS',
    description: 'Using App::before You might be able to take advantage of the App::before() block in the app/filters.php file.',
    content: `**Using App::before**

You might be able to take advantage of the \`App::before()\` block in the \`app/filters.php\` file.

Change the block to include a simple check to see if the current request is secure, and if not, redirect it.

\`\`\`php
App::before(function($request)
{
    if( ! Request::secure())
    {
        return Redirect::secure(Request::path());
    }
});
\`\`\`

**Using Filters**

Another option might be to create a filter like so. People generally store this also in \`app/filters.php\`.

\`\`\`php
Route::filter('force.ssl', function()
{
    if( ! Request::secure())
    {
        return Redirect::secure(Request::path());
    }

});
\`\`\`

You can then enforce that new filter to any of your routes, route groups, or controllers like this.

_Individual Route_

\`\`\`php
Route::get('something', ['before' => 'force.ssl', function()
{
    return "This will be forced SSL";
}];
\`\`\`

_Route Group_

\`\`\`php
Route::group(['before' => 'force.ssl', function()
{
    // Routes here.
}
\`\`\`

_Controller_

You'll need to do this in your controller's \`__construct()\` method.

\`\`\`php
public function __construct()
{
    $this->beforeFilter('force.ssl');
}
\`\`\``,
    category: 'Uncategorized',
    tags: ['Uncategorized', 'Laravel', 'Development'],
    publishedDate: '2015-03-31',
    originalDate: '2015.03.31',
    featuredImage: 'https://wp.krischase.com/media/krischase.jpg',
    firstImage: undefined,
    seo: {
      metaTitle: 'Laravel Force HTTPS - Kris Chase',
      metaDescription: 'Using App::before You might be able to take advantage of the App::before() block in the app/filters.php file.',
      ogTitle: 'Laravel Force HTTPS - Kris Chase',
      ogDescription: 'Using App::before You might be able to take advantage of the App::before() block in the app/filters.php file. Change the block to include a simple check to see if the current request is secure, and if not, redirect it. App::before(function($request) { … Continued',
      ogImage: 'https://wp.krischase.com/media/krischase.jpg',
      twitterCard: 'summary',
    },
    readingTime: 1,
    wordCount: 200,
    author: {
      name: 'Kris Chase',
      twitter: '@chasebadkids',
      email: 'hey@mehh.org',
    },
    metadata: {},
  },
  {
    slug: 'optimize-all-images-within-current-directory',
    url: 'https://wp.krischase.com/optimize-all-images-within-current-directory/',
    title: 'Optimize all images within current directory',
    description: 'Easily optimize all PNG and JPG images within your website for Google Page Speed improvements.',
    content: `![](https://wp.krischase.com/media/optimizeImages-1024x240.jpg)

When trying to get that A rating with Google Page Speed or GTMetrix, one of the easiest ways to earn points is through the optimization of all the PNG and JPG images within your web root. I tend to use optipng and jpegoptim for this. It gives the ability to easily lossless optimize all your images so that you make search engines and your users happy with fast sites, while still showing them good looking images.

Follow these instructions and you're on your way to having an even faster site.

Step 1) SSH to your system

\`\`\`
ssh username@hostname.com
\`\`\`

Step 2) CD to directory where your images exist ( This will vary on each hosting environment )

\`\`\`
cd /home/username/public_html/
\`\`\`

Step 3) Run the optimization scripts

\`\`\`
find . -iname *.jpg | xargs jpegoptim --max=90 --all-progressive --strip-all --strip-com --strip-exif --strip-iptc --strip-icc &
find . -type f -iname "*.png" -print0 | xargs -I {} -0 optipng -o5 -quiet -keep -preserve -log optipng.log "{}" &
\`\`\`

What the above does, is searches everywhere within your current directory and down, for jpeg and PNG images. Once it finds them it will optimize them and replace the larger image right in place.

Keep in mind, that this script can take minutes or even hours depending on how many images you have and how fast your server is, so your best bet is to fire this off and leave it for a while.

And that's it! You're on your way to having a faster WordPress site with optimized images.`,
    category: 'Development',
    tags: ['Development', 'Linux', 'Performance', 'Optimization'],
    publishedDate: '2015-10-12',
    originalDate: '2015.10.12',
    featuredImage: 'https://wp.krischase.com/media/optimizeImages.jpg',
    firstImage: 'https://wp.krischase.com/media/optimizeImages-1024x240.jpg',
    seo: {
      metaTitle: 'Optimize all images within current directory - Kris Chase',
      metaDescription: 'Easily optimize all PNG and JPG images within your website for Google Page Speed improvements.',
      ogTitle: 'Optimize all images within current directory - Kris Chase',
      ogDescription: 'Easily optimize all PNG and JPG images within your website for Google Page Speed improvements.',
      ogImage: 'https://wp.krischase.com/media/optimizeImages.jpg',
      twitterCard: 'summary',
    },
    readingTime: 1,
    wordCount: 250,
    author: {
      name: 'Kris Chase',
      twitter: '@chasebadkids',
      email: 'hey@mehh.org',
    },
    metadata: {
      updatedDate: '2016-04-23',
      isUpdated: true,
    },
  },
  {
    slug: 'how-to-load-jquery-in-wordpress-theme',
    url: 'https://wp.krischase.com/how-to-load-jquery-in-wordpress-theme/',
    title: 'How to load jQuery in WordPress theme',
    description: 'When building out a custom theme, one of the first things most developers will need in their set of tools and resources to write efficient code will be jQuery.',
    content: `When building out a custom theme, one of the first things most developers will need in their set of tools and resources to write efficient code will be jQuery. There are a number of ways you can add jQuery into your theme, but there is only one right way.

You might be tempted to [download jQuery](http://jquery.com/download/), upload it to your server and link to it directly in your header, but that isn't the right way.

What you should do is utilize WordPress's built in [enqueue script](http://codex.wordpress.org/Function_Reference/wp_enqueue_script) functionality to load jQuery at the right time, the right way.

Put the following code in your themes functions.php file

\`\`\`php
if (!is_admin()) add_action("wp_enqueue_scripts", "my_jquery_enqueue", 11);
function my_jquery_enqueue() {
   wp_deregister_script('jquery');
   wp_register_script('jquery', "http" . ($_SERVER['SERVER_PORT'] == 443 ? "s" : "") . "://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js", false, null);
   wp_enqueue_script('jquery');
}
\`\`\``,
    category: 'jQuery',
    tags: ['jQuery', 'WordPress', 'Development', 'JavaScript'],
    publishedDate: '2014-10-21',
    originalDate: '2014.10.21',
    featuredImage: 'https://wp.krischase.com/media/krischase.jpg',
    firstImage: undefined,
    seo: {
      metaTitle: 'How to load jQuery in WordPress theme - Kris Chase',
      metaDescription: 'When building out a custom theme, one of the first things most developers will need in their set of tools and resources to write efficient code will be jQuery.',
      ogTitle: 'How to load jQuery in WordPress theme - Kris Chase',
      ogDescription: 'When building out a custom theme, one of the first things most developers will need in their set of tools and resources to write efficient code will be jQuery. There are a number of ways you can add jQuery into … Continued',
      ogImage: 'https://wp.krischase.com/media/krischase.jpg',
      twitterCard: 'summary',
    },
    readingTime: 1,
    wordCount: 150,
    author: {
      name: 'Kris Chase',
      twitter: '@chasebadkids',
      email: 'hey@mehh.org',
    },
    metadata: {
      updatedDate: '2014-10-21',
      isUpdated: false,
    },
  },
  {
    slug: 'robotsdeploy',
    url: 'https://wp.krischase.com/robotsdeploy/',
    title: 'Easily deploy a templated robots.txt file to all accounts within your WHM / cPanel server.',
    description: 'Easily deploy a templated robots.txt file to all accounts within your WHM / cPanel server.',
    content: `![](https://wp.krischase.com/media/robots.png)

Ever need to quickly deploy a robots.txt template across all accounts on a WHM / cPanel server? The script below will allow you to do just that. It's great for using in conjunction with a CRON job on your system to make sure all accounts are using the latest and greatest version of your robots file.

## The Code

[View the bash script on GitHub Gist](https://gist.github.com/mehh/375126694ee0bd817ac9810d57d3cdd9)

This can be handy when setting up a development / production / staging server. If used correctly, you can avoid having development links get picked up and indexed by google. This will also ensure that after a successful deployment to production, your site will not have issues being blocked from Google and other search engines.

After choosing a location to house the script, you can use the following crontab entry:

\`0 3 * * * /bin/bash /root/scripts/robotsDeploy.sh -f /root/scripts/blockRobots.txt  >/dev/null 2>&1\`

My example is set to run at 3:00 am each morning. It will use the script found at /root/scripts/robotsDeploy.sh and utilize the template /roots/scripts/blockRobots.txt to automatically roll out that version of my robots.txt file to each and every cPanel and WHM account that exists on my server. You can easily change your template file, as well as what time your script runs by modifying the crontab entry.

What use cases have you come up with for this? In a future release I will setup a way to pass in a whitelist / blacklist of accounts which should be skipped automatically while inserting new rows into your robots.txt file.`,
    category: 'Development',
    tags: ['Development', 'Linux', 'WHM', 'cPanel', 'Bash'],
    publishedDate: '2016-04-19',
    originalDate: '2016.04.19',
    featuredImage: 'https://wp.krischase.com/media/robots.png',
    firstImage: 'https://wp.krischase.com/media/robots.png',
    seo: {
      metaTitle: 'Easily deploy a templated robots.txt file to all accounts within your WHM / cPanel server. - Kris Chase',
      metaDescription: 'Easily deploy a templated robots.txt file to all accounts within your WHM / cPanel server.',
      ogTitle: 'robots.txt deployment script',
      ogDescription: 'Easily deploy a templated robots.txt file to all accounts within your WHM / cPanel server.',
      ogImage: 'https://wp.krischase.com/media/robots.png',
      twitterCard: 'summary',
    },
    readingTime: 1,
    wordCount: 200,
    author: {
      name: 'Kris Chase',
      twitter: '@chasebadkids',
      email: 'hey@mehh.org',
    },
    metadata: {},
  },
  {
    slug: 'use-php-to-pull-users-instagram-feed',
    url: 'https://wp.krischase.com/use-php-to-pull-users-instagram-feed/',
    title: 'Use PHP to pull Users Instagram Feed',
    description: "Here's a great snippet for pulling a users Instagram Feed and doing whatever you want with it.",
    content: `![](https://wp.krischase.com/media/instagram_1.png)

\`\`\`php
<?php
   function fetch_data($url){
      $ch = curl_init();
      curl_setopt($ch, CURLOPT_URL, $url);
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
      curl_setopt($ch, CURLOPT_TIMEOUT, 20);
      $result = curl_exec($ch);
      curl_close($ch);
      return $result;
   }

   $count = 10; // the number of photos you want to fetch
   $access_token = "###################"; // Put your access_token which is generated from instagram here
   $display_size = "thumbnail"; // you can choose between "low_resolution", "thumbnail" and "standard_resolution"

   $result = fetch_data("https://api.instagram.com/v1/users/17368863/media/recent/?client_id=$access_token");
   $result = json_decode($result);

   ?>
<ul class="slides" >
   <?php
      foreach ($result->data as $photo):
         $img = $photo->images->thumbnail->url;
         $imageLink  =  $photo->link;

      ?>
   <li style="width: 185px; float: left; display: block;">
      <a href="<?php echo $imageLink; ?>" target="_blank">
      <img src="<?php echo $img; ?>" draggable="false">
      </a>
   </li>
   <?php
      endforeach;
      ?>
</ul>
\`\`\`

Here's a great snippet for pulling a users Instagram Feed and doing whatever you want with it. 🙂`,
    category: 'Development',
    tags: ['Development', 'PHP', 'Instagram', 'API'],
    publishedDate: '2015-09-16',
    originalDate: '2015.09.16',
    featuredImage: 'https://wp.krischase.com/media/instagram_1.png',
    firstImage: 'https://wp.krischase.com/media/instagram_1.png',
    seo: {
      metaTitle: 'Use PHP to pull Users Instagram Feed - Kris Chase',
      metaDescription: "Here's a great snippet for pulling a users Instagram Feed and doing whatever you want with it.",
      ogTitle: 'Use PHP to pull Users Instagram Feed - Kris Chase',
      ogDescription: "Here's a great snippet for pulling a users Instagram Feed and doing whatever you want with it.",
      ogImage: 'https://wp.krischase.com/media/instagram_1.png',
      twitterCard: 'summary',
    },
    readingTime: 1,
    wordCount: 150,
    author: {
      name: 'Kris Chase',
      twitter: '@chasebadkids',
      email: 'hey@mehh.org',
    },
    metadata: {
      updatedDate: '2016-04-23',
      isUpdated: true,
    },
  },
  {
    slug: 'how-to-find-and-clean-up-infected-wordpress-files-over-ssh',
    url: 'https://wp.krischase.com/how-to-find-and-clean-up-infected-wordpress-files-over-ssh/',
    title: 'How to find and clean up infected WordPress Files over SSH',
    description: "If you've ever found yourself with a hacked WordPress site, one of the hardest things to do is scan your entire server and find all of the infected files.",
    content: `If you've ever found yourself with a hacked WordPress site, one of the hardest things to do is scan your entire server and find all of the infected files. I've had to do this a few times for various clients and friends so I decided to put together a little writeup on how to make it a bit easier.

First open up an SSH connection to your server

\`\`\`
ssh username@site.com
\`\`\`

Change directory to the location of your site(s). Depending on your hosting provider this could be in a number of locations, it's best to consult with them to determine where you should change directory to

\`\`\`
cd /home/username/public_html/
\`\`\`

Execute the following

\`\`\`
find . -name "*.php"  -print0 | xargs -0 egrep -l 'eval\\(base64_decode\\(' >> infectedfiles.txt
\`\`\`

What this does is search from the current directory, down into any deeper directory through all PHP scripts and looks for "eval(base64_decode" which is one of the most common ways hackers hide malicious code. You can also switch this out for a few different strings like:

- eval
- base64_decode
- gzinflate
- eval(gzinflate(base64_decode

Any combination of those strings will usually result in all of the infected files.

Once the script finds malicious files they are then put into your file "infectedfiles.txt" in the same directory you executed the script from.

In order to see which files were infected you can run

\`\`\`
cat infectedfiles.txt
\`\`\`

Once you've found all your infected files, I can help you automate the cleanup process, however, before doing that it's always a great idea to **BACKUP YOUR DATA**

\`\`\`
tar -czvf backup.tar.gz *
\`\`\`

Once you've created a backup, go ahead and use the following (with caution)

\`\`\`bash
#!/bin/bash
# Script by Kris Chase ( kris@mehh.org )
# http://krischase.com
# I am not responsible for any damage that may occur when running this script.

LIST=infectedfiles.txt
PATT="eval(base64_decode"

if [ ! -s $LIST ] ; then
grep -l -R --include=*.php $PATT * > $LIST
fi

for INPUT in \`cat $LIST\`
do
echo FIX $INPUT ...
TEMP=$INPUT.tmp
OLD=$INPUT.bad
< $INPUT sed "s/<?php/\\n<?php/g" | grep -v $PATT > $TEMP
mv $INPUT $OLD
mv $TEMP $INPUT
done
\`\`\`

When using this script you can change the "PATT" variable value to whatever malicious string you used to find your infected files.

If you don't care about having a list of all your infected files and want to jump straight to the cleanup process you can use this other script I usually use:

\`\`\`bash
#!/bin/bash
# Script by Kris Chase ( kris@mehh.org )
# http://krischase.com
# I am not responsible for any damage that may occur when running this script.

string="$1"
    path="$2"
    grep -R -l "$string" "$path" | while IFS= read -r file; do
        sed -i "/$string/d" "$file"
    done
\`\`\`

Save that script to a file (I usually go with fix.sh) and then execute the file using the following syntax:

\`\`\`
sh -x fix.sh 'eval(gzinflate(base64_decode' .
\`\`\`

Keep in mind you can change the "eval(gzinflate(base64_decode" piece to whatever malicious string you're looking for.

I hope that these scripts help others as much as they've helped me when it comes to **cleaning up infected WordPress servers.**`,
    category: 'PHP',
    tags: ['PHP', 'WordPress', 'Linux', 'Security', 'SSH'],
    publishedDate: '2014-11-28',
    originalDate: '2014.11.28',
    featuredImage: 'https://wp.krischase.com/media/krischase.jpg',
    firstImage: undefined,
    seo: {
      metaTitle: 'How to find and clean up infected WordPress Files over SSH - Kris Chase',
      metaDescription: "If you've ever found yourself with a hacked WordPress site, one of the hardest things to do is scan your entire server and find all of the infected files.",
      ogTitle: 'How to find and clean up infected WordPress Files over SSH - Kris Chase',
      ogDescription: "If you've ever found yourself with a hacked WordPress site, one of the hardest things to do is scan your entire server and find all of the infected files. I've had to do this a few times for various clients and … Continued",
      ogImage: 'https://wp.krischase.com/media/krischase.jpg',
      twitterCard: 'summary',
    },
    readingTime: 3,
    wordCount: 600,
    author: {
      name: 'Kris Chase',
      twitter: '@chasebadkids',
      email: 'hey@mehh.org',
    },
    metadata: {
      updatedDate: '2014-11-28',
      isUpdated: false,
    },
  },
  {
    slug: 'disable-all-mail-for-wordpress',
    url: 'https://wp.krischase.com/disable-all-mail-for-wordpress/',
    title: 'Disable All Mail for WordPress',
    description: 'I did this simple hack on a private WordPress Multisite blog, to stop it sending me emails every time I created a new blog.',
    content: `I did this simple hack on a private WordPress Multisite blog, to stop it sending me emails every time I created a new blog. It's definitely overkill to stop all emails, but unfortunately I couldn't find any hooks that let me be more specific! (I didn't need any of the other emails – but you shouldn't use this code if you do!)

I put the code in wp-config.php. You could create a plugin instead, or putting it in your theme's functions.php might work (I haven't tested it).

\`\`\`php
// Disable ALL emails
function wp_mail()
{
    // Do nothing!
}
\`\`\``,
    category: 'PHP',
    tags: ['PHP', 'WordPress', 'Development'],
    publishedDate: '2014-11-18',
    originalDate: '2014.11.18',
    featuredImage: 'https://wp.krischase.com/media/krischase.jpg',
    firstImage: undefined,
    seo: {
      metaTitle: 'Disable All Mail for WordPress - Kris Chase',
      metaDescription: 'I did this simple hack on a private WordPress Multisite blog, to stop it sending me emails every time I created a new blog.',
      ogTitle: 'Disable All Mail for WordPress - Kris Chase',
      ogDescription: "I did this simple hack on a private WordPress Multisite blog, to stop it sending me emails every time I created a new blog. It's definitely overkill to stop all emails, but unfortunately I couldn't find any hooks that let … Continued",
      ogImage: 'https://wp.krischase.com/media/krischase.jpg',
      twitterCard: 'summary',
    },
    readingTime: 1,
    wordCount: 100,
    author: {
      name: 'Kris Chase',
      twitter: '@chasebadkids',
      email: 'hey@mehh.org',
    },
    metadata: {},
  },
  {
    slug: 'get-the-latest-post-id-in-wordpress',
    url: 'https://wp.krischase.com/get-the-latest-post-id-in-wordpress/',
    title: 'Get the latest Post ID in WordPress',
    description: "Here's a neat little trick that will get you the latest post ID from WordPress.",
    content: `Here's a neat little trick that will get you the latest post ID from WordPress.

\`\`\`php
<?php
echo $newest_post_id = $posts[0]->ID;
?>
\`\`\``,
    category: 'PHP',
    tags: ['PHP', 'WordPress', 'Development'],
    publishedDate: '2014-10-29',
    originalDate: '2014.10.29',
    featuredImage: 'https://wp.krischase.com/media/krischase.jpg',
    firstImage: undefined,
    seo: {
      metaTitle: 'Get the latest Post ID in WordPress - Kris Chase',
      metaDescription: "Here's a neat little trick that will get you the latest post ID from WordPress.",
      ogTitle: 'Get the latest Post ID in WordPress - Kris Chase',
      ogDescription: "Here's a neat little trick that will get you the latest post ID from WordPress. <?php echo $newest_post_id = $posts[0]->ID; ?>",
      ogImage: 'https://wp.krischase.com/media/krischase.jpg',
      twitterCard: 'summary',
    },
    readingTime: 1,
    wordCount: 50,
    author: {
      name: 'Kris Chase',
      twitter: '@chasebadkids',
      email: 'hey@mehh.org',
    },
    metadata: {},
  },
  {
    slug: 'force-non-legacy-backup-start-whmcpanel',
    url: 'https://wp.krischase.com/force-non-legacy-backup-start-whmcpanel/',
    title: 'Force Non Legacy Backup to Start (WHM/cPanel)',
    description: 'If you have setup a Backup to run in WHM -> Backup -> Backup Configuration and would like to force it to run immediately instead of waiting for the backup schedule you can do so through SSH.',
    content: `If you have setup a Backup to run in WHM -> Backup -> Backup Configuration and would like to force it to run immediately instead of waiting for the backup schedule you can do so through SSH.

1\\. Login to your server via [SSH](https://www.vpsblocks.com.au/support/Knowledgebase/Article/View/41/0/how-do-i-use-ssh)

2\\. Type: /usr/local/cpanel/bin/backup –force

3\\. This will report that it is starting the backup and creating a log file.

4\\. If it does not return with that information after running it, this means that there is most likely already a backup being taken. You can check to see if a backup is being run by typing: ps aux | grep backup

If it has been running a long time (e.g. it may be hung) you can kill it by finding the PID from the ps aux output, and typing: kill -9 PID`,
    category: 'Uncategorized',
    tags: ['WHM', 'cPanel', 'Backup', 'SSH', 'Linux'],
    publishedDate: '2016-02-02',
    originalDate: '2016.02.02',
    featuredImage: 'https://wp.krischase.com/media/krischase.jpg',
    seo: {
      metaTitle: 'Force Non Legacy Backup to Start (WHM/cPanel) - Kris Chase',
      metaDescription: 'If you have setup a Backup to run in WHM -> Backup -> Backup Configuration and would like to force it to run immediately instead of waiting for the backup schedule you can do so through SSH.',
      ogTitle: 'Force Non Legacy Backup to Start (WHM/cPanel) - Kris Chase',
      ogDescription: 'If you have setup a Backup to run in WHM -> Backup -> Backup Configuration and would like to force it to run immediately instead of waiting for the backup schedule you can do so through SSH.',
      ogImage: 'https://wp.krischase.com/media/krischase.jpg',
      twitterCard: 'summary',
    },
    readingTime: 1,
    wordCount: 150,
    author: {
      name: 'Kris Chase',
      twitter: '@chasebadkids',
      email: 'hey@mehh.org',
    },
    metadata: {},
  },
  {
    slug: 'black-friday-deals-for-web-developers',
    url: 'https://wp.krischase.com/black-friday-deals-for-web-developers/',
    title: 'Black Friday Deals for Web Developers',
    description: "Here\'s a compiled list for a lot of GREAT deals for Black Friday. If you\'re a developer, or even a designer there\'s definitely something here for you!",
    content: `![](https://wp.krischase.com/media/Screen-Shot-2015-11-25-at-7.42.52-PM-1024x369.png)

Here's a compiled list for a lot of GREAT deals for Black Friday.  If you're a developer, or even a designer there's definitely something here for you!

**Made By Source** has a great deal this black friday. You get a 8 different photoshop extensions which are great for both design and development (note: they have 2 smaller packs that are design and dev specific.)

- CSSHat 2
- PNGHat
- iOSHat
- PSD
- Cleaner
- Subtle
- Patterns
- Picjumbo

[https://blackfriday.madebysource.com/](https://blackfriday.madebysource.com/)

**Was:** ~~$133.99~~

**You Pay:** $44.99

[Full list of deals and discounts available in the original post...]`,
    category: 'Bootstrap',
    tags: ['Black Friday', 'Deals', 'Web Development', 'Tools'],
    publishedDate: '2015-11-26',
    originalDate: '2015.11.26',
    featuredImage: 'https://wp.krischase.com/media/Screen-Shot-2015-11-25-at-7.42.52-PM.png',
    firstImage: 'https://wp.krischase.com/media/Screen-Shot-2015-11-25-at-7.42.52-PM-1024x369.png',
    seo: {
      metaTitle: 'Black Friday Deals for Web Developers - Kris Chase',
      metaDescription: 'Here\'s a compiled list for a lot of GREAT deals for Black Friday. If you\'re a developer, or even a designer there\'s definitely something here for you!',
      ogTitle: 'Black Friday Deals for Web Developers - Kris Chase',
      ogDescription: 'Here\'s a compiled list for a lot of GREAT deals for Black Friday. If you\'re a developer, or even a designer there\'s definitely something here for you!',
      ogImage: 'https://wp.krischase.com/media/Screen-Shot-2015-11-25-at-7.42.52-PM.png',
      twitterCard: 'summary',
    },
    readingTime: 7,
    wordCount: 1575,
    author: {
      name: 'Kris Chase',
      twitter: '@chasebadkids',
      email: 'hey@mehh.org',
    },
    metadata: {},
  },
  {
    slug: 'prevent-gmail-from-breaking-width-of-email-template',
    url: 'https://wp.krischase.com/prevent-gmail-from-breaking-width-of-email-template/',
    title: 'Prevent gmail from breaking width of email template.',
    description: 'Recently while coding out an e-blast I came across an issue where the layout rendered perfectly on desktop and mobile devices ( it was a responsive theme ) with any email client, except gmail on both iOS as well as Android.',
    content: `Recently while coding out an e-blast I came across an issue where the layout rendered perfectly on desktop and mobile devices ( it was a responsive theme ) with any email client, except gmail on both iOS as well as Android.

Looking for a fix I found the following:

\`\`\`
<div style="display:none; white-space:nowrap; font:15px courier; line-height:0;">
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
</div>
\`\`\`

Just drop that block of code before the closing </body> tag on your site.

Google (of all companies) [uses a similar snippet](https://twitter.com/alexcwilliams/status/591313524175015936) but for their Analytics newsletter.

The white-space:nowrap with the dashed line creates a line about 500px across that when bumped up in size will exceed 700px causing the Gmail to not apply the font change.

The display:none style causes non-Gmail clients to hide the block (Gmail ignores display:none). When the email is viewed in say, a non-Gmail mobile client, it won't affect responsive layout.`,
    category: 'Development',
    tags: ['Email', 'Gmail', 'HTML', 'CSS', 'Development'],
    publishedDate: '2015-08-14',
    originalDate: '2015.08.14',
    featuredImage: 'https://wp.krischase.com/media/krischase.jpg',
    seo: {
      metaTitle: 'Prevent gmail from breaking width of email template. - Kris Chase',
      metaDescription: 'Recently while coding out an e-blast I came across an issue where the layout rendered perfectly on desktop and mobile devices ( it was a responsive theme ) with any email client, except gmail on both iOS as well as Android.',
      ogTitle: 'Prevent gmail from breaking width of email template. - Kris Chase',
      ogDescription: 'Recently while coding out an e-blast I came across an issue where the layout rendered perfectly on desktop and mobile devices ( it was a responsive theme ) with any email client, except gmail on both iOS as well as Android.',
      ogImage: 'https://wp.krischase.com/media/krischase.jpg',
      twitterCard: 'summary',
    },
    readingTime: 1,
    wordCount: 200,
    author: {
      name: 'Kris Chase',
      twitter: '@chasebadkids',
      email: 'hey@mehh.org',
    },
    metadata: {},
  },
  {
    slug: 'find-all-files-touched-within-the-last-2-weeks',
    url: 'https://wp.krischase.com/find-all-files-touched-within-the-last-2-weeks/',
    title: 'Find all files touched within the last 2 weeks',
    description: "If you've ever had to deal with a hack before, you know how frustrating it can be figuring out what files were infected. This is a great method for finding all the PHP and JavaScript files that have been touched within the last couple of weeks.",
    content: `If you've ever had to deal with a hack before, you know how frustrating it can be figuring out what files were infected.  This is a great method for finding all the PHP and JavaScript files that have been touched within the last couple of weeks.  Obviously you can easily change / add more file types and increase / decrease the time to search through.

\`\`\`
find . -type f \\( -iname \\*.php  -o -iname \\*.js \\) -mtime -14 -exec stat -c "%n %y" {} \\;
\`\`\`

What sort of files were you able to clean up using this script?  Leave feedback below!`,
    category: 'PHP',
    tags: ['PHP', 'JavaScript', 'Security', 'Bash', 'Linux'],
    publishedDate: '2015-07-10',
    originalDate: '2015.07.10',
    featuredImage: 'https://wp.krischase.com/media/krischase.jpg',
    seo: {
      metaTitle: 'Find all files touched within the last 2 weeks - Kris Chase',
      metaDescription: "If you've ever had to deal with a hack before, you know how frustrating it can be figuring out what files were infected. This is a great method for finding all the PHP and JavaScript files that have been touched within the last couple of weeks.",
      ogTitle: 'Find all files touched within the last 2 weeks - Kris Chase',
      ogDescription: "If you've ever had to deal with a hack before, you know how frustrating it can be figuring out what files were infected. This is a great method for finding all the PHP and JavaScript files that have been touched within the last couple of weeks.",
      ogImage: 'https://wp.krischase.com/media/krischase.jpg',
      twitterCard: 'summary',
    },
    readingTime: 1,
    wordCount: 100,
    author: {
      name: 'Kris Chase',
      twitter: '@chasebadkids',
      email: 'hey@mehh.org',
    },
    metadata: {},
  },
  {
    slug: 'get-a-list-of-all-installed-magento-patches',
    url: 'https://wp.krischase.com/get-a-list-of-all-installed-magento-patches/',
    title: 'Get a list of all installed Magento Patches',
    description: 'Determine which magento patches have been installed on your site.',
    content: `![](https://wp.krischase.com/media/magento-security-600x257.png)

Lately there have been a lot of patches out there for Magento.  Some pretty major security vulnerabilities have come out as of late ( [supee-5344](https://blog.sucuri.net/2015/04/critical-magento-shoplift-vulnerability-supee-5344-patch-immediately.html) ).  If you've ever needed a quick way to check whether or not you've actually patched your own server you can do so pretty simply.

- SSH to your server
- CD Into the directory where your magento installation is
- Then use one of the following:

To get just the list of patch names installed:

\`\`\`
$ grep -F '|' app/etc/applied.patches.list|cut -f 2 -d'|'
SUPEE-2725
SUPEE-5346
SUPEE-1533
\`\`\`

To get the list of patch names along with installation date:

\`\`\`
$ grep -F '|' app/etc/applied.patches.list|cut -f 2,1 -d'|'
2014-12-01 07:28:34 UTC | SUPEE-2725
2015-04-21 22:18:17 UTC | SUPEE-5346
2015-04-22 00:44:54 UTC | SUPEE-1533
\`\`\`

I'll be posting a writeup in the next couple of weeks on how to easily find all magento installations on a PLESK / WHM Server, get a listings of their Editions ( Community or Enterprise ), Version number, and a list of what patches have been installed.`,
    category: 'Magento',
    tags: ['Magento', 'Security', 'Patches', 'Linux', 'SSH'],
    publishedDate: '2015-07-09',
    originalDate: '2015.07.09',
    featuredImage: 'https://wp.krischase.com/media/magento-security-600x257.png',
    firstImage: 'https://wp.krischase.com/media/magento-security-600x257.png',
    seo: {
      metaTitle: 'Get a list of all installed Magento Patches',
      metaDescription: 'Determine which magento patches have been installed on your site.',
      ogTitle: 'Get a list of all installed Magento Patches',
      ogDescription: 'Determine which magento patches have been installed on your site.',
      ogImage: 'https://wp.krischase.com/media/magento-security-600x257.png',
      twitterCard: 'summary',
    },
    readingTime: 2,
    wordCount: 200,
    author: {
      name: 'Kris Chase',
      twitter: '@chasebadkids',
      email: 'hey@mehh.org',
    },
    metadata: {},
  },
  {
    slug: 'find-text-between-tags-sublime-text',
    url: 'https://wp.krischase.com/find-text-between-tags-sublime-text/',
    title: 'FIND TEXT BETWEEN TAGS – SUBLIME TEXT',
    description: 'Often you may want to change all text between certain tags within Sublime Text, remove all types of certain tags, or change all of one HTML Tag to another. This is very often the case in XML documents or if you are removing all comments.',
    content: `Often you may want to change all text between certain tags within Sublime Text, remove all types of certain tags, or change all of one HTML Tag to another. This is very often the case in XML documents or if you are removing all comments.

This is easily done, thanks to the Regular Expression option within Sublime Text's find options. Use the following code, and ensuring "regular expression" icon is checked (Check screenshot below).

This code byte will find all \`h2\` tags within a document, from opening to closing tag, as well as content inbetween.

\`\`\`markup
(?s)(?<=<h2>)(.+?)(?=</h2>)
\`\`\`

This is really useful to **find all HTML comments and remove them in Sublime Text**!

This one will find all comments, you can then use \`CMD + Shift + G\`(Quick Find All) To highlight all of them, and delete if you wish, or change them all simultaneously.

Change it to match your needs.`,
    category: 'Development',
    tags: ['Sublime Text', 'Regex', 'Development', 'Text Editor'],
    publishedDate: '2015-04-29',
    originalDate: '2015.04.29',
    featuredImage: 'https://wp.krischase.com/media/krischase.jpg',
    seo: {
      metaTitle: 'FIND TEXT BETWEEN TAGS – SUBLIME TEXT - Kris Chase',
      metaDescription: 'Often you may want to change all text between certain tags within Sublime Text, remove all types of certain tags, or change all of one HTML Tag to another. This is very often the case in XML documents or if you are removing all comments.',
      ogTitle: 'FIND TEXT BETWEEN TAGS – SUBLIME TEXT - Kris Chase',
      ogDescription: 'Often you may want to change all text between certain tags within Sublime Text, remove all types of certain tags, or change all of one HTML Tag to another. This is very often the case in XML documents or if you are removing all comments.',
      ogImage: 'https://wp.krischase.com/media/krischase.jpg',
      twitterCard: 'summary',
    },
    readingTime: 1,
    wordCount: 150,
    author: {
      name: 'Kris Chase',
      twitter: '@chasebadkids',
      email: 'hey@mehh.org',
    },
    metadata: {
      updatedDate: '2016-03-18',
      isUpdated: true,
    },
  },
  {
    slug: 'automatically-check-wpml-custom-field-checkboxes',
    url: 'https://wp.krischase.com/automatically-check-wpml-custom-field-checkboxes/',
    title: 'Automatically check WPML custom field checkboxes',
    description: 'Today I faced a pretty daunting task, I needed to check around 2,600 rows of checkboxes across 4 different sites, each that had 3 different options.',
    content: `Today I faced a pretty daunting task, I needed to check around 2,600 rows of checkboxes across 4 different sites, each that had 3 different options.

You might face this yourself within the WordPress WPML ( WordPress Multi Site) custom field / ACF / Advanced custom fields area.  What I wanted to do was programmatically send off the correct job translations that I wanted, and not send off the ones that didn't need to be translated.

This handy snippet that I came up with solved just that!

\`\`\`javascript
function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}
jQuery("#icl_cf_translation tbody tr").each(function() {
        var tdVal = jQuery(this).find("td:first").html();

        if(tdVal[0] != '_' &&
        \t!endsWith(tdVal,'image') &&
\t        !endsWith(tdVal,'background') &&
\t        !endsWith(tdVal,'link') &&
\t        !endsWith(tdVal,'width') &&
\t        !endsWith(tdVal,'filter') &&
\t        !endsWith(tdVal,'section') &&
\t        !endsWith(tdVal,'shortcode') &&
\t        !endsWith(tdVal,'style') &&
\t        !endsWith(tdVal,'sizing') &&
\t        !endsWith(tdVal,'spacing') &&
\t        !endsWith(tdVal,'side') &&
\t        !endsWith(tdVal,'size') &&
\t        !endsWith(tdVal,'left') &&
\t        !endsWith(tdVal,'right') &&
\t        !endsWith(tdVal,'hover') &&
\t        !endsWith(tdVal,'icon') &&
\t        !endsWith(tdVal,'over') &&
\t        !endsWith(tdVal,'mp4') &&
\t        !endsWith(tdVal,'ogv') &&
\t        !endsWith(tdVal,'webm')){
        \t//console.log(tdVal);
        \tjQuery(this).find(":radio[value=2]").attr('checked',true);
        }
        else{
        \tjQuery(this).find(":radio[value=0]").attr('checked',true);
        }
});
\`\`\`

You will need to tweak / modify this yourself to fit your specific needs, but this will work perfectly within the Chrome network inspect / developer tools of your choice.

Enjoy!`,
    category: 'Development',
    tags: ['WordPress', 'WPML', 'JavaScript', 'ACF', 'Development'],
    publishedDate: '2015-02-20',
    originalDate: '2015.02.20',
    featuredImage: 'https://wp.krischase.com/media/krischase.jpg',
    seo: {
      metaTitle: 'Automatically check WPML custom field checkboxes - Kris Chase',
      metaDescription: 'Today I faced a pretty daunting task, I needed to check around 2,600 rows of checkboxes across 4 different sites, each that had 3 different options.',
      ogTitle: 'Automatically check WPML custom field checkboxes - Kris Chase',
      ogDescription: 'Today I faced a pretty daunting task, I needed to check around 2,600 rows of checkboxes across 4 different sites, each that had 3 different options.',
      ogImage: 'https://wp.krischase.com/media/krischase.jpg',
      twitterCard: 'summary',
    },
    readingTime: 2,
    wordCount: 300,
    author: {
      name: 'Kris Chase',
      twitter: '@chasebadkids',
      email: 'hey@mehh.org',
    },
    metadata: {
      updatedDate: '2015-02-20',
      isUpdated: true,
    },
  },
  {
    slug: 'how-to-skip-fsck-after-reboot',
    url: 'https://wp.krischase.com/how-to-skip-fsck-after-reboot/',
    title: 'How to skip fsck after reboot',
    description: 'With the recent Ghost Vulnerability out in the wild, I was tasked with patching our development servers and needed to reboot them in the middle of the night.',
    content: `![](https://wp.krischase.com/media/fsck-1024x689.png)

With the recent [Ghost Vulnerability](https://community.qualys.com/blogs/laws-of-vulnerabilities/2015/01/27/the-ghost-vulnerability) out in the wild, I was tasked with patching our development servers and needed to reboot them in the middle of the night.  8 servers went down and came up within a minute, but 1 server took long than I would have hoped.  After getting worried that something had gone wrong, I reached out the our hosting provider and had them investigate.  My hunch was right, an FSCK was being ran on reboot, causing it to take much longer for the respective services to come back up.

I went out searching for a way to skip running an FSCK for future launches so that I wouldn't be faced with this sort of issue again (although running an FSCK is definitely a good idea from time to time, there are definitely times you simply want the server to go down and come back up ASAP.

To skip an FSCK, do the following from the command line

\`\`\`
touch /fastboot
init 6
\`\`\`

This will make sure the server reboots in the quickest way possible.`,
    category: 'Development',
    tags: ['Linux', 'FSCK', 'System Administration', 'Security'],
    publishedDate: '2015-01-30',
    originalDate: '2015.01.30',
    featuredImage: 'https://wp.krischase.com/media/fsck.png',
    firstImage: 'https://wp.krischase.com/media/fsck-1024x689.png',
    seo: {
      metaTitle: 'How to skip fsck after reboot',
      metaDescription: 'With the recent Ghost Vulnerability out in the wild, I was tasked with patching our development servers and needed to reboot them in the middle of the night.',
      ogTitle: 'How to skip fsck after reboot',
      ogDescription: 'With the recent Ghost Vulnerability out in the wild, I was tasked with patching our development servers and needed to reboot them in the middle of the night.',
      ogImage: 'https://wp.krischase.com/media/fsck.png',
      twitterCard: 'summary',
    },
    readingTime: 2,
    wordCount: 200,
    author: {
      name: 'Kris Chase',
      twitter: '@chasebadkids',
      email: 'hey@mehh.org',
    },
    metadata: {},
  },
  {
    slug: 'pull-youtube-description-into-wordpress-content',
    url: 'https://wp.krischase.com/pull-youtube-description-into-wordpress-content/',
    title: 'Pull YouTube Description into WordPress Content',
    description: 'You might find yourself needing to dynamically update your WordPress post content with the description of a YouTube video.',
    content: `You might find yourself needing to dynamically update your WordPress post content with the description of a YouTube video.

I put together the following function to accomplish just that!

\`\`\`php
function update_description_with_youtube( $post_id ) {

\tif ( ! wp_is_post_revision( $post_id ) ){

\t\t// unhook this function so it doesn't loop infinitely
\t\tremove_action('save_post', 'update_description_with_youtube');

\t\t$youtubeURL =   get_field('youtube_id',$post_id);

\t\tif (FALSE === strpos($youtubeURL, 'youtu.be')) {
\t\t    parse_str(parse_url($youtubeURL, PHP_URL_QUERY), $youtube_ID);
\t\t    $youtube_ID = $youtube_ID['v'];
\t\t} else {
\t\t    $youtube_ID = basename($youtubeURL);
\t\t}

\t\t$feedURL = 'http://gdata.youtube.com/feeds/api/videos/'.$youtube_ID.'?v=2&alt=json&prettyprint=true';
\t\t$response = json_decode(file_get_contents($feedURL), true);


\t\t$description    =   esc_attr($response['entry']['media$group']['media$description']['$t']);

\t\t// Update post
\t\t  $exercise = array(
\t\t      'ID'           => $post_id,
\t\t      'post_content' => $description
\t\t  );

\t\t// Update the post into the database
\t\t  wp_update_post( $exercise );

\t\t  return;

\t  \t// re-hook this function
\t  \tadd_action('save_post', 'update_description_with_youtube');
\t  }
}
add_action( 'save_post', 'update_description_with_youtube' );
\`\`\`

This can be a bit tricky due to the fact you're using the **save_post** hook from WordPress, while also using the **wp_update_post** function together which, if not done right can cause an infinite loop.

We can take care of this by unhooking our function, within the save_post call, running our custom function, and then re-initializing our hook.

We get our YouTube Video ID by parsing an ACF (Advanced Custom Fields) field that can either handle a single Youtube ID, or even a complete youtube URL.  This function parses any youtube URL, and then returns the ID of that actual youtube video, then passes it to our description pulling function.`,
    category: 'Development',
    tags: ['WordPress', 'PHP', 'YouTube', 'API', 'ACF'],
    publishedDate: '2014-12-11',
    originalDate: '2014.12.11',
    featuredImage: 'https://wp.krischase.com/media/krischase.jpg',
    seo: {
      metaTitle: 'Pull YouTube Description into WordPress Content - Kris Chase',
      metaDescription: 'You might find yourself needing to dynamically update your WordPress post content with the description of a YouTube video.',
      ogTitle: 'Pull YouTube Description into WordPress Content - Kris Chase',
      ogDescription: 'You might find yourself needing to dynamically update your WordPress post content with the description of a YouTube video.',
      ogImage: 'https://wp.krischase.com/media/krischase.jpg',
      twitterCard: 'summary',
    },
    readingTime: 2,
    wordCount: 300,
    author: {
      name: 'Kris Chase',
      twitter: '@chasebadkids',
      email: 'hey@mehh.org',
    },
    metadata: {
      updatedDate: '2014-12-11',
      isUpdated: true,
    },
  },
  {
    slug: 'dynamically-add-parameters-to-the-end-of-all-wp_nav_menu',
    url: 'https://wp.krischase.com/dynamically-add-parameters-to-the-end-of-all-wp_nav_menu/',
    title: 'Dynamically Add Parameters to the end of all wp_nav_menu()',
    description: "I was working on a client who's site I was working on where I was required to capture, and hold onto an affiliate tracking variable and value throughout the entire session of a user while browsing their website.",
    content: `I was working on a client who's site I was working on where I was required to capture, and hold onto an **affiliate tracking variable** and value throughout the entire session of a user while browsing their website.  I was able to do this on specific buttons and links throughout the site with issue, but needed an easy way to accomplish this on main pieces of navigation in my header, sidebar, and footer.  To accomplish this, I used the following code:

\`\`\`php
add_filter( 'wp_get_nav_menu_items','nav_items', 11, 3 );

function nav_items( $items, $menu, $args )
{
    if( is_admin() )
        return $items;

    $affiliateURL\t=\ttrack_affiliate_id();

    foreach( $items as $item )
    {
            $item->url .= $affiliateURL;

    }
    return $items;
}
\`\`\`

In my example, I use a custom hook on top of ' **wp_get_nav_menu_items**'.   I then loop through all the menu items, get the urls and append my **affiliate tracking code**, in my case I use a function to determine the code to use, but you might be able to get away with a hardcoded approach like:

\`\`\`php
$item->url .= '?affID=123';
\`\`\`

This ended up being really helpful for myself!`,
    category: 'PHP',
    tags: ['WordPress', 'PHP', 'Navigation', 'Affiliate'],
    publishedDate: '2014-10-28',
    originalDate: '2014.10.28',
    featuredImage: 'https://wp.krischase.com/media/krischase.jpg',
    seo: {
      metaTitle: 'Dynamically Add Parameters to the end of all wp_nav_menu() - Kris Chase',
      metaDescription: "I was working on a client who's site I was working on where I was required to capture, and hold onto an affiliate tracking variable and value throughout the entire session of a user while browsing their website.",
      ogTitle: 'Dynamically Add Parameters to the end of all wp_nav_menu() - Kris Chase',
      ogDescription: "I was working on a client who's site I was working on where I was required to capture, and hold onto an affiliate tracking variable and value throughout the entire session of a user while browsing their website.",
      ogImage: 'https://wp.krischase.com/media/krischase.jpg',
      twitterCard: 'summary',
    },
    readingTime: 1,
    wordCount: 200,
    author: {
      name: 'Kris Chase',
      twitter: '@chasebadkids',
      email: 'hey@mehh.org',
    },
    metadata: {
      updatedDate: '2014-10-28',
      isUpdated: true,
    },
  },
  {
    slug: 'set-wordpress-image-quality-to-high',
    url: 'https://wp.krischase.com/set-wordpress-image-quality-to-high/',
    title: 'Set WordPress image quality to high',
    description: 'Did you know that by default, WordPress smushes your JPG images down to 60% quality after your upload them?',
    content: `Did you know that by default, WordPress smushes your JPG images down to 60% quality after your upload them?

You can circumvent this by editing your themes functions.php file and adding the following snippet.

Please note: You will sacrifice speed for quality but in doing so you will get 100% image quality on every upload.

\`\`\`php
/*  Custom thumbnail quality
/* ------------------------------------ */
function alx_thumbnail_quality( $quality ) {
    return 100;
}
add_filter( 'jpeg_quality', 'alx_thumbnail_quality' );
add_filter( 'wp_editor_set_quality', 'alx_thumbnail_quality' );
\`\`\`

If you've already got a lot of images in your media library you'll have to re-upload them in order to get that original image quality.  While doing so, why not add a few [custom WordPress image sizes](http://krischase.com/how-to-create-custom-auto-generated-image-sizes-in-wordpress/ "How to create custom auto generated image sizes in WordPress") for your themes use?

What projects have you used this snippet on?  Share your results below!`,
    category: 'PHP',
    tags: ['WordPress', 'PHP', 'Images', 'Quality'],
    publishedDate: '2014-10-24',
    originalDate: '2014.10.24',
    featuredImage: 'https://wp.krischase.com/media/krischase.jpg',
    seo: {
      metaTitle: 'Set WordPress image quality to high - Kris Chase',
      metaDescription: 'Did you know that by default, WordPress smushes your JPG images down to 60% quality after your upload them?',
      ogTitle: 'Set WordPress image quality to high - Kris Chase',
      ogDescription: 'Did you know that by default, WordPress smushes your JPG images down to 60% quality after your upload them?',
      ogImage: 'https://wp.krischase.com/media/krischase.jpg',
      twitterCard: 'summary',
    },
    readingTime: 1,
    wordCount: 150,
    author: {
      name: 'Kris Chase',
      twitter: '@chasebadkids',
      email: 'hey@mehh.org',
    },
    metadata: {},
  },
  {
    slug: 'how-to-create-custom-auto-generated-image-sizes-in-wordpress',
    url: 'https://wp.krischase.com/how-to-create-custom-auto-generated-image-sizes-in-wordpress/',
    title: 'How to create custom auto generated image sizes in WordPress',
    description: "If you've ever needed to create custom image sizes for your WordPress installation, this function will come in very handy.",
    content: `If you've ever needed to create custom image sizes for your WordPress installation, this function will come in very handy.

This function relies on the WordPress [add_image_size()](http://codex.wordpress.org/Function_Reference/add_image_size) function.

For your own reference the add_image_size() function uses the following parameters:

\`\`\`php
<?php add_image_size( $name, $width, $height, $crop ); ?>
\`\`\`

Simply modify the code below as you see fit.

\`\`\`php
// Create custom sizes
// This is then pulled through to your theme using the_post_thumbnail('custombig');
if ( function_exists( 'add_image_size' ) ) {
\tadd_image_size('customsmall', 300, 200, true); //narrow column
\tadd_image_size('custombig', 400, 500, true); //wide column
}
\`\`\`

Set the first parameter of your function to the name of the size you want to reference later in your WordPress theme.

You can use the following example to retrieve the custom image within your own theme / template:

\`\`\`php
<?php
if ( has_post_thumbnail()):
// Print out the custom image and also add the class custombig to the image for easy css manipulation
    the_post_thumbnail( 'custombig', array( 'class' => 'custombig' ) );
endif;
?>
\`\`\``,
    category: 'PHP',
    tags: ['WordPress', 'PHP', 'Images', 'Development'],
    publishedDate: '2014-10-24',
    originalDate: '2014.10.24',
    featuredImage: 'https://wp.krischase.com/media/krischase.jpg',
    seo: {
      metaTitle: 'How to create custom auto generated image sizes in WordPress - Kris Chase',
      metaDescription: "If you've ever needed to create custom image sizes for your WordPress installation, this function will come in very handy.",
      ogTitle: 'How to create custom auto generated image sizes in WordPress - Kris Chase',
      ogDescription: "If you've ever needed to create custom image sizes for your WordPress installation, this function will come in very handy.",
      ogImage: 'https://wp.krischase.com/media/krischase.jpg',
      twitterCard: 'summary',
    },
    readingTime: 2,
    wordCount: 250,
    author: {
      name: 'Kris Chase',
      twitter: '@chasebadkids',
      email: 'hey@mehh.org',
    },
    metadata: {
      updatedDate: '2014-10-24',
      isUpdated: true,
    },
  },
  {
    slug: 'remove-the-ability-to-edit-theme-in-wordpress-admin',
    url: 'https://wp.krischase.com/remove-the-ability-to-edit-theme-in-wordpress-admin/',
    title: 'Remove the ability to edit theme in WordPress admin',
    description: 'When developing sites for clients, sometimes you want the ability to prevent the end user from being able to edit/access the theme source code from the admin panel "Appearance -> Editor" area.',
    content: `When developing sites for clients, sometimes you want the ability to prevent the end user from being able to edit/access the theme source code from the admin panel "Appearance -> Editor" area.  This snippet works great for just that!

\`\`\`php
// Disable the theme / plugin text editor in Admin
define('DISALLOW_FILE_EDIT', true);
\`\`\`

Simply add this line of code to your WordPress themes functions.php file or if you're using roots, this belongs in custom.php

Enjoy!`,
    category: 'PHP',
    tags: ['WordPress', 'PHP', 'Security', 'Admin'],
    publishedDate: '2014-10-24',
    originalDate: '2014.10.24',
    featuredImage: 'https://wp.krischase.com/media/krischase.jpg',
    seo: {
      metaTitle: 'Remove the ability to edit theme in WordPress admin - Kris Chase',
      metaDescription: 'When developing sites for clients, sometimes you want the ability to prevent the end user from being able to edit/access the theme source code from the admin panel "Appearance -> Editor" area.',
      ogTitle: 'Remove the ability to edit theme in WordPress admin - Kris Chase',
      ogDescription: 'When developing sites for clients, sometimes you want the ability to prevent the end user from being able to edit/access the theme source code from the admin panel "Appearance -> Editor" area.',
      ogImage: 'https://wp.krischase.com/media/krischase.jpg',
      twitterCard: 'summary',
    },
    readingTime: 1,
    wordCount: 100,
    author: {
      name: 'Kris Chase',
      twitter: '@chasebadkids',
      email: 'hey@mehh.org',
    },
    metadata: {},
  },
  {
    slug: 'social-media-sharing-links-without-using-a-plugin',
    url: 'https://wp.krischase.com/social-media-sharing-links-without-using-a-plugin/',
    title: 'Social Media Sharing links without using a Plugin',
    description: 'If you ever want to include Social Media sharing links, like the ones found here on my blog, without wasting resources using some bloated plugin, you can use this code.',
    content: `If you ever want to include Social Media sharing links, like the ones found here on my blog, without wasting resources using some bloated plugin, you can use this code.

\`\`\`php
<div class="facebook">
\t<a href="http://www.facebook.com/sharer.php?u=<?php the_permalink(); ?>&t=<?php the_title(); ?>&p[images][0]=<?php //echo $challenge_card[sizes][large]; ?>" target="blank">
\t\t<span class="entypo_social">&#62220;</span>
\t</a>
</div>
<div class="twitter">
\t<a href="http://twitter.com/share?text=<?php the_title(); ?>&url=<?php the_permalink(); ?>&via=twitter" title="Share on Twitter" rel="nofollow" target="_blank">
\t\t<span class="entypo_social">&#62217;</span>
\t</a>
</div>
<div class="linkedin">
\t<a href="http://www.linkedin.com/shareArticle?url=<?php the_permalink(); ?>&title=<?php the_title(); ?>">
\t\t<span class="entypo_social">&#62232;</span>
\t</a>
</div>
<div class="pinterest">
\t<a target="_blank" href="http://pinterest.com/pin/create/button/?url=<?php the_permalink(); ?>&media=&description=<?php the_title(); ?>" >
\t\t<span class="entypo_social">&#62226;</span>
\t</a>
</div>
\`\`\`

Note: This particular block would require you're using the [entypo font library](http://www.entypo.com/) somewhere in your theme.  You can always replace the social media buttons themselves with your own images or generate your own font set from [fontello.com](http://fontello.com/)`,
    category: 'Uncategorized',
    tags: ['WordPress', 'PHP', 'Social Media', 'Sharing'],
    publishedDate: '2014-10-23',
    originalDate: '2014.10.23',
    featuredImage: 'https://wp.krischase.com/media/krischase.jpg',
    seo: {
      metaTitle: 'Social Media Sharing links without using a Plugin - Kris Chase',
      metaDescription: 'If you ever want to include Social Media sharing links, like the ones found here on my blog, without wasting resources using some bloated plugin, you can use this code.',
      ogTitle: 'Social Media Sharing links without using a Plugin - Kris Chase',
      ogDescription: 'If you ever want to include Social Media sharing links, like the ones found here on my blog, without wasting resources using some bloated plugin, you can use this code.',
      ogImage: 'https://wp.krischase.com/media/krischase.jpg',
      twitterCard: 'summary',
    },
    readingTime: 1,
    wordCount: 200,
    author: {
      name: 'Kris Chase',
      twitter: '@chasebadkids',
      email: 'hey@mehh.org',
    },
    metadata: {
      updatedDate: '2014-10-23',
      isUpdated: true,
    },
  },
  {
    slug: 'require-login-to-view-wordpress-site',
    url: 'https://wp.krischase.com/require-login-to-view-wordpress-site/',
    title: 'Require login to view WordPress site',
    description: 'You may want to force users to login in order to view a page within your WordPress site.',
    content: `You may want to force users to login in order to view a page within your WordPress site.

You can use the following code to do that:

\`\`\`php
\tadd_action('template_redirect','giga_check_if_logged_in');
\tfunction giga_check_if_logged_in()
\t{
\t    if(!is_user_logged_in()) //Are they logged in? If not:
\t    {
\t        // Get the requested URL
\t        global $wp;
\t        $requested_url = home_url( $wp->request );

\t        //Set $url to {site_url()}/wp-login.php?redirect_to={$requested_url}
\t        $url = add_query_arg(
\t            'redirect_to',
\t            $requested_url,
\t            site_url('wp-login.php')
\t        );

\t        //redirect any request to {site_url()}/wp-login.php?redirect_to={$requested_url}
\t        wp_redirect($url);
\t        exit;
\t    }
\t}
\`\`\``,
    category: 'PHP',
    tags: ['WordPress', 'PHP', 'Security', 'Login'],
    publishedDate: '2014-10-23',
    originalDate: '2014.10.23',
    featuredImage: 'https://wp.krischase.com/media/krischase.jpg',
    seo: {
      metaTitle: 'Require login to view WordPress site - Kris Chase',
      metaDescription: 'You may want to force users to login in order to view a page within your WordPress site.',
      ogTitle: 'Require login to view WordPress site - Kris Chase',
      ogDescription: 'You may want to force users to login in order to view a page within your WordPress site.',
      ogImage: 'https://wp.krischase.com/media/krischase.jpg',
      twitterCard: 'summary',
    },
    readingTime: 1,
    wordCount: 150,
    author: {
      name: 'Kris Chase',
      twitter: '@chasebadkids',
      email: 'hey@mehh.org',
    },
    metadata: {},
  },
  {
    slug: 'how-to-grab-first-image-from-wordpress-post-content',
    url: 'https://wp.krischase.com/how-to-grab-first-image-from-wordpress-post-content/',
    title: 'How to Grab first image from wordpress post content',
    description: "Sometimes you might find yourself in a situation where you have pages / posts that don't have a featured image set but you want to pull an image to use on a listings page or some other page in your WordPress theme.",
    content: `Sometimes you might find yourself in a situation where you have pages / posts that don't have a featured image set but you want to pull an image to use on a listings page or some other page in your WordPress theme.

The following code will give you the ability to do just that.  It parses the content of the post and pulls in the first image that comes back.

\`\`\`php
function catch_that_image($the_post) {
  global $post, $posts;
  $first_img = '';
  ob_start();
  ob_end_clean();

  $output = preg_match_all('/<img.+src=[\\'\"]([^\\'\"]+)[\\'\"].*>/i', $the_post->post_content, $matches);
  $first_img = $matches[1][0];

  if(empty($first_img)) {
    // No image was found in body copy, let's set a default image to go with.
    $first_img = "default_image.jpg";
  }
  return $first_img;
}
\`\`\``,
    category: 'PHP',
    tags: ['WordPress', 'PHP', 'Images', 'Development'],
    publishedDate: '2014-10-23',
    originalDate: '2014.10.23',
    featuredImage: 'https://wp.krischase.com/media/krischase.jpg',
    seo: {
      metaTitle: 'How to Grab first image from wordpress post content - Kris Chase',
      metaDescription: "Sometimes you might find yourself in a situation where you have pages / posts that don't have a featured image set but you want to pull an image to use on a listings page or some other page in your WordPress theme.",
      ogTitle: 'How to Grab first image from wordpress post content - Kris Chase',
      ogDescription: "Sometimes you might find yourself in a situation where you have pages / posts that don't have a featured image set but you want to pull an image to use on a listings page or some other page in your WordPress theme.",
      ogImage: 'https://wp.krischase.com/media/krischase.jpg',
      twitterCard: 'summary',
    },
    readingTime: 1,
    wordCount: 150,
    author: {
      name: 'Kris Chase',
      twitter: '@chasebadkids',
      email: 'hey@mehh.org',
    },
    metadata: {
      updatedDate: '2014-10-23',
      isUpdated: true,
    },
  },
];

/**
 * Get all posts, optionally filtered by category or tag
 */
export function getBlogPosts(filters?: {
  category?: string;
  tag?: string;
  limit?: number;
}): BlogPost[] {
  let posts = [...blogPosts];

  if (filters?.category) {
    posts = posts.filter((post) => post.category === filters.category);
  }

  if (filters?.tag) {
    posts = posts.filter((post) => post.tags.includes(filters.tag!));
  }

  if (filters?.limit) {
    posts = posts.slice(0, filters.limit);
  }

  return posts;
}

/**
 * Get a single post by slug
 */
export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

/**
 * Get all unique categories
 */
export function getCategories(): string[] {
  const categories = new Set(blogPosts.map((post) => post.category));
  return Array.from(categories).sort();
}

/**
 * Get all unique tags
 */
export function getTags(): string[] {
  const tags = new Set(blogPosts.flatMap((post) => post.tags));
  return Array.from(tags).sort();
}

/**
 * Calculate reading time from word count
 * Average reading speed: 200-250 words per minute
 */
export function calculateReadingTime(wordCount: number): number {
  const wordsPerMinute = 225;
  return Math.ceil(wordCount / wordsPerMinute);
}

/**
 * Calculate word count from markdown content
 */
export function calculateWordCount(content: string): number {
  // Remove markdown syntax, HTML tags, and count words
  const text = content
    .replace(/[#*`\[\]()]/g, '') // Remove markdown syntax
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
  return text.split(/\s+/).filter((word) => word.length > 0).length;
}
