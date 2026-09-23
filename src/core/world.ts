import type { Particle } from "@/core/particle";
import { Vector2 } from "@/core/vector2";

export class World {
  private readonly particles: Particle[] = [];

  constructor(private gravity = new Vector2(0, 9.81)) {}

  addParticle(particle: Particle) {
    this.particles.push(particle);
  }

  update(dt: number) {
    for (const particle of this.particles) {
      const gravityForce = this.gravity.scale(particle.getMass());
      particle.applyForce(gravityForce);
      particle.update(dt);
    }
  }

  getParticles() {
    return this.particles;
  }
}
