//**Feel free to copy/paste code from wizard.js

"use strict"
function coffee_bender() {
	this.sprite;
	this.movementSpeed = 7;
	this.dir = "right";
	this.melee;
}

coffee_bender.prototype = {
	//Spawn function
	spawn: function(game,x,y,spritesheet) {
		this.sprite = game.add.sprite(x,y,spritesheet);
		game.physics.arcade.enable(this.sprite);
		this.sprite.body.collideWorldBounds = true;
	},
	//Controls (Wizard already uses up, down, left, right)
	movement: function(wasd) {
		if (wasd.w.isDown) {
			this.sprite.y -= this.movementSpeed;
		} else if (wasd.s.isDown) {
			this.sprite.y += this.movementSpeed;
		}

		if (wasd.a.isDown) {
			this.sprite.x -= this.movementSpeed;
			this.sprite.frame = 1;
		} else if (wasd.d.isDown) {
			this.sprite.x += this.movementSpeed;
			this.sprite.frame = 0;
		}
	},
	//Basic attack
	attack: function(wasd) {

	},
	//Special Move
	special: function() {
		
	}
}