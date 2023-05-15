import { Space_Mono } from "next/font/google";
import "./globals.css";

const space_mono = Space_Mono({
  display: "swap",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Clima-GPT",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={space_mono.className}>{children}</body>
    </html>
  );
}
