export function followPlayer(sprite, player, velocity, walkAnim, idleAnim){
    sprite.setCollideWorldBounds(true);
    sprite.setBounce(0.2, 0);

    this.time.addEvent({
        delay: 1500,
        callback: () => {
            if (player.x > sprite.x) {
                sprite.setVelocityX(velocity);
                sprite.setFlipX(false);
                sprite.anims.play(walkAnim);
            } else if (player.x < sprite.x) {
                sprite.setVelocityX(-velocity);
                sprite.setFlipX(true);
                sprite.anims.play(walkAnim);
            } else {
                sprite.setVelocityX(0);
                sprite.anims.play(idleAnim);
            }
        },
        loop: true,
    });
}