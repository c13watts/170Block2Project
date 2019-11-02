"use strict"
var level = function(game)
{
	this.player1;
	this.player2;
	this.movementspeed = 7;
};

level.prototype =
{
	preload: function()
	{
		//Preload assets
		game.load.image('background', 'assets/img/background.png');
		game.load.spritesheet('player', 'assets/img/player.png',170, 170);
	},
	create: function()
	{
		//Add background
		game.add.sprite(0,0,'background');
		
		//Add Player 1
		this.player1 = game.add.sprite(500,700,'player');
		game.physics.arcade.enable(this.player1);
		this.player1.body.collideWorldBounds = true;
		
		//Enable controls
		this.cursors = game.input.keyboard.createCursorKeys();
	},

	update: function()
	{
		//CONTROLS
		//Check if input is left
		if (this.cursors.left.isDown){
			//  Move to the left
			this.player1.x += -this.movementspeed;
			this.player1.frame = 1;
		}
		//Check if input is right
		else if (this.cursors.right.isDown){
			//  Move to the right
			this.player1.x += this.movementspeed;
			this.player1.frame = 0;
		}
		//Check if input is up
		if (this.cursors.up.isDown){
			//  Move up
			this.player1.y += -this.movementspeed;
		}
		//Check if inpuit is down
		else if (this.cursors.down.isDown){
			//  Move down
			this.player1.y += this.movementspeed;
		}
		
		//Creates a y boundary at the top
		//**This is just for the prototype. Use hitboxes for the real thing since this
		//solution gets janky if the player can move fast**
		if(this.player1.y <= 550){
			this.player1.y = 550
		}
	},

	shutdown: function()
	{

	}
}
