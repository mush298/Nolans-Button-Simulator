const RESETS = {
    rank: {
        get require() { return player.cash.gte(RANKS.rank.require) }, 
        reset(force) {
            if (!force) {
                player.ranks.rank = player.ranks.rank.add(1)
            }

            this.doReset()
        },
        doReset() {

            if (!player.ranks.tier.gte(4)) {
            player.cash = E(0)
            player.multiplier = E(0)
            player.rebirth = E(0)
            }
        },
    },
    tier: {
        get require() { return player.ranks.rank.gte(RANKS.tier.require) }, 
        reset(force) {
            if (!force) {
                player.ranks.tier = player.ranks.tier.add(1)
            }

            this.doReset()
        },
        doReset() {
            player.cash = E(0)
            player.multiplier = E(0)
            player.rebirth = E(0)
            player.ultra_rebirth = E(0)
            player.ranks.rank = E(0)
        },
    },
    tetr: {
        get require() { return player.ranks.tier.gte(RANKS.tetr.require) }, 
        reset(force) {
            if (!force) {
                player.ranks.tetr = player.ranks.tetr.add(1)
            }

            this.doReset()
        },
        doReset() {
            player.cash = E(0)
            player.multiplier = E(0)
            player.rebirth = E(0)
            player.ultra_rebirth = E(0)
            player.prestige = E(0)
            player.ranks.rank = E(0)
            player.ranks.tier = E(0)
        },
    },
    multiplier: {
        get require() { return true }, 
        reset(force) {
            if (!force) {
              
            }

            this.doReset()
        },
        doReset() {
            
        },
    },
    rebirth: {
        get require() { return true }, 
        reset(force) {
            if (!force) {
              
            }

            this.doReset()
        },
        doReset() {
            player.cash = E(0)
            player.multiplier = E(0)
        },
    },
    ultra_rebirth: {
        get require() { return true }, 
        reset(force) {
            if (!force) {
              
            }

            this.doReset()
        },
        doReset() {
            player.cash = E(0)
            player.multiplier = E(0)
            player.rebirth = E(0)
        },
    },
     prestige: {
        get require() { return true }, 
        reset(force) {
            if (!force) {
              
            }

            this.doReset()
        },
        doReset() {
            player.cash = E(0)
            player.multiplier = E(0)
            player.rebirth = E(0)
            player.ultra_rebirth = E(0)
        },
    },
    ascension: {
        get require() { return player.cash.gte(CURRENCIES.ascension.next()) }, 
        reset(force) {
            if (!force) {
                gainCurrency('ascension',CURRENCIES.ascension.gain)
            }

            this.doReset()
        },
        doReset() {
            player.cash = E(0)
            player.multiplier = E(0)
            player.rebirth = E(0)
            player.ultra_rebirth = E(0)
            player.prestige = E(0)
            player.ranks.rank = E(0)
            player.ranks.tier = E(0)
            player.ranks.tetr = E(0)
        },
    },
}

function doReset(id, force, ...arg) {
    var r = RESETS[id]
    if (force || !player.radios['confirm-'+id] && r.require) r.reset(force, ...arg)
    else if (r.require) createConfirmationPopup(lang_text('reset-'+id+"-message"), () => {r.reset(false, ...arg)})
}

//createConfirmationPopup(lang_text("reset-ascension-message"), () => {player.cash.add(1)})