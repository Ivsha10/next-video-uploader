"use client";
import React, { useState } from "react";
import { createClient } from "../../../utils/supabase/client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const signIn = async () => {
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    // ✅ Wait briefly before redirect so cookies are written
    if (error) return alert(error.message);

    setTimeout(() => {
      router.push("/protected/archive");
    }, 200);
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl mb-4">Prijava</h1>
      <input
        className="border  w-[300px] p-2 mb-4"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email Adresa"
      />
      <div className="flex flex-row ">
        <input
          className="border w-[300px] p-2 mb-4"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Sifra"
          type="password"
        />
      </div>

      <div className="flex flex-col justify-between ">
        <button
          className="bg-white w-[300px] text-black p-2 mb-4 hover:bg-amber-300 transition rounded cursor-pointer"
          onClick={signIn}
        >
          Prijavi se
        </button>
      </div>
    </div>
  );
}
