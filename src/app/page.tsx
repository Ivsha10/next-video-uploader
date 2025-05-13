// app/page.tsx
import { redirect } from "next/navigation";
import { createClient } from "../../utils/supabase/server";
import Link from "next/link";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    console.log("Session found:", session);
    redirect("/protected/archive");
  }

  return (
    <div className="flex flex-col  items-center h-screen">
      <div className="flex flex-row justify-end w-full p-4 ">
        <Link href={"/login"}>
          <button className="bg-white text-black transition  p-2 mb-4 cursor-pointer rounded hover:bg-amber-300">
            Prijava
          </button>
        </Link>
      </div>
      <h1 className="text-2xl font-bold">Dobrodosao u video menadzer</h1>
    </div>
  );
}
