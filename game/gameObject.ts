import { Collider } from "./collider";

export interface GameObject {
  update(): void;
  render(): void;
  collider: Collider;
  onCollision(other: Collider): void;
  onTrigger(other: Collider): void;
}