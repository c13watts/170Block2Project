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
		this.player2.spawn(game, 600, 700, 'player');

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
		//Gamepad controls (Experimental)
		game.input.gamepad.start();
		pad1 = game.input.gamepad.pad1;
		pad2 = game.input.gamepad.pad2;
	},

	update: function() {
		this.player1.movement(this.cursors,pad1);
		this.player1.attack(game,this.dummy);

		this.player2.movement(this.wasd,pad2);
		this.player2.attack(game, this.wasd, pad2);
		game.debug.body(this.dummy.sprite);
		this.dummy.pathfind(this.player1.sprite);
	},

	shutdown: function() {

	}	
}
