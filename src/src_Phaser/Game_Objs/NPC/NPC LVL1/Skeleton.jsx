import { Enemy } from './Enemy.jsx';

export class Skeleton extends Enemy {
    constructor(scene, x, y, texture, frames) {
        super(scene, x, y, texture, frames);

        scene.anims.create({
            key: 'skeleton_Idle',
            frames: scene.anims.generateFrameNumbers('skeleton_Idle', { start: 0, end: 7 }),
            frameRate: 8,
            repeat: -1
        });

        scene.anims.create({
            key: 'skeleton_Walk',
            frames: scene.anims.generateFrameNumbers('skeleton_Walk', { start: 0, end: 3 }),
            frameRate: 4,
            repeat: -1
        });

        scene.anims.create({
            key: 'skeleton_Attack',
            frames: scene.anims.generateFrameNumbers('skeleton_Attack', { start: 0, end: 3 }),
            frameRate: 4,
            repeat: -1
        });

        this.play('skeleton_Idle');
    }
}
