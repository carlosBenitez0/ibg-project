import type { Metadata } from "next";
import { Geist,  Lato,  Playfair_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Iglesia Bautista Getsemaní",
  description: "La Iglesia Bautista Getsemaní (IBG) es una iglesia cristiana evangélica que se encuentra en El Salvador y es parte de la misión bautista.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${playfairDisplay.variable} ${lato.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
