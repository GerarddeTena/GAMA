import Phaser from "phaser";

export class PauseMenu extends Phaser.Scene {
    constructor() {
        super({key: 'PauseMenu'});
    }

    create() {
        const CENT_X = this.cameras.main.centerX;
        const CENT_Y = this.cameras.main.centerY;
        const Offset = 100;

        this.Pause_Title = this.add.text(CENT_X, CENT_Y, 'Pause Menu', {fontSize: '32px BlockKie'}).setOrigin(0.5);
        this.Pause_Title.setTint(0xff0000, 0xff0000, 0x0000ff, 0x0000ff);

        this.resume = this.add.text(CENT_X, CENT_Y + Offset, 'Options', {fontSize: '32px BlockKie'}).setOrigin(0.5);
        this.resume.setTint(0xff0000, 0xff0000, 0x0000ff, 0x0000ff);
        this.resume.setInteractive();

        this.exit = this.add.text(CENT_X, CENT_Y + Offset + 50, 'Exit', {fontSize: '32px BlockKie'}).setOrigin(0.5);
        this.exit.setTint(0xff0000, 0xff0000, 0x0000ff, 0x0000ff);
        this.exit.setInteractive();

        this.text = [this.resume, this.exit];
        this.textWords = ['Resume', 'Exit'];
        this.selectedTextIndex = 0;

        this.textWords = this.text.map((text, index) => {
            return this.add.text(text.x, text.y, this.textWords[index], {
                font: '24px BlockKie',
                fill: '#ffffff'
            }).setOrigin(0.5, 0.5);
        });

        this.input.keyboard.on('keydown-W', () => {
            if (this.selectedTextIndex > 0) {
                this.selectedTextIndex--;
                this.updateTextSelection();
            }
        });

        this.input.keyboard.on('keydown-S', () => {
            if (this.selectedTextIndex < this.text.length - 1) {
                this.selectedTextIndex++;
                this.updateTextSelection();
            }
        });

        this.input.keyboard.on('keydown-ENTER', () => {
            const selectedText = this.textWords[this.selectedTextIndex];
            if (selectedText === 'Resume') {
                this.scene.resume('Game');
                this.scene.stop();
            } else if (selectedText === 'Exit') {
                this.scene.stop('Game');
                this.scene.start('Menu');
            }
        });

this.updateTextSelection = () => {
        this.text.forEach((text, index) => {
            text.setTint(index === this.selectedTextIndex ? 0xff0000 : 0xffffff);
            this.textWords[index].setTint(index === this.selectedTextIndex ? 0xff0000 : 0xffffff);
        });
};
    }
}