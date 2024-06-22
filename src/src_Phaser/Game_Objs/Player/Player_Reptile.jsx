import Phaser from "phaser";
import { Hans } from "../NPC/NPC LVL1/Hans.jsx";
import { Skeleton } from "../NPC/NPC LVL1/Skeleton.jsx";
import { Dragon } from "../NPC/NPC LVL1/Dragon.jsx";

export class Reptile extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, frames) {
    super(scene, x, y, texture, frames);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.playeHealth = 1000;
    this.currentAnim = null;
  }

  createAnimations(scene) {
    scene.anims.create({
      key: "reptile_Idle",
      frames: scene.anims.generateFrameNumbers("reptile_Idle", {
        start: 0,
        end: 4,
      }),
      frameRate: 6,
      repeat: -1,
    });

    scene.anims.create({
      key: "reptile_Walk",
      frames: scene.anims.generateFrameNumbers("reptile_Walk", {
        start: 0,
        end: 8,
      }),
      frameRate: 9,
      repeat: -1,
    });

    scene.anims.create({
      key: "reptile_Jump",
      frames: scene.anims.generateFrameNumbers("reptile_Jump", {
        start: 0,
        end: 4,
      }),
      frameRate: 5,
      repeat: 0,
    });
  }

  handleAnimations(keys, cursors) {
    const onGround = this.body.blocked.down || this.body.touching.down;
    const shiftPressed = cursors.shift.isDown;

    if (cursors.space.isDown && onGround) {
      this.body.setVelocityY(-560);
      if (this.currentAnim !== "reptile_Jump") {
        this.anims.play("reptile_Jump");
        this.currentAnim = "reptile_Jump";
      }
    } else if (keys[0].isDown) {
      this.body.setVelocityX(shiftPressed ? -250 : -100);

      if (onGround && this.currentAnim !== "reptile_Walk") {
        this.anims.play("reptile_Walk", true);
        this.currentAnim = "reptile_Walk";
      }

      this.flipX = true;
    } else if (keys[1].isDown) {
      this.body.setVelocityX(shiftPressed ? 250 : 100);
      if (onGround && this.currentAnim !== "reptile_Walk") {
        this.anims.play("reptile_Walk", true);
        this.currentAnim = "reptile_Walk";
      }

      this.flipX = false;
    } else if (keys[0].isUp && keys[1].isUp) {
      this.body.setVelocityX(0);

      if (onGround && this.currentAnim !== "reptile_Idle") {
        this.anims.play("reptile_Idle");
        this.currentAnim = "reptile_Idle";
      }
    }
  }

  handlePlayerHit(e1, e2, e3, livesText, posX, posY, playerHealth) {

    playerHealth = this.playerHealth;
    if (e1 instanceof Hans) {
      playerHealth -= 40;
    } else if (e2 instanceof Skeleton) {
        playerHealth -= 20;
    } else if (e3 instanceof Dragon) {
        playerHealth -= 20;
    }
    if (livesText === undefined || typeof livesText.setText !== 'function') {
      livesText = this.scene.add.text(posX, posY, 'Lives: ' + playerHealth, {font: '32px blockKie'});
      livesText.setTint(0xff0000, 0xff0000, 0x0000ff, 0x0000ff);
      livesText.setScrollFactor(0);
    }

    livesText.setText('Lives: ' + playerHealth);

    return playerHealth;

  }
}
