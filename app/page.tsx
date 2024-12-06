import { ClientForm } from "@/components/forms/ClientForm";
import { ModeToggle } from "@/components/ModeToggle";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="flex justify-around items-center pt-4 py-20">
        <Link className="text-2xl font-semibold" href="/">Home</Link>
        <div className="flex items-center gap-2 dark:text-gray-400 text-gray-600">
          <Link href="/?admin=true"> Admin </Link>
          <ModeToggle />
        </div>
      </div>

      <ClientForm />
    </div>
  );
}
