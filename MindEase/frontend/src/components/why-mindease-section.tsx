import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Globe, Network, UserCheck } from "lucide-react";
import { useLanguage } from "../contexts/language-context";
import { useTheme } from "../contexts/theme-context";

export function WhyMindEaseSection() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  
  return (
    <section className={`mindease-section-spacing relative overflow-hidden mindease-constellation mindease-theme-transition ${
      theme === 'light' 
        ? 'bg-gradient-to-br from-orange-100 to-yellow-100' 
        : 'bg-gradient-to-br from-gray-900 to-gray-800'
    }`}>
      {/* Theme-aware particles */}
      <div className="absolute inset-0 z-10">
        {Array.from({ length: theme === 'light' ? 20 : 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 15}s`,
              animationDuration: `${6 + Math.random() * 6}s`,
              fontSize: `${0.3 + Math.random() * 0.5}rem`,
              color: theme === 'light' ? 'rgba(234, 88, 12, 0.4)' : 'var(--mindease-secondary)',
              opacity: 0.4,
            }}
          >
            {theme === 'light' ? '☀️' : '✦'}
          </div>
        ))}
      </div>

      <div className="mindease-container relative z-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative order-2 lg:order-1 mindease-perspective">
            <div className="relative mindease-card overflow-hidden mindease-rotate-y">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1643312084884-ca4e3eb9f078?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwc3R1ZGVudHMlMjBjb2xsYWJvcmF0aW9uJTIwc3VwcG9ydHxlbnwxfHx8fDE3NTgxMjUwODh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Diverse group of college students collaborating and supporting each other"
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
              
              {/* Floating statistics with theme-aware overlay */}
              <div className={`absolute top-8 left-8 backdrop-blur-md p-4 rounded-2xl shadow-lg ${
                theme === 'light'
                  ? 'bg-white/90 border border-orange-200/40'
                  : 'bg-gray-900/80 border border-white/20'
              }`}>
                <div className="text-center">
                  <div className={`text-2xl mb-1 font-bold ${
                    theme === 'light' ? 'text-gray-900' : 'text-white'
                  }`}>10k+</div>
                  <div className={`text-xs ${
                    theme === 'light' ? 'text-gray-700' : 'text-white/80'
                  }`}>Students Helped</div>
                </div>
              </div>
              
              <div className={`absolute bottom-8 right-8 backdrop-blur-md p-4 rounded-2xl shadow-lg ${
                theme === 'light'
                  ? 'bg-white/90 border border-orange-200/40'
                  : 'bg-gray-900/80 border border-white/20'
              }`}>
                <div className="text-center">
                  <div className={`text-2xl mb-1 font-bold ${
                    theme === 'light' ? 'text-gray-900' : 'text-white'
                  }`}>24/7</div>
                  <div className={`text-xs ${
                    theme === 'light' ? 'text-gray-700' : 'text-white/80'
                  }`}>AI Support</div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-10 order-1 lg:order-2">
            <div className="space-y-6">
              <h2 className={`text-3xl lg:text-4xl leading-tight font-bold ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>
                {t('why.title') || 'Why Indian Students Choose MindEase'}
              </h2>
              
              <p className={`text-lg leading-relaxed ${
                theme === 'light' ? 'text-gray-700' : 'text-gray-300'
              }`}>
                Western mental health apps don't understand Indian college realities. MindEase is built specifically for your campus life, cultural context, and unique challenges.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-start space-x-6 group">
                <div className="flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center mindease-glow group-hover:scale-110 transition-transform duration-300"
                     style={{ background: 'var(--mindease-gradient-warm)' }}>
                  <Globe className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className={`text-xl mb-3 group-hover:translate-x-2 transition-transform duration-300 font-semibold ${
                    theme === 'light' ? 'text-gray-900' : 'text-white'
                  }`}>
                    {t('why.languages.title') || 'Regional Language Support'} <span style={{ color: 'var(--mindease-accent)' }}>✦</span>
                  </h3>
                  <p className={`text-sm leading-relaxed ${
                    theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                  }`}>
                    {t('why.languages.description') || 'Get support in Hindi, Tamil, Bengali, and other regional languages. Express yourself naturally without language barriers.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-6 group">
                <div className="flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center mindease-glow group-hover:scale-110 transition-transform duration-300"
                     style={{ background: 'var(--mindease-gradient-primary)' }}>
                  <Network className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className={`text-xl mb-3 group-hover:translate-x-2 transition-transform duration-300 font-semibold ${
                    theme === 'light' ? 'text-gray-900' : 'text-white'
                  }`}>
                    {t('why.understanding.title') || 'Cultural Understanding'} <span style={{ color: 'var(--mindease-accent)' }}>✧</span>
                  </h3>
                  <p className={`text-sm leading-relaxed ${
                    theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                  }`}>
                    {t('why.understanding.description') || 'Our AI understands hostel life, parental pressure, career anxiety, and the unique stressors of Indian academia.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-6 group">
                <div className="flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center mindease-glow group-hover:scale-110 transition-transform duration-300"
                     style={{ background: 'linear-gradient(135deg, var(--mindease-secondary), var(--mindease-tertiary))' }}>
                  <UserCheck className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className={`text-xl mb-3 group-hover:translate-x-2 transition-transform duration-300 font-semibold ${
                    theme === 'light' ? 'text-gray-900' : 'text-white'
                  }`}>
                    {t('why.stigma.title') || 'Stigma-Free Environment'} <span style={{ color: 'var(--mindease-accent)' }}>✩</span>
                  </h3>
                  <p className={`text-sm leading-relaxed ${
                    theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                  }`}>
                    {t('why.stigma.description') || 'Completely anonymous support that respects Indian cultural sensitivities around mental health conversations.'}
                  </p>
                </div>
              </div>
            </div>

            <div className={`mindease-card p-8 border-l-4 mindease-shimmer bg-white/95 backdrop-blur-md ${
              theme === 'light' ? 'border-orange-200' : 'border-gray-200'
            }`}
                 style={{ borderLeftColor: 'var(--mindease-accent)' }}>
              <p className="text-sm italic mb-3 text-gray-900 leading-relaxed">
                "Finally, a mental health platform that gets it. The Hindi support and understanding of hostel life made all the difference for me."
              </p>
              <p className="text-xs text-gray-600 font-medium">
                - Priya, Engineering Student, Delhi ✦
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}