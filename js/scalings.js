const SCALINGS = {
    rank: {
        get amount() { return player.ranks.rank },

        base: [
            [25,1.25,"P"],
            [100,1.20,"P"]
        ],
    },
}

function getScalingStarts(id) {
    let b = SCALINGS[id].base.map(x=>x[0])

    switch (id) {
        case "rank": {
            b[0] = Decimal.add(b[0],player.ranks.tetr.gte(1)?25:0)
            b[0] = Decimal.add(b[0],player.ranks.tetr.gte(2)?25:0)
            b[0] = Decimal.add(b[0],player.ascension.ascensions.gte(2)?1000:0)
            b[1] = Decimal.add(b[1],player.ranks.tetr.gte(1)?25:0)

            break
        }
    }

    return b
}

function getScalingPowers(id) {
    let b = SCALINGS[id].base.map(x=>x[1])

    switch (id) {
        case "rank": {
            b[0] = Decimal.sub(b[0],player.ranks.rank.gte(286)?0.05:0)

            break
        }
    }

    return b
}

function getScalingModes(id) {
    let b = SCALINGS[id].base.map(x=>x[2])

    return b
}


Decimal.prototype.scale = function (s, p, mode, rev=false) {
    var x = this

    if (Decimal.lte(x,s)) return x

    switch (mode) {
        case 'L':
            // (x-s)*p+s
            return rev ? x.sub(s).div(p).add(s) : x.sub(s).mul(p).add(s)
        case 'P':
            // (x/s)^p*s
            return rev ? x.div(s).root(p).mul(s) : x.div(s).pow(p).mul(s)
        case 'E1':
            // p^(x-s)*s
            return rev ? x.div(s).max(1).log(p).add(s) : Decimal.pow(p,x.sub(s)).mul(s)
        case 'E2':
            // p^(x/s-1)*s, p >= 2.71828
            return rev ? x.div(s).max(1).log(p).add(1).mul(s).min(x) : Decimal.pow(p,x.div(s).sub(1)).mul(s).max(x)
        case 'ME1': {
            // p^(x-s)*x
            let ln_p = Decimal.ln(p)
            return rev ? Decimal.pow(p,s).mul(x).mul(ln_p).lambertw().div(ln_p) : Decimal.pow(p,x.sub(s)).mul(x)
        }
        case 'ME2': {
            // p^(x/s-1)*x
            let ln_p = Decimal.ln(p)
            return rev ? x.mul(p).mul(ln_p).div(s).lambertw().mul(s).div(ln_p) : Decimal.pow(p,x.div(s).sub(1)).mul(x)
        }
        case 'D': {
            // 10^((lg(x)/s)^p*s)
            let s10 = Decimal.log10(s)
            return rev ? Decimal.pow(10,x.log10().div(s10).root(p).mul(s10)) : Decimal.pow(10,x.log10().div(s10).pow(p).mul(s10))
        }
        default: {
            return x
        }
    }
}

Decimal.prototype.scaleAll = function (id, rev=false) {
    var x = this, t = tmp.scalings[id], l = t.length

    for (let i = 0; i < l; i++){
        let j = rev ? i : l - i - 1, tt = t[j]

        if (!tt[3]) x = x.scale(tt[0],tt[1],tt[2],rev);
    }

    return x
}

function updateScalingsTemp() {
    for (let x in SCALINGS) {
        let t = tmp.scalings[x]

        let s = getScalingStarts(x), m = getScalingModes(x), p = getScalingPowers(x).map((q,i) => m[i] == "E2" ? Decimal.max(q,Math.E) : q)

        for (let i = 0; i < SCALINGS[x].base.length; i++) t[i] = [s[i],p[i],m[i]];
    }
}

function setupScalingsTable() {
    let h = "", t = lang_text("scalings")

    for (let i in SCALINGS) {
        let s = SCALINGS[i]

        h += `<tr id="scaling-tr-${i}"><th>${t[i]}</th>${s.base.map((x,j)=>`<td id="scaling-${i}-${j}">???</td>`).join("")}</tr>`
    }

    el("scalings-table").innerHTML = h
}

function updateScalingsTable() {
    let text = [lang_text("scaling-start"), lang_text("scaling-mode")]

    for (let i in SCALINGS) {
        let scaling = SCALINGS[i], amount = scaling.amount, t = tmp.scalings[i]

        let u = t.findLastIndex(x => !x[3] && Decimal.gte(amount, x[0]))

        if ((el('scaling-tr-' + i).style.display = u > -1 ? "table-row" : "none") == "table-row") {
            for (let j = 0; j < scaling.base.length; j++) {
                let e = el("scaling-" + i + "-" + j), u2 = !t[j][3] && j <= u

                e.style.display = u2 ? "table-cell" : "none"
                if (u2) {
                    let tt = t[j]
                    let h = `${text[0]}: <b>${format(tt[0],0)}</b><br>`, p = tt[1]

                    switch (tt[2]) {
                        case "L": {
                            h += text[1].L(formatMult(p,4))
                            break
                        }
                        case "P": {
                            h += `<b>${formatPow(p,4)}</b>`
                            break
                        }
                        case "E2": {
                            h += `S×<b>${format(p,4)}</b><sup>N/S-1</sup>`
                            break
                        }
                        case "ME2": {
                            h += `N×<b>${format(p,4)}</b><sup>N/S-1</sup>`
                            break
                        }
                        case "D": {
                            h += text[1].D(formatPow(p,4))
                            break
                        }
                    }

                    e.innerHTML = h
                }
            }
        }
    }
}