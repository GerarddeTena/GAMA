import Phaser from 'phaser'

export class Finish extends Phaser.Scene {
    constructor() {
        super({key: 'Finish'});
    }

    create() {
        const CENT_X = this.cameras.main.centerX;
        const CENT_Y = this.cameras.main.centerY;
        this.endMessage = this.add.text(CENT_X, CENT_Y, 'TO BE CONTINUED ...', {font: 'BlockKie 500px'});
        this.endMessage.setTint(0xff00ff, 0xff00ff, 0x0000ff, 0x0000ff);
        this.endMessage.setScale(4);

        this.cameras.main.fadeOut(4000, 0, 0, 0);
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
            this.scene.stop(this);
            this.sound.pauseAll();
            this.scene.start('Menu');
        });
    }
}