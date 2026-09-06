import { Navbar, Footer } from "@/components/layout";
import {
  Hero,
  StatsStrip,
  HowItWorks,
  Features,
  Architecture,
} from "@/components/landing";


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
