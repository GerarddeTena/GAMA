import Phaser from "phaser";
import { useEffect } from "react";
import { Menu } from "./Scenes/Menu.jsx";
import { Select_Character } from "./Scenes/Character_Selection.jsx";
import PauseMenu from "/src/src_Phaser/Scenes/PauseMenu.jsx";
import {Level2} from "./Scenes/Level2.jsx";
import {Level1} from "./Scenes/Level1.jsx";
import {Level3} from "./Scenes/Level3.jsx";

const PhaserConfig = () => {
  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: window.innerWidth,
      height: window.innerHeight,
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 900 },
          debug: false,
        },
      },
      scene: [Menu, Select_Character, Level1, Level2, Level3, PauseMenu],
    };

    const game = new Phaser.Game(config);

    return () => game.destroy(true);
  }, []);
};

export default PhaserConfig;
