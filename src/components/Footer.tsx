export default function Footer() {
  return (
    <footer className="w-full border-t border-base-300 bg-base-100/80">
      <div className="container mx-auto px-4 py-6 text-sm text-base-content/70 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>© {new Date().getFullYear()} Kris Chase. All rights reserved.</p>
        <nav className="flex gap-4">
          <a href="https://github.com/krischase" target="_blank" rel="noreferrer" className="link link-hover">GitHub</a>
          <a href="https://www.linkedin.com/in/krischase/" target="_blank" rel="noreferrer" className="link link-hover">LinkedIn</a>
          <a href="mailto:kris@krischase.com" className="link link-hover">Email</a>
        </nav>
      </div>
    </footer>
  );
}
