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
 *   online course → is it for me and where does it lead → how does the month
 *   run → what will I make → who teaches it → does it work → then the detail:
 *   who directs, the portfolio, the full syllabus, the tools, the room, the
 *   numbers → the honest caveats → the price → questions → ask
 *
 * "Is it for me" and the trust pair (who teaches it, does it work) used to sit
 * at screens 18, 26 and 28 of a 36-screen page. Nobody scrolls that far to
 * find out whether a course is for them. The price is answered twice: once in
 * the hero status line for the people who only want the number, and once in
 * full where it can be justified.
 *
 * Two arrangement rules the order is also serving:
 *
 *   1. The reader is segmented once. "Who this is for" and "where this goes
 *      next" were separate sections asking the same question twenty screens
 *      apart; they are now one section (Careers) at screen four, which is
 *      where somebody is still deciding whether to keep reading.
 *   2. The three "the tool is not the skill" beats — Pillars, CreativeDirector
 *      and Stack — are spread rather than stacked. Stack used to run directly
 *      after CreativeDirector, so the page made the same argument twice in a
 *      row and sounded like it was insisting.
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
        <Careers />
        <TheMonth />
        <Work />
        <Teachers />
        <Proof />
        <CreativeDirector />
        <Portfolio />
        <Curriculum />
        <Stack />
        <Classroom />
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
