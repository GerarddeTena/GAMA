import Phaser from 'phaser';

export class Platforms extends Phaser.Physics.Arcade.StaticGroup {
    constructor(world, scene, children, spriteArray, number) {
        super(world, scene, children);
        this.scene = scene;
        this.number = number;
        spriteArray.forEach(sprite => this.create(sprite.x, sprite.y, sprite.key).setScale(1.5));
    }
}