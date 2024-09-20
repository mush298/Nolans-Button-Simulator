let achievements_array = [];
let achievements = {
    0: {
        name: "The first achievement",
        row: 1,
        id: "11",
        desc: "Get 10 cash",
        check() {
            return player.currencies[0].value.gte(10);
        }
    },
    1: {
        name: "The next achievement",
        row: 1,
        id: "12",
        desc: "Get x1000 multiplier",
        check() {
            return player.currencies[1].value.gte(1000);
        }
    },
    2: {
        name: "All that progress is gone!",
        row: 1,
        id: "13",
        desc: "Upgrade to rank 1",
        check() {
            return player.rank > 0;
        }
    },
    3: {
        name: "Cash millionaire",
        row: 1,
        id: "14",
        desc: "Get 1,000,000 cash",
        check() {
            return player.currencies[0].value.gte(1e6);
        }
    },
    4: {
        name: "Rank 2: Electric Boogaloo",
        row: 1,
        id: "15",
        desc: "Upgrade to rank 2",
        check() {
            return player.rank > 1;
        }
    },
    5: {
        name: "The sixth achievement",
        row: 1,
        id: "16",
        desc: "Get 1,000,000 rebirths",
        check() {
            return player.currencies[2].value.gte(1e6);
        }
    },
    6: {
        name: "Rank 3 and knuckles",
        row: 1,
        id: "17",
        desc: "Upgrade to rank 3",
        check() {
            return player.rank > 2;
        }
    },
    7: {
        name: "The eighth achievement",
        row: 1,
        id: "18",
        desc: "Get 1,000 ultra rebirths",
        check() {
            return player.currencies[3].value.gte(1000);
        }
    },
    8: {
        name: "Rank 4: Electric Boogaloo^2",
        row: 1,
        id: "19",
        desc: "Upgrade to rank 4",
        check() {
            return player.rank > 3;
        }
    },
    9: {
        name: "Decillionaire",
        row: 2,
        id: "21",
        desc: "Get 1.00e33 cash",
        check() {
            return player.currencies[0].value.gte(1e33);
        }
    },
    10: {
        name: "Rank 5: the epic",
        row: 2,
        id: "22",
        desc: "Upgrade to rank 5",
        check() {
            return player.rank > 4;
        }
    },
    11: {
        name: "Vigintillionaire",
        row: 2,
        id: "23",
        desc: "Get 1.00e63 cash",
        check() {
            return player.currencies[0].value.gte(1e63);
        }
    },
    12: {
        name: "Furious 6",
        row: 2,
        id: "24",
        desc: "Upgrade to rank 6",
        check() {
            return player.rank > 5;
        }
    },
    13: {
        name: "Googol",
        row: 2,
        id: "25",
        desc: "Get 1.00e100 cash",
        check() {
            return player.currencies[0].value.gte(1e100);
        }
    },
    14: {
        name: "Lucky ranks!",
        row: 2,
        id: "26",
        desc: "Upgrade to rank 7",
        check() {
            return player.rank > 6;
        }
    },
    15: {
        name: "90 degrees to infinity, kinda",
        row: 2,
        id: "27",
        desc: "Upgrade to rank 8",
        check() {
            return player.rank > 7;
        }
    },
    16: {
        name: "I can afford 9!",
        row: 2,
        id: "28",
        desc: "Upgrade to rank 9",
        check() {
            return player.rank > 8;
        }
    },
    17: {
        name: "Gargoogol",
        row: 2,
        id: "29",
        desc: "Get 1.00e200 cash",
        check() {
            return player.currencies[0].value.gte(1e200);
        }
    },
    18: {
        name: "RankX",
        row: 3,
        id: "31",
        desc: "Upgrade to rank 10",
        check() {
            return player.rank > 9;
        }
    },
    19: {
        name: "Rank goes to 11!",
        row: 3,
        id: "32",
        desc: "Upgrade to rank 11",
        check() {
            return player.rank > 10;
        }
    },
    20: {
        name: "Infinity",
        row: 3,
        id: "33",
        desc: "Get 179.8UCe cash",
        check() {
            return player.currencies[0].value.gte(E(2).pow(1024));
        }
    },
    21: {
        name: "Rank dozen",
        row: 3,
        id: "34",
        desc: "Upgrade to rank 12",
        check() {
            return player.rank > 11;
        }
    },
    22: {
        name: "Now all that progress is really gone!",
        row: 3,
        id: "35",
        desc: "Upgrade to tier 1",
        check() {
            return player.tier > 0;
        }
    },
    23: {
        name: "The beginning of inflation",
        row: 3,
        id: "36",
        desc: "Get 1.00e933 cash",
        check() {
            return player.currencies[0].value.gte('1e933');
        }
    },
    24: {
        name: "Another tier!",
        row: 3,
        id: "37",
        desc: "Upgrade to tier 2",
        check() {
            return player.tier > 1;
        }
    },
    25: {
        name: "Millillionaire",
        row: 3,
        id: "38",
        desc: "Get 1.00e3003 cash",
        check() {
            return player.currencies[0].value.gte('1e3003');
        }
    },
    26: {
        name: "The true beginning of inflation",
        row: 3,
        id: "39",
        desc: "Upgrade to tier 3",
        check() {
            return player.tier > 2;
        }
    },
    27: {
        name: "Tier 4 on the floor",
        row: 4,
        id: "41",
        desc: "Upgrade to tier 4",
        check() {
            return player.tier > 3;
        }
    },
    28: {
        name: "Micrillionaire",
        row: 4,
        id: "42",
        desc: "Get 1.00e3.000M cash",
        check() {
            return player.currencies[0].value.gte('1e3000003');
        }
    },
    29: {
        name: "Tier 5: inflation",
        row: 4,
        id: "43",
        desc: "Upgrade to tier 5",
        check() {
            return player.tier > 4;
        }
    },
    30: {
        name: "Tier 6",
        row: 4,
        id: "44",
        desc: "Upgrade to tier 6",
        check() {
            return player.tier > 5;
        }
    },
    31: {
        name: "Tier 7, the saga",
        row: 4,
        id: "45",
        desc: "Upgrade to tier 7",
        check() {
            return player.tier > 6;
        }
    },
    32: {
        name: "Infinity II",
        row: 4,
        id: "46",
        desc: "Get e9e15 cash, Reward: 100,000x cash, and auto rank up!",
        check() {
            return player.currencies[0].value.gte('e9e15');
        }
    },
    33: {
        name: "Now REALLY all that progress is gone!",
        row: 4,
        id: "47",
        desc: "Infinity for the first time, Reward: 100,000x cash!",
        check() {
            return player.infinity.times.gte(1)
        }
    },
    34: {
        name: "A limit upgrade!",
        row: 4,
        id: "48",
        desc: "Upgrade the infinity limit to level 1",
        check() {
            return player.infinity.limit_level.gte(1)
        }
    },
    35: {
        name: "Where buttons go?????",
        row: 4,
        id: "49",
        desc: "Purchase the first infinity upgrade",
        check() {
            return hasInfinityUpgrade(0)
        }
    },
    36: {
        name: "The thirty-seventh achievement",
        row: 5,
        id: "51",
        desc: "Get 1,000 infinity points, AHH 37 IS SCARY (I have septitriacontaphobia)",
        check() {
            return player.infinity.points.gte(1000)
        }
    },
    37: {
        name: "Inflation 2: the sequel",
        row: 5,
        id: "52",
        desc: "Purchase the fifth infinity upgrade",
        check() {
            return hasInfinityUpgrade(4)
        }
    },
    38: {
        name: "Attillionaire",
        row: 5,
        id: "53",
        desc: "Get e3e18 cash",
        check() {
            return player.currencies[0].value.gte('e3e18')
        }
    },
    39: {
        name: "Infinity multimillionaire",
        row: 5,
        id: "54",
        desc: "Get 100,000,000 infinity points",
        check() {
            return player.infinity.points.gte(1e8)
        }
    },

};

function setupAchievements() {
    for (let i in achievements) {
        let button = document.createElement('button');
        button.classList.add("achievement", "auto-resize-button");
        button.innerText = achievements[i].name;

        // Create tooltip
        button.title = achievements[i].desc;

        let rowElement = document.getElementById("achievements" + achievements[i].row);
        if (rowElement) {
            rowElement.append(button);
            achievements_array.push(button);
        } else {
            console.error(`Row element not found for achievement ${i}`);
        }
    }
    // After creating all buttons, adjust their text size
    document.querySelectorAll('.auto-resize-button').forEach(adjustTextSize);
}

function checkAchievements() {
    for (let i in achievements) {
        if (achievements[i].id == '14') {
            achievements_array[i].title = "Get " + format(1000000) + " cash";
        }
        if (achievements[i].id == '16') {
            achievements_array[i].title = "Get " + format(1000000) + " rebirths";
        }
        if (achievements[i].id == '21') {
            achievements_array[i].title = "Get " + format(1e33) + " cash";
        }
        if (achievements[i].id == '23') {
            achievements_array[i].title = "Get " + format(1e63) + " cash";
        }
        if (achievements[i].id == '25') {
            achievements_array[i].title = "Get " + format(1e100) + " cash";
        }
        if (achievements[i].id == '29') {
            achievements_array[i].title = "Get " + format(1e200) + " cash";
        }
        if (achievements[i].id == '33') {
            achievements_array[i].title = "Get " + format(E(2).pow(1024)) + " cash";
        }
        if (achievements[i].id == '36') {
            achievements_array[i].title = "Get " + format('1e933') + " cash";
        }
        if (achievements[i].id == '38') {
            achievements_array[i].title = "Get " + format('1e3003') + " cash";
        }
        if (achievements[i].id == '42') {
            achievements_array[i].title = "Get " + format('1e3000003') + " cash";
        }
        if (achievements[i].id == '46') {
            achievements_array[i].title = "Get " + format('e9e15') + " cash";
        }
        if (achievements[i].id == '53') {
            achievements_array[i].title = "Get " + format('e3e18') + " cash";
        }
        if (achievements[i].id == '54') {
            achievements_array[i].title = "Get " + format('1e8') + " infinity points";
        }
        if (achievements[i].check() && !player.achievements.includes(achievements[i].id)) {
            player.achievements.push(achievements[i].id);
        }
        if (player.achievements.includes(achievements[i].id)) {
            achievements_array[i].classList.remove("achievement");
            achievements_array[i].classList.add("achievement-got");
        } else {
            achievements_array[i].classList.add("achievement");
            achievements_array[i].classList.remove("achievement-got");
        }
    }
}

function adjustTextSize(button) {
    const maxWidth = button.offsetWidth - 20; // Subtract padding
    const text = button.textContent;
    let fontSize = parseInt(window.getComputedStyle(button).fontSize);

    button.style.fontSize = fontSize + 'px';
    while (button.scrollWidth > maxWidth && fontSize > 12) {
        fontSize--;
        button.style.fontSize = fontSize + 'px';
    }
}

const hasAchievement = i => achievements[i].check();

setupAchievements();
setInterval(checkAchievements, 500);

// Adjust text size on window resize
window.addEventListener('resize', () => document.querySelectorAll('.auto-resize-button').forEach(adjustTextSize));