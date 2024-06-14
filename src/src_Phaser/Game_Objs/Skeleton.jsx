import Phaser from 'phaser';

export class Skeleton extends Phaser.Physics.Arcade.Sprite {
   constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
      scene.add.existing(this);
      scene.physics.add.existing(this);

      scene.anims.create({
         key: 'Skeleton_Idle',
         frames: scene.anims.generateFrameNumbers('Skeleton_Idle', {start: 0, end: 7}),
         frameRate: 10, repeat: -1
      });

      scene.anims.create({
         key: 'Skeleton_Walk',
         frames: scene.anims.generateFrameNumbers('Skeleton_Walk', {start: 0, end: 3}),
         frameRate: 10, repeat: 1
      });

      this.play('Skeleton_Idle');
   }

}