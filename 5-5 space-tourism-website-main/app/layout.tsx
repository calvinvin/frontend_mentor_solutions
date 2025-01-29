/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Metadata } from "next";
import "@/ui/globals.css";

export const metadata: Metadata = {
  title: {
    template: '%s | Space Tour',
    default: 'Space Tour',
  },
  description: "Start a nice space travel.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        {children}
      </body>
    </html>
  );
}
