import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Task Management App",
  description:
    "A simple task management application built with Next.js and MongoDB",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="container mx-auto py-8 px-4">
          <header className="mb-6">
            <h1 className="text-3xl font-bold text-center">Task Management</h1>
          </header>
          {children}
        </main>
      </body>
    </html>
  );
}
