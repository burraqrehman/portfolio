import { motion } from "framer-motion";

interface SectionSeparatorProps {
  className?: string;
}

export const SectionSeparator = ({ className = "" }: SectionSeparatorProps) => {
  return (
    <motion.div
      className={`section-separator ${className}`}
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      viewport={{ once: true }}
    />
  );
};
