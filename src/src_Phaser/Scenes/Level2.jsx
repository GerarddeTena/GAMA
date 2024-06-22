import Phaser from "phaser";
import { Loader, LoadSprites } from "../Game_Objs/Loader.jsx";
import { Platforms } from "../Game_Objs/Platforms.jsx";
import { Hans } from "../Game_Objs/NPC/NPC LVL1/Hans.jsx";
import { Skeleton } from "../Game_Objs/NPC/NPC LVL1/Skeleton.jsx";
import { Dragon } from "../Game_Objs/NPC/NPC LVL1/Dragon.jsx";
import { Human } from "../Game_Objs/Player/Player_Human.jsx";
import { followPlayer } from "../GameConfig/NPCLogic.jsx";
import { Cyborg } from "../Game_Objs/Player/Player_Cyborg.jsx";
import { Reptile } from "../Game_Objs/Player/Player_Reptile.jsx";

export class Level2 extends Phaser.Scene {
  constructor() {
    super({ key: "Level2" });
  }

  preload() {
    const loader = new Loader(this);
    const spriteLoad = new LoadSprites(this);

    loader.loadImage("background", "background", "Subway");
    loader.loadImage("platform", "", "Platform");
    loader.loadImage("block", "", "PlatformBlock");
    spriteLoad.loadAllSprites();
  }

  create() {
    const centerX = this.cameras.main.centerX;
    const centerY = this.cameras.main.centerY;
    const offset = 100;

    const Rand = (n) => Math.floor(Math.random() * n);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.keys = this.input.keyboard.addKeys(["A", "D"]);

    this.add
      .image(centerX - offset * 15, centerY - offset, "background")
      .setOrigin(0, 0)
      .setScale(1.87);

    this.platforms = new Platforms(this.physics.world, this, null, [
      { x: 100, y: 600, key: "platform" },
      { x: 300, y: 600, key: "platform" },
    ]);

    const selectedCharacter = this.registry.get("Character Selected");
    switch (selectedCharacter) {
      case "Human":
        this.player = new Human(this, 100, 500, "human", 10);
        break;
      case "Cyborg":
        this.player = new Cyborg(this, 100, 500, "cyborg_Idle", 10);
        break;
      case "Reptile":
        this.player = new Reptile(this, 100, 500, "reptile_Idle", 10);
        break;
      default:
        this.player = new Human(this, 100, 500, "human", 10);
        break;
    }

    this.cameras.main.startFollow(this.player, true, 0.05, 0.05, 0, 0);
    this.player.createAnimations(this);

    // NPCs
    this.hans = new Hans(this, Rand(1800), 500, "hans_Idle", 10).setScale(1.5);
    this.hans.setPushable(false);
    this.skeleton = new Skeleton(this, Rand(1800), 550, "skeleton_Idle", 10);
    this.skeleton.setPushable(false);
    this.dragon = new Dragon(this, Rand(1800), 550, "dragon", 10);
    this.dragon.setPushable(false);


    // Colisiones
    this.physics.add.collider(this.hans, this.platforms);
    this.physics.add.collider(this.skeleton, this.platforms);
    this.physics.add.collider(this.dragon, this.platforms);
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.player, this.dragon);
    this.physics.add.collider(this.player, this.skeleton);
    this.physics.add.collider(this.player, this.hans);
    this.physics.add.collider(this.skeleton, this.hans && this.dragon);
    this.physics.add.collider(this.dragon, this.hans && this.skeleton);

    followPlayer.call(
      this,
      this.hans,
      this.player,
      100,
      "hans_Walk",
      "hans_Idle"
    );
    followPlayer.call(
      this,
      this.skeleton,
      this.player,
      100,
      "skeleton_Walk",
      "skeleton_Idle"
    );
    followPlayer.call(
      this,
      this.dragon,
      this.player,
      100,
      "dragon",
      "dragon_attack"
    );

    // Texto de vidas
    this.livesText = this.add.text(10, 10, "Lives: " + this.player.lives, {
      fontSize: "32px",
      fill: "#fff",
    });
    this.livesText.setScrollFactor(0);
  }

  update() {
    this.player.handleAnimations(this.keys, this.cursors);
    this.physics.add.collider(this.player, this.platforms);

    if (
      this.player.x > this.hans.x - 100 &&
      this.player.x < this.hans.x + 100
    ) {
      this.hans.anims.play("hans_Weapon", true);
      this.hans.setFlipX(this.hans.x < this.player.x);
    } else {
      this.hans.anims.play("hans_Walk", true);
      this.hans.setFlipX(this.player.x < this.hans.x);
    }
  }
}

export default Level2;
