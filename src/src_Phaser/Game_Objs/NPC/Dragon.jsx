import Phaser from 'phaser';

export class Dragon extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frames) {
        super(scene, x, y, texture, frames)
        scene.add.existing(this);
        scene.physics.add.existing(this);

        scene.anims.create({
            key: 'dragon',
            frames: scene.anims.generateFrameNumbers('dragon', {start: 0, end: 7}),
            frameRate: 10, repeat: -1
        });

        scene.anims.create({
            key: 'dragon_attack',
            frames: scene.anims.generateFrameNumbers('dragon_attack', {start: 0, end: 20}),
            frameRate: 10, repeat: -1
        })

     this.play('dragon');
    }
}