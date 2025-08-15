import { Metadata } from 'next';

export type PersonaType = 'founders' | 'cto' | 'product' | 'investor' | 'default';

interface PersonaConfig {
  title: string;
  description: string;
  keywords: string[];
  ogTitle: string;
  ogDescription: string;
}

const PERSONA_CONFIGS: Record<PersonaType, PersonaConfig> = {
  founders: {
    title: "Kris Chase | Startup CTO - Prototype to Product to Team",
    description: "I take startups from prototype to dependable product—and the team that ships it. Zero-to-one to scale without burning down the roadmap. 60+ engineers led, 100+ launches.",
    keywords: ["Startup CTO", "Technical Founder", "Zero to One", "Product Development", "Team Building", "Prototype to Product", "Startup Engineering"],
    ogTitle: "Startup CTO | Prototype → Product → Team",
    ogDescription: "I take startups from prototype to dependable product—and the team that ships it. Zero-to-one to scale without burning down the roadmap."
  },
  cto: {
    title: "Kris Chase | CTO Consultant - Unblock Delivery & Modernize Platforms",
    description: "I unblock delivery and modernize platforms so your dates stop slipping. Org design, CI/CD, observability, and architecture that cut cycle time. 30% delivery cost reduction.",
    keywords: ["CTO Consultant", "Platform Modernization", "Delivery Optimization", "CI/CD", "Engineering Leadership", "Technical Architecture", "DevOps"],
    ogTitle: "CTO Consultant | Unblock Delivery • Modernize Platforms",
    ogDescription: "I unblock delivery and modernize platforms so your dates stop slipping. Org design, CI/CD, observability, and architecture that cut cycle time."
  },
  product: {
    title: "Kris Chase | Product Engineering - Align Product, Platform & People",
    description: "I align product, platform, and people so the roadmap ships. Roadmaps tied to KPIs; AI-enabled workflows to move faster with less. 65% dev efficiency increase.",
    keywords: ["Product Engineering", "Product Platform Alignment", "Engineering Efficiency", "AI Workflows", "Product Roadmap", "KPI Alignment"],
    ogTitle: "Product Engineering | Align Product • Platform • People",
    ogDescription: "I align product, platform, and people so the roadmap ships. Roadmaps tied to KPIs; AI-enabled workflows to move faster with less."
  },
  investor: {
    title: "Kris Chase | Technical Diligence & 90-Day Turnarounds",
    description: "I run technical diligence and 90-day turnarounds that stick. Clear readouts, stabilization plans, and hands-on leadership parachute for portfolio companies.",
    keywords: ["Technical Diligence", "90-Day Turnaround", "Portfolio Company", "Technical Assessment", "Leadership Parachute", "Stabilization Plans"],
    ogTitle: "Technical Diligence | 90-Day Turnarounds That Stick",
    ogDescription: "I run technical diligence and 90-day turnarounds that stick. Clear readouts, stabilization plans, and hands-on leadership parachute."
  },
  default: {
    title: "Kris Chase | Ship Faster, Scale Safely, Cut Delivery Costs",
    description: "I take startups from prototype to dependable product—and the team that ships it. Unblock delivery, modernize platforms, and align product roadmaps. 60+ engineers led, 100+ launches, 30% delivery cost reduction.",
    keywords: ["Technical Leadership", "CTO Consultant", "Engineering Excellence", "Startup CTO", "Platform Modernization", "Delivery Optimization", "CI/CD", "Team Scaling", "Technical Diligence", "90-Day Turnarounds"],
    ogTitle: "Ship Faster, Scale Safely, Cut Delivery Costs",
    ogDescription: "I take startups from prototype to dependable product—and the team that ships it. Unblock delivery, modernize platforms, align roadmaps. 60+ engineers led, 100+ launches."
  }
};

export function generatePersonaMetadata(persona: PersonaType = 'default'): Metadata {
  const config = PERSONA_CONFIGS[persona];
  
  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    authors: [{ name: "Kris Chase" }],
    creator: "Kris Chase",
    publisher: "Kris Chase",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL('https://krischase.com'),
    alternates: {
      canonical: '/',
    },
    openGraph: {
      title: config.ogTitle,
      description: config.ogDescription,
      url: 'https://krischase.com',
      siteName: 'Kris Chase Portfolio',
      images: ['/images/KrisChase-OG.png'],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: config.ogTitle,
      description: config.ogDescription,
      images: ['/images/KrisChase-OG.png'],
      creator: '@krischase',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'your-google-verification-code', // You'll need to add this
    },
    icons: {
      icon: [
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/favicon.ico', sizes: 'any' },
      ],
      apple: [
        { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      ],
      shortcut: '/favicon.ico',
    },
  };
}

// Export persona configs for use in other components
export { PERSONA_CONFIGS };
export type { PersonaConfig };
