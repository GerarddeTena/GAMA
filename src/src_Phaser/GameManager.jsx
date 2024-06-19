import Phaser from 'phaser'

class GameManager {
    constructor() {
        this.score = 0;
        this.level = 1;
    }

    static getInstance() {
        if (!GameManager.instance) {
            GameManager.instance = new GameManager();
        }
        return GameManager.instance;
    }

    resetGame() {
        this.score = 0;
        this.level = 1;
    }

    increaseScore(amount) {
        this.score += amount;
    }

    nextLevel() {
        this.level += 1;
    }
    changeScene(sceneKey) {
        this.game.scene.stop(this.game.scene.keys[0]); // Detener la primera escena actual
        this.game.scene.start(sceneKey); // Iniciar la nueva escena
    }
}

export default GameManager;
