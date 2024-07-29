let progress = 22;
let goal = 0;
let quests = [{
    get percent() {
        return player.currencies[0].value.div(1e5).mul(100)
    },
    name: "Reach 100,000 cash to upgrade your rank!"
},{
    get percent() {
        return player.currencies[0].value.div(5e8).mul(100)
    },
    name: "Reach " + format(5e8) + " cash to upgrade your rank!"
},
{
    get percent() {
        return player.currencies[0].value.log10().div(E(2.5e21).log10()).mul(100)
    },
    name: "Reach " + format(2.5e21) + " cash to upgrade your rank!"
},
{
    get percent() {
        return (player.rank / 12) * 100
    },
    name: "Reach rank 12 to upgrade your tier!"
},
{
    get percent() {
        return player.currencies[0].value.log10().div(933).mul(100)
    },
    name: "Reach rank 12 to upgrade your tier!"
},

{
    get percent() {
        return player.currencies[0].value.log10().log10().div(E(9e15).log10()).mul(100)
    },
    name: "Reach rank 12 to upgrade your tier!"
}, 
{
    get percent() {
        return player.infinity.points.div(1e8)
    },
    name: "Reach rank 12 to upgrade your tier!"
}, 
]
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');

function setProgress(value, content) {
    if (value < 101) {
    progress = value;
    progressBar.style.width = `${progress}%`;
    progressText.textContent = content + ` (${Math.round(progress)}%)`;
    } else {
        progress = 100;
        progressBar.style.width = `${progress}%`;
        progressText.textContent = content + ` (${Math.round(progress)}%)`;
    }
}
function getQuest() {
    if (player.infinity.times.gte(1)) {
        goal = 6
    }
    else if (player.tier > 1) {
        goal = 5
    }
    else if (player.tier > 0) {
        goal = 4
    }
else if (player.rank > 2) {
goal = 3
} else if (player.rank == 2) {
    goal = 2
} else if (player.rank == 1) {
goal = 1
} else {
    goal = 0
}
}
setInterval(function() {
    quests[1].name = "Reach " + format(5e8) + " cash to upgrade your rank!"
    quests[2].name = "Reach " + format(2.5e21) + " cash to upgrade your rank!"
    quests[4].name = "Reach " + format("1e933") + " cash to begin inflation I guess.."
    quests[5].name = "Reach " + format("e9e15") + " cash to unlock a new layer"
      quests[6].name = "Reach " + format("e8") + " infinity points to beat the game! for now..."
    getQuest()
    document.getElementsByClassName('progress-container').width = screen.width
    setProgress(quests[goal].percent, quests[goal].name)
}, 100)
