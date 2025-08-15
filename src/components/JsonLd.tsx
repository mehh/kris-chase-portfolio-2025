import Script from "next/script"

export function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Kris Chase",
    url: "https://krischase.com",
    image: "https://krischase.com/images/KrisChase-OG.png",
    jobTitle: "CTO Consultant & Technical Leader",
    description: "I take startups from prototype to dependable product—and the team that ships it. Unblock delivery, modernize platforms, and align product roadmaps. 60+ engineers led, 100+ launches, 30% delivery cost reduction.",
    knowsAbout: [
      "Technical Leadership",
      "Platform Architecture", 
      "Team Building",
      "Startup Engineering",
      "CI/CD",
      "DevOps",
      "Engineering Management",
      "Product Development",
      "System Architecture",
      "Delivery Optimization"
    ],
    hasOccupation: {
      "@type": "Occupation",
      name: "Technical Leader & Engineering Consultant",
      occupationLocation: {
        "@type": "Place",
        name: "Remote"
      },
      skills: [
        "Technical Leadership",
        "Platform Modernization", 
        "Team Scaling",
        "Architecture Design",
        "Delivery Optimization",
        "Engineering Management"
      ]
    },
    sameAs: [
      "https://www.linkedin.com/in/krischase/",
      "https://github.com/krischase",
      "mailto:kris@krischase.com"
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "kris@krischase.com",
      contactType: "professional"
    },
    worksFor: {
      "@type": "Organization",
      name: "Independent Consultant"
    }
  }

  return (
    <Script id="json-ld" type="application/ld+json" strategy="afterInteractive">
      {JSON.stringify(jsonLd)}
    </Script>
  )
}
