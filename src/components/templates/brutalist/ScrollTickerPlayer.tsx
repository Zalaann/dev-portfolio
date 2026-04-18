"use client";

import { useEffect, useRef } from "react";
import { Player, type PlayerRef } from "@remotion/player";
import {
  SCROLL_TICKER_DURATION,
  SCROLL_TICKER_FPS,
  SCROLL_TICKER_HEIGHT,
  SCROLL_TICKER_WIDTH,
  ScrollTicker,
} from "@/remotion/brutalist/ScrollTicker";

export function ScrollTickerPlayer() {
  const ref = useRef<PlayerRef>(null);

  useEffect(() => {
    let rafId = 0;
    const update = () => {
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const progress = Math.max(0, Math.min(1, window.scrollY / max));
      const frame = Math.round(progress * (SCROLL_TICKER_DURATION - 1));
      ref.current?.seekTo(frame);
    };
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-50" style={{ height: 72 }}>
      <Player
        ref={ref}
        component={ScrollTicker}
        durationInFrames={SCROLL_TICKER_DURATION}
        fps={SCROLL_TICKER_FPS}
        compositionWidth={SCROLL_TICKER_WIDTH}
        compositionHeight={SCROLL_TICKER_HEIGHT}
        acknowledgeRemotionLicense
        clickToPlay={false}
        style={{ width: "100%", height: "100%", display: "block" }}
      />
    </div>
  );
}
