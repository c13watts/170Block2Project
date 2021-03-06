//Just playing around with some enemy mechanics when I have down time. Disregard until
//main mechanics are implemented

"use strict"
function enemy(){
	this.sprite;
	this.movementspeed = 1;
	this.direction = 'left';
}

enemy.prototype = {
	//Spawn function
	spawn: function(game,x,y,spritesheet){
		this.sprite = game.add.sprite(x,y,spritesheet);
		game.physics.arcade.enable(this.sprite);
	},
	pathfind: function(player){
		//Enemy pathfinding
		//Only really works for one player atm. Needs to be improved for 2 players
		if(player.x > this.sprite.x){
			this.sprite.x += this.movementspeed;
			this.direction = 'right';
		}else if (player.x < this.sprite.x){
			this.sprite.x -= this.movementspeed;
			this.direction = 'left';
		}
		if(player.y > this.sprite.y){
			this.sprite.y += this.movementspeed;
		}else if (player.y < this.sprite.y){
			this.sprite.y -= this.movementspeed;
		}
		
		if(this.direction == 'left'){
			this.sprite.frame = 0;
		}else{
			this.sprite.frame = 1;
		}
	}
}