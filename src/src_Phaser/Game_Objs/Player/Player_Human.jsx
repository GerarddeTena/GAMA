import Phaser from "phaser";

export class Human extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frames) {
        super(scene, x, y, texture, frames);
        scene.add.existing(this);
        scene.physics.add.existing(this);

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

        this.play('human_Idle');
    }
}