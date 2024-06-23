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

        loader.loadImage("background", "background", "Subway");
        loader.loadImage("platform", "", "Platform");
        loader.loadImage("block", "", "PlatformBlock");
        spriteLoad.loadAllSprites();
    }

    create() {
        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;
        const offset = 100;

        const Rand = (n) => Math.floor(Math.random() * n);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keys = this.input.keyboard.addKeys(["A", "D"]);

        this.add
            .image(centerX - offset * 15, centerY - offset, "background")
            .setOrigin(0, 0)
            .setScale(1.87);

        this.platforms = new Platforms(this.physics.world, this, null, [
            {x: 100, y: 600, key: "platform"},
            {x: 300, y: 600, key: "platform"},
        ]);


        const characters = [
            {name: 'hans', class: Hans, x: Rand(1800), y: 500, key: 'hans_Idle', scale: 1.5, pushable: false},
            {name: 'skeleton', class: Skeleton, x: Rand(1800), y: 550, key: 'skeleton_Idle'},
            {name: 'skeleton', class: Skeleton, x: Rand(1800), y: 550, key: 'skeleton_Idle'},
            {name: 'skeleton', class: Skeleton, x: Rand(1800), y: 550, key: 'skeleton_Idle'},
            {name: 'dragon', class: Dragon, x: Rand(1800), y: 550, key: 'dragon'},
            {name: 'dragon', class: Dragon, x: Rand(1800), y: 550, key: 'dragon'},
            {name: 'dragon', class: Dragon, x: Rand(1800), y: 550, key: 'dragon'},
            {name: 'dragon', class: Dragon, x: Rand(1800), y: 550, key: 'dragon'},
            {name: 'dragon', class: Dragon, x: Rand(1800), y: 550, key: 'dragon'}
        ];

        let npcCharacters = [];

        characters.forEach(config => {
                if (this.scene.isActive()) {
                    const character = new config.class(config.x, config.y, config.key, 10);
                    character.hits = 0;
                    if (config.scale) character.setScale(config.scale);
                    if (config.pushable !== undefined) character.setPushable(config.pushable);
                    this.physics.add.collider(character, this.platforms);

                    if (config.name === 'hans') {
                        this.hans = character;
                    }
                    if (config.name === 'skeleton') {
                        this.skeleton = character;
                    }
                    if (config.name === 'dragon') {
                        this.dragon = character;
                    }

                    npcCharacters.push(character);
                }
            }
        );
        super.createCharacter();
        npcCharacters.forEach(npc => {
            this.physics.add.collider(this.player, npc);
            npcCharacters.forEach(otherNpc => {
                if (npc !== otherNpc) {
                    this.physics.add.collider(npc, otherNpc);
                }
            })
        })

        npcCharacters.forEach(npc => {
            followPlayer.call(this, npc, this.player, 100, `${npc.name}_Walk, ${npc.name}_Idle, ${npc.name}_Jump`);
        });

        this.handlePlayerCam(this.player);


        this.livesText = this.add.text(10, 10, "Health: " + this.player.lives, {
            fontSize: "32px",
            fill: "#fff",
        });
        this.livesText.setScrollFactor(0);


    }

    update() {
        super.update();
    }
}