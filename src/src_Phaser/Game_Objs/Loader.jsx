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

export class LoadSprite {
    constructor(scene) {
        this.scene = scene;
    }

    loadSprite(sprite, dir, file, frameWidth, frameHeight) {
        if(dir) {
            this.scene.load.spritesheet(sprite, `src/src_Phaser/assets/sprites/${dir}/${file}.png`, {
                frameWidth: frameWidth,
                frameHeight: frameHeight
            });
        } else {
            return alert('Please provide a directory for the sprite file.');
        }
    }
}