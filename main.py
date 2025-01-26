@namespace
class MultiplayerState:
    numJumps = MultiplayerState.create()

def on_button_multiplayer_a_pressed(player2):
    if gameStarted:
        mp.set_player_state(player2, MultiplayerState.numJumps, 3)
        if mp.get_player_state(player2, MultiplayerState.numJumps) == 0:
            game.game_over(True)
        if mp.get_player_state(player2, MultiplayerState.numJumps) > 0:
            mp.get_player_sprite(player2).vy = GRAVITY * -0.6

mp.on_button_event(mp.MultiplayerButton.A,
    ControllerButtonEvent.PRESSED,
    on_button_multiplayer_a_pressed)

def initPlayer(playerNumber: number, playerSprite: Sprite):
    mp.set_player_sprite(mp.get_player_by_number(playerNumber), playerSprite)
    mp.set_player_state(mp.get_player_by_number(playerNumber),
        MultiplayerState.score,
        0)
    mp.move_with_buttons(mp.get_player_by_number(playerNumber), 100, 0)
    mp.set_player_state(mp.get_player_by_number(playerNumber),
        MultiplayerState.numJumps,
        3)
    characterAnimations.loop_frames(playerSprite,
        assets.animation("""
            AlanIdle
        """),
        1000,
        characterAnimations.rule(Predicate.NOT_MOVING,
            Predicate.MOVING_RIGHT,
            Predicate.MOVING_RIGHT))
    playerSprite.set_scale(1, ScaleAnchor.TOP_LEFT)
    playerSprite.ay = GRAVITY
    tiles.place_on_tile(playerSprite,
        tiles.get_tile_location(13 + 5 * (playerNumber - 1), 5))

def getPlayerX(playerNum: number):
    return mp.get_player_sprite(mp.get_player_by_number(playerNum)).x
def getPlayerY(playerNum4: number):
    return mp.get_player_sprite(mp.get_player_by_number(playerNum4)).y
def getPlayerVX(playerNum2: number):
    return mp.get_player_sprite(mp.get_player_by_number(playerNum2)).vx
def getPlayerVY(playerNum3: number):
    return mp.get_player_sprite(mp.get_player_by_number(playerNum3)).vy

gameStarted = False
middleOfPlayers = sprites.create(img("""
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
    """),
    SpriteKind.player)
scene.camera_follow_sprite(middleOfPlayers)
GRAVITY = 350
Alan = sprites.create(assets.image("""
    Alan
"""), SpriteKind.player)
Israel = sprites.create(assets.image("""
    myImage
"""), SpriteKind.player)
PlayableCharacters = [Alan, Israel]
for value in PlayableCharacters:
    value.set_scale(0.00001, ScaleAnchor.TOP_LEFT)
info.player1.set_score(0)
info.player2.set_score(0)
scene.set_background_color(3)
tiles.set_current_tilemap(tilemap("""
    Classroom Chaos
"""))
initPlayer(1, Alan)
initPlayer(2, Israel)
gameStarted = True

def on_on_update():
    if mp.get_player_sprite(mp.player_selector(mp.PlayerNumber.ONE)).vy == 0:
        pass
game.on_update(on_on_update)

def on_forever():
    if gameStarted:
        middleOfPlayers.set_position((mp.get_player_sprite(mp.player_selector(mp.PlayerNumber.ONE)).x + mp.get_player_sprite(mp.player_selector(mp.PlayerNumber.TWO)).x) / 2,
            (mp.get_player_sprite(mp.player_selector(mp.PlayerNumber.ONE)).y + mp.get_player_sprite(mp.player_selector(mp.PlayerNumber.TWO)).y) / 2)
        for index in range(2):
            if getPlayerVY(index + 1) == 0:
                mp.set_player_state(mp.get_player_by_number(index + 1),
                    MultiplayerState.numJumps,
                    3)
forever(on_forever)
