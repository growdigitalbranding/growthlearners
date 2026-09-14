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
 * Section order follows the questions a buyer actually asks, in the order they
 * ask them, rather than the order the argument would prefer to make them:
 *
 *   what is this → what do I walk out with → what changed → why not a cheaper
 *   online course → is it for me → how does the month run → what will I make →
 *   who teaches it → does it work → then the detail: who directs, the tools,
 *   the portfolio, the full syllabus, the room, where it leads, the numbers →
 *   the honest caveats → the price → questions → ask
 *
 * "Is it for me" and the trust pair (who teaches it, does it work) used to sit
 * at screens 18, 26 and 28 of a 36-screen page. Nobody scrolls that far to
 * find out whether a course is for them. The price is answered twice: once in
 * the hero status line for the people who only want the number, and once in
 * full where it can be justified.
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
        <Audiences />
        <TheMonth />
        <Work />
        <Teachers />
        <Proof />
        <CreativeDirector />
        <Stack />
        <Portfolio />
        <Curriculum />
        <Classroom />
        <Careers />
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
