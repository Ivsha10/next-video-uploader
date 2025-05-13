import { redirect } from "next/navigation";
import { createClient } from "../../../utils/supabase/server";
import LoginPage from "./LoginPage";

export default async function page() {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect("/protected/archive");
  }

  return <LoginPage />;
}
