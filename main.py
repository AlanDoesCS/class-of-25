def on_hit_wall(sprite, location):
    global loser
    loser = sprite
    game.game_over(False)
scene.on_hit_wall(SpriteKind.player, on_hit_wall)

def on_a_pressed():
    if Alan.vy == 0:
        Alan.vy = -60
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def initPlayer(playerNumber: number, playerSprite: Sprite):
    if playerNumber == 1:
        mp.set_player_sprite(mp.player_selector(mp.PlayerNumber.ONE),
            sprites.create(img("""
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
                SpriteKind.player))
        mp.move_with_buttons(mp.player_selector(mp.PlayerNumber.ONE))
    else:
        mp.set_player_sprite(mp.player_selector(mp.PlayerNumber.ONE),
            Alan)
        mp.move_with_buttons(mp.player_selector(mp.PlayerNumber.ONE))
loser: Sprite = None
Alan: Sprite = None
Mr_Shrimpton = sprites.create(img("""
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
    """),
    SpriteKind.player)
Alan = sprites.create(assets.image("""
    player
"""), SpriteKind.player)
Israel = sprites.create(img("""
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
    """),
    SpriteKind.player)
Yichi = sprites.create(img("""
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
    """),
    SpriteKind.player)
Federico = sprites.create(img("""
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
    """),
    SpriteKind.player)
PlayableCharacters = [Mr_Shrimpton, Alan, Israel, Yichi, Federico]
info.player1.set_score(0)
info.player2.set_score(0)
gravity = 9.81 * 7
scene.set_background_color(13)
tiles.set_current_tilemap(tilemap("""
    Classroom Chaos
"""))
Alan.ay = gravity
game.set_game_over_message(False, "[1]" + " lost!")
game.set_game_over_effect(False, effects.dissolve)