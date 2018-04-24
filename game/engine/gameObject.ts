interface GameObject {
  update();
  render();
  collider: Collider;
  onCollision(other: Collider);
  onTrigger(other: Collider);
}