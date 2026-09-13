import Header from '@/components/Header';
import Hero from '@/components/sections/Hero';
import ProofStrip from '@/components/sections/ProofStrip';
import Problem from '@/components/sections/Problem';
import TheMonth from '@/components/sections/TheMonth';
import Curriculum from '@/components/sections/Curriculum';
import Stack from '@/components/sections/Stack';
import Numbers from '@/components/sections/Numbers';
import Outcomes from '@/components/sections/Outcomes';
import Proof from '@/components/sections/Proof';
import Fee from '@/components/sections/Fee';
import Faq from '@/components/sections/Faq';
import FinalCta from '@/components/sections/FinalCta';
import Footer from '@/components/sections/Footer';
import StickyCta from '@/components/ui/StickyCta';

export default function Page() {
  return (
    <>
      {/* First tab stop. The header is fixed and the nav is five links deep,
          so without this a keyboard user tabs the whole thing every visit. */}
      <a href="#the-month" className="skip-link">
        Skip to the course
      </a>
      <Header />
      <main id="main">
        <Hero />
        <ProofStrip />
        <Problem />
        <TheMonth />
        <Curriculum />
        <Stack />
        <Numbers />
        <Outcomes />
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
