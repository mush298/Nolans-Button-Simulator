const OPTIONS = [
    {
        id: 'confirm',
        tab: 'options-main',
        options: [
            {
                id: 'confirm-ascension',
                type: 'bool'
            }
        ]
    },
]

function toggleOption(id) {
 player.radios[id] = player.radios[id] ? false : true
}

function setupOptionsHTML() {
    for (i = 0; i < OPTIONS.length; i++) {
        let h2 = ``

        let h = ``
        h += `<br><h2>${lang_text('options-'+OPTIONS[i].id)}</h2><br>`

        let j = ``
        for (k = 0; k < OPTIONS[i].options.length; k++) {
        j += `<br><h4>${lang_text('options-'+OPTIONS[i].options[k].id)}</h4><br><button id = ${OPTIONS[i].options[k].id} onclick = toggleOption('${OPTIONS[i].options[k].id}') >Off</button>`
        }

        h2 += h
        h2 += j

        el(OPTIONS[i].tab+'-tab').innerHTML += h2
    }
}

function updateOptionsHTML() {
    let ob = lang_text('option-buttons')
    for (let [k, v] of Object.entries(player.radios)) {
        el(k).innerHTML = v ? ob[0] : ob[1];
    }
}
