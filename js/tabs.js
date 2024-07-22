let tab = 0;

function updateTabs() {
    if (tab == 0) {
        el("main").style.display = "block";
    } else {
        el("main").style.display = "none";
    }
    if (tab == 1) {
        el("options").style.display = "block";
    } else {
        el("options").style.display = "none";
    }
    if (tab == 2) {
        el("achievements").style.display = "block";
    } else {
        el("achievements").style.display = "none";
    }
    if (player.rank > 0) {
        el("rebirth").style.display = "block";
        el("rebirth-buttons").style.display = "block";
    } else {
        el("rebirth").style.display = "none";
        el("rebirth-buttons").style.display = "none";
    }
    if (player.rank > 2) {
        el("ultrarebirth").style.display = "block";
        el("ultrarebirth-buttons").style.display = "block";
    } else {
        el("ultrarebirth").style.display = "none";
        el("ultrarebirth-buttons").style.display = "none";
    }
}
setInterval(updateTabs, 50);
