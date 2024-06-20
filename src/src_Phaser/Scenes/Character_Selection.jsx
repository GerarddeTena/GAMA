import Phaser from 'phaser';
import { LoadSprite } from "../Game_Objs/Loader.jsx";
import { Human } from "../Game_Objs/Player/Player_Human.jsx";
import { Cyborg } from "../Game_Objs/Player/Player_Cyborg.jsx";
import { Reptile } from "../Game_Objs/Player/Player_Reptile.jsx";

export class Select_Character extends Phaser.Scene {
    constructor() {
        super({ key: 'Select_Character' });
    }

    preload() {
        this.load.image('background', 'assets/backgrounds/select_screen.png');
        
        const player_1 = new LoadSprite(this);
        player_1.loadSprite('human_Idle', 'Players', 'Human_Idle', 32, 64);

        const player_2 = new LoadSprite(this);
        player_2.loadSprite('cyborg_Idle', 'Players', 'Cyborg_Idle', 32, 48);

        const player_3 = new LoadSprite(this);
        player_3.loadSprite('reptile_Idle', 'Players', 'Reptile_Idle', 32, 48);
    }

    create() {
        const OFFSET = 150;
        const CENT_X = this.cameras.main.centerX;
        const CENT_Y = this.cameras.main.centerY;


        this.physics.world.gravity.y = 0;

        const player_1 = new Human(this, CENT_X - OFFSET, CENT_Y, 'human_Idle');
        player_1.setInteractive();
        player_1.setScale(2); 
        player_1.body.setAllowGravity(false); 

        const player_2 = new Cyborg(this, CENT_X, CENT_Y, 'cyborg_Idle');
        player_2.setInteractive();
        player_2.setScale(2); 
        player_2.body.setAllowGravity(false); 

        const player_3 = new Reptile(this, CENT_X + OFFSET, CENT_Y, 'reptile_Idle');
        player_3.setInteractive();
        player_3.setScale(2);
        player_3.body.setAllowGravity(false); 

        this.characters = [player_1, player_2, player_3];
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

        this.input.keyboard.on('keydown-ENTER', () => {
            const selectedCharacter = this.characters[this.selectedCharacterIndex];
            this.registry.set('Character Selected', selectedCharacter);
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

        this.updateCharacterSelection();
    }

    updateCharacterSelection() {
        this.characters.forEach((character, index) => {
            character.setTint(index === this.selectedCharacterIndex ? 0xff0000 : 0xffffff);
            this.characterTexts[index].setTint(index === this.selectedCharacterIndex ? 0xff0000 : 0xffffff);
        });
    }
}
