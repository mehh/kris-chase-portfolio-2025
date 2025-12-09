import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative mx-auto w-full max-w-4xl px-6 sm:px-8 md:px-10 lg:px-12 pt-32 sm:pt-40 md:pt-44 pb-20">
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold tracking-tight text-foreground mb-4">
          Post Not Found
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          The blog post you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/blog-gemini3"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#96442e] text-white hover:bg-[#b46633] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Blog</span>
        </Link>
      </div>
    </main>
  );
}

