"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { I18nextProvider } from "react-i18next";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import i18n from "@/lib/i18n";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <title>BlockService - Finance & Web3 Services</title>
      </head>
      <body className={inter.className}>
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
      </body>
    </html>
  );
}
