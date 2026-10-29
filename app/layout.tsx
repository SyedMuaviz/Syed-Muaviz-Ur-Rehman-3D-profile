import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Syed Muaviz ur Rehman | AI Safety & ML Theory Researcher",
  description:
    "Portfolio of Syed Muaviz ur Rehman, a computer science graduate researching LLM agent alignment, AI evaluation and the geometry of generalization.",
  keywords: [
    "Syed Muaviz ur Rehman",
    "AI Safety",
    "Alignment",
    "ML Theory",
    "LLM Agent Alignment",
    "Red-Teaming",
    "Evaluation",
    "Cayley Graph",
    "Generalization Geometry",
    "Thal University",
    "Honhaar Scholar",
  ],
  authors: [{ name: "Syed Muaviz ur Rehman" }],
  openGraph: {
    title: "Syed Muaviz ur Rehman | AI Safety & ML Theory Researcher",
    description:
      "Portfolio of Syed Muaviz ur Rehman, a computer science graduate researching LLM agent alignment, AI evaluation and the geometry of generalization.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Syed Muaviz ur Rehman | AI Safety & ML Theory Researcher",
    description:
      "Portfolio of Syed Muaviz ur Rehman, a computer science graduate researching LLM agent alignment, AI evaluation and the geometry of generalization.",
  },
};

const jsonLdPerson = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Syed Muaviz ur Rehman",
  jobTitle: "AI Safety & Machine Learning Theory Researcher",
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "Thal University",
  },
  knowsAbout: [
    "AI Safety",
    "LLM Agent Alignment",
    "AI Evaluation & Red-Teaming",
    "Machine Learning Theory",
    "Group Theory & Optimization",
    "Cloud Machine Learning",
  ],
  description:
    "Computer Science graduate researching LLM agent alignment, AI evaluation and the geometry of generalization.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
        />
        <meta name="theme-color" content="#071013" />
      </head>
      <body className="bg-[#070F13] text-[#BAC7D5] antialiased selection:bg-[#39FF14]/20 selection:text-[#39FF14]" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
