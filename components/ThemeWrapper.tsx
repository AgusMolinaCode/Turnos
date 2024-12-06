'use client';

import { useEffect, useState } from "react";
import { useTheme } from "@/components/theme-provider";

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render a fallback while the theme is being loaded
    return <div className="min-h-screen w-full bg-white dark:bg-slate-950"></div>;
  }

  return (
    <div className={`relative min-h-screen w-full ${theme === 'dark' ? 'bg-slate-950' : 'bg-white'}`}>
      <div className={`pointer-events-none absolute inset-0 ${theme === 'dark' ? 'bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]' : 'bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]'}`}></div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}