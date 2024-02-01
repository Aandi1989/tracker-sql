import "@radix-ui/themes/styles.css";
import "./theme-config.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Container, Theme, ThemePanel } from "@radix-ui/themes";
import "./globals.css";
import NavBar from "./NavBar";
import AuthProvider from "./auth/Provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
// шрифт не применился, хотя все сделано по примеру

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <Theme appearance="light" accentColor="violet">
          <AuthProvider>
            <NavBar />
            <main className="p-5">
              <Container>{children}</Container>
            </main>
          </AuthProvider>
        </Theme>
      </body>
    </html>
  );
}
