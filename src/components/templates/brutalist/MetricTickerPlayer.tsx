"use client";

import { Player } from "@remotion/player";
import {
  METRIC_DURATION,
  METRIC_FPS,
  METRIC_HEIGHT,
  METRIC_WIDTH,
  MetricTicker,
} from "@/remotion/brutalist/MetricTicker";

type Props = {
  targetValue: number;
  suffix: string;
  label: string;
  sublabel: string;
};

export function MetricTickerPlayer(props: Props) {
  return (
    <Player
      component={MetricTicker}
      inputProps={props}
      durationInFrames={METRIC_DURATION}
      fps={METRIC_FPS}
      compositionWidth={METRIC_WIDTH}
      compositionHeight={METRIC_HEIGHT}
      autoPlay
      loop
      acknowledgeRemotionLicense
      clickToPlay={false}
      style={{
        width: "100%",
        aspectRatio: `${METRIC_WIDTH} / ${METRIC_HEIGHT}`,
      }}
    />
  );
}
