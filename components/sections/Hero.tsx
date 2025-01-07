'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import ThreeBackground from '@/components/ThreeBackground';
import { useTranslation } from 'react-i18next';

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ThreeBackground />
      
      <div className="container relative z-10 mx-auto px-4 py-32 text-center">
        <motion.h1 
          className="text-4xl md:text-6xl font-bold text-white mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {t('hero.title')}
          <motion.span 
            className="block text-[#A5D7E8]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {t('hero.subtitle')}
          </motion.span>
        </motion.h1>

        <motion.p 
          className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          {t('hero.description')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <Button 
            size="lg"
            className="bg-gradient-to-r from-[#A5D7E8] to-white text-[#0B2447] hover:opacity-90 transition-all duration-300"
          >
            {t('hero.cta')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}