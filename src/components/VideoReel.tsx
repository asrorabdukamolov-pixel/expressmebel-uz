"use client";

import { useRef, useState } from "react";

/**
 * Vertical brand film in a phone-like frame. Nothing downloads but metadata until the
 * visitor presses play; the `#t=` fragment shows a chosen frame as the cover.
 */
export function VideoReel({ src, coverAt, label }: { src: string; coverAt: number; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const play = () => {
    const v = ref.current;
    if (!v) return;
    v.currentTime = 0;
    v.muted = false;
    v.controls = true;
    void v.play();
    setPlaying(true);
  };

  return (
    <div className="reel">
      <video ref={ref} src={`${src}#t=${coverAt}`} preload="metadata" playsInline aria-label={label} onEnded={() => setPlaying(false)} />
      {!playing && (
        <button type="button" className="reel-play" onClick={play} aria-label={label}>
          <span className="reel-btn" aria-hidden="true">▶</span>
          <span className="reel-label">{label}</span>
        </button>
      )}
    </div>
  );
}
