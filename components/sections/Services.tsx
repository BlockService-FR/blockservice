'use client';

import { motion } from 'framer-motion';
import { Code2, Shield, Brain, LineChart, Boxes, Network } from 'lucide-react';
import { Card } from '@/components/ui/card';

const services = [
  {
    title: 'Smart Contracts',
    description: 'Secure and efficient smart contract development for DeFi and Web3 applications',
    icon: Code2,
  },
  {
    title: 'Security Audits',
    description: 'Comprehensive security analysis and vulnerability assessment',
    icon: Shield,
  },
  {
    title: 'Consulting',
    description: 'Strategic blockchain and fintech consulting for businesses',
    icon: Brain,
  },
  {
    title: 'Trading Systems',
    description: 'High-performance trading infrastructure and algorithms',
    icon: LineChart,
  },
  {
    title: 'DeFi Solutions',
    description: 'Custom DeFi protocol development and integration',
    icon: Boxes,
  },
  {
    title: 'Blockchain',
    description: 'Enterprise blockchain solutions and infrastructure',
    icon: Network,
  },
];

export default function Services() {
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
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B2447] mb-4">Our Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Comprehensive blockchain and fintech solutions tailored to your needs</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6 h-full hover:shadow-lg transition-shadow duration-300 border-2 hover:border-[#A5D7E8]">
                <service.icon className="h-12 w-12 text-[#0B2447] mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-[#0B2447]">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}