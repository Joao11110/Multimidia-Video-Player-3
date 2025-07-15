"use client"

import { truncateSync } from "node:fs";
import { useRef, useState } from "react";
import { FaBackward, FaForward, FaPause, FaPlay } from "react-icons/fa";

export default function Home() {
  const [playing, setPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const configCurrentTime = (time: number) => {
    const video = videoRef.current;
    if (!video) return;
    
    video.currentTime = time;
    setCurrentTime(time);
  }

  const playPause = () => {
    const video = videoRef.current;
    if (!video) return;
    if (playing) {
      video.pause();
    }
    else {
      video.play();
    }
    setPlaying(!playing);
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <head>
        <title>WebTV Player</title>
        <meta name="description" content="WebTV Player Simples" />
      </head>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">WebTV Player</h1>
        
        <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg overflow-hidden shadow-xl">
          {/* Vídeo Player */}
          <div className="relative pt-[56.25%]"> {/* 16:9 Aspect Ratio */}
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              src="./assets/video01.mp4"
              preload="metadata"
            />
          </div>

          {/* Controles */}
          <div className="p-4 bg-gray-700 flex justify-center items-center">
            <button
              onClick={playPause}
              className="p-3 rounded-full bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
              aria-label={playing ? "Pausar" : "Tocar"}
            >
              {playing ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}