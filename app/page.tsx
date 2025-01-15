import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import Vision from '@/components/sections/Vision';
import ProjectShowcase from '@/components/sections/ProjectShowcase';
import ContactSection from '@/components/sections/ContactSection';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0B2447] to-[#19376D]">
      <Navbar />
      <Hero />
      <Services />
      <ProjectShowcase />
      <Vision />
      <ContactSection />
      <Footer />
    </main>
  );
}