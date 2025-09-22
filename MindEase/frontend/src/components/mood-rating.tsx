import { useState } from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../contexts/theme-context';
import { SoundEffects } from './sound-effects';

interface MoodRatingProps {
  onMoodSelect: (mood: number) => void;
  selectedMood: number | null;
}

export function MoodRating({ onMoodSelect, selectedMood }: MoodRatingProps) {
  const [hoveredMood, setHoveredMood] = useState<number | null>(null);
  const { theme } = useTheme();

  const moodEmojis = ['😢', '😟', '😐', '🙂', '😃'];
  const moodLabels = [
    'Very Low',
    'Low', 
    'Okay',
    'Good',
    'Excellent'
  ];

  const getRatingColor = (index: number) => {
    if (index === 0) return '#f87171'; // red-400
    if (index === 1) return '#fb923c'; // orange-400  
    if (index === 2) return '#fbbf24'; // amber-400
    if (index === 3) return '#4ade80'; // green-400
    if (index === 4) return '#22c55e'; // green-500
    return '#d1d5db'; // gray-300
  };

  const handleMoodSelect = (mood: number) => {
    SoundEffects.playClick();
    onMoodSelect(mood);
  };

  const handleMouseEnter = (mood: number) => {
    setHoveredMood(mood);
  };

  const handleMouseLeave = () => {
    setHoveredMood(null);
  };

  const getDisplayText = () => {
    if (hoveredMood !== null) {
      return `You're feeling ${moodLabels[hoveredMood].toLowerCase()} today`;
    }
    if (selectedMood !== null) {
      return `You're feeling ${moodLabels[selectedMood].toLowerCase()} today`;
    }
    return "Select a mood and note it down for the day! ✦";
  };

  return (
    <div className="space-y-6">
      {/* Emoji Rating */}
      <div>
        <h4 className={`text-sm font-medium mb-4 ${
          theme === 'light' ? 'text-gray-800' : 'text-white'
        }`}>How are you feeling today?</h4>
        <div className="flex items-center justify-center space-x-4">
          {moodEmojis.map((emoji, index) => (
            <motion.button
              key={index}
              onClick={() => handleMoodSelect(index)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              className={`text-4xl p-3 rounded-2xl transition-all duration-300 hover:scale-110 ${
                selectedMood === index 
                  ? theme === 'light'
                    ? 'bg-orange-100/30 ring-2 ring-orange-400' 
                    : 'bg-blue-100/20 ring-2 ring-blue-400'
                  : theme === 'light'
                    ? 'hover:bg-orange-100/20'
                    : 'hover:bg-gray-100/10'
              }`}
              title={moodLabels[index]}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {emoji}
            </motion.button>
          ))}
        </div>
        
        {/* Always visible description */}
        <p className={`text-sm mt-3 text-center min-h-[1.25rem] ${
          theme === 'light' ? 'text-gray-700' : 'text-gray-300'
        }`}>
          {getDisplayText()}
        </p>
      </div>

      {/* Star Rating Alternative */}
      <div className={`pt-4 border-t ${
        theme === 'light' ? 'border-orange-200' : 'border-gray-700'
      }`}>
        <h4 className={`text-sm font-medium mb-4 ${
          theme === 'light' ? 'text-gray-800' : 'text-white'
        }`}>Rate your overall mood (1-5)</h4>
        <div className="flex items-center justify-center space-x-2">
          {[1, 2, 3, 4, 5].map((rating) => (
            <motion.button
              key={rating}
              onClick={() => handleMoodSelect(rating - 1)}
              onMouseEnter={() => handleMouseEnter(rating - 1)}
              onMouseLeave={handleMouseLeave}
              className="group relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <div 
                className={`w-8 h-8 rounded-full transition-all duration-300 ${
                  (selectedMood !== null && rating <= selectedMood + 1) || 
                  (hoveredMood !== null && rating <= hoveredMood + 1)
                    ? 'opacity-100 scale-110' 
                    : 'opacity-30 hover:opacity-60'
                }`}
                style={{ 
                  background: (selectedMood !== null && rating <= selectedMood + 1) || 
                               (hoveredMood !== null && rating <= hoveredMood + 1)
                    ? getRatingColor(rating - 1)
                    : theme === 'light'
                      ? 'linear-gradient(135deg, #EE600F 0%, #f97316 50%, #fb923c 100%)'
                      : '#d1d5db'
                }}
              />
              <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
                {rating}
              </span>
            </motion.button>
          ))}
        </div>
        <div className={`flex justify-between text-xs mt-2 ${
          theme === 'light' ? 'text-gray-600' : 'text-gray-400'
        }`}>
          <span>Low</span>
          <span>High</span>
        </div>
      </div>
    </div>
  );
}