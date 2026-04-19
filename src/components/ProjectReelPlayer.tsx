"use client";

import { Player } from "@remotion/player";
import {
  REEL_FPS,
  REEL_HEIGHT,
  REEL_WIDTH,
  ProjectReel,
  getReelDuration,
  type ReelProject,
} from "@/remotion/ProjectReel";

export function ProjectReelPlayer({ projects }: { projects: readonly ReelProject[] }) {
  return (
    <Player
      component={ProjectReel}
      inputProps={{ projects }}
      durationInFrames={getReelDuration(projects.length)}
      fps={REEL_FPS}
      compositionWidth={REEL_WIDTH}
      compositionHeight={REEL_HEIGHT}
      autoPlay
      loop
      acknowledgeRemotionLicense
      clickToPlay={false}
      style={{
        width: "100%",
        aspectRatio: `${REEL_WIDTH} / ${REEL_HEIGHT}`,
        border: "3px solid #ff0000",
      }}
    />
  );
}
