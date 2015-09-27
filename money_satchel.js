/**
  Money Satchel
  
  Place this script in a hidden NPC, under the "Update" hook.
  
  Allows you to collect CustomNPC coins in a satchel.

  In order to create the satchel, give it to all players (whether it is
  via hooks or quest or whatever) using:
  
  npc.executeCommand('/clear @p customnpcs:npcSatchel 0 1 {IsMoneyBag:1s}');
  npc.executeCommand('/give @p customnpcs:npcSatchel 1 0 {IsMoneyBag:1s,display:{Name:"Money Satchel",'
                   + 'Lore:["0Em | 0Di | 0Or | 0Br | 0Hi | 0Pi | 0Ma"]}}');
  
  Where:
  
    - Em = Emerald Coins
    - Di = Diamond Coins
    - Or = Gold Coins
    - Br = Bronze Coins
    - Hi = Iron Coins
    - Pi = Stone Coins
    - Ma = Wooden Coins
**/

var emCoin = world.createItem('customnpcs:npcCoinEmerald', 0, 0);
var diCoin = world.createItem('customnpcs:npcCoinDiamond', 0, 0);
var orCoin = world.createItem('customnpcs:npcCoinGold', 0, 0);
var hiCoin = world.createItem('customnpcs:npcCoinIron', 0, 0);
var brCoin = world.createItem('customnpcs:npcCoinBronze', 0, 0);
var piCoin = world.createItem('customnpcs:npcCoinStone', 0, 0);
var maCoin = world.createItem('customnpcs:npcCoinWooden', 0, 0);
var players = world.getAllServerPlayers();
for (var p = 0; p < players.length; p++) {
  var player = players[p];
  ['em', 'di', 'or', 'br', 'hi', 'pi', 'ma'].forEach(function(coin) {
    if (!player.hasStoredData(coin + 'Coins')) { player.setStoredData(coin + 'Coins', 0); } 
  });
  
  var em = player.inventoryItemCount(emCoin) + player.getStoredData('emCoins');
  var di = player.inventoryItemCount(diCoin) + player.getStoredData('diCoins');
  var or = player.inventoryItemCount(orCoin) + player.getStoredData('orCoins');
  var br = player.inventoryItemCount(brCoin) + player.getStoredData('brCoins');
  var hi = player.inventoryItemCount(hiCoin) + player.getStoredData('hiCoins');
  var pi = player.inventoryItemCount(piCoin) + player.getStoredData('piCoins');
  var ma = player.inventoryItemCount(maCoin) + player.getStoredData('maCoins');

  if (em == player.getStoredData('emCoins') 
  && di == player.getStoredData('diCoins') 
  && or == player.getStoredData('orCoins') 
  && br == player.getStoredData('brCoins') 
  && hi == player.getStoredData('hiCoins') 
  && pi == player.getStoredData('piCoins') 
  && ma == player.getStoredData('maCoins')) { continue; }

  player.setStoredData('emCoins', em);
  player.setStoredData('diCoins', di);
  player.setStoredData('orCoins', or);
  player.setStoredData('brCoins', br);
  player.setStoredData('hiCoins', hi);
  player.setStoredData('piCoins', pi);
  player.setStoredData('maCoins', ma);

  player.removeAllItems(emCoin);
  player.removeAllItems(diCoin);
  player.removeAllItems(orCoin);
  player.removeAllItems(brCoin);
  player.removeAllItems(hiCoin);
  player.removeAllItems(piCoin);
  player.removeAllItems(maCoin);
  
  npc.executeCommand('/clear ' + player.getName() + ' customnpcs:npcSatchel 0 1 {IsMoneyBag:1s}');
  npc.executeCommand('/give ' + player.getName() + ' customnpcs:npcSatchel 1 0 '
                   + '{IsMoneyBag:1s,display:{Name:"Money Satchel",Lore:'
                   + '["' + em + 'Em | ' + di + 'Di | ' + or + 'Or | ' + br + 'Br | ' + hi + 'Hi | ' + pi + 'Pi | ' + ma + 'Ma"]}}');
  
}
