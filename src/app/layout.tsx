import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "./components/Providers";
import "./globals.css";
import { Footer } from "./components/shared/Footer";
import { Header } from "./components/shared/Header";
import { AuthProvider } from "./components/providers/AuthProvider";
import { LayoutWrapper } from "./components/layouts/LayoutWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Book-it",
  description: "Generated by Book-it",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <AuthProvider>
          <Providers>
            <LayoutWrapper header={<Header />} footer={<Footer />}>
              {children}
            </LayoutWrapper>
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
