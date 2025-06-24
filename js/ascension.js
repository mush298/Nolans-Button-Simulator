let ASCENSION = {
    upgrades: [
        {
            cost(x) {
             return E(x.scale(E(50), 1.5, 'P')).add(1).pow10()
            },

            bulk(x) {
             return E(x).log10().scale(50, 1.5, 'P', true).sub(1).floor().add(1)
            }, 

            effect(x) {
             return E(3).pow(x)
            },

            unl: ()=> true
        },
        {
            cost(x) {
             return E(1000).pow(x.add(1))
            },

            bulk(x) {
             return E(x).log(1000).sub(1).floor().add(1)
            }, 

            effect(x) {
             return E(x).add(1).pow(2.5)
            },

            unl: ()=> true
        },
        {
            cost(x) {
             return E(250).pow(x.scale(E(2).add(player.ascension.ascensions.sub(1)), 1.5, 'P').add(2))
            },

            bulk(x) {
             return E(x).log(250).sub(2).scale(E(2).add(player.ascension.ascensions.sub(1)), 1.5, 'P', true).floor().add(1)
            }, 

            effect(x) {
             return player.cash.log10().log10().pow(2).pow(x)
            },

            unl: ()=> true
        },
        {
            cost(x) {
             return E(750).pow(x.add(2))
            },

            bulk(x) {
             return E(x).log(750).sub(2).floor().add(1)
            }, 

            effect(x) {
             return E(x).add(1)
            },

            unl: ()=> true
        },
        {
            cost(x) {
             return E(100).pow(x.add(5))
            },

            bulk(x) {
             return E(x).log(100).sub(5).floor().add(1)
            }, 

            effect(x) {
             return E(x).pow10()
            },

            unl: ()=> true
        },
        {
            cost(x) {
             return E(x.add(10)).tetrate(2)
            },

            bulk(x) {
             return E(x).slog(2).sub(10).floor().add(1)
            }, 

            effect(x) {
             return E(2).pow(x)
            },

            unl: ()=> player.ranks.tetr.gte(2)
        },

        {
            cost(x) {
             return E(15).pow(x).mul(1e21)
            },

            bulk(x) {
             return E(x).log(15).div(1e21).floor().add(1)
            }, 

            effect(x) {
             return E(x.add(1)).pow(0.1)
            },

            unl: ()=> player.ranks.tetr.gte(2)
        },

        {
            cost(x) {
             return E(1000).pow(x.add(9))
            },

            bulk(x) {
             return E(x).log(1000).sub(9).floor().add(1)
            }, 

            effect(x) {
             return E(x).pow_base(2)
            },

            unl: ()=> player.ranks.tetr.gte(3)
        },

    ],

    milestones: [E(1), E(2), E(3)],

    apEffect(x) {
        let e = E(2)
        e = e.add(ASCENSION.getUpgEffect(3))
       return x.pow(e).add(1)
    },
    getUpgEffect(i) {
       return ASCENSION.upgrades[i].effect(player.ascension.upgrades[i])
    },

    hasMilestone(i) {
       return player.ascension.ascensions.gte(ASCENSION.milestones[i])
    }
}

function updateAscension() {
  player.ascension.power = player.ascension.power.add(CURRENCIES.ascension_power.gain.div(FPS))
}

function buyAscensionUpg(i) {
    if (player.ascension.power.gte(ASCENSION.upgrades[i].cost(player.ascension.upgrades[i]))) {
        player.ascension.power = player.ascension.power.sub(ASCENSION.upgrades[i].cost(player.ascension.upgrades[i]))
        player.ascension.upgrades[i] = player.ascension.upgrades[i].add(1)
    }
}

function createAscensionHTML() {
    let u = ``
    let l = lang_text('ascension-upgrades')

    for (let i = 0; i < ASCENSION.upgrades.length; i++) {
     u += `<button id = "ascension-upg-${i}" class = "ascension-upgrade" onclick = buyAscensionUpg(${i})> <b>${l[i][0]} [${format(player.ascension.upgrades[i], 0)}]</b> <br> <p>${l[i][1](ASCENSION.getUpgEffect(0))}</p> <br> <p>${lang_text('ap-cost', ASCENSION.upgrades[i].cost(player.ascension.upgrades[i]))} </button>`
    }

    el('ascension-upgrades').innerHTML = u


    let u2 =``
    let l2 = lang_text('ascension-milestones')

    for (let i = 0; i < ASCENSION.milestones.length; i++) {
     u2 += `
     <div class="ascension-milestone" id = "ascension-milestone-${i}">
    <div class="milestone-title">${lang_text('ascension-milestone-amount', format(ASCENSION.milestones[i], 0))}</div>
    <div class="milestone-description">${l2[i]}</div>
    </div>`
    }

    el('ascension-milestones').innerHTML = u2
}

function updateAscensionHTML() {
    el('ap-amount').innerHTML = lang_text('ap-amount', toTextStyle(format(player.ascension.power), 'ascension'), formatGain(player.ascension.power, CURRENCIES.ascension_power.gain))

    el('total-ap').innerHTML = lang_text('total-ap', format(player.ascension.total_power), formatMult(ASCENSION.apEffect(player.ascension.total_power)))

    let l = lang_text('ascension-upgrades')

    for (let i = 0; i < ASCENSION.upgrades.length; i++) {
     el(`ascension-upg-${i}`).innerHTML = `<b>${l[i][0]} [${format(player.ascension.upgrades[i], 0)}]</b> <br>
      <p>${l[i][1](ASCENSION.getUpgEffect(i))}</p> <br>
       <p>${lang_text('ap-cost', format(ASCENSION.upgrades[i].cost(player.ascension.upgrades[i])))}`

        el(`ascension-upg-${i}`).style.display = el_display(ASCENSION.upgrades[i].unl())
    }

    for (let i = 0; i < ASCENSION.milestones.length; i++) {
     el(`ascension-milestone-${i}`).className = 'ascension-milestone ' + el_classes({locked: !ASCENSION.hasMilestone(i)})
    }
}