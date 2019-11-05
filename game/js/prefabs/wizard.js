"use strict"
function wizard(){
	this.sprite;
	this.movementspeed = 7;
}

wizard.prototype = {
	//Spawn function
	spawn: function(game,x,y,spritesheet){
		this.sprite = game.add.sprite(x,y,spritesheet);
		game.physics.arcade.enable(this.sprite);
		this.sprite.body.collideWorldBounds = true;
	},
	//Controls
	movement: function(cursors){
		//Check if input is left
		if (cursors.left.isDown){
			//  Move to the left
			this.sprite.x += -this.movementspeed;
			this.sprite.frame = 1;
		}
		//Check if input is right
		else if (cursors.right.isDown){
			//  Move to the right
			this.sprite.x += this.movementspeed;
			this.sprite.frame = 0;
		}
		//Check if input is up
		if (cursors.up.isDown){
			//  Move up
			this.sprite.y += -this.movementspeed;
		}
		//Check if inpuit is down
		else if (cursors.down.isDown){
			//  Move down
			this.sprite.y += this.movementspeed;
		}
	},
	//Basic attack
	attack: function(){
		
	},
	//Special Move
	special: function(){
		
	}
}