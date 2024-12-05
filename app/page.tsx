import { ClientForm } from "@/components/forms/ClientForm";
import { ModeToggle } from "@/components/ModeToggle";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="flex justify-around mt-4">
        <h1 className="text-2xl font-roboto">Menu</h1>
        <div className="flex items-center gap-2 text-gray-400 hover:text-white duration-200">
          <Link href="/?admin=true"> Admin </Link>
          <ModeToggle />
        </div>
      </div>

      <ClientForm />
    </div>
  );
}
