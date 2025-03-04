"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { I18nextProvider } from "react-i18next";
import i18n from "@/lib/i18n";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Add client-side only rendering for i18n to prevent hydration mismatch
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Initialize i18n on the client side
    const savedLang = localStorage.getItem('i18nextLng');
    if (savedLang) {
      i18n.changeLanguage(savedLang);
    }
    setMounted(true);
  }, []);

  // Only render the actual content after client-side hydration is complete
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <title>BlockService - Finance & Web3 Services</title>
      </head>
      <body className={inter.className}>
        {mounted ? (
          <GoogleReCaptchaProvider
            reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
            scriptProps={{
              async: false,
              defer: false,
              appendTo: "head",
              nonce: undefined,
            }}
          >
            <I18nextProvider i18n={i18n}>
              {children}
              <Toaster />
            </I18nextProvider>
          </GoogleReCaptchaProvider>
        ) : (
          <div style={{ visibility: "hidden" }}>
            <div className="min-h-screen bg-gradient-to-b from-[#0B2447] to-[#19376D]"></div>
          </div>
        )}
      </body>
    </html>
  );
}