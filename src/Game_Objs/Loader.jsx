export class Loader {
    constructor(scene) {
        this.scene = scene;
    }

    loadImage(key, file) {
        this.scene.load.image(key, `https://res.cloudinary.com/gamacloud/image/upload/f_auto,q_auto/${file}`);
    }
}

export class LoadSprites {
    constructor(scene) {
        this.scene = scene;
    }

    loadAllSprites() {
        const sprites = [
            {name: 'enemy_Death', file: 'andmy3lojoonpgh65eao', fW: 32, fH: 32},
            {name: 'hans_Idle', file: 'zzqfyf7jgagcbsf8rlpi', fW: 38, fH: 47},
            {name: 'hans_Walk', file: 'al5wu99scg2gvf6l5xtj', fW: 28, fH: 48},
            {name: 'hans_Attack', file: 'zws7cgdoexextnuei65y', fW: 96, fH: 48},
            {name: 'hans_Jump', file: 'gonl723dsg7uyxk5jjfn', fW: 32, fH: 48},
            {name: 'skeleton_Idle', file: 'l9nfae8gzlz1v5wcri6g', fW: 32, fH: 48},
            {name: 'skeleton_Walk', file: 'vt3mcozygy662kqqhbpj', fW: 32, fH: 48},
            {name: 'skeleton_Attack', file: 'aersz1hf3hpenilbxawq', fW: 32, fH: 48},
            {name: 'skeleton_Jump', file: 'vt3mcozygy662kqqhbpj', fW: 32, fH: 48},
            {name: 'skeleton_Death', file: 'andmy3lojoonpgh65eao', fW: 37, fH: 42},
            {name: 'dragon', file: 'oqoqionyukvsistp7zni', fW: 32, fH: 32},
            {name: 'dragon_attack', file: 'd9eisky3mwebbra74nvn', fW: 32, fH: 32},
            {name: 'dragon_Jump', file: 'd9eisky3mwebbra74nvn', fW: 32, fH: 32},
            {name: 'human_Idle', file: 'cicdunkkbwslwdeuusj9', fW: 32, fH: 48},
            {name: 'human_Walk', file: 'elrnaw4vkd5v8c84342w', fW: 32, fH: 48},
            {name: 'human_Jump', file: 'o7f7qzaphpa9y4br37yi', fW: 34, fH: 48},
            {name: 'human_Run', file: 'aunrn73y0hxd9twql7ds', fW: 30, fH: 48},
            {name: 'cyborg_Idle', file: 'aexuwopxsimi1tm2eexp', fW: 32, fH: 48},
            {name: 'cyborg_Jump', file: 'cvensabnafpmrq61nash', fW: 34, fH: 48},
            {name: 'cyborg_Walk', file: 'z4tfwmy7z3rrzbyvvvzr', fW: 32, fH: 48},
            {name: 'reptile_Idle', file: 'tsrfmcjd1twcxfvlzffp', fW: 32, fH: 48},
            {name: 'reptile_Walk', file: 'ynscb3swj4v4ygrcihzs', fW: 32, fH: 48},
            {name: 'reptile_Jump', file: 'ooibpleeenzf44pajeh7', fW: 32, fH: 44},
        ];

        sprites.forEach(sprite => {
            this.scene.load.spritesheet(sprite.name, `https://res.cloudinary.com/gamacloud/image/upload/f_auto,q_auto/${sprite.file}`, {
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

    loadAudio(audio, file) {
        this.scene.load.audio(audio, `https://res.cloudinary.com/gamacloud/image/upload/f_auto,q_auto/${file}`);
    }
}

export class LoadKeyBoard {
    constructor(scene) {
        this.scene = scene;
    }

    loadKeyBoard(key, file, frameWidth, frameHeight) {
        this.scene.load.spritesheet(key, `https://res.cloudinary.com/gamacloud/image/upload/f_auto,q_auto/${file}`, {
            frameWidth: frameWidth,
            frameHeight: frameHeight
        });
    }
}