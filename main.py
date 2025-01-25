def on_a_pressed():
    if playerChar.vy == 0:
        playerChar.vy = -60
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

playerChar: Sprite = None
gravity = 9.81 * 7
scene.set_background_color(2)
playerChar = sprites.create(assets.image("""
    player
"""), SpriteKind.player)
controller.move_sprite(playerChar, 100, 0)
tiles.set_current_tilemap(tilemap("""
    Classroom Chaos
"""))
playerChar.ay = gravity