import Phaser from "phaser";
import {Hans} from "../NPC/NPC LVL1/Hans.jsx";
import {Skeleton} from "../NPC/NPC LVL1/Skeleton.jsx";
import {Dragon} from "../NPC/NPC LVL1/Dragon.jsx";

export class Cyborg extends Phaser.Physics.Arcade.Sprite {
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
            key: 'cyborg_Idle', frames: scene.anims.generateFrameNumbers('cyborg_Idle', {start: 0, end: 4}),
            frameRate: 5, repeat: -1
        });

        scene.anims.create({
            key: 'cyborg_Walk', frames: scene.anims.generateFrameNumbers('cyborg_Walk', {start: 0, end: 7}),
            frameRate: 8, repeat: -1
        });
        scene.anims.create({
            key: 'cyborg_Jump', frames: scene.anims.generateFrameNumbers('cyborg_Jump', {start: 0, end: 5})
        })

    }

    // noinspection DuplicatedCode
    handleAnimations(keys, cursors) {

        const onGround = this.body.blocked.down || this.body.touching.down;
        const shiftPressed = cursors.shift.isDown;

        if (cursors.space.isDown && onGround) {
            this.body.setVelocityY(-350);
            if (this.currentAnim !== 'cyborg_Jump') {
                this.anims.play('cyborg_Jump');
                this.currentAnim = 'cyborg_Jump';
            }
        } else if (keys[0].isDown) {
            this.body.setVelocityX(shiftPressed ? -100 : -50);

            if (onGround && this.currentAnim !== 'cyborg_Walk') {
                this.anims.play('cyborg_Walk', true);
                this.currentAnim = 'cyborg_Walk';
            }

            this.flipX = true;
        } else if (keys[1].isDown) {
            this.body.setVelocityX(shiftPressed ? 100 : 50);
            if (onGround && this.currentAnim !== 'cyborg_Walk') {
                this.anims.play('cyborg_Walk', true);
                this.currentAnim = 'cyborg_Walk';
            }

            this.flipX = false;
        } else if (keys[0].isUp && keys[1].isUp) {
            this.body.setVelocityX(0);

            if (onGround && this.currentAnim !== 'cyborg_Idle') {
                this.anims.play('cyborg_Idle');
                this.currentAnim = 'cyborg_Idle';
            }
        }
    }


    handlePlayerHit(enemy, livesText) {
        //Lives on Cyborg must be more than others. IT'S AN INCREDIBLE CHALLENGE TO PASS THE GAME WITH IT. Let's make it more fair.
        if (enemy instanceof Hans) {
            this.playerHealth -= 60;
        } else if (enemy instanceof Skeleton) {
            this.playerHealth -= 20;
        } else if (enemy instanceof Dragon) {
            this.playerHealth -= 5;
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