import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useTheme } from "../contexts/theme-context";

export function HelpingHandsIllustration() {
  const { theme } = useTheme();
  
  return (
    <div className="relative w-full h-full rounded-3xl overflow-hidden group">
      <ImageWithFallback
        src={theme === 'light' 
          ? "https://images.unsplash.com/photo-1654876341902-25507eb92d1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWxwaW5nJTIwaGFuZHMlMjBzdW5saWdodCUyMGJyaWdodCUyMGNvbW11bml0eSUyMHN1cHBvcnR8ZW58MXx8fHwxNzU4Mjk4NzE3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          : "https://images.unsplash.com/photo-1559027615-cd4628902d4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWxwaW5nJTIwaGFuZHMlMjBzdXBwb3J0JTIwY29tbXVuaXR5fGVufDF8fHx8MTc1ODEyNTA5MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
        }
        alt="Helping hands representing community support and care"
        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
      />
      
      {/* Theme-aware floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: theme === 'light' ? 8 : 12 }).map((_, i) => (
          <div
            key={i}
            className={`absolute animate-pulse ${
              theme === 'light' ? 'text-yellow-400/60' : 'text-white/40'
            }`}
            style={{
              left: `${15 + Math.random() * 70}%`,
              top: `${15 + Math.random() * 70}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 3}s`,
              fontSize: `${0.8 + Math.random() * 0.6}rem`,
            }}
          >
            {theme === 'light' ? '🌅' : '✦'}
          </div>
        ))}
      </div>
      
      {/* Light mode sun rays overlay */}
      {theme === 'light' && (
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute top-4 right-4 w-16 h-16 rounded-full opacity-30 animate-pulse"
            style={{
              background: 'radial-gradient(circle, rgba(251, 191, 36, 0.8) 0%, rgba(253, 230, 138, 0.4) 40%, transparent 70%)',
              boxShadow: '0 0 30px rgba(251, 191, 36, 0.3)'
            }}
          />
          <div 
            className="absolute top-2 right-2 w-4 h-4 rounded-full opacity-50 animate-bounce"
            style={{
              background: 'radial-gradient(circle, rgba(249, 115, 22, 0.9) 0%, transparent 70%)',
              animationDelay: '1s'
            }}
          />
        </div>
      )}
      
      {/* Dark mode star overlay */}
      {theme === 'dark' && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-pulse text-white/30"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            >
              ✦
            </div>
          ))}
        </div>
      )}
      
      {/* Gradient overlay for better text contrast */}
      <div className={`absolute inset-0 ${
        theme === 'light' 
          ? 'bg-gradient-to-t from-orange-200/20 via-transparent to-yellow-100/10' 
          : 'bg-gradient-to-t from-gray-900/60 via-transparent to-blue-900/20'
      }`} />
    </div>
  );
}