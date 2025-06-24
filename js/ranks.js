const RANKS = {
    rank: {
        get amount() { return player.ranks.rank },
        set amount(v) { player.ranks.rank = v.max(0) },

        get require() { return this.formula(player.ranks.rank) },
    
        formula(r) {
            r = E(r)

            if (r.lte(0)) return E(10)

            let scaled = r.add(1).scaleAll('rank')
            let base = E(8)
            if (player.ranks.tier.gte(2)) base = base.sub(1)
            if (player.ranks.tier.gte(3)) base = base.sub(1)
            if (player.ranks.tier.gte(4)) base = base.sub(1)
            if (player.ranks.tier.gte(5)) base = base.sub(1)
            let x = E(base).pow(scaled.pow(1.25)).floor()

            return x
        },

        bulk(x) {
          x = E(x)
         if (x.lt(10)) return E(0) 
        let base = E(8)
        if (player.ranks.tier.gte(2)) base = base.sub(1)
        if (player.ranks.tier.gte(3)) base = base.sub(1)
        if (player.ranks.tier.gte(4)) base = base.sub(1)
        if (player.ranks.tier.gte(5)) base = base.sub(1)
         let unscaled = x.log(base).root(1.25).scaleAll('rank', true)
        return unscaled.sub(1).max(0).floor().add(1)
        },

        effects: [
            [E(2),(x)=>x.sub(1).pow_base(2)],
            [E(4),(x)=>E(1)],
            [E(8),(x)=>E(2)],
            [E(10),(x)=>x.sub(8)],
            [E(12),(x)=>player.rebirth.max(10).log10().pow(2.5)],
            [E(14),(x)=>player.cash.max(10).log10().pow(player.ranks.rank.gte(15) ? 1.25 : 0.8)],
            [E(15),(x)=>player.cash.max(10).log10().pow(player.ranks.rank.gte(34) ? 1.05 : 0.5)],
            [E(27),(x)=>E(1).add(x.mul(0.01)).min(1.99)],
            [E(34),(x)=>player.ultra_rebirth.max(10).log10().pow(4)],
            [E(45),(x)=>E(1)],
            [E(58),(x)=>player.cash.max(10).log10().pow(player.ranks.tier.add(1))],
            [E(172),(x)=>player.cash.max(10).log10().pow(0.75)],
            [E(186),(x)=>player.cash.max(10).log10().pow(0.5)],
            [E(213),(x)=>player.cash.max(10).log10().pow(0.5)],
            [E(240),(x)=>x.pow(0.5).add(1)],
            [E(286),(x)=>x.pow(0.5).add(1)],
        ],

        index: 0
    },
    tier: {
        get amount() { return player.ranks.tier },
        set amount(v) { player.ranks.tier = v.max(0) },

        get require() { 
            if (player.ranks.tier.eq(2)) return E(24.9)
            else return this.formula(player.ranks.tier)
         },
    
        formula(r) {
            r = E(r)

            let x = (r.add(3)).pow(2)

            return x
        },

        bulk(x) {
          x = E(x)

         return x.root(2).sub(3).floor().add(1)
        },

        effects: [
            [E(1),(x)=>x.add(1).pow_base(3)],
            [E(2),(x)=>x],
            [E(3),(x)=>x],
            [E(4),(x)=>E(3)],
            [E(5),(x)=>E(3)],
            [E(10),(x)=>E(3)],
            [E(12),(x)=>E(3)],
            [E(14),(x)=>x.pow(x.div(10))],
            [E(18),(x)=>E(1.1)],
        ],

        index: 1
    },
    tetr: {
        get amount() { return player.ranks.tetr },
        set amount(v) { player.ranks.tetr = v.max(0) },

        get require() { 
            if (player.ranks.tetr.eq(2)) return E(24.9)
            else return this.formula(player.ranks.tetr)
         },
    
        formula(r) {
            r = E(r)

            let x = (r.add(3)).pow(2)

            return x
        },

        bulk(x) {
          x = E(x)

         return x.root(2).sub(3).floor().add(1)
        },

        effects: [
            [E(1),(x)=>x],
            [E(2),(x)=>x.pow10()],
        ],

        index: 2
    },
}

function getNRE(r) {
    for (let i = 0; i < RANKS[r].effects.length; i++) {
        if (RANKS[r].amount.lt(RANKS[r].effects[i][0])) {
            return i;
        }
    }
    return -1;
}

function getRankEffect(r, i, a=false) {
  return RANKS[r].amount.gte(RANKS[r].effects[i][0]) ? RANKS[r].effects[i][1](RANKS[r].amount) : a ? 0 : 1
}