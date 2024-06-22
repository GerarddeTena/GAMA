export class Loader {
    constructor(scene) {
        this.scene = scene;
    }

    loadImage(image, dir, file) {
        if (dir) {
            this.scene.load.image(image, `src/src_Phaser/assets/sprites/${dir}/${file}.png`);
        } else {
            this.scene.load.image(image, `src/src_Phaser/assets/sprites/${file}.png`);
        }
    }
}

export class LoadSprites {
    constructor(scene) {
        this.scene = scene;
    }

    loadAllSprites() {
        const sprites = [
            {name: 'hans_Idle', dir: 'Enemies', file: 'H_Idle', fW: 38, fH: 47},
            {name: 'hans_Walk', dir: 'Enemies', file: 'H_Walk_Right', fW: 28, fH: 48},
            {name: 'hans_Weapon', dir: 'Enemies', file: 'Hans_Weapon', fW: 92, fH: 48},
            {name: 'skeleton_Idle', dir: 'Enemies', file: 'Skeleton_Idle_Right', fW: 32, fH: 48},
            {name: 'skeleton_Walk', dir: 'Enemies', file: 'skeleton_Walk_Right', fW: 32, fH: 48},
            {name: 'skeleton_Attack', dir: 'Enemies', file: 'Skeleton_Attack_R', fW: 32, fH: 48},
            {name: 'dragon', dir: 'Enemies', file: 'ManiacDragon', fW: 32, fH: 32},
            {name: 'dragon_attack', dir: 'Enemies', file: 'Dragon_Hystheria', fW: 32, fH: 32},
            {name: 'human_Idle', dir: 'Players', file: 'Human_Idle', fW: 32, fH: 48},
            {name: 'human_Walk', dir: 'Players', file: 'Walking_Human', fW: 32, fH: 48},
            {name: 'human_Jump', dir: 'Players', file: 'Jumping_Human', fW: 34, fH: 48},
            {name: 'human_Run', dir: 'Players', file: 'Human_Run', fW: 30, fH: 48},
            {name: 'cyborg_Idle', dir: 'Players', file: 'Cyborg_Idle', fW: 32, fH: 48},
            {name: 'cyborg_Walk', dir: 'Players', file: 'Walking_Cyborg', fW: 32, fH: 48},
            {name: 'reptile_Idle', dir: 'Players', file: 'Reptile_Idle', fW: 32, fH: 48},
            {name: 'reptile_Walk', dir: 'Players', file: 'Walking_Reptile', fW: 32, fH: 48},
            {name: 'reptile_Jump', dir: 'Players', file: 'Jumping_Reptile', fW: 32, fH: 44},
        ];

        sprites.forEach(sprite => {
            this.scene.load.spritesheet(sprite.name, `src/src_Phaser/assets/sprites/${sprite.dir}/${sprite.file}.png`, {
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
        if (dir) {
            this.scene.load.audio(audio, `src/src_Phaser/assets/audio/${dir}/${file}.mp3`);
        } else {
            this.scene.load.audio(audio, `src/src_Phaser/assets/audio/${file}.mp3`);
        }
    }
}

export class LoadKeyWords {
    constructor(scene) {
        this.scene = scene;
    }

    loadKeyWords(key, file, frameWidth, frameHeight) {
        this.scene.load.spritesheet(key, `src/src_Phaser/assets/sprites/${file}.png`, {
            frameWidth: frameWidth,
            frameHeight: frameHeight
        });
    }
}