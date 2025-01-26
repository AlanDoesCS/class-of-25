namespace SpriteKind {
    export const Cursor = SpriteKind.create()
    export const UIElement = SpriteKind.create()
}
namespace MultiplayerState {
    export const numJumps = MultiplayerState.create()
}
function clamp (min: number, value: number, max: number) {
    return Math.min(max, Math.max(value, min))
}
scene.onHitWall(SpriteKind.Player, function (sprite, location) {
    if (gameStarted && (location.column < 1 || location.column > 30 || (location.row < 1 || location.row > 22))) {
        game.setGameOverPlayable(true, music.melodyPlayable(music.bigCrash), false)
        game.setGameOverMessage(true, "Player " + otherPlayer(mp.getPlayerProperty(mp.getPlayerBySprite(sprite), mp.PlayerProperty.Number)) + " wins!")
        game.gameOver(true)
    }
})
function setMat2D (i: number, j: number, value: number, matrix: number[][]) {
    list = matrix[i]
    list[j] = value
    matrix[i] = list
    return matrix
}
function getMatImage2D (i: number, j: number, mat: Image[][]) {
    return mat[i][j]
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
        if (MMType == "characterSelect" && !(isMMSelected(mp.getPlayerProperty(player2, mp.PlayerProperty.Number)))) {
            music.play(music.melodyPlayable(music.knock), music.PlaybackMode.InBackground)
            MMSelectedCharacterCoordinates = setMat2D(mp.getPlayerProperty(player2, mp.PlayerProperty.Number) - 1, 0, clamp(0, getMat2D(mp.getPlayerProperty(player2, mp.PlayerProperty.Number) - 1, 0, MMSelectedCharacterCoordinates) + 1, 2), MMSelectedCharacterCoordinates)
            if (player2 == mp.playerSelector(mp.PlayerNumber.One)) {
                tiles.placeOnTile(cursorP1, tiles.getTileLocation(1 + getMat2D(0, 0, MMSelectedCharacterCoordinates), 4 + getMat2D(0, 1, MMSelectedCharacterCoordinates)))
            } else {
                tiles.placeOnTile(cursorP2, tiles.getTileLocation(5 + getMat2D(1, 0, MMSelectedCharacterCoordinates), 4 + getMat2D(1, 1, MMSelectedCharacterCoordinates)))
            }
        }
    }
})
function setCharacterSelected (playerNumber: number) {
    if (playerNumber == 1) {
        MMBTNPressed = true
        cursorP1.setImage(assets.image`tickSprite`)
    } else {
        MMBTNPressedP2 = true
        cursorP2.setImage(assets.image`tickSprite`)
    }
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
    } else if (mp.getPlayerProperty(player2, mp.PlayerProperty.Number) == 1) {
        MMBTNPressed = true
        if (MMType == "characterSelect") {
            setCharacterSelected(1)
        }
    } else if (mp.getPlayerProperty(player2, mp.PlayerProperty.Number) == 2) {
        MMBTNPressedP2 = true
        if (MMType == "characterSelect") {
            setCharacterSelected(2)
        }
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
    updateMiddleOfPlayers()
    startCountdown()
}
function getPlayerX (playerNum: number) {
    return mp.getPlayerSprite(mp.getPlayerByNumber(playerNum)).x
}
function getMat2D (i: number, j: number, matrix: number[][]) {
    return matrix[i][j]
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
function updateMiddleOfPlayers () {
    middleOfPlayers.setPosition((mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).x + mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).x) / 2, (mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).y + mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).y) / 2)
    for (let index = 0; index <= 1; index++) {
        if (getPlayerVY(index + 1) == 0 && index == 0) {
            player1Jumps = 3
        } else if (getPlayerVY(index + 1) == 0 && index == 1) {
            player2Jumps = 3
        }
    }
}
function getPlayerVY (playerNum3: number) {
    return mp.getPlayerSprite(mp.getPlayerByNumber(playerNum3)).vy
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
    PlayableCharacters = [[assets.image`Federico`, assets.image`Israel`, assets.image`Yichi`], [assets.image`Alan`, assets.image`Mr Shrimpton`, assets.image`Zak`], [assets.image`Hugo`, assets.image`Hyojun`, assets.image`Albert`]]
    for (let SpriteList1D of PlayableCharacters) {
        for (let sprite of SpriteList1D) {
        	
        }
    }
    MMType = "characterSelect"
    pauseUntil(() => MMBTNPressed && MMBTNPressedP2)
    scene.cameraShake(4, 500)
    scene.setBackgroundImage(assets.image`EmptyMenuBG`)
    gameStarted = false
    sprites.destroyAllSpritesOfKind(SpriteKind.Cursor)
    initFightLevel(sprites.create(getMatImage2D(getMat2D(0, 1, MMSelectedCharacterCoordinates), getMat2D(0, 0, MMSelectedCharacterCoordinates), PlayableCharacters), SpriteKind.Player), sprites.create(getMatImage2D(getMat2D(1, 1, MMSelectedCharacterCoordinates), getMat2D(1, 0, MMSelectedCharacterCoordinates), PlayableCharacters), SpriteKind.Player))
}
function getPlayerY (playerNum4: number) {
    return mp.getPlayerSprite(mp.getPlayerByNumber(playerNum4)).y
}
mp.onButtonEvent(mp.MultiplayerButton.Down, ControllerButtonEvent.Pressed, function (player2) {
    if (gameStarted) {
    	
    } else {
        music.play(music.melodyPlayable(music.knock), music.PlaybackMode.InBackground)
        if (mp.getPlayerProperty(player2, mp.PlayerProperty.Number) == 1 && MMType == "mainMenu") {
            if (MMSelectedButton == "start") {
                MMSelectedButton = "credits"
                scene.setBackgroundImage(assets.image`MainMenuBG_CreditsSelected`)
            } else {
                MMSelectedButton = "start"
                scene.setBackgroundImage(assets.image`MainMenuBG_StartSelected`)
            }
        } else if (MMType == "characterSelect" && !(isMMSelected(mp.getPlayerProperty(player2, mp.PlayerProperty.Number)))) {
            MMSelectedCharacterCoordinates = setMat2D(mp.getPlayerProperty(player2, mp.PlayerProperty.Number) - 1, 1, clamp(0, getMat2D(mp.getPlayerProperty(player2, mp.PlayerProperty.Number) - 1, 1, MMSelectedCharacterCoordinates) + 1, 2), MMSelectedCharacterCoordinates)
            if (player2 == mp.playerSelector(mp.PlayerNumber.One)) {
                tiles.placeOnTile(cursorP1, tiles.getTileLocation(1 + getMat2D(0, 0, MMSelectedCharacterCoordinates), 4 + getMat2D(0, 1, MMSelectedCharacterCoordinates)))
            } else {
                tiles.placeOnTile(cursorP2, tiles.getTileLocation(5 + getMat2D(1, 0, MMSelectedCharacterCoordinates), 4 + getMat2D(1, 1, MMSelectedCharacterCoordinates)))
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
        if (MMType == "characterSelect" && !(isMMSelected(mp.getPlayerProperty(player2, mp.PlayerProperty.Number)))) {
            music.play(music.melodyPlayable(music.knock), music.PlaybackMode.InBackground)
            MMSelectedCharacterCoordinates = setMat2D(mp.getPlayerProperty(player2, mp.PlayerProperty.Number) - 1, 0, clamp(0, getMat2D(mp.getPlayerProperty(player2, mp.PlayerProperty.Number) - 1, 0, MMSelectedCharacterCoordinates) - 1, 2), MMSelectedCharacterCoordinates)
            if (player2 == mp.playerSelector(mp.PlayerNumber.One)) {
                tiles.placeOnTile(cursorP1, tiles.getTileLocation(1 + getMat2D(0, 0, MMSelectedCharacterCoordinates), 4 + getMat2D(0, 1, MMSelectedCharacterCoordinates)))
            } else {
                tiles.placeOnTile(cursorP2, tiles.getTileLocation(5 + getMat2D(1, 0, MMSelectedCharacterCoordinates), 4 + getMat2D(1, 1, MMSelectedCharacterCoordinates)))
            }
        }
    }
})
function otherPlayer (playerNum: number) {
    if (playerNum == 1) {
        return 2
    } else {
        return 1
    }
}
function isMMSelected (playerNumber: number) {
    if (playerNumber == 1) {
        return MMBTNPressed
    } else {
        return MMBTNPressedP2
    }
}
function doDamageToPlayer (playerNum: number, amount: number, xDirection: number, yDirection: number) {
    mp.changePlayerStateBy(mp.getPlayerByNumber(playerNum), MultiplayerState.score, amount)
    mp.getPlayerSprite(mp.getPlayerByNumber(playerNum)).vx += mp.getPlayerState(mp.getPlayerByNumber(playerNum), MultiplayerState.score) * (xDirection * 2)
    mp.getPlayerSprite(mp.getPlayerByNumber(playerNum)).vy += mp.getPlayerState(mp.getPlayerByNumber(playerNum), MultiplayerState.score) * (yDirection * 7)
}
mp.onButtonEvent(mp.MultiplayerButton.Up, ControllerButtonEvent.Pressed, function (player2) {
    if (gameStarted) {
    	
    } else {
        music.play(music.melodyPlayable(music.knock), music.PlaybackMode.InBackground)
        if (mp.getPlayerProperty(player2, mp.PlayerProperty.Number) == 1 && MMType == "mainMenu") {
            if (MMSelectedButton == "start") {
                MMSelectedButton = "credits"
                scene.setBackgroundImage(assets.image`MainMenuBG_CreditsSelected`)
            } else {
                MMSelectedButton = "start"
                scene.setBackgroundImage(assets.image`MainMenuBG_StartSelected`)
            }
        } else if (MMType == "characterSelect" && !(isMMSelected(mp.getPlayerProperty(player2, mp.PlayerProperty.Number)))) {
            MMSelectedCharacterCoordinates = setMat2D(mp.getPlayerProperty(player2, mp.PlayerProperty.Number) - 1, 1, clamp(0, getMat2D(mp.getPlayerProperty(player2, mp.PlayerProperty.Number) - 1, 1, MMSelectedCharacterCoordinates) - 1, 2), MMSelectedCharacterCoordinates)
            if (player2 == mp.playerSelector(mp.PlayerNumber.One)) {
                tiles.placeOnTile(cursorP1, tiles.getTileLocation(1 + getMat2D(0, 0, MMSelectedCharacterCoordinates), 4 + getMat2D(0, 1, MMSelectedCharacterCoordinates)))
            } else {
                tiles.placeOnTile(cursorP2, tiles.getTileLocation(5 + getMat2D(1, 0, MMSelectedCharacterCoordinates), 4 + getMat2D(1, 1, MMSelectedCharacterCoordinates)))
            }
        }
    }
})
function startCountdown () {
    MiddleNotice = sprites.create(assets.image`awdawda`, SpriteKind.UIElement)
    MiddleNotice.setPosition(middleOfPlayers.x, middleOfPlayers.y)
    pause(100)
    MiddleNotice.setImage(assets.image`ThreeSprite`)
    pause(1000)
    MiddleNotice.setImage(assets.image`TwoSprite`)
    pause(1000)
    MiddleNotice.setImage(assets.image`OneSprite`)
    pause(1000)
    MiddleNotice.setImage(assets.image`GoSprite`)
    pause(1000)
    sprites.destroy(MiddleNotice)
}
let MiddleNotice: Sprite = null
let MMSelectedButton = ""
let PlayableCharacters: Image[][] = []
let middleOfPlayers: Sprite = null
let GRAVITY = 0
let player2Jumps = 0
let player1Jumps = 0
let MMBTNPressedP2 = false
let cursorP2: Sprite = null
let cursorP1: Sprite = null
let MMSelectedCharacterCoordinates: number[][] = []
let MMType = ""
let MMBTNPressed = false
let list: number[] = []
let gameStarted = false
openMenu()
forever(function () {
    if (gameStarted) {
        updateMiddleOfPlayers()
        for (let index = 0; index <= 1; index++) {
            mp.getPlayerSprite(mp.getPlayerByNumber(index + 1)).ax = mp.getPlayerSprite(mp.getPlayerByNumber(index + 1)).vx * -0.1
        }
    }
})
