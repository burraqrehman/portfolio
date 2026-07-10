import { motion } from 'framer-motion';
import { useScrollProgress } from '@/hooks/useScrollAnimation';

export const ScrollProgress = () => {
  const scrollProgress = useScrollProgress();

  return (
    <>
      {/* Top Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary z-50 origin-left"
        style={{
          scaleX: scrollProgress / 100,
        }}
        initial={{ scaleX: 0 }}
      />

      {/* Scroll Indicator Circle */}
      <motion.div
        className="fixed right-8 bottom-8 z-50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: scrollProgress > 5 ? 1 : 0,
          scale: scrollProgress > 5 ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative w-16 h-16">
          {/* Background Circle */}
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              className="text-border"
            />
            {/* Progress Circle */}
            <motion.circle
              cx="32"
              cy="32"
              r="28"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              className="text-primary"
              strokeDasharray={176}
              strokeDashoffset={176 - (176 * scrollProgress) / 100}
              strokeLinecap="round"
            />
          </svg>

          {/* Percentage Text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-bold text-foreground">
              {Math.round(scrollProgress)}%
            </span>
          </div>
        </div>
      </motion.div>
    </>
  );
};
