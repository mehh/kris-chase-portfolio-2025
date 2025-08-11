import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

// ASCII art generator function
function generateASCIIArt(text: string, width: number = 60): string {
  const lines = [];
  
  // Create a simple ASCII representation
  const words = text.split(' ');
  let currentLine = '';
  
  for (const word of words) {
    if ((currentLine + word).length > width) {
      lines.push(currentLine.trim());
      currentLine = word + ' ';
    } else {
      currentLine += word + ' ';
    }
  }
  if (currentLine.trim()) {
    lines.push(currentLine.trim());
  }
  
  // Add ASCII border and styling
  const maxLength = Math.max(...lines.map(line => line.length));
  const border = '═'.repeat(maxLength + 4);
  
  const asciiLines = [
    '╔' + border + '╗',
    '║  ' + ' '.repeat(maxLength) + '  ║',
    ...lines.map(line => '║  ' + line.padEnd(maxLength) + '  ║'),
    '║  ' + ' '.repeat(maxLength) + '  ║',
    '╚' + border + '╝'
  ];
  
  return asciiLines.join('\n');
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title') || 'Kris Chase';
    const subtitle = searchParams.get('subtitle') || 'Technical Leadership & Engineering Excellence';
    const persona = searchParams.get('persona') || 'default';
    
    // Generate ASCII art for the title
    const asciiTitle = generateASCIIArt(title, 40);
    
    // Persona-specific colors and messaging
    const personaConfig = {
      founders: {
        color: '#96442e',
        accent: '#b8553a',
        tagline: 'Prototype → Product → Team'
      },
      cto: {
        color: '#2d5a87',
        accent: '#4a7ba7',
        tagline: 'Unblock Delivery • Modernize Platforms'
      },
      product: {
        color: '#6b46c1',
        accent: '#8b5cf6',
        tagline: 'Align Product • Platform • People'
      },
      investor: {
        color: '#059669',
        accent: '#10b981',
        tagline: 'Technical Diligence • 90-Day Turnarounds'
      },
      default: {
        color: '#96442e',
        accent: '#b8553a',
        tagline: 'Ship Faster • Scale Safely • Cut Costs'
      }
    };
    
    const config = personaConfig[persona as keyof typeof personaConfig] || personaConfig.default;
    
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0a0a0a',
            backgroundImage: `
              radial-gradient(circle at 25% 25%, ${config.color}22 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, ${config.accent}22 0%, transparent 50%)
            `,
            fontFamily: 'monospace',
            position: 'relative',
          }}
        >
          {/* ASCII Art Background Pattern */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0.1,
              fontSize: '8px',
              lineHeight: '8px',
              color: config.color,
              whiteSpace: 'pre',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {Array.from({ length: 20 }, (_, i) => (
              <div key={i} style={{ 
                position: 'absolute',
                top: `${i * 5}%`,
                left: `${(i * 7) % 100}%`,
                transform: 'rotate(45deg)',
                fontSize: '6px'
              }}>
                {'▓░▒▓░▒▓░▒▓░▒▓░▒'}
              </div>
            ))}
          </div>
          
          {/* Main Content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              zIndex: 10,
              padding: '60px',
            }}
          >
            {/* ASCII Title */}
            <div
              style={{
                fontSize: '16px',
                lineHeight: '18px',
                color: config.color,
                fontFamily: 'monospace',
                whiteSpace: 'pre',
                marginBottom: '40px',
                textShadow: `0 0 10px ${config.color}44`,
              }}
            >
              {asciiTitle}
            </div>
            
            {/* Subtitle */}
            <div
              style={{
                fontSize: '32px',
                fontWeight: 'bold',
                color: '#ffffff',
                marginBottom: '20px',
                textAlign: 'center',
                maxWidth: '800px',
              }}
            >
              {subtitle}
            </div>
            
            {/* Tagline */}
            <div
              style={{
                fontSize: '20px',
                color: config.accent,
                fontFamily: 'monospace',
                letterSpacing: '2px',
              }}
            >
              {config.tagline}
            </div>
            
            {/* Bottom ASCII decoration */}
            <div
              style={{
                position: 'absolute',
                bottom: '40px',
                fontSize: '12px',
                color: config.color,
                opacity: 0.6,
                fontFamily: 'monospace',
              }}
            >
              {'▓▒░ krischase.com ░▒▓'}
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : 'Unknown error';
    console.log(`${errorMessage}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
