import Phaser from 'phaser';

export class Skeleton extends Phaser.Physics.Arcade.Sprite {
   constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
      scene.add.existing(this);
      scene.physics.add.existing(this);

      scene.anims.create({
         key: 'skeleton_Idle',
         frames: scene.anims.generateFrameNumbers('skeleton_Idle', {start: 0, end: 7}),
         frameRate: 10, repeat: -1
      });

      scene.anims.create({
         key: 'skeleton_Walk',
         frames: scene.anims.generateFrameNumbers('skeleton_Walk', {start: 0, end: 3}),
         frameRate: 5, repeat: -1
      });

      scene.anims.create({
         key: 'skeleton_Attack',
         frames: scene.anims.generateFrameNumbers('skeleton_Attack', {start: 0, end: 3}),
         frameRate: 5, repeat: -1
      })
      this.play('skeleton_Idle');
   }

}