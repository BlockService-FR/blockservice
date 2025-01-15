'use client';

import { motion } from 'framer-motion';
import { Code2, Shield, Brain, LineChart, Boxes, Network } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';

const services = [
  {
    key: 'smartContracts',
    icon: Code2,
  },
  {
    key: 'security',
    icon: Shield,
  },
  {
    key: 'consulting',
    icon: Brain,
  },
  {
    key: 'trading',
    icon: LineChart,
  },
  {
    key: 'defi',
    icon: Boxes,
  },
  {
    key: 'blockchain',
    icon: Network,
  },
];

export default function Services() {
  const { t } = useTranslation();

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B2447] mb-4">{t('services.title')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{t('services.description')}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6 h-full hover:shadow-lg transition-shadow duration-300 border-2 hover:border-[#A5D7E8]">
                <service.icon className="h-12 w-12 text-[#0B2447] mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-[#0B2447]">
                  {t(`services.items.${service.key}.title`)}
                </h3>
                <p className="text-gray-600">
                  {t(`services.items.${service.key}.description`)}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}