import Header from '@/components/Header';
import Hero from '@/components/sections/Hero';
import ProofStrip from '@/components/sections/ProofStrip';
import Pillars from '@/components/sections/Pillars';
import Comparison from '@/components/sections/Comparison';
import TheMonth from '@/components/sections/TheMonth';
import Work from '@/components/sections/Work';
import CreativeDirector from '@/components/sections/CreativeDirector';
import Stack from '@/components/sections/Stack';
import Portfolio from '@/components/sections/Portfolio';
import Curriculum from '@/components/sections/Curriculum';
import Audiences from '@/components/sections/Audiences';
import Classroom from '@/components/sections/Classroom';
import Careers from '@/components/sections/Careers';
import Numbers from '@/components/sections/Numbers';
import Outcomes from '@/components/sections/Outcomes';
import Teachers from '@/components/sections/Teachers';
import Proof from '@/components/sections/Proof';
import Fee from '@/components/sections/Fee';
import Faq from '@/components/sections/Faq';
import FinalCta from '@/components/sections/FinalCta';
import Footer from '@/components/sections/Footer';
import StickyCta from '@/components/ui/StickyCta';

/**
 * Section order follows the argument, not the feature list:
 *
 *   hook → what changed → why not the others → how the month runs →
 *   what you'll make → who directs it → the tools → what you keep →
 *   the syllabus in full → who it's for → why a room → where it leads →
 *   the numbers → the honest bit → who teaches → proof → price → questions → ask
 */
export default function Page() {
  return (
    <>
      <a href="#why-ai" className="skip-link">
        Skip to the course
      </a>
      <Header />
      <main id="main">
        <Hero />
        <ProofStrip />
        <Pillars />
        <Comparison />
        <TheMonth />
        <Work />
        <CreativeDirector />
        <Stack />
        <Portfolio />
        <Curriculum />
        <Audiences />
        <Classroom />
        <Careers />
        <Numbers />
        <Outcomes />
        <Teachers />
        <Proof />
        <Fee />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <StickyCta />
    </>
  );
}
