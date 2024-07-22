let rankcost = [[E(1e5), 0], [E("5e8"), 0],[E("2.5e21"), 0],[E("e31"), 0],[E("e39"), 0],[E("250e63"), 0],[E("1e113"), 0],[E("1e153"), 0],[E("1e188"), 0],
[E("1e262"), 0], [E("1e291"), 0], [E("1e320"), 0], [E("e5e8000"), 0],];
let tiercost = [12, 9999999999999999]

function updateRankHTML() {
    let r = player.rank + 1;
    let t = player.tier + 1;
    el("rank-amount").innerHTML = "Rank " + player.rank;
    el("rank-button").innerHTML = "Upgrade to rank " + r + " for <text-style text=\"" + player.currencies[rankcost[player.rank][1]].name + "\">" + format(rankcost[player.rank][0]) + "</text-style> " + player.currencies[rankcost[player.rank][1]].name;
    el("tier-amount").innerHTML = "Tier " + player.tier;
    el("tier-button").innerHTML = "Upgrade to tier " + t + " at Rank " + tiercost[player.tier];
}
function upgradeRank() {
    if (confirm("Would you like to upgrade to rank " + (player.rank + 1) + "?") && player.currencies[0].value.gte(rankcost[player.rank][0]) ) {
    player.rank += 1;
    reset()
    }
}
function upgradeTier() {
    if (confirm("Would you like to upgrade to tier " + (player.tier + 1) + "?") && player.rank >= tiercost[player.tier]) {
    player.tier += 1;
    player.rank = 0;
    reset()
    }
}
