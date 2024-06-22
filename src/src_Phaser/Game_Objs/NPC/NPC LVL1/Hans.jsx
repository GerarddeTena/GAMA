import { Enemy } from './Enemy.jsx';

export class Hans extends Enemy {
    constructor(scene, x, y, texture, frames) {
        super(scene, x, y, texture, frames);
        scene.anims.create({
            key: 'hans_Idle',
            frames: scene.anims.generateFrameNumbers('hans_Idle', { start: 0, end: 6 }),
            frameRate: 10,
            repeat: -1
        });

        scene.anims.create({
            key: 'hans_Walk',
            frames: scene.anims.generateFrameNumbers('hans_Walk', { start: 0, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        scene.anims.create({
            key: 'hans_Weapon',
            frames: scene.anims.generateFrameNumbers('hans_Weapon', { start: 0, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.play('hans_Idle');
    }
}
