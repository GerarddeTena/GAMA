import { Enemy } from './Enemy.jsx';

export class FinalDragon extends Enemy {
    constructor(scene, x, y, texture, frames) {
        super(scene, x, y, texture, frames);

        scene.anims.create({
            key: 'fly',
            frames: scene.anims.generateFrameNumbers('fly', { start: 0, end: 14 }),
            frameRate: 15,
            repeat: 1
        });

        this.play('fly');
    }
}