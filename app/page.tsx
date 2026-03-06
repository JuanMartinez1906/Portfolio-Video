import Navbar from "@/components/Navbar";
import Hero from "@/sections/Hero";
import Services from "@/sections/Services";
import Portfolio from "@/sections/Portfolio";
import Stats from "@/sections/Stats";
import About from "@/sections/About";
import SocialProof from "@/sections/SocialProof";
import Footer from "@/sections/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      <Portfolio />
      <Stats />
      <About />
      <SocialProof />
      <Footer />
    </main>
  );
}
