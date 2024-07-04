import { Enemy } from './Enemy.jsx';

export class Hans extends Enemy {
    constructor(scene, x, y, texture, frames) {
        super(scene, x, y, texture, frames);
        this.hits = 0;
        scene.anims.create({
            key: 'hans_Idle',
            frames: scene.anims.generateFrameNumbers('hans_Idle', { start: 0, end: 6 }),
            frameRate: 7,
            repeat: -1
        });

        scene.anims.create({
            key: 'hans_Walk',
            frames: scene.anims.generateFrameNumbers('hans_Walk', { start: 0, end: 8 }),
            frameRate: 9,
            repeat: -1
        });

        scene.anims.create({
            key: 'hans_Attack',
            frames: scene.anims.generateFrameNumbers('hans_Attack', { start: 0, end: 8 }),
            frameRate: 9,
            repeat: -1
        });

        scene.anims.create({
            key: 'hans_Jump',
            frames: scene.anims.generateFrameNumbers('hans_Jump', { start: 0, end: 4 }),
            frameRate: 5,
            repeat: -1

        })

        this.play('hans_Idle');
    }
}
