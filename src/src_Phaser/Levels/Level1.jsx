import Phaser from "phaser";
import {Loader} from "../Game_Objs/Loader.jsx";
import {Platforms} from "../Game_Objs/Platforms.jsx";
import {Hans} from "../Game_Objs/NPC/Hans.jsx";
import {Skeleton} from "../Game_Objs/NPC/Skeleton.jsx";
import {Dragon} from "../Game_Objs/NPC/Dragon.jsx";
import {Human} from "../Game_Objs/Player/Player_Human.jsx";
import {randomMovement} from "../GameConfig/NPCLogic.jsx";

export class Level1 extends Phaser.Scene {
    constructor() {
        super({key: 'Level1'});
    }
    preload() {
        const loader = new Loader(this);

        loader.loadImage('background', 'background', 'Cathedral_1');
        loader.loadImage('platform', '', 'Platform');
        loader.loadImage('corridor', '', 'Corridor');
        loader.loadImage('block', '', 'PlatformBlock');
        loader.loadImage('c_block', '', 'CathedralBlock');

        //Enemies:

        this.load.spritesheet('hans_Idle', 'src/src_Phaser/assets/sprites/Enemies/H_Idle.png', {
            frameWidth: 38,
            frameHeight: 47
        });
        this.load.spritesheet('hans_Walk', 'src/src_Phaser/assets/sprites/Enemies/H_Walk_Right.png', {
            frameWidth: 28,
            frameHeight: 48
        });
        this.load.spritesheet('skeleton_Idle', 'src/src_Phaser/assets/sprites/Enemies/Skeleton_Idle_Right.png', {
            frameWidth: 32,
            frameHeight: 48
        });
        this.load.spritesheet('skeleton_Walk', 'src/src_Phaser/assets/sprites/Enemies/Skeleton_Walk_Right.png', {
            frameWidth: 32,
            frameHeight: 48
        });
        this.load.spritesheet('skeleton_Attack', 'src/src_Phaser/assets/sprites/Enemies/Skeleton_Attack_R.png', {
            frameWidth: 32,
            frameHeight: 48
        });
        this.load.spritesheet('dragon', 'src/src_Phaser/assets/sprites/Enemies/ManiacDragon.png', {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet('dragon_attack', 'src/src_Phaser/assets/sprites/Enemies/Dragon_Hystheria.png', {
            frameWidth: 32,
            frameHeight: 32
        });

        // Players:
        this.load.spritesheet('human_Idle', 'src/src_Phaser/assets/sprites/Players/Human_Idle.png', {
            frameWidth: 32,
            frameHeight: 64
        });
        this.load.spritesheet('human_Walk', 'src/src_Phaser/assets/sprites/Players/Walking_Human.png', {
            frameWidth: 64,
            frameHeight: 64
        });
        this.load.spritesheet('human_Jump', 'src/src_Phaser/assets/sprites/Players/Jumping_Human.png', {
            frameWidth: 48,
            frameHeight: 60
        });
    }
    create() {

        this.add.image(0, 0, 'background').setOrigin(0, 0);
        let platforms = new Platforms(this.physics.world, this, null, [
            {x: 100, y: 700, key: 'corridor'}, {x: 200, y: 700, key: 'corridor'}, {
                x: 300,
                y: 700,
                key: 'corridor'
            },
            {x: 400, y: 700, key: 'corridor'}, {x: 500, y: 700, key: 'corridor'}, {
                x: 600,
                y: 700,
                key: 'corridor'
            },
            {x: 890, y: 605, key: 'corridor'}, {x: 1100, y: 605, key: 'corridor'}, {
                x: 1280,
                y: 605,
                key: 'corridor'
            },
            {x: 730, y: 608, key: 'c_block'}, {x: 1436, y: 605, key: 'c_block'}
        ]);

        // NPC's:
        let hans = new Hans(this, Math.floor(Math.random() * 1500), 100, 'hans_Idle');
        hans.setCollideWorldBounds(true);
        let skeleton = new Skeleton(this, Math.floor(Math.random() * 1500), 100, 'skeleton_Idle');
        skeleton.setCollideWorldBounds(true);
        let dragon = new Dragon(this, Math.floor(Math.random() * 1500), 100, 'dragon');
        dragon.setCollideWorldBounds(true);

        // Players:
        this.human = new Human(this, 100, 100, 'human_Idle');
        this.human.setCollideWorldBounds(true);

        // Automatic movement:
        randomMovement.call(this, hans, platforms, 100, 'hans_Walk', 'hans_Idle');
        randomMovement.call(this, skeleton, platforms, 100, 'skeleton_Walk', 'skeleton_Idle');
        randomMovement.call(this, dragon, platforms, 100, 'dragon', 'dragon_attack');

        // Add colliders:
        this.physics.add.collider(hans, platforms);
        this.physics.add.collider(skeleton, platforms);
        this.physics.add.collider(dragon, platforms);
        this.physics.add.collider(this.human, platforms);
    }
    update() {
        const cursors = this.input.keyboard.createCursorKeys();

        if (cursors.left.isDown && this.human.body.touching.down && this.human.currentAnim !== 'human_Jump') {
            this.human.setVelocityX(-100);
            this.human.play('human_Walk', true);
            this.human.setFlipX(true);

        } else if (cursors.right.isDown && this.human.body.touching.down && this.human.currentAnim !== 'human_Jump') {
            this.human.setVelocityX(100);
            this.human.play('human_Walk', true);
            this.human.setFlipX(false);

        } else if (cursors.right.isUp && cursors.left.isUp) {
            this.human.setVelocityX(0);
            if (this.human.body.touching.down) {
                this.human.play('human_Idle');
            }
        }

        if(cursors.shift.isDown && cursors.left.isDown && this.human.body.touching.down && this.human.currentAnim !== 'human_Jump') {
            this.human.setVelocityX(-250);
            this.human.play('human_Walk', true);
        } else if(cursors.shift.isDown && cursors.right.isDown && this.human.body.touching.down && this.human.currentAnim !== 'human_Jump') {
            this.human.setVelocity(250);
        }

        if (cursors.space.isDown && this.human.body.touching.down) {
            this.human.setVelocityY(-500);
            if (!this.human.anims.isPlaying || this.human.anims.currentAnim.key !== 'human_Jump') {
                this.human.play('human_Jump');
            }
        }

    }

}