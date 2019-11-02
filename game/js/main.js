"use strict"
var game;
window.onload = function()
{
	game = new Phaser.Game(1920, 1080, Phaser.AUTO);
	game.state.add("Level", level);
	game.state.start("Level");
}
