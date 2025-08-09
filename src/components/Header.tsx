import Link from "next/link";
import { FaLinkedin, FaInstagram, FaFacebook, FaGithub, FaTwitter } from "react-icons/fa";

export default function LeftSidebar() {
  return (
    <div className="left-menu fixed left-0 top-0 h-full w-16 flex flex-col items-center justify-between py-6 z-50" style={{ mixBlendMode: 'difference' }}>
      {/* Logo */}
      <div className="logo-area">
        <div className="c-logo">
          <Link href="/" className="text-6xl font-bold font-heading text-white hover:text-white/80 transition-colors">
            K
          </Link>
        </div>
      </div>

      {/* Social Media Icons */}
      <div className="social-icon-area flex flex-col gap-3">
        <a 
          className="text-white hover:text-white/80 transition-colors" 
          href="https://www.linkedin.com/in/krisrchase/"
          target="_blank"
          rel="noopener noreferrer"
          title="LinkedIn"
        >
          <FaLinkedin size={24} />
        </a>
        
        <a 
          className="text-white hover:text-white/80 transition-colors" 
          href="https://instagram.com/imkrischase"
          target="_blank"
          rel="noopener noreferrer"
          title="Instagram"
        >
          <FaInstagram size={24} />
        </a>
        
        <a 
          className="text-white hover:text-white/80 transition-colors" 
          href="https://facebook.com/mehh.kris"
          target="_blank"
          rel="noopener noreferrer"
          title="Facebook"
        >
          <FaFacebook size={24} />
        </a>
        
        <a 
          className="text-white hover:text-white/80 transition-colors" 
          href="https://github.com/krischase"
          target="_blank"
          rel="noopener noreferrer"
          title="GitHub"
        >
          <FaGithub size={24} />
        </a>
        
        <a 
          className="text-white hover:text-white/80 transition-colors" 
          href="https://x.com/krisrchase"
          target="_blank"
          rel="noopener noreferrer"
          title="Twitter"
        >
          <FaTwitter size={24} />
        </a>
      </div>

      {/* Email Address - Vertical */}
      <div className="c-navigation-email" style={{ marginBottom: '200px' }}>
        <div 
          className="text-sm text-white hover:text-white/80 transition-colors whitespace-nowrap" 
          style={{ 
            writingMode: 'vertical-rl', 
            textOrientation: 'mixed',
            transform: 'rotate(180deg)'
          }}
        >
          <a href="mailto:hello@krischase.com">
            hello@krischase.com
          </a>
        </div>
      </div>
    </div>
  );
}
