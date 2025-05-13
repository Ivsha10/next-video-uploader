"use client";
import Link from "next/link";
import React from "react";
import { createClient } from "../../../utils/supabase/client";
import { useRouter } from "next/navigation";
const Header = () => {
  const supabase = createClient();
  const router = useRouter();
  return (
    <div className="flex justify-between w-full p-4 ">
      <div className="flex justify-between w-1/4 ">
        <Link href="/protected/archive">
          <button className="bg-white text-black transition  p-2 mb-4 cursor-pointer rounded hover:bg-amber-300">
            Projekti
          </button>
        </Link>
        <Link href="/protected/upload-page">
          <button className="bg-white text-black transition  p-2 mb-4 cursor-pointer rounded hover:bg-amber-300">
            Dodaj Video
          </button>
        </Link>
      </div>
      <button
        className="bg-red-500 text-white p-2 mb-4 cursor-pointer rounded hover:bg-red-700"
        onClick={async () => {
          // Add your sign-out logic here
          await supabase.auth.signOut();
          router.push("/");
        }}
      >
        Sign Out
      </button>
    </div>
  );
};

export default Header;
