import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'hi' | 'ks';

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation data
const translations = {
  en: {
    // Header
    'header.emergency': 'Emergency',
    'header.help': 'Help',
    'header.signIn': 'Sign In',
    'header.signUp': 'Sign Up',
    'header.tagline': 'Your Confidential College Mental Health Companion',
    
    // Hero Section
    'hero.title': 'Your Mental Health Matters',
    'hero.subtitle': 'Confidential, culturally-sensitive mental health support designed specifically for Indian college students. Access AI chat, peer forums, and professional counseling - all in a safe, stigma-free environment.',
    'hero.cta.primary': 'Get Started for Free',
    'hero.cta.secondary': 'Learn More',
    'hero.getStarted': 'Get Started for Free',
    'hero.chatNow': 'Chat Now',
    'hero.features.available': '24/7 Available',
    'hero.features.anonymous': '100% Anonymous',
    'hero.features.multilingual': 'Multi-language Support',
    'hero.stats.students': 'Students',
    'hero.stats.support': 'Support', 
    'hero.stats.confidential': 'Confidential',
    
    // Features Section
    'features.title': 'Everything You Need for Mental Wellness',
    'features.aiChat.title': 'AI First-Aid Chat',
    'features.aiChat.description': 'Instant emotional support through our culturally-aware AI companion trained on Indian contexts and values.',
    'features.booking.title': 'Confidential counsellor Booking',
    'features.booking.description': 'Book sessions with verified mental health professionals who understand college life and cultural nuances.',
    'features.peer.title': 'Peer Support Forums',
    'features.peer.description': 'Connect anonymously with fellow students facing similar challenges in moderated, safe spaces.',
    'features.resources.title': 'Wellness Resource Hub',
    'features.resources.description': 'Access mental health content, guided meditations, and self-help tools in Hindi, English, and regional languages.',
    
    // Trust Section
    'trust.title': 'Your Privacy & Trust Come First',
    'trust.subtitle': 'We understand the importance of confidentiality in mental health support. MindEase is built with privacy-first design and cultural sensitivity.',
    'trust.encryption.title': 'End-to-End Encryption',
    'trust.encryption.description': 'All conversations and data are encrypted and never shared',
    'trust.anonymous.title': 'Anonymous Access',
    'trust.anonymous.description': 'Use MindEase without creating an account or sharing personal details',
    'trust.professionals.title': 'Verified Professionals',
    'trust.professionals.description': 'All counsellors are licensed and culturally competent',
    'trust.support.title': '24/7 Crisis Support',
    'trust.support.description': 'Immediate help available during mental health emergencies',
    
    // Why MindEase Section
    'why.title': 'Why Indian Students Choose MindEase',
    'why.understanding.title': 'Cultural Understanding',
    'why.understanding.description': 'Built specifically for Indian college students, understanding family dynamics, academic pressure, and cultural expectations.',
    'why.languages.title': 'Regional Language Support',
    'why.languages.description': 'Get support in Hindi, English, and regional languages like Kashmiri, making mental health accessible in your comfort language.',
    'why.stigma.title': 'Stigma-Free Environment',
    'why.stigma.description': 'Break the stigma around mental health with anonymous access and culturally sensitive approach to wellness.',
    'why.affordable.title': 'Student-Friendly Pricing',
    'why.affordable.description': 'Affordable mental health support designed for college budgets with free resources and sliding scale counseling fees.',
    
    // Testimonials
    'testimonials.title': 'Stories from Students Like You',
    'testimonials.subtitle': 'Real experiences from Indian college students who found support through MindEase',
    'testimonials.student1.text': 'MindEase helped me navigate exam stress without judgment. The AI chat was there when I needed it most at 2 AM.',
    'testimonials.student1.name': 'Priya K.',
    'testimonials.student1.location': 'Delhi University',
    'testimonials.student2.text': 'Finally, mental health support that understands Indian family dynamics. The counsellors actually get what I\'m going through.',
    'testimonials.student2.name': 'Rahul M.',
    'testimonials.student2.location': 'IIT Mumbai',
    'testimonials.student3.text': 'Being able to access support in Hindi made all the difference. I could express myself freely without language barriers.',
    'testimonials.student3.name': 'Anjali S.',
    'testimonials.student3.location': 'JNU',
    
    // Footer
    'footer.description': 'MindEase is India\'s first culturally-sensitive mental health platform designed specifically for college students. We provide confidential, stigma-free support when you need it most.',
    'footer.quickLinks': 'Quick Links',
    'footer.resources': 'Resources',
    'footer.support': 'Support',
    'footer.legal': 'Legal',
    'footer.home': 'Home',
    'footer.about': 'About Us',
    'footer.features': 'Features',
    'footer.pricing': 'Pricing',
    'footer.blog': 'Blog',
    'footer.guides': 'Mental Health Guides',
    'footer.meditation': 'Guided Meditation',
    'footer.crisis': 'Crisis Resources',
    'footer.help': 'Help Center',
    'footer.contact': 'Contact Us',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.cookies': 'Cookie Policy',
    'footer.emergency': 'Emergency Helpline',
    'footer.rights': 'All rights reserved.',
    
    // Auth Modals
    'auth.signIn.title': 'Welcome Back to MindEase',
    'auth.signIn.subtitle': 'Choose your account type to sign in',
    'auth.signUp.title': 'Join MindEase Today',
    'auth.signUp.subtitle': 'Start your mental wellness journey with confidential, stigma-free support',
    'auth.student': 'I\'m a Student',
    'auth.counsellor': 'I\'m a Counsellor',
    'auth.student.description': 'Access mental health support, peer forums, and wellness resources',
    'auth.counsellor.description': 'Manage appointments, access student resources, and provide support',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.forgotPassword': 'Forgot password?',
    'auth.firstName': 'First Name',
    'auth.lastName': 'Last Name',
    'auth.college': 'College/University',
    'auth.year': 'Year of Study',
    'auth.license': 'License Number',
    'auth.specialization': 'Specialization',
    'auth.terms': 'I agree to the Terms of Service and Privacy Policy',
    'auth.createAccount': 'Create Account',
    'auth.anonymousOption': 'Or continue anonymously without an account',
    'auth.privacyProtected': 'Your Privacy is Protected',
    'auth.anonymousAvailable': '100% Anonymous Option Available',
    'auth.username': 'Username',
    
    // Dashboard
    'dashboard.title': 'MindEase Dashboard',
    'dashboard.welcome': 'Hi {name} 👋, how are you feeling today?',
    'dashboard.welcomeAnonymous': 'Hi there 👋, how are you feeling today?',
    'dashboard.sidebar.dashboard': 'Dashboard',
    'dashboard.sidebar.ai': 'AI Support',
    'dashboard.sidebar.p2p': 'Peer Forum',
    'dashboard.sidebar.resources': 'Resource Hub',
    'dashboard.sidebar.logout': 'Logout',
    'dashboard.notifications': 'Notifications',
    'dashboard.profile': 'Profile',
    'dashboard.settings': 'Settings',
    'dashboard.emergency': 'Emergency Help',
    
    // Mood Tracker
    'dashboard.mood.title': 'How are you feeling?',
    'dashboard.mood.excellent': 'Excellent',
    'dashboard.mood.good': 'Good',
    'dashboard.mood.okay': 'Okay',
    'dashboard.mood.low': 'Low',
    'dashboard.mood.bad': 'Very Bad',
    
    // Wellness Overview
    'dashboard.wellness.title': 'Wellness Overview',
    'dashboard.wellness.moodTrends': 'Mood Trends',
    'dashboard.wellness.stressScore': 'Stress Level',
    'dashboard.wellness.dailyTip': 'Daily Wellness Tip',
    'dashboard.wellness.tip': 'Take 5 deep breaths when feeling overwhelmed. This activates your parasympathetic nervous system.',
    
    // Quick Actions
    'dashboard.actions.title': 'Quick Actions',
    'dashboard.actions.aiChat': 'Talk to AI Support',
    'dashboard.actions.bookSession': 'Book Counsellor Session',
    'dashboard.actions.peerForum': 'Join Peer Forum',
    'dashboard.actions.resources': 'Explore Resources Hub',
    
    // Progress
    'dashboard.progress.title': 'Your Progress',
    'dashboard.progress.checkins': 'This week\'s check-ins',
    'dashboard.progress.streak': 'Wellness Streak',
    'dashboard.progress.badge': '3-day wellness streak 🌟',
    
    // Notifications
    'dashboard.notifications.title': 'Updates & Announcements',
    'dashboard.notifications.workshop': 'Upcoming Stress Management Workshop - 5 PM, Friday',
    'dashboard.notifications.confidential': 'Your data is private and anonymized',
  },
  
  hi: {
    // Header
    'header.emergency': 'आपातकाल',
    'header.help': 'मदद',
    'header.signIn': 'साइन इन',
    'header.signUp': 'साइन अप',
    'header.tagline': 'आपका गोपनीय कॉलेज मानसिक स्वास्थ्य साथी',
    
    // Hero Section
    'hero.title': 'आपका मानसिक स्वास्थ्य महत्वपूर्ण है',
    'hero.subtitle': 'भारतीय कॉलेज छात्रों के लिए विशेष रूप से डिज़ाइन किया गया गोपनीय, सांस्कृतिक रूप से संवेदनशील मानसिक स्वास्थ्य सहायता। AI चैट, साथियों के फोरम, और पेशेवर परामर्श तक पहुंच - सभी एक सुरक्षित, कलंक-मुक्त वातावरण में।',
    'hero.cta.primary': 'मुफ्त में शुरू करें',
    'hero.cta.secondary': 'और जानें',
    'hero.getStarted': 'मुफ्त में शुरू करें',
    'hero.chatNow': 'अभी चैट करें',
    'hero.features.available': '24/7 उपलब्ध',
    'hero.features.anonymous': '100% गुमनाम',
    'hero.features.multilingual': 'बहुभाषी सहायता',
    'hero.stats.students': 'छात्र',
    'hero.stats.support': 'सहायता', 
    'hero.stats.confidential': 'गोपनीय',
    
    // Features Section
    'features.title': 'मानसिक कल्याण के लिए सब कुछ',
    'features.aiChat.title': 'AI प्राथमिक चिकित्सा चैट',
    'features.aiChat.description': 'भारतीय संदर्भों और मूल्यों पर प्रशिक्षित हमारे सांस्कृतिक रूप से जागरूक AI साथी के माध्यम से तत्काल भावनात्मक सहायता।',
    'features.booking.title': 'गोपनीय काउंसलर बुकिंग',
    'features.booking.description': 'सत्यापित मानसिक स्वास्थ्य पेशेवरों के साथ सत्र बुक करें जो कॉलेज जीवन और सांस्कृतिक बारीकियों को समझते हैं।',
    'features.peer.title': 'साथियों का सहायता मंच',
    'features.peer.description': 'मॉडरेट किए गए, सुरक्षित स्थानों में समान चुनौतियों का सामना कर रहे सहपाठियों से गुमनाम रूप से जुड़ें।',
    'features.resources.title': 'कल्याण संसाधन केंद्र',
    'features.resources.description': 'हिंदी, अंग्रेजी और क्षेत्रीय भाषाओं में मानसिक स्वास्थ्य सामग्री, निर्देशित ध्यान और स्व-सहायता उपकरणो तक पहुंच।',
    
    // Trust Section
    'trust.title': 'आपकी गोपनीयता और विश्वास पहले',
    'trust.subtitle': 'हम मानसिक स्वास्थ्य सहायता में गोपनीयता के महत्व को समझते हैं। MindEase गोपनीयता-प्राथमिकता डिज़ाइन और सांस्कृतिक संवेदनशीलता के साथ बनाया गया है।',
    'trust.encryption.title': 'एंड-टू-एंड एन्क्रिप्शन',
    'trust.encryption.description': 'सभी बातचीत और डेटा एन्क्रिप्ट किए गए हैं और कभी साझा नहीं किए जाते',
    'trust.anonymous.title': 'गुमनाम पहुंच',
    'trust.anonymous.description': 'खाता बनाए या व्यक्तिगत विवरण साझा किए बिना MindEase का उपयोग करें',
    'trust.professionals.title': 'सत्यापित पेशेवर',
    'trust.professionals.description': 'सभी काउंसलर लाइसेंस प्राप्त और सांस्कृतिक रूप से सक्षम हैं',
    'trust.support.title': '24/7 संकट सहायता',
    'trust.support.description': 'मानसिक स्वास्थ्य आपातकाल के दौरान तत्काल सहायता उपलब्ध',
    
    // Why MindEase Section
    'why.title': 'भारतीय छात्र MindEase क्यों चुनते हैं',
    'why.understanding.title': 'सांस्कृतिक समझ',
    'why.understanding.description': 'भारतीय कॉलेज छात्रों के लिए विशेष रूप से बनाया गया, पारिवारिक गतिशीलता, शैक्षणिक दबाव और सांस्कृतिक अपेक्षाओं को समझना।',
    'why.languages.title': 'क्षेत्रीय भाषा सहायता',
    'why.languages.description': 'हिंदी, अंग्रेजी और कश्मीरी जैसी क्षेत्रीय भाषाओं में सहायता प्राप्त करें, मानसिक स्वास्थ्य को आपकी आरामदायक भाषा में सुलभ बनाना।',
    'why.stigma.title': 'कलंक-मुक्त वातावरण',
    'why.stigma.description': 'गुमनाम पहुंच और कल्याण के लिए सांस्कृतिक रूप से संवेदनशील दृष्टिकोण के साथ मानसिक स्वास्थ्य के आसपास कलंक को तोड़ें।',
    'why.affordable.title': 'छात्र-अनुकूल मूल्य निर्धारण',
    'why.affordable.description': 'मुफ्त संसाधनों और स्लाइडिंग स्केल परामर्श शुल्क के साथ कॉलेज बजट के लिए डिज़ाइन किए गए किफायती मानसिक स्वास्थ्य सहायता।',
    
    // Testimonials
    'testimonials.title': 'आपके जैसे छात्रों की कहानियां',
    'testimonials.subtitle': 'भारतीय कॉलेज छात्रों के वास्तविक अनुभव जिन्होंन MindEase के माध्यम से सहायता पाई',
    'testimonials.student1.text': 'MindEase ने बिना जजमेंट के परीक्षा के तनाव से निपटने में मेरी मदद की। AI चैट रात 2 बजे जब मुझे इसकी सबसे ज्यादा जरूरत थी तब वहां था।',
    'testimonials.student1.name': 'प्रिया के.',
    'testimonials.student1.location': 'दिल्ली विश्वविद्यालय',
    'testimonials.student2.text': 'आखिरकार, मानसिक स्वास्थ्य सहायता जो भारतीय पारिवारिक गतिशीलता को समझती है। काउंसलर वास्तव में समझते हैं कि मैं किससे गुजर रहा हूं।',
    'testimonials.student2.name': 'राहुल एम.',
    'testimonials.student2.location': 'IIT मुंबई',
    'testimonials.student3.text': 'हिंदी में सहायता प्राप्त करने में सक्षम होना सबसे बड़ा अंतर था। मैं भाषा की बाधाओं के बिना खुद को स्वतंत्र रूप से व्यक्त कर सकता था।',
    'testimonials.student3.name': 'अंजलि एस.',
    'testimonials.student3.location': 'JNU',
    
    // Footer
    'footer.description': 'MindEase भारत का पहला सांस्कृतिक रूप से संवेदनशील मानसिक स्वास्थ्य प्लेटफॉर्म है जो विशेष रूप से कॉलेज छात्रों के लिए डिज़ाइन किया गया है। हम गोपनीय, कलंक-मुक्त सहायता प्रदान करते हैं जब आपको इसकी सबसे ज्यादा जरूरत होती है।',
    'footer.quickLinks': 'त्वरित लिंक',
    'footer.resources': 'संसाधन',
    'footer.support': 'सहायता',
    'footer.legal': 'कानूनी',
    'footer.home': 'होम',
    'footer.about': 'हमारे बारे में',
    'footer.features': 'विशेषताएं',
    'footer.pricing': 'मूल्य निर्धारण',
    'footer.blog': 'ब्लॉग',
    'footer.guides': 'मानसिक स्वास्थ्य गाइड',
    'footer.meditation': 'निर्देशित ध्यान',
    'footer.crisis': 'संकट संसाधन',
    'footer.help': 'सहायता केंद्र',
    'footer.contact': 'संपर्क करें',
    'footer.privacy': 'गोपनीयता नीति',
    'footer.terms': 'सेवा की शर्तें',
    'footer.cookies': 'कुकी नीति',
    'footer.emergency': 'आपातकालीन हेल्पलाइन',
    'footer.rights': 'सभी अधिकार सुरक्षित।',
    
    // Auth Modals
    'auth.signIn.title': 'MindEase में वापस स्वागत है',
    'auth.signIn.subtitle': 'साइन इन करने के लिए अपना खाता प्रकार चुनें',
    'auth.signUp.title': 'आज ही MindEase में शामिल हों',
    'auth.signUp.subtitle': 'गोपनीय, कलंक-मुक्त सहायता के साथ अपनी मानसिक कल्याण यात्रा शुरू करें',
    'auth.student': 'मैं एक छात्र हूं',
    'auth.counsellor': 'मैं एक काउंसलर हूं',
    'auth.student.description': 'मानसिक स्वास्थ्य सहायता, साथियों के फोरम और कल्याण संसाधनों तक पहुंच',
    'auth.counsellor.description': 'अपॉइंटमेंट प्रबंधित करें, छात्र संसाधनों तक पहुंच और सहायता प्रदान करें',
    'auth.email': 'ईमेल',
    'auth.password': 'पासवर्ड',
    'auth.forgotPassword': 'पासवर्ड भूल गए?',
    'auth.firstName': 'पहला नाम',
    'auth.lastName': 'अंतिम नाम',
    'auth.college': 'कॉलेज/विश्वविद्यालय',
    'auth.year': 'अध्ययन का वर्ष',
    'auth.license': 'लाइसेंस नंबर',
    'auth.specialization': 'विशेषज्ञता',
    'auth.terms': 'मैं सेवा की शर्तों और गोपनीयता नीति से सहमत हूं',
    'auth.createAccount': 'खाता बनाएं',
    'auth.anonymousOption': 'या खाता बनाए बिना गुमनाम रूप से जारी रखें',
    'auth.privacyProtected': 'आपकी गोपनीयता सुरक्षित है',
    'auth.anonymousAvailable': '100% गुमनाम विकल्प उपलब्ध',
    'auth.username': 'उपयोगकर्ता नाम',
    
    // Dashboard
    'dashboard.title': 'MindEase Dashboard',
    'dashboard.welcome': 'Hi {name} 👋, how are you feeling today?',
    'dashboard.welcomeAnonymous': 'Hi there 👋, how are you feeling today?',
    'dashboard.sidebar.dashboard': 'Dashboard',
    'dashboard.sidebar.ai': 'AI Support',
    'dashboard.sidebar.p2p': 'Peer Forum',
    'dashboard.sidebar.resources': 'Resource Hub',
    'dashboard.sidebar.logout': 'Logout',
    'dashboard.notifications': 'Notifications',
    'dashboard.profile': 'Profile',
    'dashboard.settings': 'Settings',
    'dashboard.emergency': 'Emergency Help',
    
    // Mood Tracker
    'dashboard.mood.title': 'How are you feeling?',
    'dashboard.mood.excellent': 'Excellent',
    'dashboard.mood.good': 'Good',
    'dashboard.mood.okay': 'Okay',
    'dashboard.mood.low': 'Low',
    'dashboard.mood.bad': 'Very Bad',
    
    // Wellness Overview
    'dashboard.wellness.title': 'Wellness Overview',
    'dashboard.wellness.moodTrends': 'Mood Trends',
    'dashboard.wellness.stressScore': 'Stress Level',
    'dashboard.wellness.dailyTip': 'Daily Wellness Tip',
    'dashboard.wellness.tip': 'Take 5 deep breaths when feeling overwhelmed. This activates your parasympathetic nervous system.',
    
    // Quick Actions
    'dashboard.actions.title': 'Quick Actions',
    'dashboard.actions.aiChat': 'Talk to AI Support',
    'dashboard.actions.bookSession': 'Book Counsellor Session',
    'dashboard.actions.peerForum': 'Join Peer Forum',
    'dashboard.actions.resources': 'Explore Resources Hub',
    
    // Progress
    'dashboard.progress.title': 'Your Progress',
    'dashboard.progress.checkins': 'This week\'s check-ins',
    'dashboard.progress.streak': 'Wellness Streak',
    'dashboard.progress.badge': '3-day wellness streak 🌟',
    
    // Notifications
    'dashboard.notifications.title': 'Updates & Announcements',
    'dashboard.notifications.workshop': 'Upcoming Stress Management Workshop - 5 PM, Friday',
    'dashboard.notifications.confidential': 'Your data is private and anonymized',
  },
  
  ks: {
    // Header (Kashmiri - using Devanagari script for readability)
    'header.emergency': 'ہنگامی حالت',
    'header.help': 'مدد',
    'header.signIn': 'साइन इन',
    'header.signUp': 'साइन अप',
    'header.tagline': 'तुहुंद गुप्त कालेज मानसिक सेहत साथी',
    
    // Hero Section
    'hero.title': 'तुهुंद मानसिक सेहत अहम छु',
    'hero.subtitle': 'भारती कालेज छात्रन खातिर खास तौर पैठ बनाओल गुप्त, ثقافتी तौर पैठ संवेदनशील मानसिक सेहत मदद। AI चैट, साथी फोरम अते पेशेवर सलाह - सब کچھ सुरक्षित، بدनامی-आज़ाद माहौल منज।',
    'hero.getStarted': 'मुफ्त منज शुरू करिव',
    'hero.chatNow': 'अबै चैट करिव',
    'hero.features.available': '24/7 उपलब्ध',
    'hero.features.anonymous': '100% गुमनाम',
    'hero.features.multilingual': 'कइ زबان मदद',
    'hero.stats.students': 'छात्र',
    'hero.stats.support': 'सहायता', 
    'hero.stats.confidential': 'गुप्त',
    
    // Features Section
    'features.title': 'मानसिक कल्याण खातिर सब कछ',
    'features.aiChat.title': 'AI اولین امداد चैट',
    'features.aiChat.description': 'कश्मीरी संदर्भ अते قदارن पैठ تربیت یافتہ अस्सا ثقافتی तौर پیٹھ जागरूक AI साथी ذریعہ فوری جذباتی مدد।',
    'features.booking.title': 'गुप्त काउंسलर बुकिंग',
    'features.booking.description': 'تصدیق شدہ مानसिक صحت پیشہ وروں سات सत्र بुک کارिव یوस کالج زندگی अते ثقافتی باریکیاں سمجھن।',
    'features.peer.title': 'साथी مدد فورم',
    'features.peer.description': 'मॉडरेट کیتے، محفوظ جگین منج یکساں مुश्किलातन सात مुकाबلा करने वाले हमکلास سात गुमनाम تریقہ सات جुड़िव।',
    'features.resources.title': 'कल्याण وسائل مرکز',
    'features.resources.description': 'कश्मीरी، अंग्रेज़ी अते दؤرؤ علاقائی زبانن منج मानसिक صحت مواد، رہنمائی کیتے ध्यान अते خود مدد کے اوزار تक رسائی।',
    
    // Trust Section
    'trust.title': 'तुهुंد رازداری अते भरोसا اولین',
    'trust.subtitle': 'اسی مानسک صحت کی مدد منج رازداری کی اہمیت سمجھان छुंख। MindEase رازداری-اولین ڈیزائن अते ثقافتی حساسیت سات بनاؤل آسان।',
    'trust.encryption.title': 'एंड-टू-एंड एन्क्रिप्शन',
    'trust.encryption.description': 'تمام گفتگو अते ڈیٹا एन्क्रिप्ट अते कखा भी साझा نئیں کیتے',
    'trust.anonymous.title': 'गुमनाम رسائی',
    'trust.anonymous.description': 'اکاؤنٹ बनाने या ذاتی تفصیلات साझा کیئے بغیر MindEase کا استعمال کरिव',
    'trust.professionals.title': 'تصدیق شدہ پیشہ ور',
    'trust.professionals.description': 'تمام کاونسلر لائسنس یافتہ अتे ثقافتی طور پیٹھ سک्षم چھیں',
    'trust.support.title': '24/7 بحران مدد',
    'trust.support.description': 'ذہنی صحت کی ایمرجنسی کے دوران فوری مدد دستیاب',
    
    // Why MindEase Section
    'why.title': 'कश्मیری छात्र MindEase کیازِ انتخاب کاری چھیں',
    'why.understanding.title': 'ثقافتی سامझ',
    'why.understanding.description': 'کاشیری کالج کے طلباء کے لیے خاص طور پیٹھ بناوی، خاندانی حرکیات، تعلیمی دباؤ اتے ثقافتی توقعات سمجھنہ。',
    'why.languages.title': 'علاقائی زبان مدد',
    'why.languages.description': 'کاشیری، अंग्रेज़ी अते دؤر علاقائی زبانن منج مدد حاصل کریو، ذہنی صحت کو تुہندی آرام کی زبان منج قابل رسائی بناونہ。',
    'why.stigma.title': 'بدنامی سے پاک ماحول',
    'why.stigma.description': 'گمنام رسائی اتے صحت کے لیے ثقافتی طور پیٹھ حساس نظریہ سات ذہنی صحت کے آس پاس بدنامی توڑنہ。',
    'why.affordable.title': 'छातر-دوست قیمت',
    'why.affordable.description': 'مفت وسائل اتے سلائیڈنگ سکیل مشاورت کی فیس سات کالج بجٹ کے لیے ڈیزائن کیتے کفایتی ذہنی صحت کی مدد。',
    
    // Testimonials
    'testimonials.title': 'تुهुंد جیہرؤ छात्रن کہانيयाں',
    'testimonials.subtitle': 'کاشیری کالج کے طلباء کے واقعی تجربیات یوसن MindEase ذریعہ مدد میں آیا',
    'testimonials.student1.text': 'MindEase ن ججمेंट بگیر امتحان کے دباؤ سات نمٹنے منج میری مدد کیتی۔ AI चैट راتئ 2 بجے یتیس میں سैं सاروی کُنی ضرورت آسی उتुک अس्सै。',
    'testimonials.student1.name': 'प्रिया K.',
    'testimonials.student1.location': 'दिल्ली यूनिवर्सिटी',
    'testimonials.student2.text': 'آخر کار، ذہنی صحت کی مدد یوس کشمیری خاندانی حرکیات سمجھان۔ کاونسلر واقعی سمجھان کि اس کیاہ کاردؤ یان چھؤس۔',
    'testimonials.student2.name': 'राहुल M.',
    'testimonials.student2.location': 'IIT मुंबई',
    'testimonials.student3.text': 'کاشیری منج مدد حاصل کرنے منج قابل ہونا ساروی کُنی وۄڈ فرق آسا۔ اس زبान کی رکاوٹوں بغیر اپان آپ آزاد تریقہ سات व्यक्त کرथ हیکुس۔',
    'testimonials.student3.name': 'अंजली S.',
    'testimonials.student3.location': 'کاشیری यूनिवर्सिटी',
    
    // Footer
    'footer.description': 'MindEase ہندوستان کا پہلا ثقافتی طور پیٹھ حساس ذہنی صحت پلیٹ فارم چھا یوس خاص طور پیٹھ کالج کے طلباء کے لیے ڈیزائن کیتا گہا چھا۔ اسی رازدارانہ، بدنامی سے پاک مدد فراہم کران چھا ییلہ توہیٖن ساری کنیٖ ضرورت آسان۔',
    'footer.quickLinks': 'جلدی لنک',
    'footer.resources': 'وسائل',
    'footer.support': 'مدد',
    'footer.legal': 'قانونی',
    'footer.home': 'گھر',
    'footer.about': 'اسہِ بارہ منز',
    'footer.features': 'خصوصیات',
    'footer.pricing': 'قیمت',
    'footer.blog': 'بلاگ',
    'footer.guides': 'ذہنی صحت کی رہنمائی',
    'footer.meditation': 'رہنمائی کیتے مراقبہ',
    'footer.crisis': 'بحران کے وسائل',
    'footer.help': 'مدد کا مرکز',
    'footer.contact': 'رابطہ کریں',
    'footer.privacy': 'پرائیویسی پالیسی',
    'footer.terms': 'سروس کی شرائط',
    'footer.cookies': 'کوکی پالیسی',
    'footer.emergency': 'ایمرجنسی ہیلپ لائن',
    'footer.rights': 'تمام حقوق محفوظ۔',
    
    // Auth Modals
    'auth.signIn.title': 'MindEase منز واپس خوش آمدید',
    'auth.signIn.subtitle': 'ساین اِن کرنہ خاطرہ اپنا اکاؤنٹ قسم انتخاب کریو',
    'auth.signUp.title': 'آج MindEase منز شامل گژھیو',
    'auth.signUp.subtitle': 'رازدارانہ، بدنامی سے پاک مدد کے ساتھ اپنا ذہنی تندرستی کا سفر شروع کریو',
    'auth.student': 'اَز اکھ طالب علم چھُس',
    'auth.counsellor': 'اَز اکھ کاؤنسلر چھُس',
    'auth.student.description': 'ذہنی صحت کی مدد، ساتھیوں کے فورم اور فلاح و بہبود کے وسائل تک رسائی',
    'auth.counsellor.description': 'اپائنٹمنٹس کا انتظام، طلباء کے وسائل تک رسائی، اور مدد فراہم کرنا',
    'auth.email': 'ای میل',
    'auth.password': 'پاس ورڈ',
    'auth.forgotPassword': 'پاس ورڈ بھول گئے؟',
    'auth.firstName': 'پہلا نام',
    'auth.lastName': 'آخری نام',
    'auth.college': 'کالج/یونیورسٹی',
    'auth.year': 'مطالعہ کا سال',
    'auth.license': 'لائسنس نمبر',
    'auth.specialization': 'تخصص',
    'auth.terms': 'اَز خدماتی شرائط اور پرائیویسی پالیسی سے متفق چھُس',
    'auth.createAccount': 'اکاؤنٹ بناؤ',
    'auth.anonymousOption': 'یا اکاؤنٹ بناینہ بغیر گمنام طریقہ سے جاری رکھیو',
    'auth.privacyProtected': 'تھوہر رازداری محفوظ چھا',
    'auth.anonymousAvailable': '100% گمنام آپشن دستیاب',
    'auth.username': 'کاربر نام',
    
    // Dashboard
    'dashboard.title': 'MindEase Dashboard',
    'dashboard.welcome': 'Hi {name} 👋, how are you feeling today?',
    'dashboard.welcomeAnonymous': 'Hi there 👋, how are you feeling today?',
    'dashboard.sidebar.dashboard': 'Dashboard',
    'dashboard.sidebar.ai': 'AI Support',
    'dashboard.sidebar.p2p': 'Peer Forum',
    'dashboard.sidebar.resources': 'Resource Hub',
    'dashboard.sidebar.logout': 'Logout',
    'dashboard.notifications': 'Notifications',
    'dashboard.profile': 'Profile',
    'dashboard.settings': 'Settings',
    'dashboard.emergency': 'Emergency Help',
    
    // Mood Tracker
    'dashboard.mood.title': 'How are you feeling?',
    'dashboard.mood.excellent': 'Excellent',
    'dashboard.mood.good': 'Good',
    'dashboard.mood.okay': 'Okay',
    'dashboard.mood.low': 'Low',
    'dashboard.mood.bad': 'Very Bad',
    
    // Wellness Overview
    'dashboard.wellness.title': 'Wellness Overview',
    'dashboard.wellness.moodTrends': 'Mood Trends',
    'dashboard.wellness.stressScore': 'Stress Level',
    'dashboard.wellness.dailyTip': 'Daily Wellness Tip',
    'dashboard.wellness.tip': 'Take 5 deep breaths when feeling overwhelmed. This activates your parasympathetic nervous system.',
    
    // Quick Actions
    'dashboard.actions.title': 'Quick Actions',
    'dashboard.actions.aiChat': 'Talk to AI Support',
    'dashboard.actions.bookSession': 'Book Counsellor Session',
    'dashboard.actions.peerForum': 'Join Peer Forum',
    'dashboard.actions.resources': 'Explore Resources Hub',
    
    // Progress
    'dashboard.progress.title': 'Your Progress',
    'dashboard.progress.checkins': 'This week\'s check-ins',
    'dashboard.progress.streak': 'Wellness Streak',
    'dashboard.progress.badge': '3-day wellness streak 🌟',
    
    // Notifications
    'dashboard.notifications.title': 'Updates & Announcements',
    'dashboard.notifications.workshop': 'Upcoming Stress Management Workshop - 5 PM, Friday',
    'dashboard.notifications.confidential': 'Your data is private and anonymized',
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
  };

  const t = (key: string): string => {
    return translations[currentLanguage][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}