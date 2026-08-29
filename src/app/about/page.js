import Navbar from "@/components/Navbar";
import TeamCard from "@/components/TeamCard";
import TechStack from "@/components/TechStack";
import Footer from "@/components/Footer";

export const metadata = {
  title: "About — AutoDesk Engine",
  description: "Meet the team behind AutoDesk Engine and explore our tech stack.",
};

const teamMembers = [
  {
    name: "Abhishek Sharma",
    role: "Full-Stack Developer & System Architect",
    bio: "Passionate about building real automation systems that solve actual problems. Specializes in backend engineering, AI integration, and creating pixel-perfect interfaces.",
    links: {
      github: "https://github.com",
      linkedin: "https://www.linkedin.com/in/abhishek-sharma-88876b389/",
    },
  },
  {
    name: "Akash Gautam",
    role: "Full-Stack Developer & AI Systems Engineer",
    bio: "Dedicated to building high-performance autonomous pipelines, intelligent human-in-the-loop workflows, and seamless user experiences.",
    links: {
      github: "https://github.com",
      linkedin: "https://www.linkedin.com/in/akash-gautam-07664230a/",
    },
  },
];

export default function AboutPage() {
  return (
    <main className="flex-1 dot-grid">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Orbs */}
        <div className="orb orb-amber w-[300px] h-[300px] -top-10 -right-20 animate-float-slow" />
        <div className="orb orb-violet w-[250px] h-[250px] bottom-0 -left-20 animate-pulse-glow" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="text-xs font-mono text-amber-accent bg-amber-accent/10 px-3 py-1 rounded-full border border-amber-accent/20">
            THE TEAM
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gold mt-4 mb-4 text-glow-gold">
            Built by Builders
          </h1>
          <p className="text-text-secondary text-lg max-w-xl mx-auto">
            We're not building a dashboard. We're building an engine that{" "}
            <span className="text-cyan-accent font-semibold">kills one boring job</span>{" "}
            — completely.
          </p>
        </div>
      </section>

      {/* Team Cards */}
      <section className="relative px-6 pb-20">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
          {teamMembers.map((member, i) => (
            <TeamCard
              key={member.name}
              name={member.name}
              role={member.role}
              bio={member.bio}
              links={member.links}
              delay={i * 0.15}
            />
          ))}
        </div>
      </section>

      {/* Our Story */}
      <section className="relative px-6 pb-20">
        <div className="max-w-3xl mx-auto">
          <div className="p-8 rounded-xl bg-panel border border-border-subtle">
            <h2 className="text-2xl font-bold text-gold mb-4">📖 The Problem We're Solving</h2>
            <div className="space-y-4 text-text-secondary text-sm leading-relaxed">
              <p>
                Every college, club, and small organization in India has people doing the same boring tasks every week —
                manually sorting WhatsApp requests, copying form submissions into spreadsheets, drafting follow-up messages,
                fixing lost attendance records.
              </p>
              <p>
                <span className="text-amber-accent font-semibold">AutoDesk Engine</span> automates one of these jobs
                completely. A student submits a complaint like{" "}
                <span className="text-cyan-accent italic">
                  "Sir I attended AI workshop but didn't receive certificate"
                </span>{" "}
                — and the system takes over: AI classifies the request, creates a Notion entry, waits for human approval,
                then generates a PDF certificate and sends it via email.
              </p>
              <p>
                No manual copying. No lost requests. No typing{" "}
                <code className="text-gold bg-gold/10 px-1.5 py-0.5 rounded-md text-xs font-mono">python app.py</code>{" "}
                — the system runs 24/7 on its own.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="relative px-6 pb-28">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-mono text-cyan-accent bg-cyan-accent/10 px-3 py-1 rounded-full border border-cyan-accent/20">
            TECH STACK
          </span>
          <h2 className="text-3xl font-black text-gold mt-4 mb-8">
            Powered By
          </h2>
          <TechStack />
        </div>
      </section>

      <Footer />
    </main>
  );
}
