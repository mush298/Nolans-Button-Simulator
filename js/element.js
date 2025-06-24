function el_display(bool) { return bool ? "" : "none" }
function el_classes(data) { return Object.keys(data).filter(x => data[x]).join(" ") }

function updateHTML() {
    updateTabs()
    updateTopCurrenciesHTML()
    updateRanksHTML()
    updateOptionsHTML()
    updateButtonsHTML()

    el('cash-amount').innerHTML = lang_text('cash-amount', toTextStyle(format(player.cash), 'cash'), formatGain(player.cash, CURRENCIES.cash.gain))
}

function setupHTML() {
    setupTabs()

    setupTopCurrenciesHTML()

    setupRanksHTML()

    setupScalingsTable()

    setupOptionsHTML()

    createButtons()

    createAscensionHTML()

    for (let x of document.getElementsByTagName('*')) if (x.id in lang_data && ALLOWED_LANG_KEY_TO_ELEMENT_ID.includes(x.id)) x.innerHTML = lang_text(x.id)
}

function setupTopCurrenciesHTML() {
    let h = ""

    for (let [i,x] of Object.entries(TOP_CURR)) {
        h += `
        <div class="curr-top" id="curr-top-${i}-div">
            <div id="curr-top-${i}-amt1"><b><span id="curr-top-${i}-amt2">???</span></b> ${CURRENCIES[x.curr].costName}</div><button onclick="doReset('${x.reset ?? x.curr}')" id="curr-top-${i}-btn">Reset</button>
        </div>
        `
    }

    el('currs-top').innerHTML = h
}
function updateTopCurrenciesHTML() {
    for (let [i,x] of Object.entries(TOP_CURR)) {
        var unl = !x.unl || x.unl()
        el(`curr-top-${i}-div`).style.display = el_display(unl)

        if (!unl) continue

        var c = CURRENCIES[x.curr]
        el(`curr-top-${i}-amt2`).textContent =  c.amount.format(0) + ((c.passive??1)>0?" "+c.amount.formatGain(CURRENCIES[x.curr].gain.mul(c.passive)):"")

        let req = !x.req || x.req()
        el(`curr-top-${i}-btn`).innerHTML = req ? lang_text('curr-top-'+i+'-reset',CURRENCIES[x.curr].gain,...c.moreArg??[]) : lang_text('curr-top-'+i+'-req',c.require)
        el(`curr-top-${i}-btn`).className = el_classes({locked: !req})
    }
}

function setupRanksHTML() {
    let h = ""

    for (let [i,x] of Object.entries(TOP_RANKS)) {
        h += `
        <div class="rank-top" id="rank-top-${i}-div">
            <div id="rank-top-${i}-amt1">${lang_text(`${TOP_RANKS[i].curr}-costName`)}<span id="rank-top-${i}-amt2"><b>???</b></span></div><button onclick="doReset('${x.reset ?? x.curr}')" id="rank-top-${i}-btn">Reset</button>
        </div>
        `
    }

    el('ranks').innerHTML = h
}

function updateRanksHTML() {
    for (let [i,x] of Object.entries(TOP_RANKS)) {
        var unl = !x.unl || x.unl()
        el(`rank-top-${i}-div`).style.display = el_display(unl)

        if (!unl) continue

        var c = RANKS[x.curr]
        el(`rank-top-${i}-amt2`).innerHTML = " " + `<b>${format(c.amount)}</b>`

        let req = !x.req || x.req()

        let lang = lang_text('rank-effects')[RANKS[TOP_RANKS[i].curr].index]
        
        let eff_i = getNRE(TOP_RANKS[i].curr)

        let final = eff_i == -1 ? '' : lang[eff_i]

        el(`rank-top-${i}-btn`).innerHTML = req ? lang_text('rank-'+i+'-reset', c.require, final) : lang_text('rank-'+i+'-req',c.require, final)
        el(`rank-top-${i}-btn`).className = el_classes({locked: !req})
    }
}