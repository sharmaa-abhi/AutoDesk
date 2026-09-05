import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "AutoDesk Engine — Kill One Boring Job. Completely.",
  description:
    "An autonomous backend automation service that eliminates repetitive manual tasks. Built for hackathons — Notion as the human control center, AI-powered classification, real-world actions.",
  keywords: [
    "automation",
    "notion",
    "hackathon",
    "AI",
    "certificate",
    "college",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[var(--bg-canvas)] text-[var(--text-primary)] transition-colors duration-200">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

