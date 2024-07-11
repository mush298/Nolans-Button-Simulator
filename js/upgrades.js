const upgrades = [
    {
        name: "More Button Essence",
        cost: [currencies[0], 'e125000', 10],
        id: 0
    }
];

function setupUpgradeHTML() {
    const upgradesContainer = document.getElementById("upgrades");
    
    upgrades.forEach(upgrade => {
        const upgradeElement = document.createElement("div");
        upgradeElement.className = "upgrade";
        
        const nameElement = document.createElement("div");
        nameElement.className = "upgrade-name";
        nameElement.textContent = upgrade.name;
        
        const costElement = document.createElement("div");
        costElement.className = "upgrade-cost";
        costElement.innerHTML = `<text-style text="${upgrade.cost[0].name}">${format(upgrade.cost[1])}</text-style> ${upgrade.cost[0].name}`;
        
        upgradeElement.appendChild(nameElement);
        upgradeElement.appendChild(costElement);
        
        upgradesContainer.appendChild(upgradeElement);
    });
}

setupUpgradeHTML();
