export class Loader {
    constructor(scene) {
        this.scene = scene;
    }

    loadImage(image, file) {
        this.scene.load.image(image, `../../public/assets/Phaser_Assets/${file}.png`);
    }
}

export class LoadSprites {
    constructor(scene) {
        this.scene = scene;
    }

    loadAllSprites() {
        const sprites = [
            {name: 'enemy_Death', file: 'Enemy_Death', fW: 32, fH: 32},
            {name: 'hans_Idle', file: 'H_Idle', fW: 38, fH: 47},
            {name: 'hans_Walk', file: 'H_Walk', fW: 28, fH: 48},
            {name: 'hans_Attack', file: 'Hans_Attack', fW: 96, fH: 48},
            {name: 'hans_Jump', file: 'H_Jump', fW: 32, fH: 48},
            {name: 'skeleton_Idle', file: 'Skeleton_Idle', fW: 32, fH: 48},
            {name: 'skeleton_Walk', file: 'Skeleton_Walk', fW: 32, fH: 48},
            {name: 'skeleton_Attack', file: 'Skeleton_Attack', fW: 32, fH: 48},
            {name: 'skeleton_Jump', file: 'Skeleton_Idle', fW: 32, fH: 48},
            {name: 'skeleton_Death', file: 'Skeleton_Death', fW: 37, fH: 42},
            {name: 'dragon', file: 'ManiacDragon', fW: 32, fH: 32},
            {name: 'dragon_attack', file: 'Dragon_Hystheria', fW: 32, fH: 32},
            {name: 'dragon_Jump', file: 'ManiacDragon', fW: 32, fH: 32},
            {name: 'beast', file: 'FinalDragon_Walk', fW: 160, fH: 128},
            {name: 'human_Idle', file: 'Human_Idle', fW: 32, fH: 48},
            {name: 'human_Walk', file: 'Walking_Human', fW: 32, fH: 48},
            {name: 'human_Jump', file: 'Jumping_Human', fW: 34, fH: 48},
            {name: 'human_Run', file: 'Human_Run', fW: 30, fH: 48},
            {name: 'cyborg_Idle', file: 'Cyborg_Idle', fW: 32, fH: 48},
            {name: 'cyborg_Jump', file: 'Jumping_Cyborg', fW: 34, fH: 48},
            {name: 'cyborg_Walk', file: 'Walking_Cyborg', fW: 32, fH: 48},
            {name: 'reptile_Idle', file: 'Reptile_Idle', fW: 32, fH: 48},
            {name: 'reptile_Walk', file: 'Walking_Reptile', fW: 32, fH: 48},
            {name: 'reptile_Jump', file: 'Jumping_Reptile', fW: 32, fH: 44},
        ];

        sprites.forEach(sprite => {
            this.scene.load.spritesheet(sprite.name, `../../public/assets/Phaser_Assets/${sprite.file}.png`, {
                frameWidth: sprite.fW,
                frameHeight: sprite.fH
            });
        });
    }
}

export class LoadAudio {
    constructor(scene) {
        this.scene = scene;
    }

    loadAudio(audio, dir, file) {
        this.scene.load.audio(audio, `../../public/assets/Phaser_Assets/${dir}/${file}.mp3`);
    }
}

export class LoadKeyWords {
    constructor(scene) {
        this.scene = scene;
    }

    loadKeyWords(key, file, frameWidth, frameHeight) {
        this.scene.load.spritesheet(key, `../../public/assets/Phaser_Assets/${file}.png`, {
            frameWidth: frameWidth,
            frameHeight: frameHeight
        });
    }
}