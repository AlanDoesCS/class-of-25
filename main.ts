namespace SpriteKind {
    export const Cursor = SpriteKind.create()
}
namespace MultiplayerState {
    export const numJumps = MultiplayerState.create()
}
function clamp (min: number, value: number, max: number) {
    return Math.min(max, Math.max(value, min))
}
function openCredits () {
    MMBTNPressed = false
    scene.setBackgroundImage(assets.image`CreditsBG`)
    pauseUntil(() => MMBTNPressed)
    openMenu()
}
mp.onButtonEvent(mp.MultiplayerButton.Right, ControllerButtonEvent.Pressed, function (player2) {
    if (gameStarted) {
    	
    } else {
        if (MMType == "characterSelect") {
            music.play(music.melodyPlayable(music.knock), music.PlaybackMode.InBackground)
            MMSelectedCharacterCoordinates = setMat4x4(mp.getPlayerProperty(player2, mp.PlayerProperty.Number) - 1, 0, clamp(0, getMat4x4(mp.getPlayerProperty(player2, mp.PlayerProperty.Number) - 1, 0, MMSelectedCharacterCoordinates) + 1, 2), MMSelectedCharacterCoordinates)
            if (player2 == mp.playerSelector(mp.PlayerNumber.One)) {
                tiles.placeOnTile(cursorP1, tiles.getTileLocation(1 + getMat4x4(0, 0, MMSelectedCharacterCoordinates), 4 + getMat4x4(0, 1, MMSelectedCharacterCoordinates)))
            } else {
                tiles.placeOnTile(cursorP2, tiles.getTileLocation(5 + getMat4x4(1, 0, MMSelectedCharacterCoordinates), 4 + getMat4x4(1, 1, MMSelectedCharacterCoordinates)))
            }
        }
    }
})
mp.onButtonEvent(mp.MultiplayerButton.A, ControllerButtonEvent.Pressed, function (player2) {
    if (gameStarted) {
        if (mp.getPlayerProperty(player2, mp.PlayerProperty.Number) == 1 && 0 < player1Jumps) {
            mp.getPlayerSprite(player2).vy = GRAVITY * -0.5
            player1Jumps += -1
        } else if (mp.getPlayerProperty(player2, mp.PlayerProperty.Number) == 2 && 0 < player2Jumps) {
            mp.getPlayerSprite(player2).vy = GRAVITY * -0.5
            player2Jumps += -1
        }
    } else if (mp.getPlayerProperty(player2, mp.PlayerProperty.Number) == 1) {
        MMBTNPressed = true
    } else if (mp.getPlayerProperty(player2, mp.PlayerProperty.Number) == 2) {
        MMBTNPressedP2 = true
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
function setMat4x4 (i: number, j: number, value: number, matrix: number[][]) {
    list = matrix[i]
    list[j] = value
    matrix[i] = list
    return matrix
}
function openCharacterSelect () {
    scene.setBackgroundImage(assets.image`CharacterSelectMenuBG`)
    tiles.setCurrentTilemap(tilemap`SelectedPlayers`)
    cursorP1 = sprites.create(assets.image`Cursor`, SpriteKind.Cursor)
    cursorP2 = sprites.create(assets.image`Cursor`, SpriteKind.Cursor)
    tiles.placeOnTile(cursorP1, tiles.getTileLocation(1, 4))
    tiles.placeOnTile(cursorP2, tiles.getTileLocation(5, 4))
    MMBTNPressed = false
    MMBTNPressedP2 = false
    // Player 1
    // Player 2
    MMSelectedCharacterCoordinates = [[0, 0], [0, 0]]
    MMType = "characterSelect"
    pauseUntil(() => MMBTNPressed && MMBTNPressedP2)
    scene.cameraShake(4, 500)
    scene.setBackgroundImage(assets.image`EmptyMenuBG`)
    gameStarted = false
    Alan = sprites.create(assets.image`Alan`, SpriteKind.Player)
    Israel = sprites.create(assets.image`Israel`, SpriteKind.Player)
    PlayableCharacters = [Alan, Israel]
    initFightLevel(Alan, Israel)
}
function getPlayerY (playerNum4: number) {
    return mp.getPlayerSprite(mp.getPlayerByNumber(playerNum4)).y
}
mp.onButtonEvent(mp.MultiplayerButton.Down, ControllerButtonEvent.Pressed, function (player2) {
    if (gameStarted) {
    	
    } else if (mp.getPlayerProperty(player2, mp.PlayerProperty.Number) == 1) {
        music.play(music.melodyPlayable(music.knock), music.PlaybackMode.InBackground)
        if (MMType == "mainMenu") {
            if (MMSelectedButton == "start") {
                MMSelectedButton = "credits"
                scene.setBackgroundImage(assets.image`MainMenuBG_CreditsSelected`)
            } else {
                MMSelectedButton = "start"
                scene.setBackgroundImage(assets.image`MainMenuBG_StartSelected`)
            }
        } else if (MMType == "characterSelect") {
            MMSelectedCharacterCoordinates = setMat4x4(mp.getPlayerProperty(player2, mp.PlayerProperty.Number) - 1, 1, clamp(0, getMat4x4(mp.getPlayerProperty(player2, mp.PlayerProperty.Number) - 1, 1, MMSelectedCharacterCoordinates) + 1, 2), MMSelectedCharacterCoordinates)
            if (player2 == mp.playerSelector(mp.PlayerNumber.One)) {
                tiles.placeOnTile(cursorP1, tiles.getTileLocation(1 + getMat4x4(0, 0, MMSelectedCharacterCoordinates), 4 + getMat4x4(0, 1, MMSelectedCharacterCoordinates)))
            } else {
                tiles.placeOnTile(cursorP2, tiles.getTileLocation(5 + getMat4x4(1, 0, MMSelectedCharacterCoordinates), 4 + getMat4x4(1, 1, MMSelectedCharacterCoordinates)))
            }
        }
    }
})
function openMenu () {
    MMBTNPressed = false
    MMType = "mainMenu"
    MMSelectedButton = "start"
    color.startFade(color.GrayScale, color.originalPalette)
    scene.setBackgroundImage(assets.image`MainMenuBG_StartSelected`)
    music.play(music.melodyPlayable(music.beamUp), music.PlaybackMode.InBackground)
    pauseUntil(() => MMBTNPressed)
    if (MMSelectedButton == "start") {
        openCharacterSelect()
    } else {
        openCredits()
    }
}
mp.onButtonEvent(mp.MultiplayerButton.Left, ControllerButtonEvent.Pressed, function (player2) {
    if (gameStarted) {
    	
    } else {
        if (MMType == "characterSelect") {
            music.play(music.melodyPlayable(music.knock), music.PlaybackMode.InBackground)
            MMSelectedCharacterCoordinates = setMat4x4(mp.getPlayerProperty(player2, mp.PlayerProperty.Number) - 1, 0, clamp(0, getMat4x4(mp.getPlayerProperty(player2, mp.PlayerProperty.Number) - 1, 0, MMSelectedCharacterCoordinates) - 1, 2), MMSelectedCharacterCoordinates)
            if (player2 == mp.playerSelector(mp.PlayerNumber.One)) {
                tiles.placeOnTile(cursorP1, tiles.getTileLocation(1 + getMat4x4(0, 0, MMSelectedCharacterCoordinates), 4 + getMat4x4(0, 1, MMSelectedCharacterCoordinates)))
            } else {
                tiles.placeOnTile(cursorP2, tiles.getTileLocation(5 + getMat4x4(1, 0, MMSelectedCharacterCoordinates), 4 + getMat4x4(1, 1, MMSelectedCharacterCoordinates)))
            }
        }
    }
})
function getMat4x4 (i: number, j: number, matrix: number[][]) {
    return matrix[i][j]
}
mp.onButtonEvent(mp.MultiplayerButton.Up, ControllerButtonEvent.Pressed, function (player2) {
    if (gameStarted) {
    	
    } else if (mp.getPlayerProperty(player2, mp.PlayerProperty.Number) == 1) {
        music.play(music.melodyPlayable(music.knock), music.PlaybackMode.InBackground)
        if (MMType == "mainMenu") {
            if (MMSelectedButton == "start") {
                MMSelectedButton = "credits"
                scene.setBackgroundImage(assets.image`MainMenuBG_CreditsSelected`)
            } else {
                MMSelectedButton = "start"
                scene.setBackgroundImage(assets.image`MainMenuBG_StartSelected`)
            }
        } else if (MMType == "characterSelect") {
            MMSelectedCharacterCoordinates = setMat4x4(mp.getPlayerProperty(player2, mp.PlayerProperty.Number) - 1, 1, clamp(0, getMat4x4(mp.getPlayerProperty(player2, mp.PlayerProperty.Number) - 1, 1, MMSelectedCharacterCoordinates) - 1, 2), MMSelectedCharacterCoordinates)
            if (player2 == mp.playerSelector(mp.PlayerNumber.One)) {
                tiles.placeOnTile(cursorP1, tiles.getTileLocation(1 + getMat4x4(0, 0, MMSelectedCharacterCoordinates), 4 + getMat4x4(0, 1, MMSelectedCharacterCoordinates)))
            } else {
                tiles.placeOnTile(cursorP2, tiles.getTileLocation(5 + getMat4x4(1, 0, MMSelectedCharacterCoordinates), 4 + getMat4x4(1, 1, MMSelectedCharacterCoordinates)))
            }
        }
    }
})
let MMSelectedButton = ""
let PlayableCharacters: Sprite[] = []
let Israel: Sprite = null
let Alan: Sprite = null
let list: number[] = []
let middleOfPlayers: Sprite = null
let MMBTNPressedP2 = false
let GRAVITY = 0
let player2Jumps = 0
let player1Jumps = 0
let cursorP2: Sprite = null
let cursorP1: Sprite = null
let MMSelectedCharacterCoordinates: number[][] = []
let MMType = ""
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
