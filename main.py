def on_button_multiplayer_a_pressed(player2):
    if mp.get_player_sprite(player2).vy == 0:
        mp.get_player_sprite(player2).vy = GRAVITY * -1.2
mp.on_button_event(mp.MultiplayerButton.A,
    ControllerButtonEvent.PRESSED,
    on_button_multiplayer_a_pressed)

def initPlayer(playerNumber: number, playerSprite: Sprite):
    mp.set_player_sprite(mp.get_player_by_number(playerNumber), playerSprite)
    mp.set_player_state(mp.get_player_by_number(playerNumber),
        MultiplayerState.score,
        0)
    mp.move_with_buttons(mp.get_player_by_number(playerNumber), 100, 0)
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
GRAVITY = 0
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
GRAVITY = 9.81 * 10
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
scene.set_background_color(0)
tiles.set_current_tilemap(tilemap("""
    Classroom Chaos
"""))
initPlayer(1, Alan)
initPlayer(2, Israel)
gameStarted = True
game.set_game_over_message(False, "[1]" + " lost!")
game.set_game_over_effect(False, effects.dissolve)

def on_forever():
    if gameStarted:
        middleOfPlayers.set_position((mp.get_player_sprite(mp.player_selector(mp.PlayerNumber.ONE)).x + mp.get_player_sprite(mp.player_selector(mp.PlayerNumber.TWO)).x) / 2,
            (mp.get_player_sprite(mp.player_selector(mp.PlayerNumber.ONE)).y + mp.get_player_sprite(mp.player_selector(mp.PlayerNumber.TWO)).y) / 2)
forever(on_forever)
