'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useTranslation } from 'react-i18next';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const { toast } = useToast();
  const { t } = useTranslation();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      service: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    if (!executeRecaptcha) {
      toast({
        title: 'Error',
        description: 'ReCAPTCHA not loaded. Please try again.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const recaptchaToken = await executeRecaptcha('contact_form');
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          recaptchaToken,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: 'Message sent!',
          description: "We'll get back to you soon.",
        });
        form.reset();
      } else {
        throw new Error(result.error || 'Failed to send message');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B2447] mb-4">{t('contact.title')}</h2>
            <p className="text-gray-600">{t('contact.description')}</p>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Input
                placeholder={t('contact.form.name.placeholder')}
                {...form.register('name')}
                className="w-full"
              />
              {form.formState.errors.name && (
                <p className="text-red-500 text-sm mt-1">{t('contact.form.name.error')}</p>
              )}
            </div>

            <div>
              <Input
                type="email"
                placeholder={t('contact.form.email.placeholder')}
                {...form.register('email')}
                className="w-full"
              />
              {form.formState.errors.email && (
                <p className="text-red-500 text-sm mt-1">{t('contact.form.email.error')}</p>
              )}
            </div>

            <div>
              <select
                {...form.register('service')}
                className="w-full rounded-md border border-input bg-background px-3 py-2"
              >
                <option value="">{t('contact.form.service.placeholder')}</option>
                <option value="smart-contracts">{t('contact.form.service.options.smartContracts')}</option>
                <option value="defi">{t('contact.form.service.options.defi')}</option>
                <option value="consulting">{t('contact.form.service.options.consulting')}</option>
                <option value="security">{t('contact.form.service.options.security')}</option>
              </select>
              {form.formState.errors.service && (
                <p className="text-red-500 text-sm mt-1">{t('contact.form.service.error')}</p>
              )}
            </div>

            <div>
              <Textarea
                placeholder={t('contact.form.message.placeholder')}
                {...form.register('message')}
                className="w-full min-h-[150px]"
              />
              {form.formState.errors.message && (
                <p className="text-red-500 text-sm mt-1">{t('contact.form.message.error')}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-[#0B2447] hover:bg-[#19376D]"
              disabled={isSubmitting}
            >
              {isSubmitting ? t('contact.form.submit.sending') : t('contact.form.submit.label')}
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}