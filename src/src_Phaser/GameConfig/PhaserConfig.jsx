import Phaser from 'phaser';
import {useEffect} from "react";
import {Hans} from "../Game_Objs/Hans";
import {Skeleton} from "../Game_Objs/Skeleton";
import {Dragon} from "../Game_Objs/Dragon";

const PhaserConfig = () => {
    const SIZE_ADJUST = 50;
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
            scene: {
                preload: function () {
                    // Platforms:

                    this.load.image('background', 'src/src_Phaser/assets/sprites/background/Cathedral_1.png');
                    this.load.image('platform', 'src/src_Phaser/assets/sprites/Platform.png');
                    this.load.image('corridor', 'src/src_Phaser/assets/sprites/Corridor.png');
                    this.load.image('block', 'src/src_Phaser/assets/sprites/PlatformBlock.png');

                    //Enemies:

                    this.load.spritesheet('Hans_Idle', 'src/src_Phaser/assets/sprites/Enemies/H_Idle.png', {
                        frameWidth: 38,
                        frameHeight: 47
                    });
                    this.load.spritesheet('Hans_Walk', 'src/src_Phaser/assets/sprites/Enemies/H_Walk_Right.png', {
                        frameWidth: 28,
                        frameHeight: 48
                    });
                    this.load.spritesheet('Skeleton_Idle', 'src/src_Phaser/assets/sprites/Enemies/Skeleton_Idle_Right.png', {
                        frameWidth: 32,
                        frameHeight: 48
                    });
                    this.load.spritesheet('Skeleton_Walk', 'src/src_Phaser/assets/sprites/Enemies/Skeleton_Walk_Right.png', {
                        frameWidth: 32,
                        frameHeight: 48
                    })
                    this.load.spritesheet('Dragon', 'src/src_Phaser/assets/sprites/Enemies/ManiacDragon.png', {
                        frameWidth: 32,
                        frameHeight: 32
                    });
                },
                create: function () {
                    this.add.image(0, 0, 'background').setOrigin(0, 0);
                    const platforms = this.physics.add.staticGroup();
                    let platform1 = platforms.create(300, 700, 'corridor').setScale(1);
                    let platform2 = platforms.create(500, 400, 'block').setScale(2);
                    let platform3 = platforms.create(400, 700, 'corridor').setScale(1);
                    let platform4 = platforms.create(100, 700, 'corridor').setScale(1);
                    let platform5 = platforms.create(200, 700, 'corridor').setScale(1);
                    let platform6 = platforms.create(500, 700, 'corridor').setScale(1);
                    platform1.body.setSize(platform1.width, platform1.height - 20);
                    platform2.body.setSize(platform2.width, platform2.height - 20);
                    platform3.body.setSize(platform3.width, platform3.height - 20);
                    platform4.body.setSize(platform3.width, platform3.height - 20);
                    platform5.body.setSize(platform3.width, platform3.height - 20);
                    platform6.body.setSize(platform3.width, platform3.height - 20);
                    platform1.refreshBody();
                    platform2.refreshBody();
                    platform3.refreshBody();
                    platform4.refreshBody();
                    platform5.refreshBody();

                    let hans = new Hans(this, 200, 100, 'HansIdle');
                    hans.body.setSize(hans.width, hans.height - SIZE_ADJUST);
                    hans.body.setOffset(0, 50);

                    let skeleton = new Skeleton (this, 200, 200, 'Skeleton_Idle');

                    skeleton.body.setSize(skeleton.width, skeleton.height - SIZE_ADJUST);
                    skeleton.body.setOffset(0, 50);

                    let dragon = new Dragon(this, 300, 300, 'Dragon');

                    dragon.body.setSize(dragon.width, dragon.height - SIZE_ADJUST);
                    dragon.body.setOffset(0, 50);

                    // Automatic movement
                    let delay = Phaser.Math.Between(1000, 3000);
                    let isWalking = false
                    this.time.addEvent({
                        delay: delay,
                        callback: () => {
                            if (!isWalking) {
                                hans.anims.play('Hans_Walk');
                                skeleton.anims.play('Skeleton_Walk');
                                skeleton.setVelocityX(100);
                                hans.setVelocityX(100);
                                isWalking = true;
                            } else {
                                hans.anims.play('Hans_Idle');
                                hans.setVelocityX(0);
                                skeleton.setVelocityX(0);
                                isWalking = false;
                            }
                        },
                        loop: true
                    });
                    // Add colliders
                    this.physics.add.collider(hans, platforms);
                    this.physics.add.collider(skeleton, platforms);
                    this.physics.add.collider(dragon, platforms);
                }
            }
        };

        const game = new Phaser.Game(config);

        return () => game.destroy(true);
    }, []);

    // return <div id='phaser-game'></div>
}

export default PhaserConfig;