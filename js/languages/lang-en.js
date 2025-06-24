// This is main language file! It's English!

LANGUAGES.EN = {
    name: "English",
    inter_name: "English",
    icon: "lang-en",

    text: {
        'ascension-name': "Ascensions",
        'ascension-costName': "Ascensions",

        'rank-costName': "Rank",
        'tier-costName': "Tier",
        'tetr-costName': "Tetr",

        'curr-top-0-req': x => `Reach <b>${format(x)}</b> cash.`, 
        'curr-top-0-reset': x => `Ascend for <b>${format(x)}</b> ascensions.`,

        'rank-0-req': (x, y) => `Reset your cash, and rank up! ${y} <div class = "line"></div> <b>${format(x)}</b> cash.`, 
        'rank-0-reset': (x, y) => `Reset your cash, and rank up! ${y} <div class = "line"></div> <b>${format(x)}</b> cash.`,

        'rank-1-req': (x, y) => `Reset your rank, and tier up! ${y} <div class = "line"></div> Rank <b>${format(x,0)}</b>`, 
        'rank-1-reset': (x, y) => `Reset your rank, and tier up! ${y} <div class = "line"></div> Rank <b>${format(x,0)}</b>`,

        'rank-2-req': (x, y) => `Reset your tier, and tetr up! ${y} <div class = "line"></div> Tier <b>${format(x,0)}</b>`, 
        'rank-2-reset': (x, y) => `Reset your tier, and tetr up! ${y} <div class = "line"></div> Tier <b>${format(x,0)}</b>`, 
        

        'rank-effects': [
            [
            /*0*/ `<br> At Rank 2, multiply cash gain by 2<sup>(rank - 1)</sup>.`,
            /*1*/ `<br> At Rank 4, improve multiplier base (2 → 3).`,
            /*2*/ `<br> At Rank 8, double all stat gains.`,
            /*3*/ `<br> At Rank 10, rank improves multiplier base (base + (rank - 8)).`,
            /*4*/ `<br> At Rank 12, rebirths multiply cash gain at a reduced rate log10(rebirths)<sup>2.5</sup>.`,
            /*5*/ `<br> At Rank 14, cash affects multiplier gain at a reduced rate log10(cash)<sup>0.8</sup>.`,
            /*6*/ `<br> At Rank 15, Improve rank 14 effect, and cash affects rebirth gain at a reduced rate log10(cash)<sup>0.5</sup>.`,
            /*7*/ `<br> At Rank 27, Rank multiplies cash gain by ^(1 + (rank/100)).`,
            /*8*/ `<br> At Rank 34, Improve rank 15 effect, and ultra rebirths multiply cash gain again at a reduced rate log10(ultra rebirths)<sup>4</sup>.`,
            /*9*/ `<br> At Rank 45, multiply multiplier by ^1.2, and rebirths by ^1.1`,
            /*10*/ `<br> At Rank 58, multiply cash gain by itself at a reduced rate.`,
            /*11*/ `<br> At Rank 172, cash affects ultra rebirth gain at a reduced rate log10(cash)<sup>0.75</sup>.`,
            /*12*/ `<br> At Rank 186, improve ultra rebirth base, and cash affects prestige gain at a reduced rate log10(cash)<sup>0.5</sup>.`,
            /*12*/ `<br> At Rank 213, improve prestige base.`,
            /*13*/ `<br> At Rank 240, rank boosts ascension power gain.`,
            /*14*/ `<br> At Rank 286, lower first rank scaling power`,
            ],
             [
            `<br> At Tier 1, double stat gain, decrease the rebirth cost, and multiply cash gain by 3<sup>(tier - 1)</sup>.`,
            `<br> At Tier 2, decrease rank cost, and tier improves rebirth base.`,
            `<br> At Tier 3, decrease rank cost again.`,
            `<br> At Tier 4, triple all stat gains, and decrease rank cost yet again. Unlock auto rank.`,
            `<br> At Tier 5, decrease rank cost AGAIN.`,
            `<br> At Tier 10, decrease the prestige requirement.`,
            `<br> At Tier 12, decrease the prestige requirement.`,
            `<br> At Tier 14, tier boosts ascension power gain.`,
            `<br> At Tier 18, ^1.1 ultra rebirths, ^1.2 rebirths, ^1.3 multiplier.`,
            ],
            [
            `<br> At Tetr 1, ^1.15 cash, and ${formatMult(5)} all stats, and delay both rank scalings by 25.`,
            `<br> At Tetr 2, Tetr boosts ascension power and unlock more ascension upgrades.`,
            `<br> At Tetr 3, ^1.1 ascension power, unlock a new ascension upgrade, and boost cash by ^1.2.`
            ]
        ],

        'tab-main': "Main",
        'tab-options': "Options",
        'tab-options-main': "Main",
        'tab-format': "Number Formatting",
        'tab-saving': "Saving",
        'tab-stats': "Stats",
        'tab-scalings': "Scalings",
        'tab-ascension': "Ascension",
        'tab-ascension-power': "Ascension Power",
        'tab-ascension-milestones': "Ascension Milestones",

        'cash-amount': (x, y) => `You have <span style="font-size: x-large;">${x}</span> <span style = "font-size: xx-small;">${y}</span> cash.`,

        'button-0': (x, y) => `<b>${x}</b> multiplier<div class = "line"></div><b>${y}</b> cash`,

        'stat-0': (x) => `You have <b>${x}</b> multiplier.`,

        'button-1': (x, y) => `<b>${x}</b> rebirths<div class = "line"></div><b>${y}</b> multiplier`,

        'stat-1': (x) => `You have <b>${x}</b> rebirths.`,

        'button-2': (x, y) => `<b>${x}</b> ultra rebirths<div class = "line"></div><b>${y}</b> rebirths`,

        'stat-2': (x) => `You have <b>${x}</b> ultra rebirths.`,

        'button-3': (x, y) => `<b>${x}</b> prestiges<div class = "line"></div><b>${y}</b> ultra rebirths`,

        'stat-3': (x) => `You have <b>${x}</b> prestiges.`,

        'ap-amount': (x, y) => `You have <span style="font-size: x-large;">${x}</span> <span style = "font-size: xx-small;">${y}</span> ascension power.`,

        'total-ap': (x, y) => `You have <b>${x}</b> total ascension power, multiplying cash gain by ${y}.`,

        'ascension-upgrades': [
            ['Power Booster', x=>`Ascension power is multiplied by <b>${formatMult(x)}</b>`],
            ['Better Base I', x=>`Multiplier base is multiplied by <b>${formatMult(x)}</b>`],
            ['Money Power', x=>`Ascension power is multiplied by <b>${formatMult(x)}</b> (based off cash)`],
            ['Power Exponent', x=>`AP effect exponent is boosted by <b>+${format(x)}</b>`],

            ['Prestigious Multiplier', x=>`Prestiges are multiplied by <b>${formatMult(x)}</b>`],
            ['Stat Booster', x=>`All stats are multiplied by <b>${formatMult(x)}</b>`],
            ['Cash Exponentiator', x=>`Cash is powered by <b>${formatPow(x)}</b>`],
            ['Better Base II', x=>`Rebirth base is multiplied by <b>${formatMult(x)}</b>`],
        ],

        'ascension-milestones': [
            'Unlock the Ascension tab, and keep auto-rank.',
            'Ascensions boost ascension power. Delay first rank scaling heavilly.',
            'Automatically update tier.',
        ],

        'ascension-milestone-amount': (x)=> `${x} Ascensions`,

        'ap-cost': x => `<b>${x}</b> ascension power`,

        'scalings': {
          'rank': "Rank" 
        },
        'scaling-start': "Starts at",
        'scaling-mode': {
            "L": x => `<b>${x}</b> linearly`,
            "D": x => `<b>${x}</b> to exponent`,
        },
        'scaling-info': `Scalings will be added as soon as you reach them. <b>N</b> - amount, <b>S</b> - starting`,

        'popup-buttons': [
            ["Yes","No"],
            ["Ok","Cancel"],
        ],

         'popup-desc' : {
            import: `Paste in your save. WARNING: THIS WILL OVERWRITE YOUR CURRENT SAVE!`,
            wipe: `Are you sure you want to wipe your save? To wipe, type "<span class="free-select">nolan9551 is awesome and cool</span>"`,
        },

        'option-buttons': ["On","Off"],

        'options-confirm': `Confirmations`,
        'options-confirm-ascension': `Ascension`,

        get 'reset-ascension-message'() {
            let p = `<b>Ascension</b>`, s = `<b>Cash</b>`
            return `
            <h3>${p}</h3><br>
            ${p} is a minor reset layer. Ascending resets your ${s} for ${p}<b>s</b>.
            First ${p} unlocks new upgrades.<br>
            Are you sure you want to ascend?
            `
        },
    },
}
