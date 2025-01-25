scene.onHitWall(SpriteKind.Player, function (sprite, location) {
    loser = sprite
    game.gameOver(false)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Alan.vy == 0) {
        Alan.vy = -60
    }
})
function initPlayer (playerNumber: number, playerSprite: Sprite) {
    mp.setPlayerState(mp.getPlayerByNumber(playerNumber), MultiplayerState.score, 0)
    mp.setPlayerSprite(mp.getPlayerByNumber(playerNumber), playerSprite)
    mp.moveWithButtons(mp.getPlayerByNumber(playerNumber), 100, 0)
}
let loser: Sprite = null
let Alan: Sprite = null
let Mr_Shrimpton = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . f f . . . . f f . . . . 
    . . . . . f f . . . f . . . . . 
    . . . . . . f f . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . f . . . f . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . f f f f . . . . . . 
    . . . . . . f . . f . . . . . . 
    . . . . . . . . . f . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
Alan = sprites.create(assets.image`player`, SpriteKind.Player)
let Israel = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . f f . . . . f f . . . . 
    . . . . . f f . . . f . . . . . 
    . . . . . . f f . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . f . . . f . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . f f f f . . . . . . 
    . . . . . . f . . f . . . . . . 
    . . . . . . . . . f . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
let Yichi = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . f f . . . . f f . . . . 
    . . . . . f f . . . f . . . . . 
    . . . . . . f f . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . f . . . f . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . f f f f . . . . . . 
    . . . . . . f . . f . . . . . . 
    . . . . . . . . . f . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
let Federico = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . f f . . . . f f . . . . 
    . . . . . f f . . . f . . . . . 
    . . . . . . f f . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . f . . . f . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . f f f f . . . . . . 
    . . . . . . f . . f . . . . . . 
    . . . . . . . . . f . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
let PlayableCharacters = [
Mr_Shrimpton,
Alan,
Israel,
Yichi,
Federico
]
let gravity = 9.81 * 7
scene.setBackgroundColor(13)
tiles.setCurrentTilemap(tilemap`Classroom Chaos`)
game.setGameOverMessage(false, "[1]" + " lost!")
game.setGameOverEffect(false, effects.dissolve)
