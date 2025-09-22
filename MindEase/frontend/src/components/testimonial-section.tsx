import { Card, CardContent } from "./ui/card";
import { Star, MessageSquare } from "lucide-react";
import { useLanguage } from "../contexts/language-context";
import { useTheme } from "../contexts/theme-context";

export function TestimonialSection() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  
  const testimonials = [
    {
      name: t('testimonials.student1.name') || 'Arjun K.',
      role: t('testimonials.student1.location') || 'Engineering Student, Mumbai',
      content: t('testimonials.student1.text') || 'MindEase helped me through my placement anxiety. The AI chat understood my concerns and the counsellor sessions were genuinely helpful.',
      rating: 5,
      gradient: "var(--mindease-gradient-primary)",
      bgColor: "rgba(255, 255, 255, 0.1)",
    },
    {
      name: t('testimonials.student2.name') || 'Priya S.',
      role: t('testimonials.student2.location') || 'Medical Student, Delhi',
      content: t('testimonials.student2.text') || 'Finally, someone who gets the pressure of Indian academics. The peer forum connected me with students facing similar challenges.',
      rating: 5,
      gradient: "var(--mindease-gradient-warm)",
      bgColor: "rgba(255, 255, 255, 0.1)",
    },
    {
      name: t('testimonials.student3.name') || 'Rahul M.',
      role: t('testimonials.student3.location') || 'MBA Student, Bangalore',
      content: t('testimonials.student3.text') || 'The Hindi support made all the difference. I could express my feelings naturally without worrying about language barriers.',
      rating: 5,
      gradient: "linear-gradient(135deg, var(--mindease-secondary), var(--mindease-tertiary))",
      bgColor: "rgba(255, 255, 255, 0.1)",
    }
  ];

  return (
    <section className={`mindease-section-spacing relative overflow-hidden mindease-theme-transition`} style={{
      background: theme === 'light'
        ? 'linear-gradient(135deg, #FA8119 0%, #FBAD21 100%)'
        : 'linear-gradient(135deg, #232946 0%, #232946 100%)'
    }}>
      {/* Theme-aware background elements */}
      <div className="absolute inset-0 z-10">
        {Array.from({ length: theme === 'light' ? 30 : 50 }).map((_, i) => (
          <div
            key={i}
            className={`absolute animate-pulse ${
              theme === 'light' ? 'text-orange-400/30' : 'text-white/20'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 15}s`,
              animationDuration: `${7 + Math.random() * 5}s`,
              fontSize: `${0.4 + Math.random() * 0.7}rem`,
            }}
          >
            {theme === 'light' ? '☀️' : '✦'}
          </div>
        ))}
      </div>

      <div className="mindease-container relative z-20">
        <div className="text-center mb-20">
          <h2 className={`text-3xl lg:text-4xl mb-6 font-bold`} style={theme === 'light' ? {color: '#fff'} : {color: '#fff'}}>
            {t('testimonials.title') || 'Stories from Students Like You'}
          </h2>
          <p className={`text-lg max-w-2xl mx-auto`} style={theme === 'light' ? {color: '#fff'} : {color: '#fff'}}>
            {t('testimonials.subtitle') || 'Real experiences from students who found support and healing through MindEase.'}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className={`mindease-card border-0 hover:-translate-y-1 transition-all duration-500 group mindease-pulse backdrop-blur-md ${
                theme === 'light'
                  ? 'bg-white/95 border-orange-200'
                  : 'bg-white/95 border-gray-200'
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                       style={{ background: testimonial.gradient }}>
                    <MessageSquare className="h-6 w-6 text-white" />
                  </div>
                </div>
                
                <p className="text-sm leading-relaxed mb-8 text-gray-900">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm mb-1 text-gray-900 font-medium">
                      {testimonial.name}
                    </div>
                    <div className="text-xs text-gray-600">
                      {testimonial.role}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star 
                        key={i} 
                        className="h-4 w-4 fill-current text-yellow-500" 
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats section */}
        <div className="mt-20 text-center">
          <div className={`mindease-card p-12 max-w-4xl mx-auto backdrop-blur-md ${
            theme === 'light'
              ? 'bg-white/95 border-orange-200'
              : 'bg-white/95 border-gray-200'
          }`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group">
                <div className="text-3xl lg:text-4xl mb-2 text-gray-900 font-bold group-hover:scale-110 transition-transform duration-300 mindease-shimmer">
                  10,000+ <span className="text-yellow-600">✦</span>
                </div>
                <div className="text-sm text-gray-600">
                  Students Supported
                </div>
              </div>
              <div className="group">
                <div className="text-3xl lg:text-4xl mb-2 text-gray-900 font-bold group-hover:scale-110 transition-transform duration-300 mindease-shimmer">
                  4.8/5 <span className="text-yellow-600">✧</span>
                </div>
                <div className="text-sm text-gray-600">
                  Average Rating
                </div>
              </div>
              <div className="group">
                <div className="text-3xl lg:text-4xl mb-2 text-gray-900 font-bold group-hover:scale-110 transition-transform duration-300 mindease-shimmer">
                  95% <span className="text-yellow-600">✩</span>
                </div>
                <div className="text-sm text-gray-600">
                  Feel More Confident
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}