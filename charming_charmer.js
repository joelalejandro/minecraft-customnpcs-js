/**
  Charming Charmer
  
  Allows you to program an NPC that enchants items or enhances previous enchantments
  for money.
  
  If the supplied item has no enchantment, it'll provide a Level 1 enchantment suitable for
  that item for a given amount of money.
  
  If the supplied item is already enchanted, it'll +1 the level of each enchantment
  for an amount of money that is the sum of all enchantments' level plus a random 0-2 extra.
**/

// Settings.
var CURRENCY_ID = 'customnpcs:npcCoinGold';
var CURRENCY_NAME = 'gold coins';
var BASE_COST = 5;

var h = player.getHeldItem();
if (h === null) {
  npc.say(player, 'First enchantment: ' + BASE_COST + ' ' + CURRENCY_NAME + '. Leveling up: 1 ' + CURRENCY_NAME + ' per each enchantment level.');
} else {
  var name = h.getName();
  var itemName = h.getItemName();
  var lName = name.toLowerCase();
  if (h.isEnchanted()) {
    var ench = h.getTag('ench');
    ench = ench.toString().replace(/s,/g, ',').replace(/,\}/g, '}').replace(/,\]/g, ']').replace(/\d\:/g, '');
    var keys = /([a-z]+)\:/gi;
    keys.test(ench);
    ench = ench.replace(keys, '"$1":');
    var jsonEnch = JSON.parse(ench);
    var cost = jsonEnch.map(function(x) { return x.lvl; }).concat([0, 0]).reduce(function(a, b) { return a + b; }) + Math.ceil(Math.random() * 3);
    if (!player.removeItem(CURRENCY_ID, 0, cost)) {
      npc.say(player, 'Leveling up all your enchantments will cost you ' + cost + ' ' + CURRENCY_NAME + '.');
    } else {
      jsonEnch.forEach(function(e) { e.lvl += 1; });
      npc.say(player, JSON.stringify(jsonEnch));
      var enchTag = '{ench:[';
      jsonEnch.forEach(function(e, i) {
        enchTag += i + ':{lvl:' + e.lvl + 's,';
        enchTag += 'id:' + e.id + 's,},';
      });
      enchTag += ']}';
      player.removeAllItems(h);
      npc.executeCommand('/give @p ' + name + ' 1 0 ' + enchTag);
    }
  } else {
    if (!player.removeItem(CURRENCY_ID, 0, BASE_COST)) {
      npc.say(player, 'To acquire a Level 1 enchantment for your ' + h.getItemName() + ' you will need ' + BASE_COST + ' ' + CURRENCY_NAME + '.');
    } else {
      var enchId = 0;
      player.removeAllItems(h);
      var swordLikeItems = ['sword','katana','kukri','trident','hammer','staff','saiblade','spear','halberd','battleaxe','mace','dagger','claw','scythe','glaive'];
      if (swordLikeItems.some(function(s) { return lName.indexOf(s) > -1; })) {
        var swordEnchs = [16,17,18,19,20,21,34,100,101,102];
        enchId = swordEnchs[parseInt(Math.random() * swordEnchs.length)];
      } else if (lName.indexOf('pickaxe') > -1) {
        var pickaxeEnchs = [32,35,34,33];
        enchId = pickaxeEnchs[parseInt(Math.random() * pickaxeEnchs.length)];
      } else if (lName.indexOf('helmet') > -1) {
        var helmetEnchs = [0,1,3,4,5,6,7,12,34];
        enchId = helmetEnchs[parseInt(Math.random() * helmetEnchs.length)];
      } else if (lName.indexOf('chest') > -1) {
        var chestEnchs = [0,1,3,4,7,11,34];
        enchId = chestEnchs[parseInt(Math.random() * chestEnchs.length)];
      }
      npc.executeCommand('/give @p ' + name + ' 1 0 {display:{Name:"' + itemName + ' - Enchanted"},ench:[0:{lvl:1s,id:' + enchId + 's,},]}');
    }
  }
}
