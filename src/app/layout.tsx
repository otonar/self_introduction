import type { Metadata } from "next";
import { Noto_Sans_JP, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { profile } from "@/data/profile";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://aotosuzuki.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.nameEn} — ${profile.role}`,
    template: `%s | ${profile.nameEn}`,
  },
  description: profile.tagline,
  openGraph: {
    type: "website",
    siteName: profile.nameEn,
    title: `${profile.nameEn} — ${profile.role}`,
    description: profile.tagline,
    url: siteUrl,
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.nameEn} — ${profile.role}`,
    description: profile.tagline,
  },
  alternates: {
    canonical: siteUrl,
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && {
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
  }),
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: profile.nameEn,
  alternateName: profile.name,
  url: siteUrl,
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.nameEn,
  alternateName: profile.name,
  url: siteUrl,
  jobTitle: profile.role,
  description: profile.tagline,
  email: `mailto:${profile.email}`,
  knowsAbout: profile.skills,
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: profile.education.school,
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: profile.location,
  },
  sameAs: profile.sns.map((s) => s.url),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${notoSansJP.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-[var(--font-noto-sans-jp)]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Navbar />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
