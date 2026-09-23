import { Collision } from "@/core/collision";
import type { Particle } from "@/core/particle";
import { Vector2 } from "@/core/vector2";

export class World {
  private readonly particles: Particle[] = [];

  constructor(
    readonly width: number,
    readonly height: number,
    readonly gravity = new Vector2(0, 9.81),
  ) {}

  addParticle(particle: Particle) {
    this.particles.push(particle);
  }

  update(dt: number) {
    for (const particle of this.particles) {
      particle.applyForce(this.gravity.scale(particle.getMass()));
    }

    for (const particle of this.particles) {
      particle.update(dt);
      Collision.resolveWorldBounds(particle, this.width, this.height);
    }

    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const a = this.particles[i];
        const b = this.particles[j];
        if (Collision.check(a, b)) {
          Collision.resolve(a, b);
        }
      }
    }
  }

  getParticles() {
    return this.particles;
  }
}
