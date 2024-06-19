import Phaser from 'phaser';
import {LoadAudio} from "../Game_Objs/Loader.jsx";

export class Menu extends Phaser.Scene {
    constructor() {
        super({key: 'Menu'});
    }

    preload() {
        const menuAudio = new LoadAudio(this);
        menuAudio.loadAudio('MenuAudio', '', 'Menu');
    }

    create() {

        const textMenu = this.add.text(350, 100, 'MAIN MENU', {font:'200px BlockKie' });
        textMenu.setTint(0xff00ff, 0xff00ff, 0x0000ff, 0x0000ff);

        textMenu.setInteractive();
        textMenu.on('pointerdown', () => this.scene.start('Level1'));

        let audioMenu = this.sound.add('MenuAudio');
        audioMenu.play({ volume: 0.01 });
        
    }
}