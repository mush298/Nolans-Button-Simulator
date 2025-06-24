const CURRENCIES = {
    cash: {
        get amount() { return player.cash },
        set amount(v) { player.cash = v.max(0) },
    
        get gain() {
            let x = E(1).mul(player.multiplier.add(1))

            if (player.ranks.rank.gte(2)) x = x.mul(getRankEffect('rank', 0))

            if (player.ranks.rank.gte(8)) x = x.mul(getRankEffect('rank', 2))

            if (player.ranks.rank.gte(12)) x = x.mul(getRankEffect('rank', 4))
            
            if (player.ranks.tier.gte(1)) x = x.mul(getRankEffect('tier', 0))

            x = x.mul(player.ultra_rebirth.add(1))

            if (player.ranks.rank.gte(34)) x = x.mul(getRankEffect('rank', 8))

            if (player.ranks.tier.gte(4)) x = x.mul(getRankEffect('tier', 3))

            if (player.ranks.rank.gte(58)) x = x.mul(getRankEffect('rank', 10))

            x = x.mul(ASCENSION.apEffect(player.ascension.total_power))

            x = x.mul(player.prestige.add(1).pow(4))

            if (player.ranks.tetr.gte(1)) x = x.pow(1.15)

            if (player.ranks.rank.gte(27)) x = x.pow(getRankEffect('rank', 7))

            x = x.pow(ASCENSION.getUpgEffect(6))

            if (player.ranks.tetr.gte(3)) x = x.pow(1.2)

            return E(x)
        },
    },
    multiplier: {
        get amount() { return player.multiplier },
        set amount(v) { player.multiplier = v.max(0) },
    
        get gain() {
            let x = E(2)

            if (player.ranks.rank.gte(4)) x = x.add(getRankEffect('rank', 1, true))

            return x
        },
    },
    rebirth: {
        get amount() { return player.rebirth },
        set amount(v) { player.rebirth = v.max(0) },
    
        get gain() {
            let x = E(3)

            return x
        },
    },
    ultra_rebirth: {
        get amount() { return player.ultra_rebirth },
        set amount(v) { player.ultra_rebirth  = v.max(0) },
    
        get gain() {
            let x = E(3)

            return x
        },
    },
    prestige: {
        get amount() { return player.prestige },
        set amount(v) { player.prestige  = v.max(0) },
    
        get gain() {
            let x = E(3)

            return x
        },
    },
    ascension: {
        next(s=player.ascension.ascensions) {
            let x = s.div(this.mult).root(this.exp)
            x = x.pow_base(this.base).mul(1e3).pow_base(10)
            return x
        },

        get base() { return E(3) },

        get require() { return this.next() },

        get amount() { return player.ascension.ascensions },
        set amount(v) { player.ascension.ascensions = v.max(0) },

        get mult() {return E(1)},
        get exp() {return E(1)},
    
        get gain() {
            let x = player.cash.log10().div(1e3).log(this.base).floor().add(1)

            x = x.sub(player.ascension.ascensions)

            return x
        },
        
        get passive() {return 0}
    },
    ascension_power: {
        get amount() { return player.ascension.power },
        set amount(v) { player.ascension.power  = v.max(0) },

        get total() { return player.ascension.total_power },
        set total(v) { player.ascension.total_power = v.max(0) },
    
        get gain() {
            let x = E(0)

            x = x.add(player.ascension.ascensions)

            x = x.mul(ASCENSION.getUpgEffect(0))

            x = x.mul(ASCENSION.getUpgEffect(2))

            x = x.mul(getRankEffect('rank', 14))

            x = x.mul(getRankEffect('tier', 7))

            x = x.mul(getRankEffect('tier', 1))

            if (ASCENSION.hasMilestone(1)) x = x.mul(player.ascension.ascensions.pow10())

            if (player.ranks.tetr.gte(3)) x = x.pow(1.1)

            return x
        },
    },
}

function setupCurrencies() {
    for (let [i,v] of Object.entries(CURRENCIES)) {
        v.name ??= lang_text(i+"-name")
        v.costName ??= lang_text(i+"-costName") ?? v.name
    }
}

function gainCurrency(id,amt) {
    var curr = CURRENCIES[id]
    curr.amount = curr.amount.add(amt)
    if ('total' in curr) curr.total = curr.total.add(amt)
}