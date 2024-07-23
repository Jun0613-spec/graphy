import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";

import { auth } from "@/auth";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryProvider } from "@/components/query-provider";
import Modals from "@/components/modals";

import { Toaster } from "@/components/ui/sonner";
import SubscriptionAlert from "@/components/subscription/subscription-alert";

const font = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Graphy",
  description: "Graphic design application",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={font.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <QueryProvider>
              <Toaster />
              <Modals />
              <SubscriptionAlert />
              {children}
            </QueryProvider>
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
