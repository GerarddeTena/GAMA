import Phaser from "phaser";
import {LoadAudio, Loader, LoadSprites} from "../Game_Objs/Loader.jsx";
import {Platforms} from "../Game_Objs/Platforms.jsx";
import {Hans} from "../Game_Objs/NPC/NPC LVL1/Hans.jsx";
import {Skeleton} from "../Game_Objs/NPC/NPC LVL1/Skeleton.jsx";
import {Dragon} from "../Game_Objs/NPC/NPC LVL1/Dragon.jsx";
import {Human} from "../Game_Objs/Player/Player_Human.jsx";
import {followPlayer} from "../GameConfig/NPCLogic.jsx";
import {Cyborg} from "../Game_Objs/Player/Player_Cyborg.jsx";
import {Reptile} from "../Game_Objs/Player/Player_Reptile.jsx";

class PhaserGeneralMethods extends Phaser.Scene {

    preload() {
        const loader = new Loader(this);
        const spriteLoad = new LoadSprites(this);
        const sceneAudio = new LoadAudio(this);

        loader.loadImage('background', 'background', 'Cathedral_1');
        loader.loadImage('platform', '', 'Platform');
        loader.loadImage('corridor', '', 'Corridor');
        loader.loadImage('block', '', 'PlatformBlock');
        loader.loadImage('c_block', '', 'CathedralBlock');
        loader.loadImage('rope', '', 'Rope');
        spriteLoad.loadAllSprites();
        sceneAudio.loadAudio('audioBoss1', '', 'AudioBoss');
    }

    create() {

        const CENT_X = this.cameras.main.centerX;
        const CENT_Y = this.cameras.main.centerY;

        const Rand = (n) => Math.floor(Math.random() * n);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keys = this.input.keyboard.addKeys(['A', 'D']);

        this.add.image(0, 0, 'background').setOrigin(0, 0).setScale(1);

        this.platforms = new Platforms(this.physics.world, this, null, [
            {x: 130, y: 735, key: 'corridor'}, {x: 250, y: 735, key: 'corridor'}, {x: 300, y: 735, key: 'corridor'},
            {x: 400, y: 735, key: 'corridor'}, {x: 500, y: 735, key: 'corridor'}, {x: 575, y: 735, key: 'corridor'},
            {x: 890, y: 605, key: 'corridor'}, {x: 1100, y: 605, key: 'corridor'}, {x: 1280, y: 605, key: 'corridor'},
            {x: 1380, y: 605, key: 'corridor'}, {x: 1410, y: 605, key: 'corridor'},
            {x: 730, y: 608, key: 'c_block'}, {x: 730, y: 675, key: 'c_block'}, {x: 730, y: 740, key: 'c_block'},
            {x: 1436, y: 605, key: 'c_block'}, {x: 300, y: 580, key: 'block'}, {x: 450, y: 450, key: 'block'},
            {x: 750, y: 475, key: 'block'}, {x: 600, y: 300, key: 'block'}
        ]);


        const selectedCharacter = this.registry.get('Character Selected');
        switch (selectedCharacter) {
            case 'Human':
                this.player = new Human(this, 100, 550, 'human_Idle', 5);
                break;
            case 'Cyborg':
                this.player = new Cyborg(this, 100, 550, 'cyborg_Idle', 5);
                break;
            case 'Reptile':
                this.player = new Reptile(this, 100, 550, 'reptile_Idle', 5);
                break;
            default:
                this.player = new Human(this, 100, 550, 'human_Idle', 5);
                break;
        }

        this.cameras.main.startFollow(this.player, true, 0.05, 0.05, 0, 0);
        this.player.createAnimations(this);

        // Load NPCs
        this.hans = new Hans(this, Rand(1800), 500, 'hans_Idle', 10).setScale(1.5);
        this.hans.setPushable(false);
        this.skeleton = new Skeleton(this, Rand(1800), 550, 'skeleton_Idle', 10);
        this.skeleton.setPushable(false);
        this.dragon = new Dragon(this, Rand(1800), 550, 'dragon', 10);
        this.dragon.setPushable(false);

        this.physics.add.collider(this.hans, this.platforms);
        this.physics.add.collider(this.skeleton, this.platforms);
        this.physics.add.collider(this.dragon, this.platforms);
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.dragon);
        this.physics.add.collider(this.player, this.skeleton);
        this.physics.add.collider(this.player, this.hans);
        this.physics.add.collider(this.skeleton, this.hans && this.dragon);
        this.physics.add.collider(this.dragon, this.hans && this.skeleton);
        this.physics.add.collider(this.hans, this.skeleton && this.dragon);


        // Automatic movement:
        followPlayer.call(this, this.hans, this.player, 100, 'hans_Walk', 'hans_Idle', 'hans_Jump');
        followPlayer.call(this, this.skeleton, this.player, 100, 'skeleton_Walk', 'skeleton_Idle', 'skeleton_Jump');
        followPlayer.call(this, this.dragon, this.player, 100, 'dragon', 'dragon', 'dragon_Jump');

        this.livesText = this.add.text(CENT_X, CENT_Y, `Lives: ${this.playerHealth}`, {font: '32px blockKie'});
        this.livesText.setTint(0xff0000, 0xff0000, 0x0000ff, 0x0000ff);
        this.livesText.setPosition(this.player.x, this.player.y - 300);
        this.livesText.setScrollFactor(0);


        this.input.keyboard.on('keydown-ESC', () => {
            this.scene.launch('PauseMenu');
            this.scene.pause('Level1');

        })
    }

    update() {
        this.player.handleAnimations(this.keys, this.cursors);
        this.physics.add.collider(this.player, this.platforms);
        let H_Attack = this.hans.currentAnim === 'hans_Weapon';
        let S_Attack = this.hans.currentAnim === 'skeleton_Attack';
        let D_Attack = this.hans.currentAnim === 'dragon_attack';

        if (this.player.x > this.hans.x - 100 && this.player.x < this.hans.x + 100) {
            this.hans.anims.play('hans_Weapon', true);
            this.hans.setFlipX(this.hans.x < this.player.x);
            this.currentAnim = 'hans_Weapon';
        } else {
            this.hans.anims.play('hans_Walk', true);
            this.hans.setFlipX(this.player.x < this.hans.x);
            this.currentAnim = 'hans_Walk';
        }

        if (this.player.x > this.skeleton.x - 100 && this.player.x < this.skeleton.x + 100) {
            this.skeleton.anims.play('skeleton_Attack', true);
            this.skeleton.setFlipX(this.skeleton.x > this.player.x);
            this.currentAnim = 'skeleton_Attack';
        } else {
            this.skeleton.anims.play('skeleton_Walk', true);
            this.skeleton.setFlipX(this.player.x < this.skeleton.x);
            this.currentAnim = 'skeleton_Walk';
        }
        if (this.player.x > this.dragon.x - 100 && this.player.x < this.dragon.x + 100) {
            this.dragon.anims.play('dragon_attack', true);
            this.dragon.setFlipX(this.dragon.x > this.player.x);
            this.currentAnim = 'dragon_attack';
        } else {
            this.dragon.anims.play('dragon', true);
            this.dragon.setFlipX(this.player.x < this.dragon.x);
            this.currentAnim = 'dragon';
        }
        if (H_Attack && this.player.x > this.hans.x + 20 && this.player.x < this.hans.x - 20) {
            this.playerHealth = this.player.handlePlayerHit(this.hans, this.livesText, this.player.x, this.player.y - 300, this.playerHealth);
        }

        if (S_Attack && this.player.x > this.skeleton.x + 20 && this.player.x < this.skeleton.x - 20) {
            this.playerHealth = this.player.handlePlayerHit(this.skeleton, this.livesText, this.player.x, this.player.y - 300, this.playerHealth);
        }

        if (D_Attack && this.player.x < this.dragon.x + 20 && this.player.x > this.dragon.x - 20) {
            this.playerHealth = this.player.handlePlayerHit(this.dragon, this.livesText, this.player.x, this.player.y - 300, this.playerHealth);
        }
    }
}

export class Level1 extends PhaserGeneralMethods {
    constructor() {
        super({key: 'Level1'});
        this.hans = null;
        this.skeleton = null;
        this.dragon = null;
        this.currentAnim = null;
        this.playerHealth = 1000;
        this.livesText = null;
    }
}