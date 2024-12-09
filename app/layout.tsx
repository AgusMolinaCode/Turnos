import type { Metadata } from "next";
import { Roboto, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import ThemeWrapper from "@/components/ThemeWrapper";
import Link from "next/link";
import { ModeToggle } from "@/components/ModeToggle";

const roboto = Roboto({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "700", "900"],
  style: "italic",
});

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
      <body className={`${roboto.className} antialiased relative`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ThemeWrapper>
            <div className="flex justify-around items-center pt-4">
              <Link className="text-2xl font-semibold" href="/">
                <h1 className="text-4xl font-black">
                  Turnos<span className="text-xl">.AI</span>
                </h1>
              </Link>
              <div className="flex items-center gap-2 dark:text-gray-400 text-gray-600">
                <Link href="/?admin=true"> Admin </Link>
                <ModeToggle />
              </div>
            </div>
            {children}
          </ThemeWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
