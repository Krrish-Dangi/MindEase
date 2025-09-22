import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Header } from "./components/header";
import { HeroSection } from "./components/hero-section";
import { FeaturesSection } from "./components/features-section";
import { TrustSection } from "./components/trust-section";
import { WhyMindEaseSection } from "./components/why-mindease-section";
import { TestimonialSection } from "./components/testimonial-section";
import { Footer } from "./components/footer";
import { SplashScreen } from "./components/splash-screen";
import { DashboardLayout } from "./components/dashboard-layout";
import { DashboardHome } from "./components/dashboard-home";
import { CounsellorDashboard } from "./components/counsellor-dashboard";
import { BookingSystem } from "./components/booking-system";
import { SettingsPage } from "./components/settings-page";
import { AISupport } from "./components/ai-support";
import { PeerForum } from "./components/peer-forum";
import { ResourceHub } from "./components/resource-hub";
import { MedicalAnalysis } from "./components/medical-analysis";
import { HistoryAnalysis } from "./components/history-analysis";
import { AvailabilityManagement } from "./components/availability-management";
import { CounsellorAppointments } from "./components/counsellor-appointments";
import { StudentResourcescounsellor } from "./components/student-resources-counsellor";
import { LanguageProvider } from "./contexts/language-context";
import { AuthProvider, useAuth } from "./contexts/auth-context";
import { ThemeProvider, useTheme } from "./contexts/theme-context";

function AppContent() {
  const { isAuthenticated, user } = useAuth();
  const [showSplash, setShowSplash] = useState(!isAuthenticated);
  const [currentPage, setCurrentPage] = useState('home');

  // Handle browser navigation and page routing
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const pageFromPath = getPageFromPath(path);
      setCurrentPage(pageFromPath);
    };

    const handleNavigate = (event: CustomEvent) => {
      setCurrentPage(event.detail.page);
    };

    // Set initial page based on URL
    const initialPath = window.location.pathname;
    const initialPage = getPageFromPath(initialPath);
    setCurrentPage(initialPage);

    // Listen for browser navigation
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('navigate', handleNavigate as EventListener);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('navigate', handleNavigate as EventListener);
    };
  }, []);

  // Map URL paths to page IDs (updated to include medical and history analysis)
  const getPageFromPath = (path: string): string => {
    if (path === '/' || path === '/home') return 'home';
    if (path === '/dashboard') return 'dashboard';
    if (path === '/ai-support') return 'ai';
    if (path === '/medical-analysis') return 'medical-analysis';
    if (path === '/history-analysis') return 'history-analysis';
    if (path === '/booking') return 'booking';
    if (path === '/peer-forum') return 'p2p';
    if (path === '/resource-hub') return 'resources';
    if (path === '/settings') return 'settings';
    // Counsellor-specific routes
    if (path === '/schedule') return 'schedule';
    if (path === '/appointments') return 'appointments';
    if (path === '/students') return 'students';
    if (path === '/availability') return 'availability';
    return 'home';
  };

  if (showSplash && !isAuthenticated) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  const renderDashboardContent = () => {
    switch (currentPage) {
      case 'dashboard':
        if (user?.userType === 'counsellor') {
          return <CounsellorDashboard />;
        }
        return <DashboardHome />;
      case 'booking':
        return <BookingSystem />;
      case 'settings':
        return <SettingsPage />;
      case 'ai':
        return <AISupport />;
      case 'medical-analysis':
        return <MedicalAnalysis />;
      case 'history-analysis':
        return <HistoryAnalysis />;
      case 'p2p':
        return <PeerForum />;
      case 'resources':
        return <ResourceHub />;
      // Counsellor-specific pages
      case 'schedule':
        return <CounsellorAppointments />;
      case 'appointments':
        return <CounsellorAppointments />;
      case 'students':
        return <StudentResourcescounsellor />;
      case 'availability':
        return <AvailabilityManagement />;
      default:
        return <DashboardHome />;
    }
  };

  if (isAuthenticated && currentPage !== 'home') {
    return (
      <DashboardLayout currentPage={currentPage}>
        {renderDashboardContent()}
      </DashboardLayout>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <TrustSection />
        <WhyMindEaseSection />
        <TestimonialSection />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <ThemeProvider>
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </ThemeProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}