import Phaser from 'phaser';
import {Loader, LoadSprites} from "../Game_Objs/Loader.jsx";

export class PhaserGeneralMethods {
    preload(){
        const loadSprite = new LoadSprites(this);
        const loadImage = new Loader(this);

        loadImage.loadImage('bg_lvl2', 'background', 'Subway');
        loadImage.loadImage('platform', '', 'Platform');
        loadImage.loadImage('block', '', 'PlatformBlock');
        loadSprite.loadAllSprites();

    }

    create(){



    }

    update(){

    }
}