mp.onButtonEvent(mp.MultiplayerButton.A, ControllerButtonEvent.Pressed, function (player2) {
    if (mp.getPlayerSprite(player2).vy == 0) {
        mp.getPlayerSprite(player2).vy = -60
    }
})
function initPlayer (playerNumber: number, playerSprite: Sprite) {
    mp.setPlayerSprite(mp.getPlayerByNumber(playerNumber), playerSprite)
    mp.setPlayerState(mp.getPlayerByNumber(playerNumber), MultiplayerState.score, 0)
    mp.moveWithButtons(mp.getPlayerByNumber(playerNumber), 100, 0)
    characterAnimations.loopFrames(
    playerSprite,
    assets.animation`AlanIdle`,
    1000,
    characterAnimations.rule(Predicate.NotMoving, Predicate.MovingRight, Predicate.MovingRight)
    )
    playerSprite.setScale(1, ScaleAnchor.TopLeft)
    playerSprite.ay = GRAVITY
}
let GRAVITY = 0
let gameStarted = false
let middleOfPlayers = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
scene.cameraFollowSprite(middleOfPlayers)
GRAVITY = 9.81 * 7
let Alan = sprites.create(assets.image`Alan`, SpriteKind.Player)
let Israel = sprites.create(assets.image`myImage`, SpriteKind.Player)
let PlayableCharacters = [Alan, Israel]
for (let value of PlayableCharacters) {
    value.setScale(0.00001, ScaleAnchor.TopLeft)
}
info.player1.setScore(0)
info.player2.setScore(0)
scene.setBackgroundColor(0)
tiles.setCurrentTilemap(tilemap`Classroom Chaos`)
initPlayer(1, Alan)
initPlayer(2, Israel)
gameStarted = true
game.setGameOverMessage(false, "[1]" + " lost!")
game.setGameOverEffect(false, effects.dissolve)
forever(function () {
    if (gameStarted) {
        middleOfPlayers.setPosition((mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).x + mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).x) / 2, (mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).y + mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).y) / 2)
    }
})
