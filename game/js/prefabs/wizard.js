"use strict"
function wizard(){
	this.sprite;
	this.attack_power = 1;
	this.movementspeed = 7;
	this.direction = 'right';
	this.attack_hitbox;
	this.special_hitbox;
	this.scrolling = false;
	this.special_direction = 'right';
	this.cooldown = false;
	this.coffee_buff = false;
	this.x0 = 0;
	this.x = 0;
	this.y = 0;
	this.z = 0;
	this.wave_one;
	this.wave_two;
	this.wave_three;
	this.wave_speed;
	this.channeling = false;
	this.can_move = true;
	this.check = true;
}

wizard.prototype = {
	//Spawn function
	spawn: function(game,x,y,spritesheet){
		this.sprite = game.add.sprite(x,y,spritesheet);
		this.sprite.scale.setTo(.5,.5);
		this.sprite.animations.add('leftrun', [3], 1, true);
		this.sprite.animations.add('rightrun', [1], 1, true);
		this.sprite.animations.add('leftidle', [4], 1, true);
		this.sprite.animations.add('rightidle', [0], 1, true);
		this.sprite.animations.add('rightspecial', [2], 1, true);
		this.sprite.animations.add('leftspecial', [5], 1, true);
		game.physics.arcade.enable(this.sprite);
		this.sprite.body.collideWorldBounds = true;
	},
	//Controls
	movement: function(cursors,pad){
		//Check if input is left
		if (cursors.left.isDown || pad.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT) || pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1){
			//Move to the left
			this.sprite.x += -this.movementspeed;
			this.direction = 'left';
			this.sprite.animations.play('leftrun');
		}
		//Check if input is right
		else if (cursors.right.isDown || pad.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT) || pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1){
			//Move to the right
			this.sprite.x += this.movementspeed;
			this.direction = 'right';
			this.sprite.animations.play('rightrun');
		}
		//Check if input is up
		if (cursors.up.isDown || pad.isDown(Phaser.Gamepad.XBOX360_DPAD_UP) || pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) < -0.1){
			//Move up
			this.sprite.y += -this.movementspeed;
			if(this.direction == 'left'){
				this.sprite.animations.play('leftrun');
			}else{
				this.sprite.animations.play('rightrun');
			}
		}
		//Check if input is down
		else if (cursors.down.isDown || pad.isDown(Phaser.Gamepad.XBOX360_DPAD_DOWN) || pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) > 0.1){
			//Move down
			this.sprite.y += this.movementspeed;
			if(this.direction == 'left'){
				this.sprite.animations.play('leftrun');
			}else{
				this.sprite.animations.play('rightrun');
			}
		}
		if(cursors.up.isUp && cursors.down.isUp && cursors.left.isUp && cursors.right.isUp ){
			if(this.direction == 'left'){
				this.sprite.animations.play('leftidle');
			}
			else{
				this.sprite.animations.play('rightidle');
			}
		}
		
	},
	//Basic attack
	attack: function(game,enemy,pad){
		//Checks for button input
		if (game.input.keyboard.justPressed(Phaser.Keyboard.Z) || pad.justPressed(Phaser.Gamepad.XBOX360_X)){
			this.can_move = false;
			//Checks if player is facing right or left and places hitbox accordingly
			if(this.direction == 'right'){
				this.attack_hitbox = game.add.sprite(this.sprite.x + 130,this.sprite.y + 40,null);
			}else{
				this.attack_hitbox = game.add.sprite(this.sprite.x - 70,this.sprite.y + 40,null);
			}
			//Enable hitbox
			game.physics.arcade.enable(this.attack_hitbox);
			this.attack_hitbox.body.setSize(100,100);
			if(game.physics.arcade.overlap(this.attack_hitbox,enemy.sprite)){
				console.log('Melee: Hit');
			}
			//game.debug.body(this.attack_hitbox);
			game.time.events.add(Phaser.Timer.SECOND * 1, this.destroy_hitbox, this);
			//Destroy hitbox
			this.can_move = true;
		}
	},
	//Special Move
	special: function(game,enemy,pad){
		//Checks for button input
		if ((game.input.keyboard.justPressed(Phaser.Keyboard.X) || pad.justPressed(Phaser.Gamepad.XBOX360_Y)) && this.check == true && this.cooldown == false){
			this.check = false;
			//Instant Beam
			/*if (this.cooldown == false) {
				this.cooldown = true;
				//Checks if player is facing right or left and places hitbox accordingly
				if(this.direction == 'right'){
					this.special_hitbox = game.add.sprite(this.sprite.x + 130,this.sprite.y + 40,null);
				}else{
					this.special_hitbox = game.add.sprite(this.sprite.x - 1880,this.sprite.y + 40,null);
				}
				//Enable hitbox
				game.physics.arcade.enable(this.special_hitbox);
				this.special_hitbox.body.setSize(1920,100);
				if(game.physics.arcade.overlap(this.special_hitbox,enemy.sprite)){
					console.log('Special: Hit');
				}
				game.debug.body(this.special_hitbox);
				//Destroy hitbox
				this.special_hitbox.destroy();
				game.time.events.add(Phaser.Timer.SECOND * 5, this.resetCooldown, this);
				console.log('Player 1 Special on cooldown');
			}*/
			
			//Kamehameha style (Scrolling)
			//Check Direction player is facing
			if(this.cooldown == false && this.scrolling == false){
				this.can_move = false;
				if(this.direction == 'right'){
					this.special_hitbox = game.add.sprite(this.sprite.x + 130,this.sprite.y + 40,null);
					this.special_direction = 'right';
				}else{
					this.special_hitbox = game.add.sprite(this.sprite.x,this.sprite.y + 40,null);
					this.special_direction = 'left';
				}
				this.scrolling = true;
				//Enable hitbox
				game.physics.arcade.enable(this.special_hitbox);
				this.special_hitbox.body.setSize(0,100);
			}
		}
		//Scroll beam to the right
		if(this.scrolling == true && this.cooldown == false && this.special_direction == 'right'){
			if( this.x0 < 1980){
				this.sprite.animations.play('rightspecial');
				this.x0 += 30;
				this.special_hitbox.body.setSize(this.x0,100);
				game.debug.body(this.special_hitbox);
			}else{
				this.x0 = 0;
				this.scrolling = false;
				this.cooldown = true;
				this.special_hitbox.destroy();
				game.time.events.add(Phaser.Timer.SECOND * 15, this.resetCooldown, this);
				this.can_move = true;
				this.check = true;
				console.log('Player 1 Special on cooldown');
			}
		}
		//Scroll beam to the left
		if(this.scrolling == true && this.cooldown == false && this.special_direction == 'left'){
			if( this.x0 < 1980){
				this.sprite.animations.play('leftspecial');
				this.x0 += 30;
				this.special_hitbox.x -= 30;
				this.special_hitbox.body.setSize(this.x0,100);
				game.debug.body(this.special_hitbox);
			}else{
				this.x0 = 0;
				this.scrolling = false;
				this.cooldown = true;
				this.special_hitbox.destroy();
				game.time.events.add(Phaser.Timer.SECOND * 15, this.resetCooldown, this);
				this.can_move = true;
				this.check = true;
				console.log('Player 1 Special on cooldown');
			}
		}
	},
	//Team Attack
	team_attack: function(game,pad,enemygroup){
		//Checks for button input
		if ((game.input.keyboard.justPressed(Phaser.Keyboard.X) || pad.justPressed(Phaser.Gamepad.XBOX360_Y)) && this.coffee_buff == true && this.cooldown == false && this.check == true){
			this.can_move = false;
			this.channeling = true;
			this.check = false;
			this.x = 0;
			this.y = 0;
			this.z = 0;
			if(this.direction == 'right'){
				this.wave_one = game.add.sprite(this.sprite.x + 130,this.sprite.y + 40,null);
				this.wave_two = game.add.sprite(this.sprite.x + 130,this.sprite.y + 40,null);
				this.wave_three = game.add.sprite(this.sprite.x + 130,this.sprite.y + 40,null);
				this.special_direction = 'right';
				this.wave_speed = 10;
			}else{
				this.wave_one = game.add.sprite(this.sprite.x,this.sprite.y + 40,null);
				this.wave_two = game.add.sprite(this.sprite.x,this.sprite.y + 40,null);
				this.wave_three = game.add.sprite(this.sprite.x,this.sprite.y + 40,null);
				this.special_direction = 'left';
				this.wave_speed = -10;
			}
			this.scrolling = true;
			game.physics.arcade.enable(this.wave_one);
			game.physics.arcade.enable(this.wave_two);
			game.physics.arcade.enable(this.wave_three);
			this.wave_one.body.setSize(100,100);
			this.wave_two.body.setSize(100,100);
			this.wave_three.body.setSize(100,100);
		}
		
		if(this.special_direction == 'right' && this.can_move == false){
			this.sprite.animations.play('rightspecial');
		}else if(this.special_direction == 'left' && this.can_move == false){
			this.sprite.animations.play('leftspecial');
		}
		//Scroll beam
			if(this.scrolling == true && this.cooldown == false){
				if(this.x < 990){
					this.x += 20;
					this.wave_one.x += this.wave_speed;
					this.wave_one.y += 10;
					this.wave_one.body.setSize(100,-this.x);
					game.debug.body(this.wave_one);
				}else{
					this.wave_one.destroy();
					this.scrolling = false;
				}
			}
			//Wave 2
			if(this.x > 445 && this.y < 990){
				this.y += 20;
				this.wave_two.x += this.wave_speed;
				this.wave_two.y += 10;
				this.wave_two.body.setSize(100,-this.y);
				game.debug.body(this.wave_two);
			}
			if(this.y >= 990){
				this.wave_two.destroy();
			}
			//Wave 3
			if(this.y > 445 && this.z < 990){
				this.z += 20;
				this.wave_three.x += this.wave_speed;
				this.wave_three.y += 10;
				this.wave_three.body.setSize(100,-this.z);
				game.debug.body(this.wave_three);
			}
			if(this.z >= 990){
				this.wave_three.destroy();
				this.cooldown = true;
				game.time.events.add(Phaser.Timer.SECOND * 15, this.resetCooldown, this);
				this.channeling = false;
				this.can_move = true;
				this.check = true;
			}
	},
	//Resets Special Cooldown
	resetCooldown: function() {
		this.cooldown = false;
		console.log('Player 1 Special Ready');
	},
	//Enable Coffee Buff
	enable_coffee_buff: function(game){
		this.coffee_buff = true;
		this.attack_power = 2;
		this.movementspeed = 14;
		game.time.events.add(Phaser.Timer.SECOND * 15, this.end_coffee_buff, this);
	},
	//Ends Coffee Buff
	end_coffee_buff: function(){
		this.coffee_buff = false;
		this.attack_power = 1;
		this.movementspeed = 7;
	},
	destroy_hitbox: function(){
		this.attack_hitbox.destroy();
	}
}