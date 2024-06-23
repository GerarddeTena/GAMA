export function followPlayer(sprite, player, velocity, walkAnim, idleAnim, jumpAnim) {
    if (sprite !== null) {
        sprite.setCollideWorldBounds(true);
        sprite.setBounce(0.2, 0);
    }


    this.time.addEvent({
        delay: 1500,
        callback: () => {

            if (sprite && sprite.body && player.y < sprite.y - 100 && player.x < sprite.x + 100 && sprite.body.blocked.down && sprite.currentAnim !== jumpAnim) {
                sprite.body.setVelocityY(-500);
                sprite.body.setVelocityX(player.x < sprite.x ? -velocity : velocity);
                sprite.anims.play(jumpAnim, true);
                sprite.setFlipX(sprite.x < player.x);
            }
            else if (sprite && sprite.body && player.x > sprite.x) {
                sprite.body.setVelocityX(velocity);
                sprite.setFlipX(false);
                sprite.anims.play(walkAnim);
            }
            else if (sprite && sprite.body && player.x < sprite.x) {
                sprite.body.setVelocityX(-velocity);
                sprite.setFlipX(true);
                sprite.anims.play(walkAnim);
            }
            else if (sprite && sprite.body) {
                sprite.body.setVelocityX(0);
                sprite.anims.play(idleAnim);
            }


        },
        loop: true,
    });
}