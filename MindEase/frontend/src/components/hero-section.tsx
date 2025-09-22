import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useLanguage } from "../contexts/language-context";
import { useAuth } from "../contexts/auth-context";
import { useTheme } from "../contexts/theme-context";
import { SoundEffects } from "./sound-effects";
import helpingHandsImage from "figma:asset/55f32bdd5d728ad5ba4e7ef162aa23857b6ab64b.png";

export function HeroSection() {
  const { t } = useLanguage();
  const { loginAsGuest } = useAuth();
  const { theme } = useTheme();

  const handleGetStarted = () => {
    SoundEffects.playClick();
    loginAsGuest();
  };

  const handleLearnMore = () => {
    SoundEffects.playClick();
    // Scroll to features section
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className={`relative overflow-hidden mindease-section-spacing mindease-constellation mindease-theme-transition ${
      theme === 'light' 
        ? 'bg-gradient-to-br from-orange-50 to-yellow-50' 
        : 'bg-gradient-to-br from-blue-900 to-indigo-900 mindease-stars-bg'
    }`} style={{
      background: theme === 'dark' 
        ? 'linear-gradient(135deg, #20378D 0%, #1a3c8a 50%, #1e3f91 100%)'
        : undefined
    }}>
      {/* Theme-aware floating particles */}
      <div className="absolute inset-0 z-10">
        {Array.from({ length: theme === 'light' ? 12 : 20 }).map((_, i) => (
          <div
            key={i}
            className={`absolute animate-pulse ${
              theme === 'light' ? 'text-orange-400/30' : 'text-white/20'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
              fontSize: `${0.6 + Math.random() * 0.8}rem`,
            }}
          >
            {theme === 'light' ? '☀️' : '✦'}
          </div>
        ))}
      </div>
      
      {/* Floating background orbs */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full mindease-floating opacity-20" style={{ background: 'var(--mindease-primary-alpha)' }} />
      <div className="absolute bottom-32 right-20 w-24 h-24 rounded-full mindease-floating opacity-30" style={{ 
        background: 'var(--mindease-accent-alpha)', 
        animationDelay: '-2s' 
      }} />
      <div className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full mindease-floating opacity-25" style={{ 
        background: 'var(--mindease-warm-alpha)', 
        animationDelay: '-4s' 
      }} />

      <div className="mindease-container relative z-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8 order-2 lg:order-1">
            <div className="space-y-6">
              <h1 className={`text-4xl lg:text-6xl leading-tight font-bold ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>
                Your Mental Health Matters
              </h1>
              
              <p className={`text-lg lg:text-xl leading-relaxed max-w-xl ${
                theme === 'light' ? 'text-gray-700' : 'text-gray-300'
              }`}>
                {t('hero.subtitle') || 'Confidential, culturally-sensitive mental health support designed specifically for Indian college students. Access AI chat, peer forums, and professional counseling - all in a safe, stigma-free environment.'}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="mindease-button px-8 py-4 text-white text-lg font-medium hover:scale-105 transition-all duration-300"
                onClick={handleGetStarted}
              >
                {t('hero.cta.primary') || t('hero.getStarted') || 'Get Started for Free'}
              </Button>
              
              <Button 
                variant="outline" 
                className={`px-8 py-4 text-lg font-medium border-2 rounded-2xl hover:scale-105 transition-all duration-300 ${
                  theme === 'light'
                    ? 'bg-white/80 text-gray-900 border-orange-300 hover:bg-white hover:border-orange-400'
                    : 'bg-gray-800/80 text-gray-100 border-gray-600 hover:bg-gray-800 hover:border-gray-500'
                }`}
                onClick={handleLearnMore}
              >
                {t('hero.cta.secondary') || 'Learn More'}
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center space-x-8 pt-6">
              <div className="text-center group hover:scale-110 transition-all duration-300">
                <div className={`text-2xl font-bold mindease-shimmer ${
                  theme === 'light' ? 'text-gray-900' : 'text-white'
                }`}>10k+</div>
                <div className={`text-sm ${
                  theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                }`}>{t('hero.stats.students') || 'Students'}</div>
              </div>
              <div className="text-center group hover:scale-110 transition-all duration-300">
                <div className={`text-2xl font-bold mindease-shimmer ${
                  theme === 'light' ? 'text-gray-900' : 'text-white'
                }`}>24/7</div>
                <div className={`text-sm ${
                  theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                }`}>{t('hero.stats.support') || 'Support'}</div>
              </div>
              <div className="text-center group hover:scale-110 transition-all duration-300">
                <div className={`text-2xl font-bold mindease-shimmer ${
                  theme === 'light' ? 'text-gray-900' : 'text-white'
                }`}>100%</div>
                <div className={`text-sm ${
                  theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                }`}>{t('hero.stats.confidential') || 'Confidential'}</div>
              </div>
            </div>
          </div>

          {/* Right Column - Mental Health Image */}
          <div className="relative order-1 lg:order-2 mindease-perspective">
            <div className="relative mindease-card overflow-hidden mindease-rotate-y">
              {/* Theme-aware overlay */}
              <div className="absolute inset-0 z-10 pointer-events-none">
                {theme === 'light' ? (
                  <>
                    {/* Light mode sun rays and warm overlays */}
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-200/20 via-transparent to-yellow-200/15" />
                    <div className="absolute top-4 right-4 w-16 h-16 rounded-full opacity-30 animate-pulse" style={{
                      background: 'radial-gradient(circle, rgba(251, 191, 36, 0.8) 0%, rgba(253, 230, 138, 0.4) 40%, transparent 70%)',
                      boxShadow: '0 0 30px rgba(251, 191, 36, 0.3)'
                    }} />
                  </>
                ) : (
                  <>
                    {/* Dark mode starry overlay */}
                    <div className="absolute inset-0 mindease-stars-bg opacity-30" />
                    <div className="absolute inset-0 mindease-constellation opacity-40" />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1e3f91]/20 via-[#425ca9]/10 to-[#85829d]/20" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#d5a672]/10 via-transparent to-[#c09c80]/10" />
                  </>
                )}
              </div>
              
              {/* Main mental health image */}
              <div className="relative z-5">
                <ImageWithFallback
                  src={theme === 'light' 
                    ? "https://images.unsplash.com/photo-1676753900379-8b05048608da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW50YWwlMjBoZWFsdGglMjBzdW5ueSUyMG1lZGl0YXRpb24lMjBtaW5kZnVsbmVzcyUyMHRoZXJhcHklMjBzdW5zaGluZXxlbnwxfHx8fDE3NTgyOTkyMzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    : helpingHandsImage
                  }
                  alt="Mental health support and wellness in a peaceful, therapeutic setting"
                  className="w-full h-[400px] lg:h-[500px] object-cover"
                />
                
                {/* Soft glow effect around the image */}
                <div className={`absolute inset-0 mix-blend-soft-light ${
                  theme === 'light'
                    ? 'bg-gradient-to-t from-orange-300/20 via-transparent to-yellow-200/15'
                    : 'bg-gradient-to-t from-[#1e3f91]/30 via-transparent to-[#d5a672]/20'
                }`} />
              </div>
              
              {/* Enhanced floating elements */}
              <div className={`absolute top-8 right-8 z-20 rounded-2xl p-4 shadow-2xl backdrop-blur-xl ${
                theme === 'light' 
                  ? 'bg-white/90 border border-orange-200' 
                  : 'mindease-glass border border-white/20'
              }`}>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded-full animate-pulse bg-green-400 shadow-lg shadow-green-400/50"></div>
                  <span className={`text-sm font-medium drop-shadow-lg ${
                    theme === 'light' ? 'text-gray-800' : 'text-white'
                  }`}>AI Support Online</span>
                </div>
              </div>
              
              <div className={`absolute bottom-8 left-8 z-20 rounded-2xl p-4 shadow-2xl backdrop-blur-xl ${
                theme === 'light' 
                  ? 'bg-white/90 border border-orange-200' 
                  : 'mindease-glass border border-white/20'
              }`}>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded-full animate-pulse bg-blue-400 shadow-lg shadow-blue-400/50"></div>
                  <span className={`text-sm font-medium drop-shadow-lg ${
                    theme === 'light' ? 'text-gray-800' : 'text-white'
                  }`}>Confidential Chat</span>
                </div>
              </div>
              
              {/* Additional calming elements */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-15 pointer-events-none">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#d5a672]/30 to-[#c09c80]/30 animate-pulse" />
                <div className="absolute inset-0 w-8 h-8 rounded-full bg-white/10 mindease-pulse" />
              </div>
              
              {/* Theme-aware floating sparkles */}
              <div className={`absolute top-20 right-20 z-15 w-2 h-2 rounded-full animate-pulse ${
                theme === 'light' ? 'bg-orange-400/60' : 'bg-[#d5a672]/60'
              }`} />
              <div className={`absolute bottom-24 right-16 z-15 w-1.5 h-1.5 rounded-full mindease-bounce-subtle ${
                theme === 'light' ? 'bg-yellow-500/70' : 'bg-white/70'
              }`} />
              <div className={`absolute top-32 left-12 z-15 w-1 h-1 rounded-full animate-pulse ${
                theme === 'light' ? 'bg-orange-500/80' : 'bg-[#c09c80]/80'
              }`} style={{ animationDelay: '1s' }} />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="text-center mt-16">
          <div className="inline-flex flex-col items-center space-y-2">
            <span className={`text-sm ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-400'
            }`}>Discover More</span>
            <div className={`w-6 h-10 border-2 rounded-full flex justify-center ${
              theme === 'light' ? 'border-gray-500' : 'border-gray-500'
            }`}>
              <div className={`w-1 h-3 rounded-full mt-2 animate-bounce ${
                theme === 'light' ? 'bg-gray-500' : 'bg-gray-500'
              }`}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}