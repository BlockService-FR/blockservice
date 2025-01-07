'use client';

import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';

export default function LanguageToggle() {
  const { i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('i18nextLng', lang);
  };

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => changeLanguage('en')}
        className={`text-gray-200 hover:text-[#A5D7E8] transition-colors duration-300 ${
          i18n.language === 'en' ? 'text-[#A5D7E8]' : ''
        }`}
      >
        EN
      </Button>
      <span className="text-gray-400">|</span>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => changeLanguage('fr')}
        className={`text-gray-200 hover:text-[#A5D7E8] transition-colors duration-300 ${
          i18n.language === 'fr' ? 'text-[#A5D7E8]' : ''
        }`}
      >
        FR
      </Button>
      <Languages className="h-4 w-4 text-gray-200" />
    </div>
  );
}