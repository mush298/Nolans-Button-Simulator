const BUTTONS = [
    {
        unl: ()=>player.ranks.rank.gte(1),

        curr: "multiplier",
        cost_curr: "cash",
        
        get base() {
            let x = E(2)

            if (player.ranks.rank.gte(4)) x = x.add(getRankEffect('rank', 1, true))

            if (player.ranks.rank.gte(10)) x = x.add(getRankEffect('rank', 3, true))

            x = x.mul(ASCENSION.getUpgEffect(1))

            return x
        },

        get mult() {
            let x = E(1)

            x = x.add(player.rebirth)

            if (player.ranks.rank.gte(8)) x = x.mul(2)

            if (player.ranks.tier.gte(1)) x = x.mul(2)

            if (player.ranks.rank.gte(14)) x = x.mul(getRankEffect('rank', 5))

            if (player.ranks.tier.gte(4)) x = x.mul(getRankEffect('tier', 3))

            x = x.mul(player.prestige.add(1).pow(3))

            x = x.mul(ASCENSION.getUpgEffect(5))
            
            if (player.ranks.tetr.gte(1)) x = x.mul(5)

            if (player.ranks.rank.gte(45)) x = x.pow(1.2)

            if (player.ranks.tier.gte(18)) x = x.pow(1.3)

            

            return x
        },
        
        cost_base: E(10),

        color: "#E4080A",
        color_disabled: "#8F0103",
    },
    {
        unl: ()=>player.ranks.rank.gte(6),

        curr: "rebirth",
        cost_curr: "multiplier",
        
        get base() {
            let x = E(3)

            if (player.ranks.tier.gte(2)) x = x.add(getRankEffect('tier', 1, true))

            x = x.mul(ASCENSION.getUpgEffect(7))

            return x
        },

        get mult() {
            let x = E(1)

            x = x.add(player.ultra_rebirth)

            if (player.ranks.rank.gte(8)) x = x.mul(2)

            if (player.ranks.tier.gte(1)) x = x.mul(2)

            if (player.ranks.rank.gte(15)) x = x.mul(getRankEffect('rank', 6))

            if (player.ranks.tier.gte(4)) x = x.mul(getRankEffect('tier', 3))
            
            x = x.mul(player.prestige.add(1).pow(2))

            if (player.ranks.tetr.gte(1)) x = x.mul(5)

            x = x.mul(ASCENSION.getUpgEffect(5))

            if (player.ranks.rank.gte(45)) x = x.pow(1.1)

            if (player.ranks.tier.gte(18)) x = x.pow(1.2)

            return x
        },
        
        get cost_base() {
            let x = E(10000)

            if (player.ranks.tier.gte(1)) x = x.div(10)

            return x
        },

        color: "#0595D7",
        color_disabled: "#01577F",
    },
    {
        unl: ()=>player.ranks.rank.gte(19),

        curr: "ultra_rebirth",
        cost_curr: "rebirth",
        
        get base() {
            let x = E(10)
            
            if (player.ranks.rank.gte(186)) x = x.mul(2)

            return x
        },

        get mult() {
            let x = E(1)

            x = x.add(player.prestige)

            if (player.ranks.tier.gte(4)) x = x.mul(getRankEffect('tier', 3))

            if (player.ranks.tetr.gte(1)) x = x.mul(5)

            if (player.ranks.rank.gte(172)) x = x.mul(getRankEffect('rank', 11))

            x = x.mul(ASCENSION.getUpgEffect(5))

            if (player.ranks.tier.gte(18)) x = x.pow(1.1)

            return x
        },
        
        get cost_base() {
            let x = E(10000)

            

            return x
        },

        color: "#060270",
        color_disabled: "#04022C",
    },
    {
        unl: ()=>player.ranks.rank.gte(74),

        curr: "prestige",
        cost_curr: "ultra_rebirth",
        
        get base() {
            let x = E(100)

            if (player.ranks.rank.gte(213)) x = x.mul(2)

            return x
        },

        get mult() {
            let x = E(1)

            if (player.ranks.tetr.gte(1)) x = x.mul(5)

            if (player.ranks.rank.gte(186)) x = x.mul(getRankEffect('rank', 12))

            x = x.mul(ASCENSION.getUpgEffect(4))

            x = x.mul(ASCENSION.getUpgEffect(5))

            return x
        },
        
        get cost_base() {
            let x = E(1000000)

            if (player.ranks.tier.gte(10)) x = x.div(10)

            if (player.ranks.tier.gte(12)) x = x.div(10)

            if (player.ranks.tier.gte(14)) x = x.div(10)

            return x
        },

        color: "#CC6CE7",
        color_disabled: "#790499",
    },
]

function createButtons() {
    for (let i = 0; i < BUTTONS.length; i++) {
       el('buttons').innerHTML += `<div id = "buttons${i}"></div>`

       el(`buttons${i}`).innerHTML += `<div id = "stat${i}">Hello</div>`

       for (let j = 0; j < 10; j++) {
        el(`buttons${i}`).innerHTML += `<button class = "stat-button" id = "button${i}-${j}">hello<div class = "line"></div>hi</button>`
       }

    }
}

function updateButtonsHTML() {
    for (let i = 0; i < BUTTONS.length; i++) {
        el(`buttons${i}`).style.display = el_display(BUTTONS[i].unl())
        el(`stat${i}`).innerHTML = lang_text(`stat-${i}`, i==0?toTextStyle(formatMult(CURRENCIES[BUTTONS[i].curr].amount), BUTTONS[i].curr):toTextStyle(format(CURRENCIES[BUTTONS[i].curr].amount), BUTTONS[i].curr))
       for (let j = 0; j < 10; j++) {

        let x = BUTTONS[i].base.pow(j+1).mul(BUTTONS[i].mult)
        let y = BUTTONS[i].cost_base.pow(j+1)

        el(`button${i}-${j}`).innerHTML = lang_text(`button-${i}`, i==0?toTextStyle(formatMult(x), BUTTONS[i].curr):toTextStyle(format(x), BUTTONS[i].curr), i==1?toTextStyle(formatMult(y), BUTTONS[i].cost_curr):toTextStyle(format(y), BUTTONS[i].cost_curr))

        el(`button${i}-${j}`).style.backgroundColor = CURRENCIES[BUTTONS[i].cost_curr].amount.gte(y) ? BUTTONS[i].color : BUTTONS[i].color_disabled

        el(`button${i}-${j}`).onclick = () => buyButton(i, y, x)
       }
    }
}

function buyButton(i, c, a) {
    if (CURRENCIES[BUTTONS[i].cost_curr].amount.gte(c)) {
       CURRENCIES[BUTTONS[i].curr].amount = CURRENCIES[BUTTONS[i].curr].amount.add(a)

       i == 0 ? CURRENCIES[BUTTONS[i].cost_curr].amount = CURRENCIES[BUTTONS[i].cost_curr].amount.sub(c) : doReset(BUTTONS[i].curr)
    }
}