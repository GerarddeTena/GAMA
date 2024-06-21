import Phaser from 'phaser';
import { LoadAudio, LoadKeyWords } from "../Game_Objs/Loader.jsx";
import { KeyBoard } from "../Game_Objs/KEYBOARD_KEYS/KEYBOARD.tsx";

export class Menu extends Phaser.Scene {
    constructor() {
        super({ key: 'Menu' });
    }

    preload() {
        const menuAudio = new LoadAudio(this);
        menuAudio.loadAudio('MenuAudio', '', 'Menu');
        const keyWords = new LoadKeyWords(this);
        keyWords.loadKeyWords('A', 'A-Key', 32, 32);
        keyWords.loadKeyWords('D', 'D-Key', 32, 32);
        keyWords.loadKeyWords('Shift', 'Shift-Key', 48, 32);
        keyWords.loadKeyWords('Space', 'Space-Key', 64, 32);
    }

    create() {
        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;
        const offset = 50;

        const textMenu = this.add.text(centerX, centerY - offset * 4, 'MAIN MENU', {
            font: '200px BlockKie',
            fill: '#ffffff'
        }).setOrigin(0.5);
        textMenu.setTint(0xff00ff, 0xff00ff, 0x0000ff, 0x0000ff);

        let audioMenu = this.sound.add('MenuAudio');
        audioMenu.play({ volume: 0.01 });

        this.A = new KeyBoard(this, centerX - 1.5 * offset, centerY, 'A', 0).setScale(2);
        this.D = new KeyBoard(this, centerX + offset * 1.5, centerY, 'D', 0).setScale(2);
        this.Shift = new KeyBoard(this, centerX - 1.25 * offset, centerY + offset * 1.25, 'Shift', 0).setScale(2);
        this.Space = new KeyBoard(this, centerX + offset, centerY + offset * 1.25, 'Space', 0).setScale(2);

        const gameDescription = `
            In a dystopian world ruled by an evil tyrant known as "The Bald One," three heroes emerge to fight for freedom. 
            Alex, a resourceful human, Cyron, a rebellious cyborg, and Zarnak, a fierce reptilian warrior, each driven by loss and a desire for justice. 
            Together, they lead a resistance to dismantle The Bald One's regime, facing deadly traps, mutated creatures, and cybernetic soldiers. 
            Join their perilous journey and fight for liberation in this thrilling adventure.
        `;
        
        const startText = this.add.text(centerX, centerY + offset * 3, 'Press Enter to Start', {
            font: '32px Arial',
            fill: '#ffffff'
        }).setOrigin(0.5);

        this.add.text(centerX, centerY + offset * 5, gameDescription, {
            font: '16px Arial',
            fill: '#ffffff',
            align: 'center',
            wordWrap: { width: 700 }
        }).setOrigin(0.5);

        this.input.keyboard.on('keydown-ENTER', () => {
            this.scene.start('Select_Character');
        });
    }

    update() {
        this.A.play('A', true);
        this.D.play('D', true);
        this.Shift.play('Shift', true);
        this.Space.play('Space', true);
    }
}

