import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/providers/theme.provider";
import { I18nProvider } from "@/providers/i18n.provider";
import { siteConfig } from "@/config/site";
import { getDictionary } from "@/features/i18n/dictionaries";
import "@/styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const desc =
    (siteConfig.description as Record<string, string>)[locale as "en" | "ar"] ??
    (siteConfig.description as Record<string, string>)["en"];
  return {
    title: {
      default: siteConfig.name,
      template: `%s | ${siteConfig.name}`,
    },
    description: desc,
  };
}

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppFloat } from "@/components/ui/whatsapp-float";
import { AuthGuard } from "@/components/auth/auth-guard";

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const messages = await getDictionary(locale as 'en' | 'ar');
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <I18nProvider locale={locale} messages={messages}>
            <AuthGuard>
              <Header />
              <main className="min-h-screen pt-20">
                {children}
              </main>
              <Footer />
              <WhatsAppFloat />
            </AuthGuard>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
