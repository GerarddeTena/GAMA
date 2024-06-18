import Phaser from "phaser";

export function randomMovement(sprite, platforms, velocity, walkAnim, idleAnim, weaponAnim){
    let delay = Phaser.Math.Between(1000, 3000);
    let direction = Math.random() < 0.5 ? -1 : 1;
    let isWalking = false;

    sprite.setCollideWorldBounds(true);
    sprite.setBounce(1, 0);

    this.time.addEvent({
        delay: delay,
        callback: () => {
            if (!isWalking) {
                sprite.anims.play(walkAnim);
                sprite.setVelocityX(velocity * direction);
                sprite.setFlipX(direction < 0);
                isWalking = true;
            } else {
                sprite.anims.play(idleAnim);
                sprite.setVelocityX(0);
                isWalking = false;
            }

            if(sprite.currentAnim === weaponAnim){
                sprite.setVelocityX(velocity * direction);
                sprite.setFlipX(direction < 0);
                isWalking = true;
            } else if(sprite.currentAnim !== weaponAnim && sprite.currentAnim !== walkAnim){
                sprite.anims.play(idleAnim);
                sprite.setVelocityX(0);
                isWalking = false;
            } else {
                sprite.anims.play(walkAnim);
                sprite.setVelocityX(velocity * direction);
                sprite.setFlipX(direction < 0);
                isWalking = true;
            }
        },
        loop: true
    });

    this.physics.add.collider(sprite, platforms, (sprite, platform) => {

        if (sprite.body.touching.left && platform.body.touching.right || sprite.body.touching.right && platform.body.touching.left) {
            direction *= -1;
            sprite.setFlipX(direction < 0);
        }

    });

    sprite.body.onWorldBounds = true;
    this.physics.world.on('worldbounds', (body) => {
        if (body.gameObject === sprite) {
            direction *= -1;
            sprite.setFlipX(direction < 0);
            sprite.setVelocityX(velocity * direction);
        }
    });
}