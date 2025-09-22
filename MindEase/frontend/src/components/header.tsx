import { Button } from "./ui/button";
import { Phone, Globe, Menu, ChevronDown, Sun, Moon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useState } from "react";
import { SignInModal } from "./sign-in-modal";
import { SignUpModal } from "./sign-up-modal";
import { useLanguage } from "../contexts/language-context";
import { useTheme } from "../contexts/theme-context";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const { currentLanguage, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const languages = {
    en: { name: 'English', code: 'EN', symbol: '✦' },
    hi: { name: 'हिंदी', code: 'हि', symbol: '✧' },
    ks: { name: 'کٲشُر', code: 'کش', symbol: '✩' }
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 mindease-theme-transition">
        <div className="mindease-container flex h-20 items-center justify-between">
          {/* Logo and Tagline */}
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => {
                window.history.pushState({}, '', '/');
                window.dispatchEvent(new CustomEvent('navigate', { detail: { page: 'home' } }));
              }}
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
            >
              <div className="h-10 w-10 rounded-2xl mindease-gradient-primary shadow-lg"></div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">MindEase</span>
            </button>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 p-2"
              title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              {theme === 'light' ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </Button>
            
            {/* Language Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center space-x-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">
                  <Globe className="h-4 w-4" />
                  <span className="text-sm font-medium">{languages[currentLanguage].code}</span>
                  <span className="text-lg">{languages[currentLanguage].symbol}</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border border-gray-200 dark:border-gray-700">
                <DropdownMenuItem 
                  onClick={() => setLanguage('en')}
                  className={`hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white ${currentLanguage === 'en' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
                >
                  <Globe className="h-4 w-4 mr-2" />
                  English ✦
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setLanguage('hi')}
                  className={`hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white ${currentLanguage === 'hi' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
                >
                  <Globe className="h-4 w-4 mr-2" />
                  हिंदी ✧
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setLanguage('ks')}
                  className={`hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white ${currentLanguage === 'ks' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
                >
                  <Globe className="h-4 w-4 mr-2" />
                  کٲشُر ✩
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Auth Buttons */}
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setIsSignInOpen(true)}
              className="text-xs rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 px-4 py-2 text-gray-700 dark:text-gray-300 hover:scale-105 transition-all duration-300"
            >
              {t('header.signIn')}
            </Button>
            
            <Button 
              size="sm" 
              onClick={() => setIsSignUpOpen(true)}
              className="text-xs rounded-lg px-4 py-2 hover:scale-105 transition-all duration-300"
              style={{ background: 'var(--mindease-gradient-primary)', color: 'white' }}
            >
              {t('header.signUp')}
            </Button>

            {/* Emergency Helpline */}
            <Button 
              size="sm" 
              className="rounded-xl text-white shadow-lg hover:shadow-xl transition-all duration-300 px-6 hover:scale-105"
              style={{ background: 'var(--mindease-gradient-warm)' }}
            >
              <Phone className="h-4 w-4 mr-2" />
              <span className="hidden lg:inline">{t('header.emergency')}</span>
              <span className="lg:hidden">{t('header.help')}</span>
            </Button>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center space-x-4">
            {/* Emergency Helpline - Mobile */}
            <Button 
              size="sm" 
              className="rounded-xl text-white shadow-lg hover:shadow-xl transition-all duration-300"
              style={{ background: 'var(--mindease-gradient-warm)' }}
            >
              <Phone className="h-4 w-4" />
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md">
            <nav className="mindease-container py-6 flex flex-col space-y-4">
              <Button 
                variant="ghost" 
                onClick={() => {
                  setIsSignInOpen(true);
                  setIsMenuOpen(false);
                }}
                className="justify-start text-sm py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
              >
                {t('header.signIn')} ✦
              </Button>
              
              <Button 
                onClick={() => {
                  setIsSignUpOpen(true);
                  setIsMenuOpen(false);
                }}
                className="justify-start mindease-button text-white py-3"
              >
                {t('header.signUp')} ✧
              </Button>
              
              {/* Mobile Language Options */}
              <div className="space-y-3 border-t pt-4 border-gray-200 dark:border-gray-700">
                <p className="text-xs px-2 text-gray-600 dark:text-gray-400">Language / भाषा / زبان</p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setLanguage('en')}
                  className={`justify-start rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 ${currentLanguage === 'en' ? 'bg-gray-100 dark:bg-gray-800' : ''}`}
                >
                  <Globe className="h-4 w-4 mr-2" />
                  English ✦
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setLanguage('hi')}
                  className={`justify-start rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 ${currentLanguage === 'hi' ? 'bg-gray-100 dark:bg-gray-800' : ''}`}
                >
                  <Globe className="h-4 w-4 mr-2" />
                  हिंदी ✧
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setLanguage('ks')}
                  className={`justify-start rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 ${currentLanguage === 'ks' ? 'bg-gray-100 dark:bg-gray-800' : ''}`}
                >
                  <Globe className="h-4 w-4 mr-2" />
                  کٲشُر ✩
                </Button>
              </div>
              
              {/* Mobile Theme Toggle */}
              <div className="border-t pt-4 border-gray-200 dark:border-gray-700">
                <Button
                  variant="ghost"
                  onClick={toggleTheme}
                  className="justify-start rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                >
                  {theme === 'light' ? (
                    <>
                      <Moon className="h-4 w-4 mr-2" />
                      Dark Mode
                    </>
                  ) : (
                    <>
                      <Sun className="h-4 w-4 mr-2" />
                      Light Mode
                    </>
                  )}
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Modals */}
      <SignInModal isOpen={isSignInOpen} onClose={() => setIsSignInOpen(false)} />
      <SignUpModal isOpen={isSignUpOpen} onClose={() => setIsSignUpOpen(false)} />
    </>
  );
}