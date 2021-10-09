kaboom({
    background: [ 0, 14, 51, ],
    font: 'sink',
});

const MOVE_SPEED = 200
const JUMP_FORCE = 450
const FALL_DEATH = 500
var enemies = ['enemy-1.png','enemy-2.png','enemy-3.png']

var combat = function() {
    // Ask user for their choice
    var userChoice = window.prompt("Enter R, P, or S:");
  
    // Convert to uppercase to make comparisons easier
    userChoice = userChoice.toUpperCase();
  
    // Get random index from array of options
    var index = Math.floor(Math.random() * options.length);
    var enemyChoice = options[index];
  
    window.alert("The enemy chose " + enemyChoice);
  
    // If choices are the same, it's a tie
    if (userChoice === enemyChoice) {
      window.alert("It's a tie!");
      combat();
  
    // Check every win condition for the player
    } else if (
      (userChoice === "R" && computerChoice === "S") || 
      (userChoice === "P" && computerChoice === "R") || 
      (userChoice === "S" && computerChoice === "P")
    ) {
      score++;
      window.alert("You won!");
  
    // If above conditions failed, assume player lost
    } else {
      window.alert("You lost!");
    }
}

var index = Math.floor(Math.random() * enemies.length);
var computerChoice = enemies[index];

loadSprite('enemies', '/assets/enemies/enemy-1.png')
loadSprite('enemies1', '/assets/enemies/enemy-2.png')
loadSprite('enemies2', '/assets/enemies/enemy-3.png')
loadSprite('user','/assets/images/user-astronaut.png')
loadSprite('floor','/assets/images/moon-surface.png')
loadSprite('jupiter','/assets/images/jupiter-view.png')
loadSprite('full-hp', '/assets/images/user-health-full.png')
loadSprite('half-hp', '/assets/images/user-health-half.png')
loadSprite('armor-hp', '/assets/images/user-armor.png')

const map = [
    "                             @          ",
    "                                        ",
    "                                        ",
    "                                        ",
    "                                        ",
    "                                        ",
    " =                      &              =",
    " =       &      -                      =",
    " =                  &   ==             =",
    " =       ==  &  =        #             =",
    " =  =     -         ==      =     &    =",
    " =           ==     ===     ==         =",
    " ======  ===============================",
]

const levelCfg = {
    width: 32,
    height: 32,
    '=': () => [sprite('floor'), scale(3.5), area(), solid(), origin("bot")],
    '@': () => [sprite('jupiter'), scale(2)],
    '&': () => [sprite('enemies'), scale(3),],
    '-': () => [sprite('enemies1'), scale(3),],
    '#': () => [sprite('enemies2'), scale(3),],
}
scene("game", () => {

    const level = addLevel(map, levelCfg)

    layers(["bg","game","ui"],"game");

    const scoreLabel = add([
        text("Score: 0"),
        scale(3),
        pos(10, 10),
        layer('ui'),
        {
            value: "0",
        }
    ])
    
    const healthBar = add([
        scale(5),
        pos(10, 50),
        layer('ui'),
        sprite('full-hp')
    ])

    const armorHealth = add([
        scale(2),
        pos(75, 46),
        layer('ui'),
        sprite('armor-hp')
    ])

    const player = add([
        sprite('user'),
        pos(80, 200),
        area(),
        scale(2),
        body(),
        origin('bot'),
    ])
    
    player.action(() =>{
        (player.pos)
        if (player.pos.y >= FALL_DEATH) {
            go("lose")
        }
    })

    function reloadEnemy() { add([
      sprite('enemies'),
      pos(width(), rand(0, height()),),
    ])};

    player.collides('enemies',() => {
        destroy('enemies'),
        combat();
        reloadEnemy();
    })


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

function addButton(txt, p, f) {

	const btn = add([
		opacity(2),
		text(txt, 8),
		pos(p),
		area({ cursor: "pointer", }),
		scale(5),
		origin("center"),
	]);

	btn.clicks(f);

	btn.hovers(() => {
		const t = time() * 10;
		btn.color = rgb(
			wave(0, 255, t),
			wave(0, 255, t + 2),
			wave(0, 255, t + 4),
		);
		btn.scale = vec2(1.2);
	}, () => {
		btn.scale = vec2(1);
		btn.color = rgb();
	});

}


scene("lose", () => {
    add([
        addButton("Play Again?", vec2(650, 400), () => go("game")),
        addButton("Submit Score", vec2(650, 450), () => go('/highscore')),
        text('GAME OVER'), scale(4), origin('center'), pos(width()/2, height()/2),
    ])
})

go('game')