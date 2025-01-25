controller.A.onEvent(ControllerButtonEvent.Pressed, function on_a_pressed() {
    if (playerChar.vy == 0) {
        playerChar.vy = -60
    }
    
})
let playerChar : Sprite = null
let gravity = 9.81 * 7
scene.setBackgroundColor(2)
playerChar = sprites.create(assets.image`
    player
`, SpriteKind.Player)
controller.moveSprite(playerChar, 100, 0)
tiles.setCurrentTilemap(tilemap`
    Classroom Chaos
`)
playerChar.ay = gravity
