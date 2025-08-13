
let intervalId = null;
function startHolding(callback) {
    callback(); // esegue subito una volta
    intervalId = setInterval(callback, 150); // ripete ogni 150ms
}

function stopHolding() {
    clearInterval(intervalId);
}
// --- Pulsanti FC ---
document.getElementById('btn_fc_plus').addEventListener('mousedown', () => {
    startHolding(() => modificaFC(10));
});
document.getElementById('btn_fc_plus').addEventListener('mouseup', stopHolding);
document.getElementById('btn_fc_plus').addEventListener('mouseleave', stopHolding);

document.getElementById('btn_fc_minus').addEventListener('mousedown', () => {
    startHolding(() => modificaFC(-10));
});
document.getElementById('btn_fc_minus').addEventListener('mouseup', stopHolding);
document.getElementById('btn_fc_minus').addEventListener('mouseleave', stopHolding);

// --- Pulsanti FR ---
document.getElementById('btn_fr_plus').addEventListener('mousedown', () => {
    startHolding(() => modificaFR(1));
});
document.getElementById('btn_fr_plus').addEventListener('mouseup', stopHolding);
document.getElementById('btn_fr_plus').addEventListener('mouseleave', stopHolding);

document.getElementById('btn_fr_minus').addEventListener('mousedown', () => {
    startHolding(() => modificaFR(-1));
});
document.getElementById('btn_fr_minus').addEventListener('mouseup', stopHolding);
document.getElementById('btn_fr_minus').addEventListener('mouseleave', stopHolding);

// --- Pulsanti SpO₂ ---
document.getElementById('btn_spo2_plus').addEventListener('mousedown', () => {
    startHolding(() => modificaSPO2(1));
});
document.getElementById('btn_spo2_plus').addEventListener('mouseup', stopHolding);
document.getElementById('btn_spo2_plus').addEventListener('mouseleave', stopHolding);

document.getElementById('btn_spo2_minus').addEventListener('mousedown', () => {
    startHolding(() => modificaSPO2(-1));
});
document.getElementById('btn_spo2_minus').addEventListener('mouseup', stopHolding);
document.getElementById('btn_spo2_minus').addEventListener('mouseleave', stopHolding);

function modificaFC(delta) {
    const input = document.getElementById('frequenza_cardiaca');
    let valore = parseInt(input.value) || 0;
    const min = parseInt(input.dataset.min);
    const max = parseInt(input.dataset.max);

    valore += delta;

    // Limiti
    if (valore < min) valore = min;
    if (valore > max) valore = max;

    input.value = valore;
    aggiornaColoreCampo(input);
}

function modificaFR(delta) {
    const input = document.getElementById('frequenza_respiratoria');
    let valore = parseInt(input.value) || 0;
    const min = parseInt(input.dataset.min);
    const max = parseInt(input.dataset.max);

    valore += delta;

    // Limiti
    if (valore < min) valore = min;
    if (valore > max) valore = max;

    input.value = valore;
    aggiornaColoreCampo(input);
}

function modificaSPO2(delta) {
    const input = document.getElementById('saturimetria');
    let valore = parseInt(input.value) || 0;
    const min = parseInt(input.dataset.min);
    const max = parseInt(input.dataset.max);

    valore += delta;

    // Limiti
    if (valore < min) valore = min;
    if (valore > max) valore = max;

    input.value = valore;
    aggiornaColoreCampo(input);
}

function aggiornaColoreCampo(input) {
    const valore = parseFloat(input.value);
    const min = parseFloat(input.dataset.min);
    const max = parseFloat(input.dataset.max);
    const tipo = input.dataset.type;

    input.style.backgroundColor = "white"; // reset colore

    if (isNaN(valore)) return;

    if (tipo === "soft") {
        if (valore < min || valore > max) {
            input.style.backgroundColor = "yellow"; // campo fuori range
        }
    }
}