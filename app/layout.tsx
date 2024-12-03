import type { Metadata } from "next";
import { Roboto, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const roboto = Roboto({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "700", "900"],
  style: "italic",
});

// const bebasNeue = Bebas_Neue({
//   subsets: ["latin"],
//   display: "swap",
//   weight: ["400", "700"], // Ajusta los pesos según lo necesario
//   style: "normal", // Bebas Neue no tiene estilo itálico
// });

export const metadata: Metadata = {
  title: "Turnos",
  description: "Registrate y pedí tu turno",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${roboto.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}