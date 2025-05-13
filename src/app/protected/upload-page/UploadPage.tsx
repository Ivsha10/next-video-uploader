"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [projectName, setProjectName] = useState<string>("");
  const router = useRouter();
  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    if (!projectName) {
      alert("Unesite ime projekta");
      return;
    }
    formData.append("file", file as Blob);
    try {
      const res = await fetch(`/api/upload?project=${projectName}`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        if (res.status === 401) {
          alert("Unesite korisničko ime i lozinku");
        }

        return;
      }

      router.push("/protected/archive");
    } catch (error) {
      console.log(error);
    }
  };

  const handleProjectName = (val: string) => {
    setProjectName(val.split(" ").join("_").toLowerCase());
  };

  return (
    <main className="p-8 text-center flex flex-col items-center">
      <h1 className="text-2xl mb-4">Dodaj Video</h1>

      <input
        className="border p-2 mb-4"
        type="text"
        placeholder="Project Name"
        value={projectName}
        onChange={(e) => handleProjectName(e.target.value)}
      />
      <input
        className="bg-white text-black p-2 rounded cursor-pointer hover:bg-amber-300"
        type="file"
        accept="video/mp4"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button
        className="bg-white text-black p-2 rounded cursor-pointer hover:bg-amber-300 mt-4"
        onClick={handleUpload}
      >
        Upload
      </button>
    </main>
  );
}
