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
    bio: "Passionate about building real automation systems that solve actual problems. Specializes in backend engineering, AI integration, and creating clean, resilient architectures.",
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
    <div className="min-h-screen bg-[#f7f6f2] text-[#18181b] font-sans flex flex-col dot-grid">
      <Navbar />

      <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 py-12 space-y-16">
        {/* Hero Section */}
        <section className="text-center space-y-3 max-w-3xl mx-auto pt-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border-2 border-[#18181b] text-xs font-mono text-[#18181b] shadow-[1.5px_1.5px_0px_#18181b]">
            <span>THE CREW</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#18181b] tracking-tight">
            Built by Pragmatic Engineers
          </h1>
          <p className="text-base sm:text-lg text-[#52525b] leading-relaxed">
            We are not building another toy chatbot. We built an autonomous backend engine that{" "}
            <strong className="text-[#dc2626]">kills one boring manual job</strong> — completely.
          </p>
        </section>

        {/* Team Cards Grid */}
        <section className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
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
        </section>

        {/* Story Section */}
        <section className="max-w-3xl mx-auto">
          <div className="dev-card bg-white p-6 sm:p-8 space-y-4">
            <h2 className="text-xl font-black text-[#18181b]">
              📖 The Real-World Problem We Solve
            </h2>
            <div className="space-y-3 text-sm text-[#52525b] leading-relaxed">
              <p>
                Every college, tech club, and student organization in India has organizers wasting hours every week manually sorting WhatsApp complaints, matching attendance rosters, drafting apology emails, and re-issuing lost certificates.
              </p>
              <p>
                <strong className="text-[#18181b]">AutoDesk Engine</strong> automates this workflow autonomously:
                a student submits a natural language request, Gemini AI parses the student&apos;s intent and validates attendance, Notion acts as the human-in-the-loop audit cockpit, and our mailer dispatches a verified certificate in seconds.
              </p>
              <p>
                Zero manual copying. Zero lost tickets. Full tamper-proof Notion audit trail.
              </p>
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="max-w-4xl mx-auto text-center space-y-6 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border-2 border-[#18181b] text-xs font-mono text-[#18181b] shadow-[1.5px_1.5px_0px_#18181b]">
            <span>TECHNOLOGY STACK</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#18181b]">
            Production Architecture
          </h2>
          <TechStack />
        </section>
      </main>

      <Footer />
    </div>
  );
}
