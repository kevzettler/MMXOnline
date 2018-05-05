import { Collider, CollideData } from "./collider";

export interface GameObject {
  preUpdate(): void;
  update(): void;
  render(x: number, y: number): void;
  collider: Collider;
  onCollision(other: CollideData): void;
}