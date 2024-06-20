import Phaser from 'phaser';
import {LoadSprite} from "../Game_Objs/Loader.jsx";
import {Human} from "../Game_Objs/Player/Player_Human.jsx";
import {Cyborg} from "../Game_Objs/Player/Player_Cyborg.jsx";
import {Reptile} from "../Game_Objs/Player/Player_Reptile.jsx";


export class Select_Character extends Phaser.Scene {
    constructor() {
        super({key: 'Select_Character'})
    }

    preload() {
        const player_1 = new LoadSprite(this, );
        player_1.loadSprite('human_Idle', 'Players', 'Human_Idle', 32, 64);

        const player_2 = new LoadSprite(this);
        player_2.loadSprite('cyborg_Idle', 'Players', 'Cyborg_Idle', 32, 48);

        const player_3 = new LoadSprite(this);
        player_3.loadSprite('reptile_Idle', 'Players', 'Reptile_Idle', 32, 48);
    }
    create() {
        const OFFSET = 100;
        const CENT_X = this.cameras.main.centerX
        const CENT_Y = this.cameras.main.centerY

        const player_1 = new Human(this, CENT_X * OFFSET / 2, CENT_Y * OFFSET, 'human_Idle');
        player_1.setInteractive();
        player_1.setScale();

        const player_2 = new Cyborg(this, CENT_X * OFFSET / 1.75, CENT_Y * OFFSET, 'cyborg_Idle');
        player_2.setInteractive();
        player_2.setScale();

        const player_3 = new Reptile(this, CENT_X * OFFSET / 1.25, CENT_Y * OFFSET, 'reptile_Idle');
        player_3.setInteractive();
        player_3.setScale();

        this.charaters = [player_1, player_2, player_3];
        this.selectedCharacterIndex = 0;

        this.input.keyboard.on('keydown-A', () => {
            if (this.selectedCharacterIndex > 0) {
                this.selectedCharacterIndex--;
            }
        });

        this.input.keyboard.on('keydown-S', () => {
            if (this.selectedCharacterIndex < this.selectedCharacterIndex.length) {
                this.selectedCharacterIndex++;
            }
        });

        this.input.keyboard.on('key-down-ENTER', () => {
            const selectedCharacter = this.character[this.selectedCharacterIndex];
            this.registry.set('Character Selected', selectedCharacter);
            this.scene.start('Level1');
        })

    }
}