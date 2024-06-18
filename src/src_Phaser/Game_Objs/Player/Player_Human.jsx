import Phaser from "phaser";
import {Hans} from "../NPC/NPC LVL1/Hans.jsx";
import {Skeleton} from "../NPC/NPC LVL1/Skeleton.jsx";
import {Dragon} from "../NPC/NPC LVL1/Dragon.jsx";

export class Human extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frames) {
        super(scene, x, y, texture, frames);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.lives = 1000;
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
    handlePlayerHit(enemy, livesText) {
        // Disminuye el número de vidas del jugador en función del tipo de enemigo
        if (enemy instanceof Hans) {
            this.lives -= 10; // Ajusta este valor según tus necesidades
        } else if (enemy instanceof Skeleton) {
            this.lives -= 20; // Ajusta este valor según tus necesidades
        } else if (enemy instanceof Dragon) {
            this.lives -= 30; // Ajusta este valor según tus necesidades
        }

        // Actualiza el texto de vidas
        livesText.setText('Lives: ' + this.lives);
    }
}