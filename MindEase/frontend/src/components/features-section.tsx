import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Brain, CalendarCheck, Users, GraduationCap } from "lucide-react";
import { useLanguage } from "../contexts/language-context";
import { useTheme } from "../contexts/theme-context";

export function FeaturesSection() {
  const { t } = useLanguage();
  const { theme } = useTheme();

  const features = [
    {
      icon: Brain,
      title: t('features.aiChat.title'),
      description: t('features.aiChat.description'),
      symbol: "✦",
      gradient: "var(--mindease-gradient-primary)",
      bgColor: "rgba(255, 255, 255, 0.1)",
    },
    {
      icon: CalendarCheck,
      title: t('features.booking.title'),
      description: t('features.booking.description'),
      symbol: "✧",
      gradient: "var(--mindease-gradient-warm)",
      bgColor: "rgba(255, 255, 255, 0.1)",
    },
    {
      icon: Users,
      title: t('features.peer.title'),
      description: t('features.peer.description'),
      symbol: "✩",
      gradient: "linear-gradient(135deg, var(--mindease-secondary), var(--mindease-tertiary))",
      bgColor: "rgba(255, 255, 255, 0.1)",
    },
    {
      icon: GraduationCap,
      title: t('features.resources.title'),
      description: t('features.resources.description'),
      symbol: "✪",
      gradient: "linear-gradient(135deg, var(--mindease-warm), var(--mindease-tertiary))",
      bgColor: "rgba(255, 255, 255, 0.1)",
    }
  ];

  return (
    <section id="features" className={`mindease-section-spacing relative overflow-hidden mindease-theme-transition ${
      theme === 'light' 
        ? 'bg-gradient-to-br from-orange-100 to-yellow-100' 
        : 'bg-gradient-to-br from-gray-900 to-gray-800 mindease-stars-bg'
    }`}>
      {/* Theme-aware background elements */}
      <div className="absolute inset-0 z-10">
        {Array.from({ length: theme === 'light' ? 25 : 40 }).map((_, i) => (
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
              fontSize: `${0.5 + Math.random() * 0.8}rem`,
            }}
          >
            {theme === 'light' ? '☀️' : '✦'}
          </div>
        ))}
      </div>
      
      {/* Background floating elements */}
      <div className="absolute top-32 right-10 w-40 h-40 rounded-full opacity-10 mindease-floating" style={{ background: 'var(--mindease-accent-alpha)' }} />
      <div className="absolute bottom-20 left-16 w-28 h-28 rounded-full opacity-15 mindease-floating" style={{ 
        background: 'var(--mindease-warm-alpha)', 
        animationDelay: '-3s' 
      }} />

      <div className="mindease-container relative z-20">
        <div className="text-center mb-20">
          <h2 className={`text-3xl lg:text-4xl mb-6 font-bold ${
            theme === 'light' ? 'text-gray-900' : 'text-white'
          }`}>
            {t('features.title') || 'Everything You Need for Mental Wellness'}
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${
            theme === 'light' ? 'text-gray-700' : 'text-white/80'
          }`}>
            Comprehensive support designed specifically for college students, combining AI technology with human care.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className={`border-0 hover:-translate-y-2 hover:scale-105 transition-all duration-500 cursor-pointer group mindease-floating backdrop-blur-md rounded-3xl mindease-glow ${
                theme === 'light'
                  ? 'bg-white/90 border border-orange-200/40'
                  : 'bg-white/10 border border-white/20'
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardHeader className="text-center pb-4">
                <div className="w-20 h-20 rounded-3xl mx-auto mb-4 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 mindease-shimmer"
                     style={{ background: feature.gradient }}>
                  <feature.icon className="h-10 w-10 text-white" />
                </div>
                <CardTitle className={`text-lg group-hover:scale-105 transition-transform duration-300 ${
                  theme === 'light' ? 'text-gray-900' : 'text-white'
                }`}>
                  {feature.title} <span className="text-2xl" style={{ color: 'var(--mindease-accent)' }}>{feature.symbol}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className={`text-center leading-relaxed ${
                  theme === 'light' ? 'text-gray-700' : 'text-white/80'
                }`}>
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <div className={`mindease-card p-12 max-w-2xl mx-auto backdrop-blur-md ${
            theme === 'light'
              ? 'bg-white/95 border-orange-200'
              : 'bg-white/95 border-gray-200'
          }`}>
            <h3 className="text-2xl mb-4 text-gray-900 font-bold">
              Ready to start your wellness journey?
            </h3>
            <p className="text-base mb-8 max-w-md mx-auto text-gray-700">
              Join thousands of students who are taking control of their mental health with MindEase.
            </p>
            <button className="mindease-button px-10 py-4 text-white hover:scale-105 transition-all duration-300 mindease-shimmer">
              Explore All Features ✦
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}