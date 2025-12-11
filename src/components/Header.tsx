import Link from "next/link";
import { FaLinkedin, FaInstagram, FaFacebook, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function LeftSidebar() {
  return (
    <div className="left-menu fixed left-0 top-0 h-full w-12 sm:w-16 flex flex-col items-center justify-between py-4 sm:py-6 z-50" style={{ mixBlendMode: 'difference' }}>
      {/* Logo */}
      <div className="logo-area">
        <div className="c-logo">
          <Link href="/" className="text-4xl sm:text-6xl font-bold font-heading text-white hover:text-white/80 transition-colors">
            K
          </Link>
        </div>
      </div>

      {/* Social Media Icons - Vertically Centered */}
      <div className="social-icon-area flex flex-col gap-2 sm:gap-3 flex-1 justify-center">
        <a 
          className="text-white hover:text-white/80 transition-colors p-1 sm:p-0" 
          href="https://www.linkedin.com/in/krisrchase/"
          target="_blank"
          rel="noopener noreferrer"
          title="LinkedIn"
        >
          <FaLinkedin size={20} className="sm:w-6 sm:h-6" />
        </a>
        
        <a 
          className="text-white hover:text-white/80 transition-colors p-1 sm:p-0" 
          href="https://instagram.com/imkrischase"
          target="_blank"
          rel="noopener noreferrer"
          title="Instagram"
        >
          <FaInstagram size={20} className="sm:w-6 sm:h-6" />
        </a>
        
        <a 
          className="text-white hover:text-white/80 transition-colors p-1 sm:p-0" 
          href="https://facebook.com/mehh.kris"
          target="_blank"
          rel="noopener noreferrer"
          title="Facebook"
        >
          <FaFacebook size={20} className="sm:w-6 sm:h-6" />
        </a>
        
        <a 
          className="text-white hover:text-white/80 transition-colors p-1 sm:p-0" 
          href="https://github.com/krischase"
          target="_blank"
          rel="noopener noreferrer"
          title="GitHub"
        >
          <FaGithub size={20} className="sm:w-6 sm:h-6" />
        </a>
        
        <a 
          className="text-white hover:text-white/80 transition-colors p-1 sm:p-0" 
          href="https://x.com/krisrchase"
          target="_blank"
          rel="noopener noreferrer"
          title="X (formerly Twitter)"
        >
          <FaXTwitter size={20} className="sm:w-6 sm:h-6" />
        </a>
      </div>

      {/* Email Address - Vertical (always visible) */}
      <div className="c-navigation-email" style={{ marginBottom: '20px' }}>
        <div 
          className="text-xs sm:text-sm text-white hover:text-white/80 transition-colors whitespace-nowrap" 
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
