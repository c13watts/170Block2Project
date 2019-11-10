//"use strict"
var level = function(game)
{
	this.player1;
	this.player2;
	var pad1;
};

level.prototype = {
	preload: function() {
		//Preload assets
		game.load.spritesheet('player', 'assets/img/player.png',170, 170);
		game.load.spritesheet('Kalua', 'assets/img/KaluaSprites.png',128, 128);

		game.input.keyboard.addKeyCapture([Phaser.Keyboard.W, Phaser.Keyboard.A, Phaser.Keyboard.S, Phaser.Keyboard.D, Phaser.Keyboard.J]);
	},
	create: function() {
		//Add background
		game.stage.backgroundColor = "#f00000";
		
		//Add Player 1
		this.player1 = new wizard;
		this.player1.spawn(game,500,700,'player');
		
		//Add Player 2
		this.player2 = new coffee_bender;
		this.player2.spawn(game, 600, 700, 'Kalua');

		//Dummy enemy
		this.dummy = new enemy();
		this.dummy.spawn(game,960,540,'player')
		
		//Enable controls
		this.cursors = game.input.keyboard.createCursorKeys();
		this.wasd = { w: game.input.keyboard.addKey(Phaser.Keyboard.W),
						a: game.input.keyboard.addKey(Phaser.Keyboard.A),
						s: game.input.keyboard.addKey(Phaser.Keyboard.S),
						d: game.input.keyboard.addKey(Phaser.Keyboard.D),
						j: game.input.keyboard.addKey(Phaser.Keyboard.J),
						k: game.input.keyboard.addKey(Phaser.Keyboard.K) };
						
		//Gamepad controls
		game.input.gamepad.start();
		pad1 = game.input.gamepad.pad1;
		pad2 = game.input.gamepad.pad2;
	},

	update: function() {
		//Enable and check for player movement, attack, and specials
		this.player1.movement(this.cursors,pad1);
		this.player1.attack(game,this.dummy,pad1);
		if(this.player1.coffee_buff == true || this.player1.channeling == true){
			this.player1.team_attack(game,pad1);
		}else if(this.player1.coffee_buff == false){
			this.player1.special(game,this.dummy,pad1);
		}
		
		//Enable and check for player 2 movement, attack, and special
		this.player2.movement(this.wasd,pad2);
		this.player2.attack(game, this.wasd, pad2);
		
		//Dummy pathfinding **For debugging and testing
		game.debug.body(this.dummy.sprite);
		this.dummy.pathfind(this.player1.sprite);

		game.debug.body(this.player2.sprite);
	},

	shutdown: function() {

	}	
}
