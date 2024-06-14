export function NPCLogic (game, sprite, walk, idle, wTime, iTime) {
    sprite.anims.play(walk);
    sprite.setVelocity(50);
    sprite.setFlipX(false);

    game.time.addEvent({
        delay: wTime,
        callback: () => {
            sprite.anims.play(idle);
            sprite.setVelocity(0);
        },
        loop: false
    });

    game.time.addEvent({
        delay: wTime + iTime,
        callback: () => {
            sprite.anims.play(walk);
            sprite.setVelocity(-50);
            sprite.setFlipX(true);
        },
        loop: false
    });
}