let rankcost = [[E(1e5), 0], [E("5e8"), 0],[E("2.5e21"), 0],[E("e31"), 0],[E("e39"), 0],[E("250e63"), 0],[E("1e113"), 0],[E("1e153"), 0],[E("1e188"), 0],
[E("1e262"), 0], [E("1e291"), 0], [E("1e320"), 0], [E("1e933"), 0],[E("2.5e1031"), 0],[E("2.5e1105"), 0],[E("1e1177"), 0],[E("1e4173"), 0],[E("1e4568"), 0],
[E("1e33750"), 0],[E("1e38000"), 0],[E("e69e6"), 0],[E("e7.75e7"), 0],[E("e3.6e10"), 0],[E("e4.09e10"), 0],[E("e3.34e13"), 0],[E("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeee12"), 0],];
let tiercost = [12, 16, 18, 20, 22, 24, 25, 9999999999999999]

function updateRankHTML() {
    let r = player.rank + 1;
    let t = player.tier + 1;
    el("rank-amount").innerHTML = "Rank " + player.rank;
    el("rank-button").innerHTML = "Upgrade to rank " + r + " for <text-style text=\"" + player.currencies[rankcost[player.rank][1]].name + "\">" + format(rankcost[player.rank][0]) + "</text-style> " + player.currencies[rankcost[player.rank][1]].name;
    el("tier-amount").innerHTML = "Tier " + player.tier;
    el("tier-button").innerHTML = "Upgrade to tier " + t + " at Rank " + tiercost[player.tier];
}
function upgradeRank() {
    if (player.options.confirmations.rank) {
    if (confirm("Would you like to upgrade to rank " + (player.rank + 1) + "?"))
         {
            if (player.currencies[0].value.gte(rankcost[player.rank][0])) {
    player.rank += 1;
    reset()
    } else {
        
    }
}
} else {
    if (player.currencies[0].value.gte(rankcost[player.rank][0])) {
    player.rank += 1;
    reset()
    } else {
    
    }
}
}
function upgradeTier() {
    if (player.options.confirmations.tier) {
    if (confirm("Would you like to upgrade to tier " + (player.tier + 1) + "?"))
         { 
            if (player.rank >= tiercost[player.tier]) {
    player.tier += 1;
    player.rank = 0;
    reset()
    } else {
     
    }
}
} else {
    if (player.rank >= tiercost[player.tier]) {
        player.tier += 1;
        player.rank = 0;
        reset()
        } else {
        
        }
}
}
function autoRankUp() {
    if (hasInfinityUpgrade(2)) {
    if (player.currencies[0].value.gte(rankcost[player.rank][0])) {
        player.rank += 1;
        }
}
}
function autoTierUp() {
    if (hasInfinityUpgrade(5)) {
        if (player.rank >= tiercost[player.tier]) {
            player.tier += 1;
            } 
}
}
setInterval(autoRankUp, 100)
setInterval(autoTierUp, 100)
