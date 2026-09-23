import { useState } from "react";

import { Canvas } from "@/components/canvas";
import { Collision } from "@/core/collision";
import { Particle } from "@/core/particle";
import { Vector2 } from "@/core/vector2";
import { World } from "@/core/world";

function random(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

function addRandomParticle(world: World): void {
  const MAX_ATTEMPTS = 100;

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    const radius = random(0.1, 0.3);

    const mass = radius ** 2;

    const particle = new Particle(
      new Vector2(
        random(radius, world.getWidth() - radius),
        random(radius, world.getHeight() - radius),
      ),
      mass,
      radius,
    );

    const collides = world.getParticles().some((other) => Collision.check(particle, other));

    if (collides) {
      continue;
    }

    particle.setVelocity(new Vector2(random(-2, 2), random(-2, 2)));

    world.addParticle(particle);

    break;
  }
}

export function App() {
  const [world] = useState(() => {
    const gravity0 = new Vector2(0, 9.81);

    const world = new World(8, 8, gravity0);

    for (let i = 0; i < 50; i++) {
      addRandomParticle(world);
    }

    return world;
  });
  const [gravity, setGravity] = useState(() => world.getGravity().y);

  function updateGravity(metersPerSecondSquared: number): void {
    const currentGravity = world.getGravity();

    world.setGravity(new Vector2(currentGravity.x, metersPerSecondSquared));
    setGravity(metersPerSecondSquared);
  }

  return (
    <main className="bg-background px-edge py-page-padding text-foreground sm:p-page-padding relative grid min-h-svh place-items-center overflow-hidden">
      <div className="bg-ambient opacity-ambient pointer-events-none absolute inset-0" />
      <section className="max-w-layout gap-edge relative flex w-full flex-col items-center">
        <div className="max-w-canvas rounded-frame bg-frame shadow-simulation relative aspect-square w-full p-px">
          <div className="rounded-frame-inner border-border bg-secondary absolute inset-2 border" />
          <div className="rounded-frame-inner bg-card relative h-full w-full overflow-hidden [&>canvas]:block [&>canvas]:h-auto [&>canvas]:w-full">
            <Canvas world={world} />
          </div>
          <span className="top-edge left-edge rounded-pill border-border bg-secondary text-label tracking-label text-muted-foreground backdrop-blur-panel absolute border px-3 py-1 font-medium uppercase">
            {world.getParticles().length} particles
          </span>
          <div className="top-edge right-edge absolute z-10">
            <button
              className="rounded-pill border-border bg-secondary text-label tracking-label text-muted-foreground backdrop-blur-panel hover:border-primary hover:text-primary focus-visible:outline-ring border px-3 py-1 font-medium uppercase transition focus-visible:outline-2 focus-visible:outline-offset-2"
              type="button"
              popoverTarget="gravity-control"
              style={{ anchorName: "--gravity-trigger" }}
            >
              ↓ {gravity.toFixed(2)} m/s²
            </button>
            <div
              id="gravity-control"
              className="w-popover rounded-popover border-border bg-popover text-foreground shadow-popover backdrop-blur-panel border p-4"
              popover="auto"
              style={{ positionAnchor: "--gravity-trigger", positionArea: "bottom span-left" }}
            >
              <div className="mb-3 flex items-center justify-between">
                <label
                  className="text-label tracking-label text-muted-foreground font-medium uppercase"
                  htmlFor="gravity"
                >
                  Gravity
                </label>
                <output className="text-caption text-primary font-medium" htmlFor="gravity">
                  {gravity.toFixed(2)} m/s²
                </output>
              </div>
              <input
                id="gravity"
                className="h-slider accent-primary w-full cursor-pointer"
                type="range"
                min="0"
                max="20"
                step="0.01"
                value={gravity}
                onChange={(event) => updateGravity(event.currentTarget.valueAsNumber)}
              />
              <div className="text-label text-muted-foreground mt-2 flex justify-between">
                <span>0</span>
                <span>20 m/s²</span>
              </div>
            </div>
          </div>
        </div>

        <p className="text-caption text-muted-foreground text-center">
          Particles move, collide, and trade momentum in real time.
        </p>
      </section>
    </main>
  );
}
