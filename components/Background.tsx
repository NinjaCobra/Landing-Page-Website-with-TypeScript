"use client";

import { useRef, useEffect } from "react";
import YouTube from "react-youtube";
import { useAudio } from "../store";

export default function Background({
  videoId = "L_LUpnjgPso",
}: {
  videoId?: string;
}) {
  const playerRef = useRef<YouTube>(null);
  const { isMute, volume } = useAudio();

  // Force play when player is ready
  const onReady = (event: { target: any }) => {
    // Store player reference
    const player = event.target;

    // Ensure video plays
    player.playVideo();

    // Set initial mute state and volume
    if (isMute) {
      player.mute();
    } else {
      player.unMute();
      player.setVolume(volume);
    }
  };

  useEffect(() => {
    // Ensure the internal player is available before interacting with it
    const player = playerRef.current?.getInternalPlayer();

    if (player) {
      if (isMute) {
        player.mute();
      } else {
        player.unMute();
        player.setVolume(volume);
      }
      console.log("Updated video settings: mute =", isMute, "volume =", volume);
    }
  }, [isMute, volume]);

  const opts = {
    height: "100%",
    width: "100%",
    host: "https://www.youtube-nocookie.com",
    playerVars: {
      autoplay: 1,
      enablejsapi: 1,
      controls: 0,
      disablekb: 1,
      fs: 0,
      iv_load_policy: 3,
      playlist: videoId,
      loop: 1,
      modestbranding: 1,
      playsinline: 1,
      rel: 0,
      showinfo: 0,
      cc_load_policy: 3, // Disables captions
      origin: window.location.origin, // Specifies the origin for improved security
      widget_referrer: window.location.href, // Specifies the referrer
      color: "white", // Use a white progress bar (less conspicuous)
      hl: "en", // Set the player language to English
    },
  };

  return (
    <div className="pointer-events-none absolute left-0 top-0 h-full w-full overflow-hidden">
      <YouTube
        videoId={videoId}
        opts={opts}
        onReady={onReady}
        ref={playerRef}
        className="absolute left-1/2 top-1/2 h-[56.25vw] min-h-full min-w-full max-w-none -translate-x-1/2 -translate-y-1/2 object-cover"
        onPlay={() => {
          console.log("Video started playing");
        }}
        onPause={() => {
          // If video pauses, try to resume
          const player = playerRef.current?.getInternalPlayer();
          if (player) {
            player.playVideo();
          }
        }}
      />
    </div>
  );
}
