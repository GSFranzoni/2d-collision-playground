import { useRef } from "react";

import type { Particle } from "@/core/particle";
import { World } from "@/core/world";
import { useAnimationFrame } from "@/hooks/use-animation-frame";

const PIXELS_PER_METER = 100;

function randomColor(): string {
  const hue = Math.floor(Math.random() * 360);

  return `hsl(${hue} 70% 60%)`;
}

type Props = {
  world: World;
};

export function Canvas({ world }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const colors = useRef(new Map<Particle, string>());

  const width = world.getWidth() * PIXELS_PER_METER;

  const height = world.getHeight() * PIXELS_PER_METER;

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
      const color = colors.current.get(particle) ?? randomColor();

      colors.current.set(particle, color);

      context.beginPath();

      const x = position.x * PIXELS_PER_METER;
      const y = position.y * PIXELS_PER_METER;
      const radius = particle.getRadius() * PIXELS_PER_METER;

      context.arc(x, y, radius, 0, Math.PI * 2);

      context.fillStyle = color;
      context.fill();
    }
  });

  return <canvas ref={canvasRef} width={width} height={height} />;
}
