'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Lock, Globe, Clock, Coins } from 'lucide-react';

const visionPoints = [
  {
    icon: Globe,
    title: 'Universal Access',
    description: 'Breaking down geographical barriers, DeFi enables 1.7B unbanked individuals to access financial services through just a smartphone and internet connection.',
  },
  {
    icon: Lock,
    title: 'True Transparency',
    description: 'Unlike traditional banking\'s opaque operations, DeFi protocols operate on public blockchains where every transaction is verifiable and auditable in real-time.',
  },
  {
    icon: Clock,
    title: 'Efficiency Redefined',
    description: 'Traditional cross-border payments take 3-5 business days and cost up to 7%. DeFi enables instant transfers at a fraction of the cost.',
  },
  {
    icon: Coins,
    title: 'Financial Innovation',
    description: 'Smart contracts enable programmable money and automated financial services, from flash loans to yield optimization, that weren\'t possible before.',
  },
];

export default function Vision() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B2447] mb-6">
            Revolutionizing Finance Through Decentralization
          </h2>
          <p className="text-lg text-gray-600">
            We envision a financial system that's open, transparent, and accessible to everyone. 
            Through blockchain technology, we're building the infrastructure for a more equitable 
            financial future.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {visionPoints.map((point, index) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6 h-full border-2 hover:border-[#A5D7E8] transition-all duration-300">
                <point.icon className="h-12 w-12 text-[#0B2447] mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-[#0B2447]">{point.title}</h3>
                <p className="text-gray-600">{point.description}</p>
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
            <h3 className="text-2xl font-bold mb-4">Our Role in the Future of Finance</h3>
            <p className="text-gray-200 mb-6">
              As blockchain technology matures, we're at the forefront of building secure, 
              scalable DeFi infrastructure. Our solutions bridge the gap between traditional 
              finance and the decentralized future, making advanced financial tools accessible 
              to businesses and individuals alike.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-[#A5D7E8] mb-2">$100B+</div>
                <div className="text-gray-300">Total Value Locked in DeFi</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#A5D7E8] mb-2">15x</div>
                <div className="text-gray-300">Lower Transaction Costs</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#A5D7E8] mb-2">24/7</div>
                <div className="text-gray-300">Market Accessibility</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}