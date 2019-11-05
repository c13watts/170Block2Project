"use strict"
var level = function(game)
{
	this.player1;
	this.player2;
};

level.prototype = {
	preload: function()
	{
		//Preload assets
		game.load.spritesheet('player', 'assets/img/player.png',170, 170);
	},
	create: function()
	{
		//Add background
		game.stage.backgroundColor = "#f00000";
		
		//Add Player 1
		this.player1 = new wizard;
		this.player1.spawn(game,500,700,'player');
		
		//Dummy enemy
		this.dummy = new enemy();
		this.dummy.spawn(game,960,540,'player')
		
		//Enable controls
		this.cursors = game.input.keyboard.createCursorKeys();
	},

	update: function()
	{
		this.player1.movement(this.cursors);
		this.player1.attack(game,this.dummy);
		game.debug.body(this.dummy.sprite);
		//this.dummy.pathfind(this.player1.sprite);
	},

	shutdown: function()
	{

	}
}
