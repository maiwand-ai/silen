import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Industries } from "@/components/sections/Industries";
import { PackageBuilder } from "@/components/sections/PackageBuilder";
import { Portfolio } from "@/components/sections/Portfolio";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";
import { Showcase } from "@/components/sections/Showcase";
import { SocialStudio } from "@/components/sections/SocialStudio";
import { Tiers } from "@/components/sections/Tiers";
import { WhyChoose } from "@/components/sections/WhyChoose";

export function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Showcase />
      <BeforeAfter />
      <Portfolio />
      <SocialStudio />
      <Process />
      <WhyChoose />
      <Industries />
      <Tiers />
      <PackageBuilder />
      <Contact />
    </>
  );
}
