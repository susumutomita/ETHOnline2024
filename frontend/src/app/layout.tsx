// layout.tsx

import "./globals.css";
import cx from "classnames";
import { sfPro, inter } from "./fonts";
import { Suspense } from "react";
import Navbar from "@/components/layout/navbar";
import { Web3Provider } from "@/components/Web3Provider";
import { FeedbackProvider } from "@/components/FeedbackForm/FeedbackContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cx(sfPro.variable, inter.variable)}>
        <div className="fixed h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-cyan-100" />
        <FeedbackProvider>
          <Web3Provider>
            <Suspense fallback="...">
              <Navbar />
            </Suspense>
            <main className="flex min-h-screen w-full flex-col items-center justify-center py-32">
              {children}
            </main>
          </Web3Provider>
        </FeedbackProvider>
      </body>
    </html>
  );
}
