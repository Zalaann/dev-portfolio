"use client";

import { Player } from "@remotion/player";
import {
  BRUTALIST_DURATION,
  BRUTALIST_FPS,
  BRUTALIST_HEIGHT,
  BRUTALIST_WIDTH,
  BrutalistHero,
} from "@/remotion/brutalist/BrutalistHero";
import { profile, experience, projects } from "@/content/portfolio";

export function BrutalistHeroPlayer() {
  const kaye = experience[0];
  const heroProjects = projects.map((p) => ({
    name: p.name,
    stack: p.stack.slice(0, 4).join(" · "),
  }));

  return (
    <Player
      component={BrutalistHero}
      inputProps={{
        name: profile.name,
        role: "Software Engineer",
        location: profile.location,
        employer: kaye?.company ?? "Kaye MacKenzie",
        employerRole: kaye?.role ?? "Intern Software Engineer",
        employerPeriod: kaye?.period ?? "2025 — Present",
        projects: heroProjects,
      }}
      durationInFrames={BRUTALIST_DURATION}
      fps={BRUTALIST_FPS}
      compositionWidth={BRUTALIST_WIDTH}
      compositionHeight={BRUTALIST_HEIGHT}
      autoPlay
      loop
      acknowledgeRemotionLicense
      clickToPlay={false}
      style={{
        width: "100%",
        aspectRatio: `${BRUTALIST_WIDTH} / ${BRUTALIST_HEIGHT}`,
        border: "3px solid #000",
      }}
    />
  );
}
