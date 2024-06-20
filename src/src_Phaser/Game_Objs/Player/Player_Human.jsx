import Phaser from "phaser";
import {Hans} from "../NPC/NPC LVL1/Hans.jsx";
import {Skeleton} from "../NPC/NPC LVL1/Skeleton.jsx";
import {Dragon} from "../NPC/NPC LVL1/Dragon.jsx";

export class Human extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frames) {
        super(scene, x, y, texture, frames);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.lives = 1000;
        this.currentAnim = null;
    }

    createAnimations(scene) {
        scene.anims.create({
            key: 'human_Idle', frames: scene.anims.generateFrameNumbers('human_Idle', {start: 0, end: 4}),
            frameRate: 10, repeat: -1
        });

        scene.anims.create({
            key: 'human_Walk', frames: scene.anims.generateFrameNumbers('human_Walk', {start: 0, end: 8}),
            frameRate: 10, repeat: -1
        });

        scene.anims.create({
            key: 'human_Jump', frames: scene.anims.generateFrameNumbers('human_Jump', {start: 0, end: 4}),
            frameRate: 10, repeat: 0
        })
    }

    handleAnimations(keys, cursors) {

        const onGround = this.body.blocked.down || this.body.touching.down;
        const shiftPressed = cursors.shift.isDown;

        if (cursors.space.isDown && onGround) {
            this.body.setVelocityY(-500);
            if (this.currentAnim !== 'human_Jump') {
                this.anims.play('human_Jump');
                this.currentAnim = 'human_Jump';
            }
        }

        else if (keys[0].isDown) {
            this.body.setVelocityX(shiftPressed ? -250 : -100);

            if (onGround && this.currentAnim !== 'human_Walk') {
                this.anims.play('human_Walk', true);
                this.currentAnim = 'human_Walk';
            }

            this.flipX = true;
        }

        else if (keys[1].isDown) {
            this.body.setVelocityX(shiftPressed ? 250 : 100);
            if (onGround && this.currentAnim !== 'human_Walk') {
                this.anims.play('human_Walk', true);
                this.currentAnim = 'human_Walk';
            }

            this.flipX = false;
        }

        else if (keys[0].isUp && keys[1].isUp) {
            this.body.setVelocityX(0);

            if (onGround && this.currentAnim !== 'human_Idle') {
                this.anims.play('human_Idle');
                this.currentAnim = 'human_Idle';
            }
        }
    }

    handlePlayerHit(enemy, livesText) {

        if (enemy instanceof Hans) {
            this.lives -= 10;
        } else if (enemy instanceof Skeleton) {
            this.lives -= 20;
        } else if (enemy instanceof Dragon) {
            this.lives -= 30;
        }

        livesText.setText('Lives: ' + this.lives);
    }
}