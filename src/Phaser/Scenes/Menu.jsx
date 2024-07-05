import Phaser from 'phaser';
import {LoadAudio, LoadKeyBoard} from "../Game_Objs/Loader.jsx";
import {KeyBoard} from "../Game_Objs/KEYBOARD_KEYS/KEYBOARD.jsx";

export class Menu extends Phaser.Scene {
    constructor() {
        super({key: 'Menu'});
    }

    preload() {
        const menuAudio = new LoadAudio(this);
        menuAudio.loadAudio( 'MenuAudio', 'Menu');
        const keyBoard = new LoadKeyBoard(this);
        keyBoard.loadKeyBoard('A', 'dvcjspj9yxxwmg4dhata', 32, 32);
        keyBoard.loadKeyBoard('D', 'kuiuv1vynk5h1s7sv1sm', 32, 32);
        keyBoard.loadKeyBoard('Shift', 'azpwr1jz7r8cyoghl0q2', 48, 32);
        keyBoard.loadKeyBoard('Space', 'teuce570uckbf1jatyds', 64, 32);}
    create() {
        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;
        const offset = 50;

        const textMenu = this.add.text(centerX, centerY - offset * 4, 'MAIN MENU', {
            font: '200px BlockKie',
            fill: '#ffffff'
        }).setOrigin(0.5);
        textMenu.setTint(0xff00ff, 0xff00ff, 0x0000ff, 0x0000ff);

        this.audioMenu = this.sound.add('MenuAudio');
        this.audioMenu.play({volume: 0.02});

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

        this.add.text(centerX, centerY + offset * 3, 'Press Enter to Start', {
            font: '32px Arial',
            fill: '#ffffff'
        }).setOrigin(0.5);

        this.add.text(centerX, centerY + offset * 5, gameDescription, {
            font: '16px Arial', fill: '#ffffff', align: 'center', wordWrap: {width: 700}
        }).setOrigin(0.5);

        this.input.keyboard.on('keydown-ENTER', () => this.cameras.main.fadeOut(1000, 0, 0, 0));
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
            this.scene.start('Select_Character');
            this.audioMenu.stop();
        });
    }

    update() {
        this.A.play('A', true);
        this.D.play('D', true);
        this.Shift.play('Shift', true);
        this.Space.play('Space', true);
    }
}

