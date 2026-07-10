import { useEffect, useState, RefObject } from 'react';
import { useInView } from 'react-intersection-observer';
import { useScroll, useTransform, MotionValue } from 'framer-motion';

export const useScrollAnimation = (threshold = 0.1) => {
  const { ref, inView } = useInView({
    threshold,
    triggerOnce: true,
  });

  return { ref, inView };
};

export const useScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / scrollHeight) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress();

    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return scrollProgress;
};

/**
 * GPU-accelerated parallax hook using Framer Motion.
 * Returns MotionValues for different depth layers — no React state re-renders.
 * Attach to decorative/background elements only.
 */
export const useSectionParallax = (ref: RefObject<HTMLElement>) => {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Different speed layers for depth illusion
  const slow = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const medium = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const fast = useTransform(scrollYProgress, [0, 1], [180, -180]);
  const reverse = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return { scrollYProgress, slow, medium, fast, reverse, opacity };
};
