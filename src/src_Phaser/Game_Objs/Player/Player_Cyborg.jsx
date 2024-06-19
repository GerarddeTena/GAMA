import Phaser from "phaser";
import {Hans} from "../NPC/NPC LVL1/Hans.jsx";
import {Skeleton} from "../NPC/NPC LVL1/Skeleton.jsx";
import {Dragon} from "../NPC/NPC LVL1/Dragon.jsx";

export class Cyborg extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frames) {
        super(scene, x, y, texture, frames);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.lives = 1000;
        scene.anims.create({
            key: 'cyborg_Idle', frames: scene.anims.generateFrameNumbers('cyborg_Idle', {start: 0, end: 4}),
            frameRate: 10, repeat: -1
        });

        scene.anims.create({
            key: 'cyborg_Walk', frames: scene.anims.generateFrameNumbers('cyborg_Walk', {start: 0, end: 8}),
            frameRate: 10, repeat: -1
        });

        // scene.anims.create({
        //     key: 'human_Jump', frames: scene.anims.generateFrameNumbers('human_Jump', {start: 0, end: 4}),
        //     frameRate: 10, repeat: 0
        // })

        this.play('cyborg_Idle');
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