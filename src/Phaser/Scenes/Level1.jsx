import {LoadAudio, Loader, LoadSprites} from "../Game_Objs/Loader.jsx";
import {Platforms} from "../Game_Objs/Platforms.jsx";
import {Hans} from "../Game_Objs/NPC/Hans.jsx";
import {Skeleton} from "../Game_Objs/NPC/Skeleton.jsx";
import {Dragon} from "../Game_Objs/NPC/Dragon.jsx";
import {followPlayer} from "../GameConfig/NPCLogic.jsx";
import {Base_Level} from "../GameConfig/Base_Level.jsx";

export class Level1 extends Base_Level {
    constructor() {
        super('Level1');
    }

    preload() {
        const loader = new Loader(this);
        const spriteLoad = new LoadSprites(this);
        const sceneAudio = new LoadAudio(this);
        loader.loadImage('background', 'dpyt5ckdx44utnwic25x');
        loader.loadImage('platform','y0xeoftxau5cvbg4jj3v');
        loader.loadImage('corridor','e2y77zfsvkg01m8pmkna');
        loader.loadImage('block','yyqs5t9kle0fubudlxp3');
        loader.loadImage('c_block','glhfi10ek0agpj1djoqx');
        spriteLoad.loadAllSprites();
        sceneAudio.loadAudio('LevelOne', 'Selection');
    }

    create() {

        const CENT_X = this.cameras.main.centerX;
        const CENT_Y = this.cameras.main.centerY;
        const Rand = (n) => Math.floor(Math.random() * n);

        this.audioLVL1 = this.sound.add('LevelOne');
        this.audioLVL1.play({volume: 0.02});

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

        super.create();
        // Load NPCS:

        const characters = [
            {name: 'hans', class: Hans, x: Rand(1800), y: 500, key: 'hans_Idle', scale: 1.5, pushable: false},
            {name: 'skeleton', class: Skeleton, x: Rand(1800), y: 550, key: 'skeleton_Idle'},
            {name: 'dragon', class: Dragon, x: Rand(1800), y: 550, key: 'dragon'}
        ];

        this.npcCharacters = [];
        this.characterMap = new Map();

        characters.forEach(config => {
            const character = new config.class(this, config.x, config.y, config.key, 0);
            character.hits = 0;
            if (config.scale) character.setScale(config.scale);
            if (config.pushable !== undefined) character.setPushable(config.pushable);
            this.physics.add.collider(character, this.platforms);

            if (config.name === 'hans') {
                this.hans = character;
            } else if (config.name === 'skeleton') {
                this.skeleton = character;
            } else if (config.name === 'dragon') {
                this.dragon = character;
            }

            this.characterMap.set(character, {
                attackAnim: `${config.name}_Attack`,
                walkAnim: `${config.name}_Walk`,
                deathAnim: `${config.name}_Death`
            });
            this.npcCharacters.push(character);
        });


        this.npcCharacters.forEach(npc => {
            this.physics.add.collider(this.player, npc);
            this.npcCharacters.forEach(otherNpc => {
                if (npc !== otherNpc) {
                    this.physics.add.collider(npc, otherNpc);
                }
            });
        });

        this.npcCharacters.map(npc => {
            if (npc !== null) {
                followPlayer.call(this, npc, this.player, 100, `${npc.name}_Walk`, `${npc.name}_Idle`, `${npc.name}_Jump`);
            }

        });

        this.livesText = this.add.text(CENT_X, CENT_Y, `Health: ${this.player.playerHealth}`, {font: '32px blockKie'});
        this.livesText.setTint(0xff0000, 0xff0000, 0x0000ff, 0x0000ff);
        this.livesText.setPosition(this.player.x, this.player.y - 300);
        this.livesText.setScrollFactor(0);

        this.scoreText = this.add.text(CENT_X, CENT_Y - 100, 'score: 0', {fontSize: '32px blockKie'});
        this.scoreText.setTint(0xff00ff, 0xff00ff, 0x0000ff, 0x0000ff);
        this.scoreText.setPosition(this.player.x, this.player.y - 400);
        this.scoreText.setScrollFactor(0);

        this.input.keyboard.on('keydown-ESC', () => {
            this.scene.launch('PauseMenu');
            this.scene.pause(this);
        });

    }

    update() {
        super.update();
        super.nextLevel('Level2');
        super.gameOver('Menu');

    }
}
