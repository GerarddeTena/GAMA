import Phaser from 'phaser'
import {Human} from "./Game_Objs/Player/Player_Human.jsx";
import {Cyborg} from "./Game_Objs/Player/Player_Cyborg.jsx";
import {Reptile} from "./Game_Objs/Player/Player_Reptile.jsx";

export class Base_Level extends Phaser.Scene {
    constructor(key) {
        super({key: key});
        this.hans = null;
        this.skeleton = null;
        this.dragon = null;
        this.currentAnim = null;
        this.playerHealth = 1000;
    }

    boundsCollision(player) {
        player.setCollideWorldBounds(true);
        player.setBounce(0.2);
    }

    handlePlayerCam(player) {
        this.cameras.main.startFollow(player, true, 0.05, 0.05, 0, 0);
    }

    createCharacter() {
        const selectedCharacter = this.registry.get('Character Selected');
        switch (selectedCharacter) {
            case 'Human':
                this.player = new Human(this, 100, 550, 'human_Idle', 5);
                break;
            case 'Cyborg':
                this.player = new Cyborg(this, 100, 550, 'cyborg_Idle', 5);
                break;
            case 'Reptile':
                this.player = new Reptile(this, 100, 550, 'reptile_Idle', 5);
                break;
            default:
                this.player = new Human(this, 100, 550, 'human_Idle', 5);
                break;
        }
    }

    handleCharacterAnimations(character, animKey, defaultAnimKey, condition) {
        if (character && character.anims) {
            if (condition) {
                character.anims.play(animKey, true);
                character.setFlipX(character.x > this.player.x);
                character.currentAnim = animKey;
            } else {
                character.anims.play(defaultAnimKey, true);
                character.setFlipX(this.player.x < character.x);
                character.currentAnim = defaultAnimKey;
            }
        }
    }

    handleCharacterOverlap(character, animKey, maxHits) {
        if (character && this.physics.overlap(this.player, character)) {
            const playerBottom = this.player.getBounds().bottom;
            const characterTop = character.getBounds().top;

            if (playerBottom <= characterTop && this.player.body.velocity.y > 0) {
                if (!character.isJumpingOnEnemy) {
                    character.isJumpingOnEnemy = true;
                    character.hits = (character.hits || 0) + 1;

                    if (character.hits >= maxHits) {
                        character.anims.play(animKey, true);
                        this.time.delayedCall(1000, () => {
                            if (character) {
                                character.destroy();
                                this.npcCharacters = this.npcCharacters.filter(npc => npc !== character);
                                character = null;
                            }
                        });
                    }
                }
            } else {
                character.isJumpingOnEnemy = false;
            }
        }
    }


    handlePlayerEnemyCollision(player, enemy) {
        if (player.y < enemy.y) {
            return;
        }

        if (!this.player.isInvincible && player.x >= enemy.x - 50 && player.x <= enemy.x + 50) {
            this.player.handlePlayerHit(enemy, this.livesText);
            this.player.isInvincible = true;
            this.time.delayedCall(1000, () => {
                this.player.isInvincible = false;
            });
        }
    }

    update() {
        this.player.handleAnimations(this.keys, this.cursors);
        this.physics.add.collider(this.player, this.platforms);

        if (this.hans !== null) {
            this.physics.overlap(this.player, this.hans, this.handlePlayerEnemyCollision, null, this);
            this.handleCharacterAnimations(this.hans, 'hans_Attack', 'hans_Walk', this.player.x > this.hans.x - 100 && this.player.x < this.hans.x + 100);
            this.handleCharacterOverlap(this.hans, '', 40);
        }

        if (this.skeleton !== null) {
            this.physics.overlap(this.player, this.skeleton, this.handlePlayerEnemyCollision, null, this);
            this.handleCharacterAnimations(this.skeleton, 'skeleton_Attack', 'skeleton_Walk', this.skeleton && this.player.x > this.skeleton.x - 100 && this.player.x < this.skeleton.x + 100);
            this.handleCharacterOverlap(this.skeleton, 'skeleton_Death', 20);
        }

        if (this.dragon !== null) {
            this.physics.overlap(this.player, this.dragon, this.handlePlayerEnemyCollision, null, this);
            this.handleCharacterAnimations(this.dragon, 'dragon_attack', 'dragon', this.dragon && this.player.x > this.dragon.x - 100 && this.player.x < this.dragon.x + 100);
            this.handleCharacterOverlap(this.dragon, 'dragon', 10);
        }

    }




    gameOver(scene) {
        if (this.playerHealth <= 0) {
            this.player.setVelocity(0, 0);
            this.physics.world.gravity.y = 0;
            this.cameras.main.fadeOut(3000, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
                this.scene.stop(scene);
                this.scene.start('Menu');
            });
        }
    }
}

