//**Feel free to copy/paste code from wizard.js

"use strict"
function coffee_bender(){
	this.sprite;
	this.movementspeed = 7;
}

coffee_bender.prototype = {
	//Spawn function
	spawn: function(game,x,y,spritesheet){
		this.sprite = game.add.sprite(x,y,spritesheet);
		game.physics.arcade.enable(this.sprite);
		this.sprite.body.collideWorldBounds = true;
	},
	//Controls (Wizard already uses up, down, left, right)
	movement: function(cursors){
		
	},
	//Basic attack
	attack: function(){
		
	},
	//Special Move
	special: function(){
		
	}
}