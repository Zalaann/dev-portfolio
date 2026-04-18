"use client";

import { Player } from "@remotion/player";
import {
  NOIR_DURATION,
  NOIR_FPS,
  NOIR_HEIGHT,
  NOIR_WIDTH,
  NoirHero,
} from "@/remotion/brutalist-noir/NoirHero";
import {
  NOIR_CHAPTER_DURATION,
  NOIR_CHAPTER_FPS,
  NOIR_CHAPTER_HEIGHT,
  NOIR_CHAPTER_WIDTH,
  NoirChapter,
} from "@/remotion/brutalist-noir/NoirChapter";
import { profile } from "@/content/portfolio";

export function NoirHeroPlayer() {
  return (
    <Player
      component={NoirHero}
      inputProps={{
        name: "Ibrahim Tariq",
        subtitle: profile.tagline,
      }}
      durationInFrames={NOIR_DURATION}
      fps={NOIR_FPS}
      compositionWidth={NOIR_WIDTH}
      compositionHeight={NOIR_HEIGHT}
      autoPlay
      loop
      acknowledgeRemotionLicense
      clickToPlay={false}
      style={{
        width: "100%",
        aspectRatio: `${NOIR_WIDTH} / ${NOIR_HEIGHT}`,
        border: "2px solid #f0ead6",
      }}
    />
  );
}

export function NoirChapterPlayer({
  roman,
  label,
  summary,
}: {
  roman: string;
  label: string;
  summary: string;
}) {
  return (
    <Player
      component={NoirChapter}
      inputProps={{ roman, label, summary }}
      durationInFrames={NOIR_CHAPTER_DURATION}
      fps={NOIR_CHAPTER_FPS}
      compositionWidth={NOIR_CHAPTER_WIDTH}
      compositionHeight={NOIR_CHAPTER_HEIGHT}
      autoPlay
      loop
      acknowledgeRemotionLicense
      clickToPlay={false}
      style={{
        width: "100%",
        aspectRatio: `${NOIR_CHAPTER_WIDTH} / ${NOIR_CHAPTER_HEIGHT}`,
      }}
    />
  );
}
