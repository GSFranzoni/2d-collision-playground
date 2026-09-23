import { useState } from "react";

import { Canvas } from "@/components/canvas";
import { Particle } from "@/core/particle";
import { Vector2 } from "@/core/vector2";
import { World } from "@/core/world";

export function App() {
  const [world] = useState(() => {
    const world = new World(new Vector2(0, 9.81));

    world.addParticle(new Particle(new Vector2(2, 1), 1, 0.1));

    return world;
  });

  return (
    <main className="flex h-svh w-svw items-center justify-center">
      <Canvas world={world} />
    </main>
  );
}
