kaboom({
    
    clearColor: [ 0, 0, 255, ],
    //stretch: true,
    //letterbox: true,
});

// add([
//     text("hello"),
//     pos(0, 80),
// ]);

const MOVE_SPEED = 200
const JUMP_FORCE = 450

loadRoot('/assets/images/')
loadSprite('user','user-astronaut.png')
loadSprite('floor','moon-surface.png')
loadSprite('jupiter','jupiter-view.png')


const map = [
    "                             @          ",
    "                                        ",
    "                                        ",
    "                                        ",
    "                                        ",
    "                                        ",
    " =                                     =",
    " =                                     =",
    " =                      ==             =",
    " =       ==     =                      =",
    " =  =               ==      =          =",
    " =           ==     ===     ==         =",
    " =======================================",
]

const levelCfg = {
    width: 32,
    height: 32,
    '=': () => [sprite('floor'), scale(3.5), area(), solid(), origin("bot")],
    '@': () => [sprite('jupiter'), scale(2)],
    //'%': () => [sprite('user-astronaut'), scale(2)],
}
scene("game", () => {
    
    const level = addLevel(map, levelCfg)

    const player = add([
        sprite('user'),
        pos(80, 200),
        area(),
        scale(2),
        body(),
        origin('bot')
    ])

    keyDown('left', () => {
        player.move(-MOVE_SPEED, 0)
    })
    
    keyDown('right', () => {
        player.move(MOVE_SPEED, 0)
    })
    
    keyPress('space', () => {
        if (player.grounded()) {
            player.jump(JUMP_FORCE)
        }
    })
     
});

go('game')