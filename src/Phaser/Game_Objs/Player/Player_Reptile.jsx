import Phaser from "phaser";
import {Hans} from "../NPC/Hans.jsx";
import {Skeleton} from "../NPC/Skeleton.jsx";
import {Dragon} from "../NPC/Dragon.jsx";

export class Reptile extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frames) {
        super(scene, x, y, texture, frames);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.playerHealth = 1000;
        this.currentAnim = null;
        this.isInvulnerable = false;

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
                this.anims.play("reptile_Jump", true);
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
                this.anims.play("reptile_Idle", true);
                this.currentAnim = "reptile_Idle";
            }
        }
    }

    handlePlayerHit(enemy, livesText) {
        //Lives on Reptile must be minus than others. IT'S TOO EASY TO PASS THE GAME WITH IT. Let's make it more fair.
        if (enemy instanceof Hans) {
            this.playerHealth -= 100;
        } else if (enemy instanceof Skeleton) {
            this.playerHealth -= 60;
        } else if (enemy instanceof Dragon) {
            this.playerHealth -= 25;
        }

        livesText.setText('Lives: ' + this.playerHealth);
        this.feedbackHit();
        this.isInvulnerable = true;
        this.scene.time.addEvent({
            delay: 1000,
            callback: () => {
                this.isInvulnerable = false;
            }
        });

    }

    feedbackHit() {
        this.scene.tweens.add({
            targets: this,
            alpha: 0,
            ease: 'Linear',
            duration: 100,
            repeat: 5,
            yoyo: true,
            onComplete: () => {
                this.setAlpha(1);
            }
        });
    }
}
