'use client';

import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function LanguageToggle() {
  const { i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('i18nextLng', lang);
  };

  return (
    <div className="flex items-center space-x-1 bg-[#19376D]/50 rounded-full p-1">
      {['en', 'fr'].map((lang) => (
        <motion.div
          key={lang}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => changeLanguage(lang)}
            className={`
              relative px-4 py-1.5 rounded-full transition-all duration-300
              ${i18n.language === lang 
                ? 'text-[#A5D7E8] bg-[#0B2447] shadow-lg' 
                : 'text-gray-300 hover:text-[#A5D7E8]'
              }
            `}
          >
            {lang.toUpperCase()}
            {i18n.language === lang && (
              <motion.div
                layoutId="activeLanguage"
                className="absolute inset-0 bg-[#0B2447] rounded-full -z-10"
                transition={{ type: "spring", duration: 0.5 }}
              />
            )}
          </Button>
        </motion.div>
      ))}
    </div>
  );
}