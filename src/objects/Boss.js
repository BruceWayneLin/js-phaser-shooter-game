import Entity from './entity';
import EnemyLaser from './EnemyLaser';

export default class Boss extends Entity {
  constructor(scene, x, y, hp, { minVelocity, maxVelocity }) {
    super(scene, x, y, 'boss', 'Boss');
    this.setData('value', 100);
    this.hp = hp;
    this.startingX = x;

    this.shootTimer = this.scene.time.addEvent({
      delay: 500,
      callback: () => {
        this.scene.enemyLasers.add(new EnemyLaser(this.scene, this.x - 5, this.y, 200, 50).setAngle(-4));
        this.scene.enemyLasers.add(new EnemyLaser(this.scene, this.x - 5, this.y, 200, 80).setAngle(-8));
        this.scene.enemyLasers.add(new EnemyLaser(this.scene, this.x, this.y));
        this.scene.enemyLasers.add(new EnemyLaser(this.scene, this.x + 5, this.y, 200, -50).setAngle(4));
        this.scene.enemyLasers.add(new EnemyLaser(this.scene, this.x + 5, this.y, 200, -80).setAngle(8));
      },
      callbackScope: this,
      loop: true,
    });
  }

  onDestroy() {
    if (this.shootTimer !== undefined) {
      if (this.shootTimer) {
        this.shootTimer.remove(false);
      }
    }
  }

  update() {
    if (!this.getData('isDead')) {
      if (this.body.x < this.startingX + 50) {
        this.body.velocity.x += 1;
      } else {
        this.body.velocity.x -= 30;
      }

      if (this.body.y < this.startingX + 50) {
        this.body.velocity.y += 1;
      } else {
        this.body.velocity.y -= 30;
      }
    }
  }

  hitDead() {
    if (this.hp === 0) {
      this.explode(true);
      return true;
    }
    this.hp -= 1;
    return false;
  }
}