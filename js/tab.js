var tab = 0, stab = [0,0,0,0,0], tab_name = 'main'
function updatesomething() {

}
const TAB_IDS = {
    'main': {
        html: updateMainHTML,
    },
    'options': {
        html: updatesomething,
    },
    'options-main': {
        html: updatesomething,
    },
    'format': {
        html: updatesomething,
    },
    'saving': {
        html: updatesomething,
    },
    'stats': {
        html: updatesomething,
    },
    'scalings': {
        html: updateScalingsTable,
    },
    'ascension-power': {
        html: updateAscensionHTML,
    },
    'ascension-milestones': {
        html: updateAscensionHTML,
    },
}

const TABS = [
    { // 0
        stab: "main",
    },
    {
        id: 'ascension',
         stab: [
            ["ascension-power"],
            ["ascension-milestones"],
        ],
        unl: ()=>player.ascension.ascensions.gte(1),
    },
    {
        id: 'options',
        //unl: ()=>the thing,
        stab: [
            ["options-main"],
            ["format"],
            ['saving'],
            //['secret',()=>player.feature>=7],
        ],
    },
    {
        id: 'stats',
        //unl: ()=>the thing,
        stab: [
            ["scalings"],
            //['secret',()=>player.feature>=7],
        ],
    },
]

const DEFAULT_TAB_STYLE = {
    "background": "black",
    "backgroundSize": 'initial',
    "color": "black",
    "animation": "none",
}

function switchTab(t,st) {
    tab = t
    if (st !== undefined) stab[t] = st

    let s = TABS[t].stab

    if (Array.isArray(s)) tab_name = s[stab[t]??0][0]
    else tab_name = s
}


function updateTabs() {
    var tab_unlocked = {}

    for (let [i,v] of Object.entries(TABS)) {
        let unl = !v.unl || v.unl(), elem, selected = parseInt(i) == tab, array = Array.isArray(v.stab)
        tab_unlocked[i] = []

        if (array) {

            elem = el('stab'+i+'-div')

            elem.style.display = el_display(selected)

            if (selected) v.stab.forEach(([x,u],j) => {
                var s_elem = el('stab'+i+'-'+j+'-button')

                s_elem.style.display = el_display(!u || u())
                s_elem.className = el_classes({"tab-button": true, stab: true, selected: x == tab_name, notify: tab_unlocked[i].includes(x)}) // "tab-button stab"+(x == tab_name ? " selected" : "")
            })
        }

        elem = el('tab'+i+'-button')

        elem.style.display = el_display(unl)
        if (unl) elem.className = el_classes({"tab-button": true, selected, notify: player.radios.notify && (array ? tab_unlocked[i].length > 0 : getTabNotification(v.stab))}) // "tab-button"+(selected ? " selected" : "")
    }

    for (let [i,v] of Object.entries(TAB_IDS)) {
        let unl = tab_name == i, elem = el(i+"-tab")

        if (!elem) continue;

        elem.style.display = el_display(unl)

        if (unl) v.html?.()
    }

    let s = TABS[tab]?.style ?? {}
    for (let [k,v] of Object.entries(DEFAULT_TAB_STYLE)) document.body.style[k] = s[k] ?? v
}

function setupTabs() {
    // Setting Tab as Language

    for (let [i,v] of Object.entries(TAB_IDS)) v.name = lang_text('tab-'+i)
    TABS.forEach(v => { if (!Array.isArray(v.stab)) v.name = TAB_IDS[v.stab].name; else v.name = lang_text('tab-'+v.id) })

    // Setup HTML

    let h = "", h2 = ""

    for (let [i,v] of Object.entries(TABS)) {
        h += `<button class="tab-button" id="tab${i}-button" onclick="switchTab(${i})">${v.name}</button>`

        if (Array.isArray(v.stab)) {
            h2 += `<div id="stab${i}-div" id="${v.stab[stab[i]]}-tab">
            ${v.stab.map(([x],j) => `<button class="tab-button stab" id="stab${i}-${j}-button" onclick="switchTab(${i},${j})">${TAB_IDS[x].name}</button>`).join("")}
            </div>`
        }
    }

    el('tabs').innerHTML = h + h2
}