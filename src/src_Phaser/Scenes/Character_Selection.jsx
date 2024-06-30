import Phaser from 'phaser';
import {LoadAudio, LoadSprites} from "../Game_Objs/Loader.jsx";
import { Human } from "../Game_Objs/Player/Player_Human.jsx";
import { Cyborg } from "../Game_Objs/Player/Player_Cyborg.jsx";
import { Reptile } from "../Game_Objs/Player/Player_Reptile.jsx";

export class Select_Character extends Phaser.Scene {
    constructor() {
        super({ key: 'Select_Character' });
    }

    preload() {
        const player = new LoadSprites(this);
        const audio = new LoadAudio(this);
        audio.loadAudio('selectMenuAudio', '', 'Selection');
        player.loadAllSprites();
    }

    create() {
        const OFFSET = 150;
        const CENT_X = this.cameras.main.centerX;
        const CENT_Y = this.cameras.main.centerY;

        this.audioSelection = this.sound.add('selectMenuAudio');
        this.audioSelection.play({volume: 0.02});

        this.physics.world.gravity.y = 0;

        this.player_H = new Human(this, CENT_X - OFFSET, CENT_Y, 'human_Idle');
        this.player_H.setInteractive();
        this.player_H.setScale(2);
        this.player_H.body.setAllowGravity(false);

        this.player_C = new Cyborg(this, CENT_X, CENT_Y, 'cyborg_Idle');
        this.player_C.setInteractive();
        this.player_C.setScale(2);
        this.player_C.body.setAllowGravity(false);

        this.player_R = new Reptile(this, CENT_X + OFFSET, CENT_Y, 'reptile_Idle');
        this.player_R.setInteractive();
        this.player_R.setScale(2);
        this.player_R.body.setAllowGravity(false);

        this.characters = [this.player_H, this.player_C, this.player_R];
        this.characterNames = ['Human', 'Cyborg', 'Reptile'];
        this.selectedCharacterIndex = 0;

        this.characterTexts = this.characters.map((character, index) => {
            return this.add.text(character.x, character.y + 100, this.characterNames[index], {
                font: '24px Arial',
                fill: '#ffffff'
            }).setOrigin(0.5, 0.5);
        });

        this.input.keyboard.on('keydown-A', () => {
            if (this.selectedCharacterIndex > 0) {
                this.selectedCharacterIndex--;
                this.updateCharacterSelection();
            }
        });

        this.input.keyboard.on('keydown-D', () => {
            if (this.selectedCharacterIndex < this.characters.length - 1) {
                this.selectedCharacterIndex++;
                this.updateCharacterSelection();
            }
        });

        this.input.keyboard.on('keydown-ENTER', () => this.cameras.main.fadeOut(1000, 0, 0, 0));
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
            const selectedCharacterName = this.characterNames[this.selectedCharacterIndex];
            this.registry.set('Character Selected', selectedCharacterName);
            this.audioSelection.stop();
            this.scene.start('Level1');
        });
        this.add.text(CENT_X, CENT_Y - 200, 'Select Your Character', {
            font: '32px Arial',
            fill: '#ffffff'
        }).setOrigin(0.5, 0.5);

        this.add.text(CENT_X, CENT_Y + 200, 'Use A and D to navigate, ENTER to select', {
            font: '20px Arial',
            fill: '#ffffff'
        }).setOrigin(0.5, 0.5);

        this.updateCharacterSelection = () => {
            this.characters.forEach((character, index) => {
                character.setTint(index === this.selectedCharacterIndex ? 0xff0000 : 0xffffff);
                this.characterTexts[index].setTint(index === this.selectedCharacterIndex ? 0xff0000 : 0xffffff);
            });
        }
    }
}
