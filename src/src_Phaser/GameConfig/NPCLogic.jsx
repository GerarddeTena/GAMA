export function followPlayer(sprite, player, velocity, walkAnim, idleAnim, jumpAnim) {
    sprite.setCollideWorldBounds(true);
    sprite.setBounce(0.2, 0);

    this.time.addEvent({
        delay: 1500,
        callback: () => {
            if (player.y < sprite.y - 100 && player.x < sprite.x + 100 && sprite.body.blocked.down && sprite.currentAnim !== jumpAnim) {
                sprite.setVelocityY(-500);
                sprite.setVelocityX(player.x < sprite.x ? -velocity : velocity);
                sprite.anims.play(jumpAnim, true);
                sprite.setFlipX(sprite.x < player.x);
            }
            else if (player.x > sprite.x) {
                sprite.setVelocityX(velocity);
                sprite.setFlipX(false);
                sprite.anims.play(walkAnim);
            }
            else if (player.x < sprite.x) {
                sprite.setVelocityX(-velocity);
                sprite.setFlipX(true);
                sprite.anims.play(walkAnim);
            }
            else {
                sprite.setVelocityX(0);
                sprite.anims.play(idleAnim);
            }

        },
        loop: true,
    });
}