import {Loader, LoadSprites} from "../Game_Objs/Loader.jsx";
import {Platforms} from "../Game_Objs/Platforms.jsx";
import {Hans} from "../Game_Objs/NPC/NPC LVL1/Hans.jsx";
import {Skeleton} from "../Game_Objs/NPC/NPC LVL1/Skeleton.jsx";
import {Dragon} from "../Game_Objs/NPC/NPC LVL1/Dragon.jsx";
import {followPlayer} from "../GameConfig/NPCLogic.jsx";
import {Base_Level} from "../Base_Level.jsx";


export class Level2 extends Base_Level {
    constructor() {
        super('Level2');
    }

    preload() {
        const loader = new Loader(this);
        const spriteLoad = new LoadSprites(this);

        loader.loadImage("level2BG", "background", "Subway");
        loader.loadImage("platform", "", "Platform");
        loader.loadImage("block", "", "PlatformBlock");
        spriteLoad.loadAllSprites();
    }

    create() {
        const CENT_X = this.cameras.main.centerX;
        const CENT_Y = this.cameras.main.centerY;
        const OFFSET = 100;
        const Rand = (n) => Math.floor(Math.random() * n);
        this.add.image(CENT_X - OFFSET * 15, CENT_Y - OFFSET * 2, "level2BG").setOrigin(0, 0).setScale(1.87);

        this.platforms = new Platforms(this.physics.world, this, null, [
            {x: 100, y: 600, key: "platform"}, {x: 500, y: 600, key: "platform"}, {x: 300, y: 500, key: "block"}
        ]);
        super.create();


        const characters = [
            {name: 'hans', class: Hans, x: Rand(1800), y: 500, key: 'hans_Idle', scale: 1.5, pushable: false},
            {name: 'skeleton', class: Skeleton, x: Rand(1800), y: 550, key: 'skeleton_Idle', pushable: false},
            {name: 'skeleton', class: Skeleton, x: Rand(1800), y: 550, key: 'skeleton_Idle', pushable: false},
            {name: 'skeleton', class: Skeleton, x: Rand(1800), y: 550, key: 'skeleton_Idle', pushable: false},
            {name: 'dragon', class: Dragon, x: Rand(1800), y: 550, key: 'dragon', scale: 2, pushable: false},
            {name: 'dragon', class: Dragon, x: Rand(1800), y: 550, key: 'dragon', scale: 2, pushable: false},
            {name: 'dragon', class: Dragon, x: Rand(1800), y: 550, key: 'dragon', scale: 2, pushable: false}
        ];


        this.npcCharacters = [];
        this.characterMap = new Map();

        characters.forEach(config => {
            const character = new config.class(this, config.x, config.y, config.key, 10);
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

        this.npcCharacters.forEach(npc => {
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
        super.nextLevel('Level3');
        super.gameOver('Menu');

    }
}