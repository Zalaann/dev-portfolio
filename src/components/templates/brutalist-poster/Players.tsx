"use client";

import { Player } from "@remotion/player";
import {
  POSTER_DURATION,
  POSTER_FPS,
  POSTER_HEIGHT,
  POSTER_WIDTH,
  PosterHero,
} from "@/remotion/brutalist-poster/PosterHero";
import {
  POSTER_STAMP_DURATION,
  POSTER_STAMP_FPS,
  POSTER_STAMP_SIZE,
  PosterStamp,
} from "@/remotion/brutalist-poster/PosterStamp";

export function PosterHeroPlayer() {
  return (
    <Player
      component={PosterHero}
      inputProps={{
        headline: ["Ibrahim", "Tariq", "ships."],
        role: "Software engineer · Manchester",
        date: "04 · 2026",
      }}
      durationInFrames={POSTER_DURATION}
      fps={POSTER_FPS}
      compositionWidth={POSTER_WIDTH}
      compositionHeight={POSTER_HEIGHT}
      autoPlay
      loop
      acknowledgeRemotionLicense
      clickToPlay={false}
      style={{
        width: "100%",
        aspectRatio: `${POSTER_WIDTH} / ${POSTER_HEIGHT}`,
        border: "3px solid #0f0f0f",
      }}
    />
  );
}

export function PosterStampPlayer() {
  return (
    <Player
      component={PosterStamp}
      inputProps={{
        aroundText: "IBRAHIM TARIQ · PORTFOLIO · MMXXVI · IBRAHIM TARIQ · PORTFOLIO · MMXXVI · ",
        center: "APPROVED",
        subtext: "IT · CERT №01",
      }}
      durationInFrames={POSTER_STAMP_DURATION}
      fps={POSTER_STAMP_FPS}
      compositionWidth={POSTER_STAMP_SIZE}
      compositionHeight={POSTER_STAMP_SIZE}
      autoPlay
      loop
      acknowledgeRemotionLicense
      clickToPlay={false}
      style={{ width: "100%", aspectRatio: "1 / 1" }}
    />
  );
}
