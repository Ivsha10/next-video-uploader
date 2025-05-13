import { redirect } from "next/navigation";
import { createClient } from "../../../utils/supabase/server";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect("/protected/archive");
  }
  return (
    <div>
      <h1 className="text-2xl font-bold">Welcome to the Protected Page</h1>
      <p>You are successfully authenticated ✅</p>
    </div>
  );
}
