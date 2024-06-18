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