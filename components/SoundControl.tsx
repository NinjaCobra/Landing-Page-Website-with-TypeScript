"use client";
import { Volume2, VolumeOff } from "lucide-react";
import { ProgressSound } from "./Progress";
import { useAudio } from "@/store";

export default function SoundControl() {
  const { volume, isMute, toggleMute, setVolume } = useAudio();

  async function handleIconClick() {
    toggleMute();
    if (volume <= 0) setVolume(50);
  }
  return (
    <div className="flex items-center gap-3">
      {isMute ? (
        <VolumeOff
          onClick={handleIconClick}
          className="cursor-pointer pr-1 hover:opacity-80"
        />
      ) : (
        <Volume2
          onClick={handleIconClick}
          className="cursor-pointer pr-1 hover:opacity-80"
        />
      )}
      <ProgressSound className={`${isMute && "opacity-80"}`} />
      <span className={`font-semiBold ml-1 w-8 ${isMute && "opacity-80"}`}>
        {Math.ceil(volume)}%
      </span>
    </div>
  );
}
