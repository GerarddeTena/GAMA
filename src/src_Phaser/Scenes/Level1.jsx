import Phaser from "phaser";
import {LoadAudio, Loader, LoadSprite} from "../Game_Objs/Loader.jsx";
import {Platforms} from "../Game_Objs/Platforms.jsx";
import {Hans} from "../Game_Objs/NPC/NPC LVL1/Hans.jsx";
import {Skeleton} from "../Game_Objs/NPC/NPC LVL1/Skeleton.jsx";
import {Dragon} from "../Game_Objs/NPC/NPC LVL1/Dragon.jsx";
import {Human} from "../Game_Objs/Player/Player_Human.jsx";
import {randomMovement} from "../GameConfig/NPCLogic.jsx";
import {Cyborg} from "../Game_Objs/Player/Player_Cyborg.jsx";
import {Reptile} from "../Game_Objs/Player/Player_Reptile.jsx";

class PhaserGeneralMethods extends Phaser.Scene {

    preload() {
        const loader = new Loader(this);
        const spriteLoad = new LoadSprite(this);
        const sceneAudio = new LoadAudio(this);

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

        spriteLoad.loadSprite('human_Idle', 'Players', 'Human_Idle', 32, 48);
        spriteLoad.loadSprite('human_Walk', 'Players', 'Walking_Human', 32, 48);
        spriteLoad.loadSprite('human_Jump', 'Players', 'Jumping_Human', 48, 60);

        spriteLoad.loadSprite('cyborg_Idle', 'Players', 'Cyborg_Idle', 32, 48);
        spriteLoad.loadSprite('cyborg_Walk', 'Players', 'Walking_Cyborg', 32, 48);

        spriteLoad.loadSprite('reptile_Idle', 'Players', 'Reptile_Idle', 32, 48);
        spriteLoad.loadSprite('reptile_Walk', 'Players', 'Walking_Reptile', 32, 48);
        spriteLoad.loadSprite('reptile_Jump', 'Players', 'Jumping_Reptile', 32, 44);

        sceneAudio.loadAudio('audioBoss1', '', 'AudioBoss');
    }

    create() {

        const Rand = (n) => Math.floor(Math.random() * n);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keys = this.input.keyboard.addKeys(['A', 'D']);


        this.add.image(0, 0, 'background').setOrigin(0, 0).setScale(1.5);
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


        const selectedCharacter = this.registry.get('Character Selected');
        switch (selectedCharacter) {
            case 'Human':
                this.player = new Human(this, 100, 550, 'human_Idle');
                break;
            case 'Cyborg':
                this.player = new Cyborg(this, 100, 550, 'cyborg_Idle');
                break;
            case 'Reptile':
                this.player = new Reptile(this, 100, 550, 'reptile_Idle');
                break;
            default:
                this.player = new Human(this, 100, 550, 'human_Idle');
                break;
        }

        this.player.setScale(1.5);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0, 0, 1600, 800);
        this.physics.add.collider(this.player, platforms);
        this.player.createAnimations(this);

        // Load NPCs
        this.hans = new Hans(this, Rand(1800), 500, 'hans_Idle');
        this.skeleton = new Skeleton(this, Rand(1800), 550, 'skeleton_Idle');
        this.dragon = new Dragon(this, Rand(1800), 550, 'dragon');

        this.physics.add.collider(this.hans, platforms);
        this.physics.add.collider(this.skeleton, platforms);
        this.physics.add.collider(this.dragon, platforms);

        // Automatic movement:
        randomMovement.call(this, this.hans, platforms, 100, 'hans_Walk', 'hans_Idle');
        randomMovement.call(this, this.skeleton, platforms, 100, 'skeleton_Walk', 'skeleton_Idle');
        randomMovement.call(this, this.dragon, platforms, 100, 'dragon', 'dragon_attack');

    }

    update() {

        this.player.handleAnimations(this.keys, this.cursors);
    }
}

export class Level1 extends PhaserGeneralMethods {
    constructor() {
        super({key: 'Level1'});
        this.hans = null;
        this.skeleton = null;
        this.dragon = null;
        // this.playerHealth = 1000; // Salud inicial del jugador
        // this.livesText = null;
    }
}