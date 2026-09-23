import { useState } from "react";

import { Canvas } from "@/components/canvas";
import { Particle } from "@/core/particle";
import { Vector2 } from "@/core/vector2";
import { World } from "@/core/world";

export function App() {
  const [world] = useState(() => {
    const world = new World(10, 6, new Vector2(0, 9.81));

    const a = new Particle(new Vector2(2, 2), 1, 0.25);

    a.setVelocity(new Vector2(2, 0));

    const b = new Particle(new Vector2(4, 2.3), 1, 0.25);

    b.setVelocity(new Vector2(0, 0));

    world.addParticle(a);
    world.addParticle(b);

    return world;
  });

  return (
    <main className="flex h-svh w-svw items-center justify-center">
      <section className="rounded-2xl border border-gray-500">
        <Canvas world={world} />
      </section>
    </main>
  );
}
