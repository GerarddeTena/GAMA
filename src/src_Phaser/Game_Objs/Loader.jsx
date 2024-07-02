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
            {name: 'enemy_Death', dir: 'Enemies', file: 'Enemy_Death', fW: 32, fH: 32},
            {name: 'hans_Idle', dir: 'Enemies', file: 'H_Idle', fW: 38, fH: 47},
            {name: 'hans_Walk', dir: 'Enemies', file: 'H_Walk', fW: 28, fH: 48},
            {name: 'hans_Attack', dir: 'Enemies', file: 'Hans_Attack', fW: 96, fH: 48},
            {name: 'hans_Jump', dir: 'Enemies', file: 'H_Jump', fW: 32, fH: 48},
            {name: 'skeleton_Idle', dir: 'Enemies', file: 'Skeleton_Idle', fW: 32, fH: 48},
            {name: 'skeleton_Walk', dir: 'Enemies', file: 'Skeleton_Walk', fW: 32, fH: 48},
            {name: 'skeleton_Attack', dir: 'Enemies', file: 'Skeleton_Attack', fW: 32, fH: 48},
            {name: 'skeleton_Jump', dir: 'Enemies', file: 'Skeleton_Idle', fW: 32, fH: 48},
            {name: 'skeleton_Death', dir: 'Enemies', file: 'Skeleton_Death', fW: 37, fH: 42},
            {name: 'dragon', dir: 'Enemies', file: 'ManiacDragon', fW: 32, fH: 32},
            {name: 'dragon_attack', dir: 'Enemies', file: 'Dragon_Hystheria', fW: 32, fH: 32},
            {name: 'dragon_Jump', dir: 'Enemies', file: 'ManiacDragon', fW: 32, fH: 32},
            {name: 'beast', dir: 'Enemies', file: 'FinalDragon_Walk', fW: 160, fH: 128},
            {name: 'human_Idle', dir: 'Players', file: 'Human_Idle', fW: 32, fH: 48},
            {name: 'human_Walk', dir: 'Players', file: 'Walking_Human', fW: 32, fH: 48},
            {name: 'human_Jump', dir: 'Players', file: 'Jumping_Human', fW: 34, fH: 48},
            {name: 'human_Run', dir: 'Players', file: 'Human_Run', fW: 30, fH: 48},
            {name: 'cyborg_Idle', dir: 'Players', file: 'Cyborg_Idle', fW: 32, fH: 48},
            {name: 'cyborg_Jump', dir: 'Players', file: 'Jumping_Cyborg', fW: 34, fH: 48},
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