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
        this.score = 0;
    }

    create() {

        this.score = this.registry.get('score') || 0;
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keys = this.input.keyboard.addKeys(['A', 'D']);
        this.createCharacter();
        this.handlePlayerCam(this.player);
        this.player.createAnimations(this);
        this.boundsCollision(this.player);
        this.events.on('characterDestroyed', () => {
            this.score += 50;
            this.registry.set('score', this.score);
            this.scoreText.setText('Score: ' + this.score);
            localStorage.setItem('score', this.score);
        });
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
                        if (character) {
                            character.destroy();
                            this.npcCharacters = this.npcCharacters.filter(npc => npc !== character);
                            this.events.emit('characterDestroyed');
                            character = null;
                        }
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

        this.characterMap.forEach((animKeys, character) => {
            this.physics.overlap(this.player, character, this.handlePlayerEnemyCollision, null, this);
            this.handleCharacterAnimations(character, animKeys.attackAnim, animKeys.walkAnim, character && this.player.x > character.x - 100 && this.player.x < character.x + 100);
            this.handleCharacterOverlap(character, animKeys.deathAnim, 1);
        });

    }

    nextLevel(scene) {
        if (this.npcCharacters.every(npc => npc === null)) {
            this.time.delayedCall(3000, () => {
                this.scene.transition({target: scene, sleep: false, duration: 1000});
            });
        }
    }

    gameOver(scene) {

        if (this.player.playerHealth <= 0) {
            this.scene.transition({target: scene, duration: 1000});
        }
    }


}

