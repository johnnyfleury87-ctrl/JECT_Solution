import Hero from '@/components/Hero';
import Solutions from '@/components/Solutions';
import Signature from '@/components/Signature';
import WorkProcess from '@/components/WorkProcess';
import Projects from '@/components/Projects';
import Benefits from '@/components/Benefits';
import Pricing from '@/components/Pricing';
import ContactCTA from '@/components/ContactCTA';
import ImageCarousel from '@/components/ImageCarousel';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Solutions />
      <Signature />
      <WorkProcess />
      <Projects />
      <ImageCarousel />
      <Benefits />
      <Pricing />
      <ContactCTA />
    </>
  );
}
