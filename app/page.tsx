import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { ProfileStructuredData } from "@/components/seo/ProfileStructuredData";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { RoseAssistant } from "@/components/ui/RoseAssistant";
import { Hero } from "@/components/sections/Hero";
import { Introduction } from "@/components/sections/Introduction";
import { About } from "@/components/sections/About";
import { ProfileDetails } from "@/components/sections/ProfileDetails";
import { BodyMeasurements } from "@/components/sections/BodyMeasurements";
import { DanceBookings } from "@/components/sections/DanceBookings";
import { Gallery } from "@/components/sections/Gallery";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <ProfileStructuredData />
      <Navigation />
      <main>
        <Hero />
        <Introduction />
        <About />
        <ProfileDetails />
        <BodyMeasurements />
        <DanceBookings />
        <Gallery />
        <Contact />
      </main>
      <Footer />
      <RoseAssistant />
      <FloatingWhatsApp />
    </>
  );
}
