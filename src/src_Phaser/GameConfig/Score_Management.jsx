export class ScoreManagement {
    constructor() {
        this.score = 0;
    }

    addScore(score) {
        this.score += score;
    }

    getScore() {
        return this.score;
    }

    resetScore() {
        this.score = 0;
    }
}