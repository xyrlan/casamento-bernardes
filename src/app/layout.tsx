import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, EB_Garamond, Pinyon_Script } from "next/font/google";
import "./globals.css";

const display = Bodoni_Moda({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-display",
});
const texto = EB_Garamond({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-texto",
});
const script = Pinyon_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
});

export const metadata: Metadata = {
  title: "Pedro & Erica · Maia Bernardes",
  description:
    "Pedro e Erica: o primeiro beijo em 10 de julho de 2016 e o casamento sete anos depois, no mesmo dia. Uma noite mágica ao som de Frank Sinatra.",
};

export const viewport: Viewport = {
  themeColor: "#1c1418",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${texto.variable} ${script.variable}`}>
      <body className="font-texto">{children}</body>
    </html>
  );
}
