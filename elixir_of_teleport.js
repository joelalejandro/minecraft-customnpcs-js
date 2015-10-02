/**
  Elixir of Teleport
  
  Creates a potion that allows you to escape from danger. It teleports
  the player to a random position within n-blocks of range.
  
  To craft the item:
  
  /give @p minecraft:potion 1 0 {display:{Name:Elixir of Teleport,Lore:["Drink your way out!"]},ench:[]}
  
  Create an invisible and place the following code under each hook.
**/

/** Init hook **/

npc.executeCommand('/scoreboard objectives remove elixirOfTeleport');
npc.executeCommand('/scoreboard objectives add elixirOfTeleport stat.useItem.minecraft.potion');

/** Update hook **/

var TELEPORT_RANGE = 150;

var players = world.getAllServerPlayers();
var sb = world.getScoreboard();
var teleportPot = world.createItem('minecraft:potion', 0, 1);
teleportPot.setCustomName('Elixir of Teleport');
for (var p = 0; p < players.length; p++) {
  var player = players[p];
  if (sb.getPlayerScore(player.getName(), 'elixirOfTeleport', '')) {
    if (player.inventoryItemCount(teleportPot) >= 1) {
      player.removeItem(teleportPot, 1);
      sb.setPlayerScore(player.getName(), 'elixirOfTeleport', 0, '');
      npc.executeCommand('/spreadplayers ~ ~ 0 ' + TELEPORT_RANGE + ' false ' + player.getName());
    }
  }
}
