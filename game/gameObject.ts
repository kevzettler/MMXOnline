import { Collider } from "./collider";

export interface GameObject {
  preUpdate(): void;
  update(): void;
  render(x: number, y: number): void;
  collider: Collider;
  onCollision(other: Collider): void;
  onTrigger(other: Collider): void;
}