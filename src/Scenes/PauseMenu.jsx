import Phaser from "phaser";

class PauseMenu extends Phaser.Scene {
  constructor() {
    super({ key: "PauseMenu" });
    this.selectedTextIndex = 0;
  }

  create() {
    this.add.text(100, 50, "Pause Menu", { fontSize: "32px BlockKie"});

    this.text = [
      this.add.text(100, 100, "Resume", { color: "#ffffff" }),
      this.add.text(100, 150, "Exit", { color: "#ffffff" }),
    ];

    this.input.keyboard.on("keydown-W", () => {
      if (this.selectedTextIndex > 0) {
        this.selectedTextIndex--;
        this.updateTextSelection();
      }
    });

    this.input.keyboard.on("keydown-S", () => {
      if (this.selectedTextIndex < this.text.length - 1) {
        this.selectedTextIndex++;
        this.updateTextSelection();
      }
    });

    this.input.keyboard.on("keydown-ENTER", () => {
      const selectedText = this.text[this.selectedTextIndex].text;
      if (selectedText === "Resume") {
        this.scene.stop('PauseMenu');
        this.scene.resume('Level1' || 'Level2');
      }
      else if (selectedText === "Exit") {
        this.cameras.main.fadeOut(2000, 0, 0, 0);
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
          this.anims.pauseAll();
          this.sound.pauseAll();
          this.time.removeAllEvents();
          this.scene.stop('Level1' || 'Level2');
          this.scene.start('Menu');
        })
      }
    });

    this.updateTextSelection = () => {
      this.text.forEach((text, index) => {
        text.setTint(index === this.selectedTextIndex ? 0xff0000 : 0xffffff);
      });
    };

    this.updateTextSelection();

    // Add key legend
    this.add.text(100, 200, "W/S: Navigate, ENTER: Select", {
      color: "#ffffff",
    });
  }
}

export default PauseMenu;
