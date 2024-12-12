'use client';

import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();
  const isAdminPage = pathname?.includes('/admin');

  return (
    <div className="flex justify-around items-center pt-4">
      <Link className="text-2xl font-semibold" href="/">
        <h1 className="text-4xl font-black">
          Turnos<span className="text-xl">.AI</span>
        </h1>
      </Link>
      <div className="flex items-center gap-2 dark:text-gray-400 text-gray-600">
        {!isAdminPage && <Link href="/?admin=true">Admin</Link>}
        <ModeToggle />
      </div>
    </div>
  );
} 