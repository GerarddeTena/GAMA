import Phaser from 'phaser';

export class Hans extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        scene.anims.create({
            key: 'hans_Idle',
            frames: scene.anims.generateFrameNumbers('hans_Idle', {start: 0, end: 6}),
            frameRate: 10,
            repeat: -1
        });

        scene.anims.create({
            key: 'hans_Walk',
            frames: scene.anims.generateFrameNumbers('hans_Walk', {start: 0, end: 8}),
            frameRate: 10,
            repeat: -1
        });

        scene.anims.create({
            key: 'hans_Weapon',
            frames: scene.anims.generateFrameNumbers('hans_Weapon', {start: 0, end: 8}),
            frameRate: 10,
            repeat: -1
        })

        this.play('hans_Idle');
    }
}