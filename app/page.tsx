import { ClientForm } from "@/components/forms/ClientForm";
import {PasskeyModal} from "@/components/PassKeyModal";


export default function Home({searchParams}: SearchParamProps) {

  const isAdmin = searchParams.admin === 'true';

  return (
    <div className="px-2 py-10">
      {isAdmin && <PasskeyModal />}
      <ClientForm />
    </div>
  );
}
