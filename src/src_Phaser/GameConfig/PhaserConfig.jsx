import Phaser from 'phaser';
import {useEffect} from "react";
// import {Hans} from "../Game_Objs/NPC/Hans.jsx";
// import {Skeleton} from "../Game_Objs/NPC/Skeleton.jsx";
// import {Dragon} from "../Game_Objs/NPC/Dragon.jsx";
// import {Platforms} from "../Game_Objs/Platforms";
// import {randomMovement} from "./NPCLogic.jsx";
// import {Human} from "../Game_Objs/Player/Player_Human.jsx";
// import {Loader} from "../Game_Objs/Loader.jsx";
import {Level1} from "../Levels/Level1.jsx";


const PhaserConfig = () => {
    //const SIZE_ADJUST = 50;
    //const [isWalking, setIsWalking] = useState(false);

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