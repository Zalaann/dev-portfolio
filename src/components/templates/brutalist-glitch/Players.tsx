"use client";

import { Player } from "@remotion/player";
import {
  GLITCH_DURATION,
  GLITCH_FPS,
  GLITCH_HEIGHT,
  GLITCH_WIDTH,
  GlitchHero,
} from "@/remotion/brutalist-glitch/GlitchHero";
import {
  GLITCH_TICKER_DURATION,
  GLITCH_TICKER_FPS,
  GLITCH_TICKER_HEIGHT,
  GLITCH_TICKER_WIDTH,
  GlitchTicker,
} from "@/remotion/brutalist-glitch/GlitchTicker";

export function GlitchHeroPlayer({ name, role }: { name: string; role: string }) {
  return (
    <Player
      component={GlitchHero}
      inputProps={{ name, role }}
      durationInFrames={GLITCH_DURATION}
      fps={GLITCH_FPS}
      compositionWidth={GLITCH_WIDTH}
      compositionHeight={GLITCH_HEIGHT}
      autoPlay
      loop
      acknowledgeRemotionLicense
      clickToPlay={false}
      style={{
        width: "100%",
        aspectRatio: `${GLITCH_WIDTH} / ${GLITCH_HEIGHT}`,
        border: "3px solid #000",
      }}
    />
  );
}

export function GlitchTickerPlayer() {
  return (
    <Player
      component={GlitchTicker}
      durationInFrames={GLITCH_TICKER_DURATION}
      fps={GLITCH_TICKER_FPS}
      compositionWidth={GLITCH_TICKER_WIDTH}
      compositionHeight={GLITCH_TICKER_HEIGHT}
      autoPlay
      loop
      acknowledgeRemotionLicense
      clickToPlay={false}
      style={{
        width: "100%",
        aspectRatio: `${GLITCH_TICKER_WIDTH} / ${GLITCH_TICKER_HEIGHT}`,
      }}
    />
  );
}
