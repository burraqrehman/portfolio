import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export const SectionSeparatorEnhanced = () => {
  const { ref, inView } = useScrollAnimation(0.5);

  return (
    <div ref={ref} className="relative h-24 flex items-center justify-center overflow-hidden">
      {/* Animated Line */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={inView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="relative w-full max-w-md h-px bg-gradient-to-r from-transparent via-border to-transparent"
      >
        {/* Center Dot */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5, type: "spring", stiffness: 300 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary shadow-lg shadow-primary/50"
        />

        {/* Side Dots */}
        {[-1, 1].map((direction, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{
              duration: 0.4,
              delay: 0.6 + index * 0.1,
              type: "spring",
              stiffness: 300
            }}
            className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary/50"
            style={{
              [direction > 0 ? 'right' : 'left']: '25%'
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};
