"use client";
import React, { useEffect, useState } from "react";

type Project = {
  name: string;
  uuid: string;
};

export default function ArchivePage() {
  const [projects, setProjects] = useState<Project[]>([]);

  const fetchVideoProjects = async () => {
    try {
      const res = await fetch(`/api/projects`);
      if (!res.ok) throw new Error("Failed to fetch projects");

      const data = await res.json();
      setProjects(data);
      console.log("Fetched projects:", data);
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  };

  const fetchQrCode = async (uuid: string) => {
    try {
      const res = await fetch(`/api/qr?uuid=${uuid}`);
      if (!res.ok) throw new Error("Failed to fetch QR");
      const blob = await res.blob();
      const imgUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = imgUrl;
      a.download = `${uuid}.png`;
      a.click();
      URL.revokeObjectURL(imgUrl);
    } catch (err) {
      console.error("Error fetching QR code:", err);
    }
  };

  useEffect(() => {
    fetchVideoProjects();
  }, []);
  if (!projects.length) {
    return (
      <div className="p-8 text-center flex flex-col items-center">
        Nema sacuvanih projekata.
      </div>
    );
  }
  return (
    <div className="p-8 text-center flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4"> Video Arhiva</h1>
      <table className="w-full">
        <thead>
          <tr>
            <th className="border px-4 py-2">Ime</th>
            <th className="border px-4 py-2">QR Code</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.uuid}>
              <td className="border px-4 py-2">{project.name}</td>
              <td className="border px-4 py-2">
                <span
                  onClick={() => fetchQrCode(project.uuid)}
                  className="cursor-pointer text-white font-semibold hover:text-amber-300"
                >
                  Preuzmi
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
