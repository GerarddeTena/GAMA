import Phaser from "phaser";

export class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frames, points = 10, health = 3, score = 0) {
        super(scene, x, y, texture, frames);
        this.scene = scene;
        this.points = points;
        this.health = health;
        this.score = score;

        scene.add.existing(this);
        scene.physics.add.existing(this);
    }

    takeDamage() {
        this.health -= 1;
        if (this.health <= 0) {
            this.die();
        }
    }

    die() {
        this.play('Enemy_Death');
        this.on('animationcomplete', this.addPoints, this);
        this.on('animationcomplete', this.destroy, this);
    }

    addPoints() {
        this.score += this.points;
    }
}
