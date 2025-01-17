'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Lock, Globe, Clock, Coins } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const visionPoints = [
  {
    key: 'access',
    icon: Globe,
  },
  {
    key: 'transparency',
    icon: Lock,
  },
  {
    key: 'efficiency',
    icon: Clock,
  },
  {
    key: 'innovation',
    icon: Coins,
  },
];

export default function Vision() {
  const { t } = useTranslation();

  return (
    <section id="vision" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B2447] mb-6">
            {t('vision.title')}
          </h2>
          <p className="text-lg text-gray-600">
            {t('vision.description')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {visionPoints.map((point, index) => (
            <motion.div
              key={point.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6 h-full border-2 hover:border-[#A5D7E8] transition-all duration-300">
                <point.icon className="h-12 w-12 text-[#0B2447] mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-[#0B2447]">
                  {t(`vision.points.${point.key}.title`)}
                </h3>
                <p className="text-gray-600">
                  {t(`vision.points.${point.key}.description`)}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#0B2447] text-white rounded-lg p-8 md:p-12"
        >
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">{t('vision.future.title')}</h3>
            <p className="text-gray-200 mb-6">{t('vision.future.description')}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-[#A5D7E8] mb-2">
                  {t('vision.future.stats.tvl.value')}
                </div>
                <div className="text-gray-300">
                  {t('vision.future.stats.tvl.label')}
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#A5D7E8] mb-2">
                  {t('vision.future.stats.costs.value')}
                </div>
                <div className="text-gray-300">
                  {t('vision.future.stats.costs.label')}
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#A5D7E8] mb-2">
                  {t('vision.future.stats.access.value')}
                </div>
                <div className="text-gray-300">
                  {t('vision.future.stats.access.label')}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}