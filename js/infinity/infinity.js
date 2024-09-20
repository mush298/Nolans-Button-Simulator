function calculateInfinityPoints() {
    let total = getTotalIPMulti()
    return player.currencies[0].value.add(1).log10().div(9e15).floor().mul(total)
}

function updateInfinityHTML() {
    el("infinitypoint").innerHTML = "<text-style text=\"" + "infinity" + "\">" + format(player.infinity.points) + "</text-style> " + " Infinity Points"
    el("infinitypoint2").innerHTML = "You have <text-style text=\"" + "infinity" + "\">" + format(player.infinity.points) + "</text-style> " + " infinity points"
    el("infinity-button1").innerHTML = "Go Infinite for <text-style text=\"" + "infinity" + "\">" + format(calculateInfinityPoints()) + "</text-style> " + " infinity points"
    el("infinitylimit").innerHTML = "The infinity limit is currently <text-style text=\"" + "infinity" + "\">" + format(player.infinity.limit) + "</text-style> "
    el("infinity-button1").innerHTML = "Go Infinite for <text-style text=\"" + "infinity" + "\">" + format(calculateInfinityPoints()) + "</text-style> " + " infinity points"
    el("infinity-button2").innerHTML = "Upgrade the limit to " + format(getLimitLevel(player.infinity.limit_level.add(1))) + " for <text-style text=\"" + "infinity" + "\">" + format(getLimitCost()) + "</text-style> " + " infinity points"
    player.infinity.limit = getLimitLevel(player.infinity.limit_level)
    for (let i = 0; i < infinity_upgrades.length; i++) {


        if (player.infinity.upgrades.includes(i)) {

            el(`iu${i}`).classList.remove('infinity-button')
            el(`iu${i}`).classList.add('infinity-button-bought')
        } else {

            el(`iu${i}`).classList.add('infinity-button')
            el(`iu${i}`).classList.remove('infinity-button-bought')
        }


        if (i == 4) {
            el(`iu${i}`).innerHTML = infinity_upgrades[i].name + " Currently: ^" + format(player.currencies[0].value.add(1).log10().log10().add(1)) + " (Cost: <text-style text=\"" + "infinity" + "\">" + format(infinity_upgrades[i].cost) + "</text-style> " + " infinity points)"
        } else {
            el(`iu${i}`).innerHTML = infinity_upgrades[i].name + " (Cost: <text-style text=\"" + "infinity" + "\">" + format(infinity_upgrades[i].cost) + "</text-style> " + " infinity points)"
        }

    }
    for (let i = 0; i < 100; i++) {
        if (i == 6) {
            if (hasInfinityUpgrade(i)) {
                player.infinity.point_multi[i] = E(30)
            }
        } else {
            if (hasInfinityUpgrade(i)) {
                player.infinity.point_multi[i] = E(3)
            }
        }

    }


}

function goInfinite() {
    if (player.options.confirmations.infinity) {
        if (confirm("Are you sure you want to go infinite, infinity will reset your tier, and your rank, but you will gain infinity points, with these things you will come back stronger!")) {
            player.infinity.points = player.infinity.points.add(calculateInfinityPoints())
            player.infinity.times = player.infinity.times.add(1)
            player.tier = 0
            player.rank = 0
            reset()
        }
    } else {
        player.infinity.points = player.infinity.points.add(calculateInfinityPoints())
        player.infinity.times = player.infinity.times.add(1)
        player.tier = 0
        player.rank = 0
        reset()
    }
}

function getLimitLevel(i) {
    let j = E(i)
    if (j.lte(0)) {
        return E("e9e15")
    } else {
        let log = E(15)
        log = log.add(j)
        let final = E(0)
        final = log.pow10().mul(3).add(3).pow10()
        return final

    }
}

function getLimitCost() {
    if (player.infinity.limit_level.lte(2)) {
        return E(1000).pow(player.infinity.limit_level)
    } else {
        return E(2).pow(1024).pow(player.infinity.limit_level)
    }



}

function buyLimit() {
    if (player.infinity.points.gte(getLimitCost())) {
        player.infinity.points = player.infinity.points.sub(getLimitCost())
        player.infinity.limit_level = player.infinity.limit_level.add(1)
    }
}
let infinity_upgrades = [{
        name: "Automatically gain multiplier but remove multiplier buttons, and 3x infinity points :D",
        cost: E(3),
        bought: false
    },
    {
        name: "Automatically gain rebirths but remove rebirth buttons, and 3x more infinity points (POG)",
        cost: E(9),
        bought: false
    },
    {
        name: "Unlock auto rank up, and rank no longer resets anything + 3x IP (WOW)",
        cost: E(50),
        bought: false
    },
    {
        name: "Automatically gain ultra rebirths but remove ultra rebirth buttons + 3x IP (nice)",
        cost: E(240),
        bought: false
    },
    {
        name: "Cash gain is boosted by log10^2(Cash), ",
        cost: E(2500),
        bought: false
    },
    {
        name: "Unlock auto tier up, and tier no longer resets anything + 3x even MOAR IP",
        cost: E(25000),
        bought: false
    },
    {
        name: "10x IP :D",
        cost: E(2500000),
        bought: false
    },
]
const hasInfinityUpgrade = i => player.infinity.upgrades.includes(i)

function buyInfinityUpgrade(i) {
    if (player.infinity.points.gte(infinity_upgrades[i].cost) && !player.infinity.upgrades.includes(i)) {
        player.infinity.points = player.infinity.points.sub(infinity_upgrades[i].cost)
        player.infinity.upgrades.push(i)
        infinity_upgrades[i].bought = true
    }
}

function getTotalIPMulti() {
    let t = E(1)
    for (let j = 0; j < player.infinity.point_multi.length; j++) {
        t = t.mul(player.infinity.point_multi[j])
    }
    return t
}