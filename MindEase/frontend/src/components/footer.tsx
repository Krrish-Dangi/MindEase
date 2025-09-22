import { Button } from "./ui/button";
import { Phone, Mail, Instagram, Twitter, Youtube } from "lucide-react";
import { useLanguage } from "../contexts/language-context";
import { useTheme } from "../contexts/theme-context";

export function Footer() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  
  return (
    <footer className={`py-20 relative overflow-hidden mindease-theme-transition ${
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
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${8 + Math.random() * 8}s`,
              fontSize: `${0.4 + Math.random() * 0.8}rem`,
            }}
          >
            {theme === 'light' ? '☀️' : '✦'}
          </div>
        ))}
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-10 right-20 w-32 h-32 rounded-full opacity-10" style={{ background: 'var(--mindease-accent)' }} />
      <div className="absolute bottom-20 left-10 w-24 h-24 rounded-full opacity-15" style={{ background: 'var(--mindease-warm)' }} />
      
      <div className="mindease-container relative z-20">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-2xl mindease-gradient-warm"></div>
              <span className={`text-2xl font-bold ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>MindEase</span>
            </div>
            <p className={`text-sm max-w-sm leading-relaxed ${
              theme === 'light' ? 'text-gray-700' : 'text-white/80'
            }`}>
              {t('footer.description') || 'India\'s first culturally-sensitive mental health platform designed specifically for college students. We provide confidential, stigma-free support when you need it most.'}
            </p>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className={`p-3 rounded-xl transition-all duration-300 hover:scale-110 ${
                theme === 'light'
                  ? 'text-gray-600 hover:text-gray-900 hover:bg-orange-100'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}>
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className={`p-3 rounded-xl transition-all duration-300 hover:scale-110 ${
                theme === 'light'
                  ? 'text-gray-600 hover:text-gray-900 hover:bg-orange-100'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}>
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className={`p-3 rounded-xl transition-all duration-300 hover:scale-110 ${
                theme === 'light'
                  ? 'text-gray-600 hover:text-gray-900 hover:bg-orange-100'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}>
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className={`mb-6 text-lg font-semibold ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>{t('footer.quickLinks') || 'Quick Links'} ✦</h3>
            <div className="space-y-3">
              <a href="#resources" className={`block text-sm hover:translate-x-1 transition-all duration-200 ${
                theme === 'light' 
                  ? 'text-gray-700 hover:text-gray-900' 
                  : 'text-white/80 hover:text-white'
              }`}>
                {t('footer.resources') || 'Resources'} ✧
              </a>
              <a href="#peer-forum" className={`block text-sm hover:translate-x-1 transition-all duration-200 ${
                theme === 'light' 
                  ? 'text-gray-700 hover:text-gray-900' 
                  : 'text-white/80 hover:text-white'
              }`}>
                {t('footer.about') || 'About Us'} ✩
              </a>
              <a href="#book-session" className={`block text-sm hover:translate-x-1 transition-all duration-200 ${
                theme === 'light' 
                  ? 'text-gray-700 hover:text-gray-900' 
                  : 'text-white/80 hover:text-white'
              }`}>
                {t('footer.features') || 'Features'} ✪
              </a>
              <a href="#admin-login" className={`block text-sm hover:translate-x-1 transition-all duration-200 ${
                theme === 'light' 
                  ? 'text-gray-700 hover:text-gray-900' 
                  : 'text-white/80 hover:text-white'
              }`}>
                {t('footer.blog') || 'Blog'} ✫
              </a>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className={`mb-6 text-lg font-semibold ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>{t('footer.support') || 'Support'} ✧</h3>
            <div className="space-y-3">
              <a href="#faq" className={`block text-sm hover:translate-x-1 transition-all duration-200 ${
                theme === 'light' 
                  ? 'text-gray-700 hover:text-gray-900' 
                  : 'text-white/80 hover:text-white'
              }`}>
                {t('footer.help') || 'Help Center'} ✦
              </a>
              <a href="#privacy" className={`block text-sm hover:translate-x-1 transition-all duration-200 ${
                theme === 'light' 
                  ? 'text-gray-700 hover:text-gray-900' 
                  : 'text-white/80 hover:text-white'
              }`}>
                {t('footer.privacy') || 'Privacy Policy'} ✩
              </a>
              <a href="#terms" className={`block text-sm hover:translate-x-1 transition-all duration-200 ${
                theme === 'light' 
                  ? 'text-gray-700 hover:text-gray-900' 
                  : 'text-white/80 hover:text-white'
              }`}>
                {t('footer.terms') || 'Terms of Service'} ✪
              </a>
              <a href="#contact" className={`block text-sm hover:translate-x-1 transition-all duration-200 ${
                theme === 'light' 
                  ? 'text-gray-700 hover:text-gray-900' 
                  : 'text-white/80 hover:text-white'
              }`}>
                {t('footer.contact') || 'Contact Us'} ✫
              </a>
            </div>
          </div>

          {/* Emergency */}
          <div>
            <h3 className={`mb-6 text-lg font-semibold ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>{t('footer.emergency') || 'Emergency'} ✩</h3>
            <div className="space-y-4">
              <div className={`backdrop-blur-md p-4 rounded-xl transition-all duration-300 ${
                theme === 'light'
                  ? 'bg-white/90 border border-orange-200 hover:bg-white/95'
                  : 'bg-white/10 border border-white/20 hover:bg-white/15'
              }`}>
                <div className="flex items-center space-x-3 mb-2">
                  <Phone className="h-5 w-5 text-red-400" />
                  <span className={`text-sm ${
                    theme === 'light' ? 'text-gray-700' : 'text-white/80'
                  }`}>National Helpline</span>
                </div>
                <div className={`text-lg font-semibold ${
                  theme === 'light' ? 'text-gray-900' : 'text-white'
                }`}>1800-233-3330</div>
              </div>
              
              <div className={`backdrop-blur-md p-4 rounded-xl transition-all duration-300 ${
                theme === 'light'
                  ? 'bg-white/90 border border-orange-200 hover:bg-white/95'
                  : 'bg-white/10 border border-white/20 hover:bg-white/15'
              }`}>
                <div className="flex items-center space-x-3 mb-2">
                  <Mail className="h-5 w-5 text-yellow-400" />
                  <span className={`text-sm ${
                    theme === 'light' ? 'text-gray-700' : 'text-white/80'
                  }`}>Support Email</span>
                </div>
                <div className={`text-lg font-semibold ${
                  theme === 'light' ? 'text-gray-900' : 'text-white'
                }`}>help@mindease.in</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className={`pt-8 border-t ${
          theme === 'light' ? 'border-orange-200/40' : 'border-white/20'
        }`}>
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0 gap-8">
            <div className={`text-sm ${
              theme === 'light' ? 'text-gray-700' : 'text-white/80'
            }`}>
              © 2024 MindEase. {t('footer.rights') || 'All rights reserved.'} ✦
            </div>
            
            <div className={`backdrop-blur-md p-6 rounded-2xl max-w-lg ${
              theme === 'light'
                ? 'bg-white/90 border border-orange-200'
                : 'bg-white/10 border border-white/20'
            }`}>
              <p className={`text-xs text-center leading-relaxed ${
                theme === 'light' ? 'text-gray-800' : 'text-white/90'
              }`}>
                <strong className="text-red-400">Important:</strong> MindEase is not a substitute for professional medical advice, diagnosis, or treatment. 
                In case of emergencies, please contact your local emergency services or call the helpline immediately. ✧
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}