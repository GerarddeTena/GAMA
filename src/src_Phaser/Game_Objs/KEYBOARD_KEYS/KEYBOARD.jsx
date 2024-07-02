import Phaser from 'phaser';

export class KeyBoard extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this);

        this.createAnimation(scene, 'A');
        this.createAnimation(scene, 'D');
        this.createAnimation(scene, 'Shift');
        this.createAnimation(scene, 'Space');
    }

    createAnimation(scene, key) {
        if (!scene.anims.exists(key)) {
            scene.anims.create({
                key: key,
                frames: scene.anims.generateFrameNumbers(key, {start: 0, end: 1}),
                frameRate: 5,
                repeat: -1
            });
        }
    }
}