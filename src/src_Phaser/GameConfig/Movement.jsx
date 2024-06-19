export const updateMovement = () => {
    let cursors = this.input.keyboard.createCursorKeys();
    let player = this.player;
    let playerSpeed = 160;
    let jumpSpeed = -500;

    if (cursors.left.isDown) {
        player.setVelocityX(-playerSpeed);
        player.anims.play('left', true);
    } else if (cursors.right.isDown) {
        player.setVelocityX(playerSpeed);
        player.anims.play('right', true);
    } else {
        player.setVelocityX(0);
        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(jumpSpeed);
    }
}