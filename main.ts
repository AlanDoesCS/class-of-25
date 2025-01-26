namespace MultiplayerState {
    export const numJumps = MultiplayerState.create()
}
function openCredits () {
    MMBTNPressed = false
    scene.setBackgroundImage(assets.image`CreditsBG`)
    pauseUntil(() => MMBTNPressed)
    openMenu()
}
mp.onButtonEvent(mp.MultiplayerButton.A, ControllerButtonEvent.Pressed, function (player2) {
    if (gameStarted) {
        if (mp.getPlayerProperty(player2, mp.PlayerProperty.Number) == 1 && 0 < player1Jumps) {
            mp.getPlayerSprite(player2).vy = GRAVITY * -0.5
            player1Jumps += -1
        } else if (mp.getPlayerProperty(player2, mp.PlayerProperty.Number) == 2 && 0 < player2Jumps) {
            mp.getPlayerSprite(player2).vy = GRAVITY * -0.5
            player2Jumps += -1
        }
    } else {
        MMBTNPressed = true
    }
})
function initFightLevel (player1Sprite: Sprite, player2Sprite: Sprite) {
    middleOfPlayers = sprites.create(assets.image`Empty`, SpriteKind.Player)
    scene.cameraFollowSprite(middleOfPlayers)
    GRAVITY = 350
    info.player1.setScore(0)
    info.player2.setScore(0)
    scene.setBackgroundColor(3)
    tiles.setCurrentTilemap(tilemap`Classroom Chaos`)
    initPlayer(1, player1Sprite)
    initPlayer(2, player2Sprite)
    player1Jumps = 3
    player2Jumps = 3
    gameStarted = true
}
function getPlayerX (playerNum: number) {
    return mp.getPlayerSprite(mp.getPlayerByNumber(playerNum)).x
}
function initPlayer (playerNumber: number, playerSprite: Sprite) {
    mp.setPlayerSprite(mp.getPlayerByNumber(playerNumber), playerSprite)
    mp.setPlayerState(mp.getPlayerByNumber(playerNumber), MultiplayerState.score, 0)
    mp.moveWithButtons(mp.getPlayerByNumber(playerNumber), 100, 0)
    mp.setPlayerState(mp.getPlayerByNumber(playerNumber), MultiplayerState.numJumps, 3)
    characterAnimations.loopFrames(
    playerSprite,
    assets.animation`AlanIdle`,
    1000,
    characterAnimations.rule(Predicate.NotMoving, Predicate.MovingRight, Predicate.MovingRight)
    )
    playerSprite.setScale(1, ScaleAnchor.TopLeft)
    playerSprite.ay = GRAVITY
    tiles.placeOnTile(playerSprite, tiles.getTileLocation(13 + 5 * (playerNumber - 1), 5))
}
function getPlayerVX (playerNum2: number) {
    return mp.getPlayerSprite(mp.getPlayerByNumber(playerNum2)).vx
}
function getPlayerVY (playerNum3: number) {
    return mp.getPlayerSprite(mp.getPlayerByNumber(playerNum3)).vy
}
function getPlayerY (playerNum4: number) {
    return mp.getPlayerSprite(mp.getPlayerByNumber(playerNum4)).y
}
mp.onButtonEvent(mp.MultiplayerButton.Down, ControllerButtonEvent.Pressed, function (player2) {
    if (gameStarted) {
    	
    } else {
        music.play(music.melodyPlayable(music.knock), music.PlaybackMode.InBackground)
        if (MMSelectedButton == "start") {
            MMSelectedButton = "credits"
            scene.setBackgroundImage(assets.image`MainMenuBG_CreditsSelected`)
        } else {
            MMSelectedButton = "start"
            scene.setBackgroundImage(assets.image`MainMenuBG_StartSelected`)
        }
    }
})
function openMenu () {
    MMBTNPressed = false
    MMSelectedButton = "start"
    color.startFade(color.GrayScale, color.originalPalette)
    scene.setBackgroundImage(assets.image`MainMenuBG_StartSelected`)
    music.play(music.melodyPlayable(music.beamUp), music.PlaybackMode.InBackground)
    pauseUntil(() => MMBTNPressed)
    if (MMSelectedButton == "start") {
        scene.cameraShake(4, 500)
        scene.setBackgroundImage(assets.image`EmptyMenuBG`)
        gameStarted = false
        Alan = sprites.create(assets.image`Alan`, SpriteKind.Player)
        Israel = sprites.create(assets.image`myImage`, SpriteKind.Player)
        PlayableCharacters = [Alan, Israel]
        initFightLevel(Alan, Israel)
    } else {
        openCredits()
    }
}
mp.onButtonEvent(mp.MultiplayerButton.Up, ControllerButtonEvent.Pressed, function (player2) {
    if (gameStarted) {
    	
    } else {
        music.play(music.melodyPlayable(music.knock), music.PlaybackMode.InBackground)
        if (MMSelectedButton == "start") {
            MMSelectedButton = "credits"
            scene.setBackgroundImage(assets.image`MainMenuBG_CreditsSelected`)
        } else {
            MMSelectedButton = "start"
            scene.setBackgroundImage(assets.image`MainMenuBG_StartSelected`)
        }
    }
})
let PlayableCharacters: Sprite[] = []
let Israel: Sprite = null
let Alan: Sprite = null
let MMSelectedButton = ""
let middleOfPlayers: Sprite = null
let GRAVITY = 0
let player2Jumps = 0
let player1Jumps = 0
let gameStarted = false
let MMBTNPressed = false
openMenu()
forever(function () {
    if (gameStarted) {
        middleOfPlayers.setPosition((mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).x + mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).x) / 2, (mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).y + mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).y) / 2)
        for (let index = 0; index <= 1; index++) {
            if (getPlayerVY(index + 1) == 0 && index == 0) {
                player1Jumps = 3
            } else if (getPlayerVY(index + 1) == 0 && index == 0) {
                player2Jumps = 3
            }
        }
    }
})
