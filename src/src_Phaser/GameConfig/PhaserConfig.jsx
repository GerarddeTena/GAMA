import Phaser from 'phaser';
import {useEffect} from "react";
import {Level1} from "../Levels/Level1.jsx";

const PhaserConfig = () => {

    useEffect(() => {
        const config = {
            type: Phaser.AUTO,
            width: 1536,
            height: 720,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: {y: 900},
                    debug: false
                }
            },
            scene: Level1
        };

        const game = new Phaser.Game(config);

        return () => game.destroy(true);
    }, []);

}

export default PhaserConfig;