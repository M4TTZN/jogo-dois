const totalCasas = 30;
let playerPos = 0;

const situações = [
    { t: "Social", d: "Um colega deixou cair o estojo. O que você faz? (Responda em voz alta)" },
    { t: "Comunicação", d: "Como você pede licença para passar entre duas pessoas?" },
    { t: "Emoções", d: "Se você estiver sentindo muito barulho, onde pode procurar ajuda?" },
    { t: "Regra", d: "Por que é importante esperar a sua vez de falar?" },
    { t: "Amizade", d: "Elogie alguém que está jogando com você!" }
];

function initBoard() {
    const board = document.getElementById('board');
    for (let i = 0; i < totalCasas; i++) {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        if (i === 0) { tile.classList.add('start'); tile.innerText = "INÍCIO"; }
        else if (i === totalCasas - 1) { tile.classList.add('end'); tile.innerText = "CHEGADA"; }
        else { tile.innerText = i; }
        tile.id = `tile-${i}`;
        board.appendChild(tile);
    }
    updatePlayer();
}

function rollDice() {
    const btn = document.getElementById('roll-btn');
    btn.disabled = true;
    
    let counter = 0;
    const interval = setInterval(() => {
        const rand = Math.floor(Math.random() * 6) + 1;
        document.getElementById('dice-visual').innerText = rand;
        counter++;
        if (counter > 10) {
            clearInterval(interval);
            movePlayer(rand);
            btn.disabled = false;
        }
    }, 50);
}

function movePlayer(steps) {
    playerPos += steps;
    if (playerPos >= totalCasas - 1) {
        playerPos = totalCasas - 1;
        updatePlayer();
        showModal("🏆 VITÓRIA!", "Parabéns! Você completou sua jornada social hoje.");
    } else {
        updatePlayer();
        const sorteio = situações[Math.floor(Math.random() * situações.length)];
        setTimeout(() => showModal(sorteio.t, sorteio.d), 500);
    }
}

function updatePlayer() {
    document.querySelectorAll('.tile').forEach(t => t.classList.remove('active'));
    document.getElementById(`tile-${playerPos}`).classList.add('active');
}

function showModal(title, text) {
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-text').innerText = text;
    document.getElementById('modal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('modal').classList.add('hidden');
}

window.onload = initBoard;
