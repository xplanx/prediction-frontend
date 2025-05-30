"use client";

import { Ring } from "ldrs/react";
import "ldrs/react/Ring.css";

type SpinnerProps = {
  size?: string;
  stroke?: string;
  speed?: string;
  color?: string;
};

export function Spinner({
  size = "35",
  stroke = "4",
  speed = "2",
  color = "#1d4ed8",
}: SpinnerProps) {
  return (
    <div className="flex h-full items-center justify-center">
      <Ring size={size} stroke={stroke} speed={speed} color={color} />
    </div>
  );
}
