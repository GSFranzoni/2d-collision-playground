import { useRef } from "react";

import { World } from "@/core/world";
import { useAnimationFrame } from "@/hooks/use-animation-frame";

const PIXELS_PER_METER = 100;

type Props = {
  world: World;
  width?: number;
  height?: number;
};

export function Canvas({ world, width = 800, height = 600 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useAnimationFrame((dt) => {
    world.update(dt);

    const canvas = canvasRef.current;

    const context = canvas?.getContext("2d");

    if (!canvas || !context) {
      return;
    }

    context.clearRect(0, 0, width, height);

    for (const particle of world.getParticles()) {
      const position = particle.getPosition();

      context.beginPath();

      const x = position.x * PIXELS_PER_METER;
      const y = position.y * PIXELS_PER_METER;
      const radius = particle.getRadius() * PIXELS_PER_METER;

      context.arc(x, y, radius, 0, Math.PI * 2);
      context.fill();
    }
  });

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="rounded-2xl border border-gray-400"
    />
  );
}
