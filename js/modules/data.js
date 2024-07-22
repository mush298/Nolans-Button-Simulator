function saveGame(player) {
    const saveData = {
        currencies: player.currencies.map(currency => ({
            name: currency.name,
            value: currency.value.toString(),
            gain: currency.gain ? currency.gain.toString() : undefined,
            multipliers: currency.multipliers.map(m => m.toString()),
            total: currency.total.toString()
        })),
        rank: player.rank,
        tier: player.tier,
        achievements: player.achievements
    };

    localStorage.setItem('playerData', JSON.stringify(saveData));
}

function loadGame() {
    const savedData = localStorage.getItem('playerData');
    if (savedData) {
        const parsedData = JSON.parse(savedData);
        
        const player = {
            currencies: parsedData.currencies.map(currency => ({
                name: currency.name,
                value: E(currency.value),
                gain: currency.gain ? E(currency.gain) : undefined,
                multipliers: currency.multipliers.map(m => E(m)),
                total: E(currency.total)
            })),
            rank: parsedData.rank,
            tier: parsedData.tier,
            achievements: parsedData.achievements
        };

        return player;
    }

    // If no saved data, return the default player object
    return {
        currencies: [
            {
                name: "cash",
                value: E(0),
                gain: E(1),
                multipliers: [E(1), E(1)],
                total: E(1)
            },
            {
                name: "multiplier",
                value: E(0),
                multipliers: [E(1)],
                total: E(1)
            },
            {
                name: "rebirth",
                value: E(0),
                multipliers: [E(1)],
                total: E(1)
            },
            {
                name: "ultrarebirth",
                value: E(0),
                multipliers: [E(1)],
                total: E(1)
            }
        ],
        rank: 0,
        tier: 0,
        achievements: []
    };
}

function wipeSave() {
    if (confirm("DO YOU WANT TO REALLY PUT YOUR SAVE TO SLEEP FOREVER!?")) {
        if (confirm("wait actually!?")) {
    localStorage.removeItem('playerData');
    player = loadGame(); // Reset to default player object
    console.log('Save data wiped. Game reset to default state.');
    }
}
}

function exportSave() {
    const saveData = localStorage.getItem('playerData');
    if (saveData) {
        const encodedSaveData = btoa(saveData); // Encode the save data to base64
        navigator.clipboard.writeText(encodedSaveData)
            .then(() => {
                console.log('Save data exported to clipboard successfully.');
                alert('Save data has been copied to your clipboard.');
            })
            .catch(err => {
                console.error('Failed to copy save data to clipboard:', err);
                alert('Failed to copy save data to clipboard. See console for details.');
            });
    } else {
        console.log('No save data found to export.');
        alert('No save data found to export.');
    }
}

function importSave() {
    const encodedSaveData = prompt("Please enter your save data:");
    if (!encodedSaveData) {
        console.log('Import cancelled.');
        return;
    }

    try {
        const decodedSaveData = atob(encodedSaveData); // Decode the base64 save data
        const parsedSaveData = JSON.parse(decodedSaveData);
        
        // Validate the save data structure
        if (!parsedSaveData.currencies || !Array.isArray(parsedSaveData.currencies)) {
            throw new Error('Invalid save data structure');
        }

        localStorage.setItem('playerData', decodedSaveData);
        player = loadGame(); // Reload the game with the new save data
        console.log('Save data imported successfully.');
        alert('Save data imported successfully. The game will now reload.');
        location.reload(); // Reload the page to apply the imported save
    } catch (error) {
        console.error('Failed to import save data:', error);
        alert('Failed to import save data. Please ensure you\'ve entered the correct save string.');
    }
}

let player = loadGame();
const FPS = 30;
let buttons = [[], [], []];

let basegains = [E(2.5), E(3), E(10)];
let basecosts =[E(10), E(1000), E(1e6)];
function buyCurrency(i, a, c) {
    if (player.currencies[i - 1].value.gte(c)) {
        player.currencies[i].value = player.currencies[i].value.add(a.mul(player.currencies[i].total));
        if (i-1 == 0) {
        player.currencies[i-1].value = player.currencies[i-1].value.sub(c);
        } else {
            player.currencies[i-1].value = E(0)
        }
    }
}
function getTotalMultiplier(i) {
    let t = E(1)
for (let j = 0; j < player.currencies[i].multipliers.length; j++) {
t = t.mul(player.currencies[i].multipliers[j])
}
player.currencies[i].total = t
return t;
}
setInterval(function() {
saveGame(player)
    getTotalMultiplier(0)
    getTotalMultiplier(1)
    getTotalMultiplier(2)
    if (player.tier > 0) {
        player.currencies[0].multipliers[1] = player.currencies[3].value.pow(E(1.25).add(E(player.rank).div(10))).add(1)
        player.currencies[0].multipliers[0] = player.currencies[1].value.pow(E(1.25).add(E(player.rank).div(10))).add(10)
        player.currencies[1].multipliers[0] = player.currencies[2].value.pow(E(1.25).add(E(player.rank).div(10))).add(1)
        player.currencies[2].multipliers[0] = player.currencies[3].value.pow(E(1.25).add(E(player.rank).div(10))).add(1)
    }
    else if (player.rank > 8) {
        player.currencies[0].multipliers[1] = player.currencies[3].value.pow(E(1.25).add(E(player.rank - 5).div(20))).add(1)
        player.currencies[0].multipliers[0] = player.currencies[1].value.pow(E(1.25).add(E(player.rank - 5).div(20))).add(1)
        player.currencies[1].multipliers[0] = player.currencies[2].value.pow(E(1.25).add(E(player.rank - 5).div(20))).add(1)
        player.currencies[2].multipliers[0] = player.currencies[3].value.pow(E(1.25).add(E(player.rank - 5).div(20))).add(1)
    }
    else if (player.rank > 5) {
        player.currencies[0].multipliers[0] = player.currencies[1].value.pow(E(1.25).add(E(player.rank - 5).div(20))).add(1)
    player.currencies[1].multipliers[0] = player.currencies[2].value.pow(E(1.25).add(E(player.rank - 5).div(20))).add(1)
    player.currencies[2].multipliers[0] = player.currencies[3].value.pow(E(1.25).add(E(player.rank - 5).div(20))).add(1)
    } else {
    player.currencies[0].multipliers[0] = player.currencies[1].value.add(1)
    player.currencies[1].multipliers[0] = player.currencies[2].value.mul(3).add(1)
    player.currencies[2].multipliers[0] = player.currencies[3].value.mul(27).add(1)
    }
    player.currencies[0].gain = player.currencies[0].total
player.currencies[0].value = player.currencies[0].value.add(player.currencies[0].gain.div(FPS))
if (player.rank > 4) {
    basegains = [E(2.5).mul(E(player.rank).pow(2).add(1)), E(3).mul(E(player.rank).pow(2).add(1)),  E(10).mul(E(player.rank).pow(2).add(1))]
}
else if (player.rank > 1) {
basegains = [E(2.5).mul(E(player.rank).add(1)), E(3).mul(E(player.rank).add(1)),  E(10).mul(E(player.rank).add(1))]
} else {
    basegains = [E(2.5), E(3), E(10)];
}
}, 1000/FPS)

function reset() {
    player.currencies[0].value = E(0)
    player.currencies[1].value = E(0)
    player.currencies[2].value = E(0)
    player.currencies[3].value = E(0)
    player.currencies[0].value = E(0)
}
