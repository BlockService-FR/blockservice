'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

const projects = [
  {
    title: 'rabbit',
    image: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=600',
    category: 'DeFi',
    tech: ['Solidity', 'React', 'TypeScript', 'Python'],
  },
  {
    title: 'cointips',
    image: 'CoinTips.png',
    category: 'Web3',
    tech: ['Angular', 'PostgreSQL', 'NestJS'],
  },
  {
    title: 'spinh',
    image: 'SPINH.png',
    category: 'Finance',
    tech: ['Angular', 'Oracle', 'JavaEE'],
  },
];

export default function ProjectShowcase() {
  const [filter, setFilter] = useState('all');
  const { t } = useTranslation();

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category.toLowerCase() === filter.toLowerCase());

  return (
    <section id="projects" className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B2447] mb-4">{t('projects.title')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">{t('projects.description')}</p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {['all', 'defi', 'web3', 'finance'].map((category) => (
              <Button
                key={category}
                variant={filter === category ? 'default' : 'outline'}
                onClick={() => setFilter(category)}
                className={filter === category ? 'bg-[#0B2447]' : ''}
              >
                {t(`projects.categories.${category}`)}
              </Button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="h-full"
            >
              <Card className="flex flex-col h-full overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative pt-[56.25%]">
                  <img
                    src={project.image}
                    alt={t(`projects.items.${project.title}.title`)}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col flex-grow p-6">
                  <h3 className="text-xl font-semibold text-[#0B2447] mb-2">
                    {t(`projects.items.${project.title}.title`)}
                  </h3>
                  <p className="text-gray-600 mb-4 flex-grow">
                    {t(`projects.items.${project.title}.description`)}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gray-100 text-sm text-gray-600 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}