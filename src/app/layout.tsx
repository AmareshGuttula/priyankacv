import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Priyanka Palacholla | B.Tech CSE Portfolio",
  description:
    "Portfolio of Priyanka Durga Palacholla — Computer Science Engineering student, full stack developer, blockchain enthusiast, and Generative AI certified developer from GVP Visakhapatnam.",
  keywords: [
    "Priyanka Palacholla",
    "B.Tech CSE",
    "Full Stack Developer",
    "Blockchain Developer",
    "Generative AI",
    "React JS",
    "Python",
    "Java",
    "Portfolio",
  ],
  authors: [{ name: "Priyanka Durga Palacholla" }],
  openGraph: {
    title: "Priyanka Palacholla | B.Tech CSE Portfolio",
    description:
      "Explore the portfolio of Priyanka Palacholla — a passionate CSE student building the future with code, AI, and blockchain.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
