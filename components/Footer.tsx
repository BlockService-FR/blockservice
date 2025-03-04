'use client';

import { Blocks } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

export default function Footer() {
  const { t } = useTranslation();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Return null on server-side and first render
  }

  return (
    <footer className="bg-[#0B2447] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Blocks className="h-6 w-6 text-[#A5D7E8]" />
              <span className="text-lg font-bold">BlockService</span>
            </div>
            <p className="text-gray-300">Building the future of finance and Web3 technology.</p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('services.title')}</h3>
            <ul className="space-y-2 text-gray-300">
              <li>{t('services.items.smartContracts.title')}</li>
              <li>{t('services.items.defi.title')}</li>
              <li>{t('services.items.security.title')}</li>
              <li>{t('services.items.consulting.title')}</li>
            </ul>
          </div>
          
          <div>
            
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('contact.title')}</h3>
            <ul className="space-y-2 text-gray-300">
              <li>mikael.ribas@blockservice.fr</li>
              <li>+33 6 27 52 89 08</li>
              <li>France</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} BlockService. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}