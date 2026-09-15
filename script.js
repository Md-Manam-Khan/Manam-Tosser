let inputs = [];
let mode = "";
let spinning = false;
const canvas = document.getElementById("wheelCanvas");
const ctx = canvas.getContext("2d");
const spinBtn = document.getElementById("spinBtn");
const resultBox = document.getElementById("result");
const rankBox = document.getElementById("rankBox");
function setupMode() {
    mode = document.getElementById("mode").value;
    const area = document.getElementById("inputArea");
    area.innerHTML = "";
    inputs = [];
    rankBox.style.display = "none";
    rankBox.innerHTML = "";
    resultBox.innerHTML = "";
    if (!mode) {
        clearWheel();
        return;
    }
    if (mode === "best3") {
        for (let i = 0; i < 2; i++) {
            const inp = document.createElement("input");
            inp.placeholder = "Player " + (i + 1);
            area.appendChild(inp);
            inputs.push(inp);
        }
        return;
    }
    const count = document.createElement("input");
    count.type = "number";
    count.placeholder = "Number of players";
    const btn = document.createElement("button");
    btn.innerText = "Generate Players";
    btn.onclick = generatePlayers;
    area.appendChild(count);
    area.appendChild(btn);
}
function generatePlayers() {
    const count = parseInt(document.querySelector("#inputArea input").value);
    const area = document.getElementById("inputArea");
    area.innerHTML = "";
    inputs = [];
    for (let i = 0; i < count; i++) {
        const inp = document.createElement("input");
        inp.placeholder = "Player " + (i + 1);
        area.appendChild(inp);
        inputs.push(inp);
    }
}
function startGame() {
    const names = getNames();
    if (!mode || names.length === 0) return;

    const unique = new Set(names);
    if (unique.size !== names.length) {
        resultBox.innerHTML = "⚠️ Duplicate names are not allowed!";
        return;
    }

    if (mode === "regular") regular(names);
    if (mode === "ranked") ranked(names);
    if (mode === "best3") best3(names);
}
function getNames() {
    return inputs.map(i => i.value.trim()).filter(Boolean);
}

function regular(names) {
    spin(names, (winner) => {
        resultBox.innerHTML = "🏆 Winner: " + winner;
    });
}
function ranked(names) {
    let remaining = [...names];
    let eliminated = [];
    function nextRound() {
        if (remaining.length === 1) {
            showRanking(eliminated, remaining[0]);
            resultBox.innerHTML = "🏆 Winner: " + remaining[0];
            drawWheel(remaining, 0);
            spinning = false;
            return;
        }
        spin(remaining, (out) => {
            eliminated.push(out);
            remaining = remaining.filter(n => n !== out);
            resultBox.innerHTML = "❌ Eliminated: " + out;
            drawWheel(remaining, 0);
            setTimeout(() => {
                nextRound();
            }, 500);
        });
    }
    nextRound();
}
function best3(names) {
    const p1 = names[0], p2 = names[1];
    let s1 = 0, s2 = 0, r = 1;
    function play() {
        if (r > 3) {
            const w = s1 > s2 ? p1 : p2;
            resultBox.innerHTML =
                p1 + " - " + s1 + " &nbsp;|&nbsp; " + p2 + " - " + s2 +
                "<br>🏆 Winner: " + w;
            return;
        }
        spin([p1, p2], (w) => {
            if (w === p1) s1++;
            else s2++;
            resultBox.innerHTML = p1 + " - " + s1 + " &nbsp;|&nbsp; " + p2 + " - " + s2;
            r++;
            play();
        });
    }
    play();
}
function spin(names, cb) {
    spinning = true;
    let angle = Math.random() * Math.PI * 2;
    let speed = 0.35;
    let frame = 0;
    function animate() {
        frame++;
        angle += speed;
        if (frame > 80) speed *= 0.97;
        drawWheel(names, angle);
        if (speed > 0.002) {
            requestAnimationFrame(animate);
        } else {
            setTimeout(() => {
                const index = getIndex(names.length, angle);
                cb(names[index]);
                spinning = false;
            }, 80);
        }
    }
    animate();
}
function drawWheel(names, angle) {
    ctx.clearRect(0, 0, 300, 300);
    if (!names.length) return;
    const c = 150, r = 120;

    for (let i = 0; i < names.length; i++) {
        const start = (i / names.length) * 2 * Math.PI + angle;
        const end = ((i + 1) / names.length) * 2 * Math.PI + angle;
        ctx.beginPath();
        ctx.moveTo(c, c);
        ctx.arc(c, c, r, start, end);
        ctx.closePath();
        ctx.fillStyle = getColor(i);
        ctx.fill();
        ctx.save();
        ctx.translate(c, c);
        ctx.rotate((start + end) / 2);
        ctx.fillStyle = "#000";
        ctx.font = "bold 12px Arial";
        ctx.fillText(names[i], 70, 5);
        ctx.restore();
    }
    ctx.beginPath();
    ctx.arc(c, c, 18, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(c + r + 2, c);
    ctx.lineTo(c + r + 18, c - 10);
    ctx.lineTo(c + r + 18, c + 10);
    ctx.closePath();
    ctx.fillStyle = "#ff3030";
    ctx.fill();
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 1.5;
    ctx.stroke();
}
function getColor(i) {
    const colors = ["#ff3b30", "#ff9500", "#ffcc00", "#34c759", "#007aff", "#5856d6"];
    return colors[i % colors.length];
}
function getIndex(len, angle) {
    const a = angle % (2 * Math.PI);
    const size = (2 * Math.PI) / len;
    return Math.floor((2 * Math.PI - a) / size) % len;
}
function showRanking(eliminated, winner) {
    const full = [winner, ...eliminated.reverse()];
    rankBox.style.display = "block";
    rankBox.innerHTML =
        "<h3>🏆 Final Ranking</h3>" +
        full.map((n, i) => `<div>${i + 1}. ${n}</div>`).join("");
}
function clearWheel() {
    ctx.clearRect(0, 0, 300, 300);
}