import Phaser from 'phaser';
import { LoadAudio } from "../Game_Objs/Loader.jsx";

export class Menu extends Phaser.Scene {
    constructor() {
        super({ key: 'Menu' });
    }

    preload() {
        const menuAudio = new LoadAudio(this);
        menuAudio.loadAudio('MenuAudio', '', 'Menu');

        // Cargar imágenes 
        this.load.image('arrowLeft', 'path/to/arrowLeft.png');
        this.load.image('arrowRight', 'path/to/arrowRight.png');
        this.load.image('spaceKey', 'path/to/spaceKey.png');
        this.load.image('shiftKey', 'path/to/shiftKey.png');
        // Cargar fondo
        this.load.image('background', 'path/to/background.png');
    }

    create() {
        // Añadir fondo
        this.add.image(400, 300, 'background').setScale(2);

        const textMenu = this.add.text(this.cameras.main.centerX, 100, 'MAIN MENU', { 
            font: '64px BlockKie', 
            fill: '#ffffff' 
        }).setOrigin(0.5);
        textMenu.setTint(0xff00ff, 0xff00ff, 0x0000ff, 0x0000ff);

        const startText = this.add.text(this.cameras.main.centerX, 200, 'Click to Start', { 
            font: '32px Arial', 
            fill: '#ff0000' 
        }).setOrigin(0.5);

        textMenu.setInteractive();
        textMenu.on('pointerdown', () => this.scene.start('Level1'));
        startText.setInteractive();
        startText.on('pointerdown', () => this.scene.start('Level1'));

        let audioMenu = this.sound.add('MenuAudio');
        audioMenu.play({ volume: 0.01 });

        const controlsX = this.cameras.main.centerX;

        this.add.image(controlsX - 150, 400, 'arrowLeft').setScale(0.5).setOrigin(0.5);
        this.add.text(controlsX + 50, 400, 'Move Left', { font: '24px Arial', fill: '#ffffff' }).setOrigin(0.5);

        this.add.image(controlsX - 150, 450, 'arrowRight').setScale(0.5).setOrigin(0.5);
        this.add.text(controlsX + 50, 450, 'Move Right', { font: '24px Arial', fill: '#ffffff' }).setOrigin(0.5);

        this.add.image(controlsX - 150, 500, 'spaceKey').setScale(0.5).setOrigin(0.5);
        this.add.text(controlsX + 50, 500, 'Jump', { font: '24px Arial', fill: '#ffffff' }).setOrigin(0.5);

        this.add.image(controlsX - 150, 550, 'shiftKey').setScale(0.5).setOrigin(0.5);
        this.add.text(controlsX + 50, 550, 'Sprint', { font: '24px Arial', fill: '#ffffff' }).setOrigin(0.5);

        const gameDescription = `
            In a dystopian world ruled by an evil tyrant known as "The Bald One," three heroes emerge to fight for freedom. 
            Alex, a resourceful human, Cyron, a rebellious cyborg, and Zarnak, a fierce reptilian warrior, each driven by loss and a desire for justice. 
            Together, they lead a resistance to dismantle The Bald One's regime, facing deadly traps, mutated creatures, and cybernetic soldiers. 
            Join their perilous journey and fight for liberation in this thrilling adventure.
        `;
        this.add.text(this.cameras.main.centerX, 650, gameDescription, { 
            font: '16px Arial', 
            fill: '#ffffff', 
            align: 'center',
            wordWrap: { width: 700 } 
        }).setOrigin(0.5);
    }
}
