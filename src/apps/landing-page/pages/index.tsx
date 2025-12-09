import { Box } from '@chakra-ui/react';
import Hero from '../../../components/landing-page/Hero';
import CompanyLogo from '../../../components/landing-page/CompanyLogo';
import PurposeSection from '../../../components/landing-page/PurposeSection';
import FeaturesSection from '../../../components/landing-page/FeaturesSection';
import ScheduleSection from '../../../components/landing-page/ScheduleSection';
import MonitorSection from '../../../components/landing-page/MonitorSection';
import PricingSection from '../../../components/landing-page/PricingSection';
import ServicesSection from '../../../components/landing-page/ServicesSection';
import TestimonialsSection from '../../../components/landing-page/TestimonialsSection';
import FAQ from '../../../components/landing-page/FAQ';
import NewsletterSection from '../../../components/landing-page/NewsletterSection';
import Footer from '../../../components/landing-page/Footer';
import ScrollToTop from '../../../components/landing-page/ScrollToTop';
import { Navbar } from '../Navbar';

export const LandingPage = () => {
  return (
    <Box>
      <Navbar />
      <section id="home">
        <Hero />
      </section>
      <section id="about">
        <CompanyLogo />
        <PurposeSection />
        <FeaturesSection />
      </section>
      <section id="services">
        <ScheduleSection />
        <MonitorSection />
        <PricingSection />
        <ServicesSection />
      </section>
      <section id="testimonials">
        <TestimonialsSection />
      </section>
      <section id="faq">
        <FAQ />
      </section>
      <section id="newsletter">
        <NewsletterSection />
      </section>
      <Footer />
      <ScrollToTop />
    </Box>
  );
};
