import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import Architecture from "@/components/Architecture";
import StatsStrip from "@/components/StatsStrip";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex-1">
      <Navbar />
      <Hero />
      <StatsStrip />
      <HowItWorks />
      <Features />
      <Architecture />
      <Footer />
    </main>
  );
}
