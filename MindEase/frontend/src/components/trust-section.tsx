import { ShieldCheck, EyeOff, Heart } from "lucide-react";
import { useLanguage } from "../contexts/language-context";
import { useTheme } from "../contexts/theme-context";

export function TrustSection() {
  const { t } = useLanguage();
  const { theme } = useTheme();

  const trustFeatures = [
    {
      icon: ShieldCheck,
      title: t('trust.encryption.title'),
      description: t('trust.encryption.description'),
      gradient: "var(--mindease-gradient-primary)",
      bgColor: "var(--mindease-primary-lighter)",
    },
    {
      icon: EyeOff,
      title: t('trust.anonymous.title'),
      description: t('trust.anonymous.description'),
      gradient: "var(--mindease-gradient-warm)",
      bgColor: "var(--mindease-accent-lighter)",
    },
    {
      icon: Heart,
      title: "Stigma-Free Support",
      description: "Mental health support without judgment. Our platform is designed to make seeking help feel natural and comfortable.",
      gradient: "linear-gradient(135deg, var(--mindease-secondary), var(--mindease-tertiary))",
      bgColor: "var(--mindease-secondary-lighter)",
    }
  ];

  return (
    <section className={`mindease-section-spacing relative overflow-hidden mindease-constellation mindease-theme-transition`} style={{
      background: theme === 'light'
        ? 'linear-gradient(135deg, #FA8119 0%, #FBAD21 100%)'
        : 'linear-gradient(135deg, #20378D 0%, #1a3c8a 50%, #1e3f91 100%)',
      minHeight: '600px',
      maxHeight: '900px',
      height: '70vh'
    }}>
      {/* Background floating elements with theme-aware particles */}
      <div className="absolute inset-0 z-10">
        {Array.from({ length: theme === 'light' ? 15 : 20 }).map((_, i) => (
          <div
            key={i}
            className={`absolute animate-pulse ${
              theme === 'light' ? 'text-orange-400/40' : 'text-white/20'
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
      
      <div className="absolute top-32 left-10 w-36 h-36 rounded-full opacity-15 mindease-floating" style={{ background: 'var(--mindease-secondary-alpha)' }} />
      <div className="absolute bottom-20 right-16 w-24 h-24 rounded-full opacity-20 mindease-floating" style={{ 
        background: 'var(--mindease-warm-alpha)', 
        animationDelay: '-2s' 
      }} />

      <div className="mindease-container relative z-20">
        <div className="text-center mb-20">
          <h2 className={`text-3xl lg:text-4xl mb-6 font-bold`} style={theme === 'light' ? {color: '#fff'} : {color: '#fff'}}>
            {t('trust.title')}
          </h2>
          <p className={`text-lg max-w-2xl mx-auto`} style={theme === 'light' ? {color: '#fff'} : {color: '#fff'}}>
            Your privacy and well-being are our top priorities. Every interaction is protected and confidential.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {trustFeatures.map((feature, index) => (
            <div 
              key={index} 
              className={`mindease-card p-8 text-center group hover:-translate-y-1 hover:scale-105 transition-all duration-500 cursor-pointer ${
                theme === 'light' 
                  ? 'bg-white/90 border-orange-200' 
                  : 'bg-gray-800/80 border-gray-600'
              }`}
              style={{ animationDelay: `${index * 0.3}s` }}
            >
              <div className="w-20 h-20 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300"
                   style={{ background: feature.gradient }}>
                <feature.icon className="h-10 w-10 text-white" />
              </div>
              
              <h3 className={`text-xl mb-4 group-hover:scale-105 transition-transform duration-300 font-semibold ${
                theme === 'light' ? 'text-gray-900' : ''
              }`} style={theme === 'dark' ? {color: '#101828'} : {}}>
                {feature.title || (index === 0 ? 'End-to-End Encryption' : index === 1 ? 'Anonymous Support' : 'Stigma-Free Support')}
              </h3>
          
              <p className={`text-sm leading-relaxed ${
                theme === 'light' ? 'text-gray-700' : ''
              }`} style={theme === 'dark' ? {color: '#101828'} : {}}>
                {feature.description || (index === 0 ? 'All conversations and data are encrypted and never shared' : index === 1 ? 'Use MindEase without revealing your identity' : 'Mental health support without judgment')}
              </p>
            </div>
          ))}
        </div>

        {/* Additional trust indicators */}
        <div className="mt-20 text-center">
          <div className={`mindease-card p-10 max-w-4xl mx-auto backdrop-blur-md ${
            theme === 'light' 
              ? 'bg-white/95 border-orange-200' 
              : 'bg-gray-800/95 border-gray-600'
          }`}>
            <h3 className={`text-xl mb-6 font-bold ${
              theme === 'light' ? 'text-gray-900' : ''
            }`} style={theme === 'dark' ? {color: '#101828'} : {}}>
              Trusted by Students Nationwide
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center group hover:scale-110 transition-all duration-300">
                <div className={`text-3xl mb-2 font-bold mindease-shimmer ${
                  theme === 'light' ? 'text-gray-900' : ''
                }`} style={theme === 'dark' ? {color: '#101828'} : {}}>256-bit</div>
                <div className={`text-sm ${
                  theme === 'light' ? 'text-gray-600' : ''
                }`} style={theme === 'dark' ? {color: '#101828'} : {}}>Encryption</div>
              </div>
              <div className="text-center group hover:scale-110 transition-all duration-300">
                <div className={`text-3xl mb-2 font-bold mindease-shimmer ${
                  theme === 'light' ? 'text-gray-900' : ''
                }`} style={theme === 'dark' ? {color: '#101828'} : {}}>HIPAA</div>
                <div className={`text-sm ${
                  theme === 'light' ? 'text-gray-600' : ''
                }`} style={theme === 'dark' ? {color: '#101828'} : {}}>Compliant</div>
              </div>
              <div className="text-center group hover:scale-110 transition-all duration-300">
                <div className={`text-3xl mb-2 font-bold mindease-shimmer ${
                  theme === 'light' ? 'text-gray-900' : ''
                }`} style={theme === 'dark' ? {color: '#101828'} : {}}>ISO 27001</div>
                <div className={`text-sm ${
                  theme === 'light' ? 'text-gray-600' : ''
                }`} style={theme === 'dark' ? {color: '#101828'} : {}}>Certified</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}