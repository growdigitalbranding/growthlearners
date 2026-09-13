import Header from '@/components/Header';
import Hero from '@/components/sections/Hero';
import ProofStrip from '@/components/sections/ProofStrip';
import Problem from '@/components/sections/Problem';
import TheMonth from '@/components/sections/TheMonth';
import Curriculum from '@/components/sections/Curriculum';
import Stack from '@/components/sections/Stack';
import Numbers from '@/components/sections/Numbers';
import Outcomes from '@/components/sections/Outcomes';
import Fee from '@/components/sections/Fee';
import Faq from '@/components/sections/Faq';
import FinalCta from '@/components/sections/FinalCta';
import Footer from '@/components/sections/Footer';
import StickyCta from '@/components/ui/StickyCta';

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProofStrip />
        <Problem />
        <TheMonth />
        <Curriculum />
        <Stack />
        <Numbers />
        <Outcomes />
        <Fee />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <StickyCta />
    </>
  );
}
