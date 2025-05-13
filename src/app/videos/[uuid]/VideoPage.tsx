"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const VideoPage = () => {
  const params = useParams();
  const uuid = params?.uuid as string;
  const [video, setVideo] = useState<string | null>(null);

  const handleFetchVideo = async () => {
    try {
      const res = await fetch(`/api/get-video?uuid=${uuid}`);
      if (!res.ok) throw new Error("Video not found");
      const { url } = await res.json();
      console.log("Video URL:", url);
      setVideo(url);
    } catch (error) {
      console.error("Failed to fetch video:", error);
      setVideo(null);
    }
  };

  useEffect(() => {
    if (uuid) {
      handleFetchVideo();
    }
  }, [uuid]);

  if (!uuid) return <p>Ovaj video nije dostupan</p>;

  return video ? (
    <div className="flex bg-white flex-col items-center h-screen w-full justify-center">
      <video className="mt-4" width="600" controls preload="metadata">
        <source src={video} type="video/mp4" />
      </video>
    </div>
  ) : (
    <p>Ovaj video nije dostupan</p>
  );
};

export default VideoPage;
