import Phaser from 'phaser';

export class Dragon extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frames) {
        super(scene, x, y, texture, frames)
        scene.add.existing(this);
        scene.physics.add.existing(this);

        scene.anims.create({
            key: 'Dragon',
            frames: scene.anims.generateFrameNumbers('Dragon', {start: 0, end: 7}),
            frameRate: 10, repeat: -1
        });


     this.play('Dragon');
    }
}