import Phaser from "phaser";
import {LoadAudio, Loader, LoadSprite} from "../Game_Objs/Loader.jsx";
import {Platforms} from "../Game_Objs/Platforms.jsx";
import {Hans} from "../Game_Objs/NPC/Hans.jsx";
import {Skeleton} from "../Game_Objs/NPC/Skeleton.jsx";
import {Dragon} from "../Game_Objs/NPC/Dragon.jsx";
import {Human} from "../Game_Objs/Player/Player_Human.jsx";
import {randomMovement} from "../GameConfig/NPCLogic.jsx";

export class Level1 extends Phaser.Scene {
    constructor() {
        super({key: 'Level1'});
        this.hans = null;
        this.skeleton = null;
        this.dragon = null;
    }

    preload() {
        const loader = new Loader(this);
        const spriteLoad = new LoadSprite(this);
        const audio = new LoadAudio(this);

        loader.loadImage('background', 'background', 'Cathedral_1');
        loader.loadImage('platform', '', 'Platform');
        loader.loadImage('corridor', '', 'Corridor');
        loader.loadImage('block', '', 'PlatformBlock');
        loader.loadImage('c_block', '', 'CathedralBlock');

        spriteLoad.loadSprite('hans_Idle', 'Enemies', 'H_Idle', 38, 47);
        spriteLoad.loadSprite('hans_Walk', 'Enemies', 'H_Walk_Right', 28, 48);
        spriteLoad.loadSprite('hans_Weapon', 'Enemies', 'Hans_Weapon', 92, 48);

        spriteLoad.loadSprite('skeleton_Idle', 'Enemies', 'Skeleton_Idle_Right', 32, 48);
        spriteLoad.loadSprite('skeleton_Walk', 'Enemies', 'Skeleton_Walk_Right', 32, 48);
        spriteLoad.loadSprite('skeleton_Attack', 'Enemies', 'Skeleton_Attack_R', 32, 48);

        spriteLoad.loadSprite('dragon', 'Enemies', 'ManiacDragon', 32, 32);
        spriteLoad.loadSprite('dragon_attack', 'Enemies', 'Dragon_Hystheria', 32, 32);

        spriteLoad.loadSprite('human_Idle', 'Players', 'Human_Idle', 32, 64);
        spriteLoad.loadSprite('human_Walk', 'Players', 'Walking_Human', 64, 64);
        spriteLoad.loadSprite('human_Jump', 'Players', 'Jumping_Human', 48, 60);
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
            {x: 1380, y: 605, key: 'corridor'}, {x: 1480, y: 605, key: 'corridor'},
            {x: 730, y: 608, key: 'c_block'}, {x: 1436, y: 605, key: 'c_block'}
        ]);

        // NPC's:
        this.hans = new Hans(this, Math.floor(Math.random() * 1500), 100, 'hans_Idle');
        this.hans.setCollideWorldBounds(true);
        this.hans.body.pushable = false;

        this.skeleton = new Skeleton(this, Math.floor(Math.random() * 1500), 100, 'skeleton_Idle');
        this.skeleton.setCollideWorldBounds(true);
        this.skeleton.body.pushable = false;

        this.dragon = new Dragon(this, Math.floor(Math.random() * 1500), 100, 'dragon');
        this.dragon.setCollideWorldBounds(true);
        this.dragon.body.pushable = false;

        // Players:
        this.human = new Human(this, 100, 100, 'human_Idle');
        this.human.setCollideWorldBounds(true);

        // Automatic movement:
        randomMovement.call(this, this.hans, platforms, 100, 'hans_Walk', 'hans_Idle', 'hans_Weapon');
        randomMovement.call(this, this.skeleton, platforms, 100, 'skeleton_Walk', 'skeleton_Idle');
        randomMovement.call(this, this.dragon, platforms, 100, 'dragon', 'dragon_attack');

        // Add colliders:
        this.physics.add.collider(this.hans, platforms);
        this.physics.add.collider(this.skeleton, platforms);
        this.physics.add.collider(this.dragon, platforms);
        this.physics.add.collider(this.human, platforms);

        this.physics.add.collider(this.human, this.hans);
        this.physics.add.collider(this.human, this.skeleton);
        this.physics.add.collider(this.human, this.dragon);
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

        if (cursors.shift.isDown && cursors.left.isDown && this.human.body.touching.down && this.human.currentAnim !== 'human_Jump') {
            this.human.setVelocityX(-250);
            this.human.play('human_Walk', true);
        } else if (cursors.shift.isDown && cursors.right.isDown && this.human.body.touching.down && this.human.currentAnim !== 'human_Jump') {
            this.human.setVelocity(250);
        }

        if (cursors.space.isDown && this.human.body.touching.down) {
            this.human.setVelocityY(-500);
            if (!this.human.anims.isPlaying || this.human.anims.currentAnim.key !== 'human_Jump') {
                this.human.play('human_Jump');
            }
        }

        // Ataque de los NPC:

        if (Phaser.Math.Distance.Between(this.human.x, this.human.y, this.hans.x, this.hans.y) < 100) {
            this.hans.play('hans_Weapon', true);
        } else {
            if (this.hans.anims.currentAnim.key !== 'hans_Walk') {
                this.hans.play('hans_Walk', true);
            }
        }

        if (Phaser.Math.Distance.Between(this.human.x, this.human.y, this.hans.x, this.hans.y) < 100) {
            if (this.human.x > this.hans.x && this.hans.scaleX < 0) {
                this.hans.setFlipX(true);

            } else if (this.human.x < this.hans.x && this.hans.scaleX > 0 ) {
                this.hans.setFlipX(false);
            }
        }
    }

}