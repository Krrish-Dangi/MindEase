import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const motivationalQuotes = [
  "You are braver than you believe, stronger than you seem, and smarter than you think.",
  "Mental health is not a destination, but a process. It's about how you drive, not where you're going.",
  "It's okay to not be okay. What's important is that you're taking steps to feel better.",
  "Your current situation is not your final destination. Better days are coming.",
  "Healing is not linear. Be patient with yourself.",
  "You don't have to be positive all the time. It's perfectly okay to feel sad, angry, annoyed, frustrated, or anxious.",
  "Take time to make your soul happy.",
  "Your mental health is a priority. Your happiness is essential. Your self-care is a necessity.",
  "Progress, not perfection.",
  "You are enough, just as you are."
];

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [currentQuote] = useState(() => {
    return motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 4000); // Show splash for 4 seconds

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
        style={{ background: 'var(--mindease-gradient-full)' }}
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        {/* Enhanced star field background */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 100 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-white/30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                fontSize: `${0.4 + Math.random() * 1.2}rem`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 1, 0.2],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 4 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            >
              ✦
            </motion.div>
          ))}
        </div>

        {/* Constellation patterns */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-yellow-300/50"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
                fontSize: `${0.6 + Math.random() * 0.8}rem`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.9, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            >
              ✧
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <div className="relative z-10 text-center px-8 max-w-4xl">
          {/* Company Name */}
          <motion.h1
            className="text-6xl md:text-8xl font-bold text-white mb-6 relative"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            MindEase
            <motion.span
              className="absolute -top-4 -right-4 text-yellow-300"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              ✦
            </motion.span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            className="text-2xl md:text-3xl text-white/90 mb-8 font-medium"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          >
            Your Mental Health Matters ✧
          </motion.p>

          {/* Motivational Quote */}
          <motion.blockquote
            className="text-lg md:text-xl text-white/80 italic max-w-2xl mx-auto leading-relaxed mb-8"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 1, ease: "easeOut" }}
          >
            "{currentQuote}"
          </motion.blockquote>

          {/* Loading indicator with stars */}
          <motion.div
            className="flex justify-center items-center space-x-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="text-2xl text-yellow-300"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              >
                ✦
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Radial gradient overlay for depth */}
        <motion.div
          className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        />
      </motion.div>
    </AnimatePresence>
  );
}