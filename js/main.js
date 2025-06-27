const el = id => document.getElementById(id);
const FPS = 30;
const SAVE_INTERVAL = 10; // Save every 10 seconds instead of every frame
let saveTimer = 0;

function toTextStyle(text,style="",id) { return `<text-style text="${style}" ${id ? `id="${id}"` : ""}>${text}</text-style>` }
function toColoredText(text,color="") { return `<text-style style="color:${color}">${text}</text-style>` }
function compareStyle(text,x,y) { return Decimal.eq(x,y)?toTextStyle(text):Decimal.gte(x,y)?toTextStyle(icon("up-arrow")+text,"green"):toTextStyle(icon("down-arrow")+text,"red") }

var player = {}, date = Date.now(), diff = 0;

var options = {
    notation: "mixed_sc",
    max_range: 9
}

function loop() {
    //if (offline.active) return

    //updateTemp()

    //diff = Date.now()-date;
    //updateOptions()
    updateHTML()
    updateScalingsTemp()
    //calc(diff/1000)
    //date = Date.now()
    gainCurrency("cash", CURRENCIES.cash.gain.div(FPS))

    gainCurrency("ascension_power", CURRENCIES.ascension_power.gain.div(FPS))
    

    if (player.ranks.tier.gte(4) || player.ascension.ascensions.gte(1)) player.ranks.rank = RANKS["rank"].bulk(player.cash).max(player.ranks.rank)

    if (player.ranks.tetr.gte(3) || player.ascension.ascensions.gte(3)) player.ranks.tier = RANKS["tier"].bulk(player.ranks.rank).max(player.ranks.tier)
    
    // Only save every SAVE_INTERVAL seconds instead of every frame
    // Also wait 5 seconds after game load to avoid overwriting imported saves
    saveTimer += 1/FPS;
    if (saveTimer >= SAVE_INTERVAL && (Date.now() - gameLoadTime) > 5000) {
        save()
        saveTimer = 0;
    }

    options.notation = player.options.notation

    options.max_range = player.options.max_range
}

let tmp = {
    scalings: []
}

for (let x in SCALINGS) {
        tmp.scalings[x] = []
        for (let y in SCALINGS[x].base) {
            let b = []
            for (let z of SCALINGS[x].base[y]) b.push(z)
            tmp.scalings[x].push(b)
        }
    }

let gameLoadTime = Date.now();

function loadGame() {
    gameLoadTime = Date.now(); // Reset the load time
    
    prevSave = localStorage.getItem(SAVE_ID)
        
    load(prevSave)

    setupLanguage()

    setupCurrencies()

    setupHTML()

    setInterval(loop, 1000/FPS)
    
    // Add event listener to save when page is closing
    window.addEventListener('beforeunload', function() {
        save();
    });
    
    // Also save on visibility change (when switching tabs)
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            save();
        }
    });
}

// Add manual save trigger function
function forceSave() {
    save();
    saveTimer = 0; // Reset the timer
}

const TOP_CURR = [
    {
        unl: ()=>true,
        curr: "ascension",
        req: ()=>player.cash.gte(CURRENCIES.ascension.next()),
    },
]

const TOP_RANKS = [
    {
        unl: ()=>true,
        curr: "rank",
        req: ()=>RANKS.rank.require,
    },
    {
        unl: ()=>player.ranks.rank.gte(5) || player.ranks.tier.gte(1),
        curr: "tier",
        req: ()=>RANKS.tier.require,
    },
    {
        unl: ()=>player.ranks.tier.gte(7) || player.ranks.tetr.gte(1),
        curr: "tetr",
        req: ()=>RANKS.tetr.require,
    },
]

function updateMainHTML() {
    
}

function sumBase(x,a) {
    return Decimal.pow(a,x).sub(1).div(Decimal.sub(a,1))
}
function revSumBase(x,a) {
    return Decimal.mul(x,Decimal.sub(a,1)).add(1).log(a)
}

Decimal.prototype.sumBase = function(a,rev=false) { return rev ? revSumBase(this,a) : sumBase(this,a) }

function powPO(x,b,rev=false) {
    if (Decimal.lt(b,1.4285714287176406e-8)) {
        return rev ? Decimal.ln(x).div(b) : Decimal.mul(x,b).exp();
    } else {
        return rev ? Decimal.log(x,Decimal.add(b,1)) : Decimal.add(b,1).pow(x);
    }
}

Decimal.prototype.powPO = function(x,rev) { return powPO(this,x,rev) }

function sumBasePO(x,a,rev=false) {
    if (Decimal.lte(a,0)) return x
    return rev ? Decimal.mul(x,a).add(1).powPO(a,true) : powPO(x,a).sub(1).div(a)
}

Decimal.prototype.sumBasePO = function(x,rev) { return sumBasePO(this,x,rev) }

function calcLevelBonus(l,l0,b) {
    var r = Decimal.div(l,l0).floor(), c = Decimal.sub(l,r.mul(l0))
    return sumBase(r,b,l0).add(Decimal.pow(b,r).mul(c))
}

function expPow(a,b) { return Decimal.lt(a,1) ? Decimal.pow(a,b) : Decimal.pow(10,Decimal.max(a,1).log10().add(1).pow(b).sub(1)) }
function revExpPow(a,b) { return Decimal.pow(10,Decimal.max(a,1).log10().add(1).root(b).sub(1)) }

Decimal.prototype.clone = function() {
    return this
}

Decimal.prototype.modular=Decimal.prototype.mod=function (other){
    other=E(other);
    if (other.eq(0)) return E(0);
    if (this.sign*other.sign==-1) return this.abs().mod(other.abs()).neg();
    if (this.sign==-1) return this.abs().mod(other.abs());
    return this.sub(this.div(other).floor().mul(other));
};

Decimal.prototype.softcap = function (start, power, mode, dis=false) {
    var x = this
    if (!dis&&x.gte(start)) {
        if ([0, "pow"].includes(mode)) x = x.div(start).max(1).pow(power).mul(start)
        if ([1, "mul"].includes(mode)) x = x.sub(start).div(power).add(start)
        if ([2, "exp"].includes(mode)) x = expPow(x.div(start), power).mul(start)
        if ([3, "log"].includes(mode)) x = x.div(start).log(power).add(1).mul(start)
    }
    return x
}

function overflow(number, start, power, meta=1){
    if(isNaN(number.mag))return new Decimal(0);
    start=Decimal.iteratedexp(10,meta-1,1.0001).max(start);
    if(number.gte(start)){
        let s = start.iteratedlog(10,meta)
        number=Decimal.iteratedexp(10,meta,number.iteratedlog(10,meta).div(s).pow(power).mul(s));
    }
    return number;
}

Decimal.prototype.overflow = function (start, power, meta) { return overflow(this, start, power, meta) }

function tetraflow(number,start,power) { // EXPERIMENTAL FUNCTION - x => 10^^((slog10(x)-slog10(s))*p+slog10(s))
    if(isNaN(number.mag))return new Decimal(0);
    start=E(start);
    if(number.gte(start)){
        let s = start.slog(10)
        // Fun Fact: if 0 < number.slog(10) - start.slog(10) < 1, such like overflow(number,start,power,start.slog(10).sub(1).floor())
        number=Decimal.tetrate(10,number.slog(10).sub(s).mul(power).add(s))
    }
    return number;
}

Decimal.prototype.addTP = function (val) {
    var e = this
    return Decimal.tetrate(10, e.slog(10).add(val))
}

function preventNaNDecimal(x,def) {
    return isNaN(x.mag) ? E(def ?? 0) : x
}

Math.logBase = function (x, base) {
    return Math.log(x) / Math.log(base)
}

function romanize(num) {
    var lookup = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1},roman = '',i;
    for ( i in lookup ) {
        var m = Math.floor(num / lookup[i]);
        roman += i.repeat(m);
        num -= m*lookup[i];
    }
    return roman;
}