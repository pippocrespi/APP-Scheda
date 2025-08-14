/*
//OLD Pippo text

async function generaPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    let y = 20;
    const lineHeight = 10;
    const pageHeight = doc.internal.pageSize.height;

    doc.setFontSize(16);
    doc.text('Riepilogo Valutazione X-A-B-C-D-E', 20, y);
    y += lineHeight * 2;

    doc.setFontSize(12);

    // 1️⃣ RACCOLTA DATI PAZIENTE (solo se scheda visibile)
    const schedaInputs = document.querySelectorAll('#schedaPaziente input');
    let haDatiPaziente = false;

    schedaInputs.forEach(input => {
        // Considera solo campi compilati e non checkbox/radio
        if (!['checkbox', 'radio'].includes(input.type) && input.value.trim()) {
            haDatiPaziente = true;
            doc.text(`${input.dataset.label}: ${input.value}`, 20, y);
            y += lineHeight;
        }
    });

    // Se ci sono dati paziente → linea separatrice
    if (haDatiPaziente) {
        doc.setLineWidth(0.5);
        doc.line(20, y, 190, y);
        y += lineHeight;
    }

    // 2️⃣ RACCOLTA ALTRI DATI
    const inputs = document.querySelectorAll('input, textarea, select');
    const grouped = {};

    inputs.forEach(input => {
        // Salta i campi della scheda paziente
        if (input.closest('#schedaPaziente')) return;

        const label = input.dataset.label || input.name || '';
        let value = '';

        if ((input.type === 'checkbox' || input.type === 'radio') && input.checked) {
            value = input.nextSibling?.textContent?.trim() || input.value;
        }
        else if (['text', 'number', 'time', 'date'].includes(input.type) || input.tagName === 'TEXTAREA' || input.tagName === 'SELECT') {
            if (input.value.trim()) value = input.value;
        }

        if (value) {
            if (!grouped[label]) grouped[label] = [];
            grouped[label].push(value);
        }
    });

    // 3️⃣ SCRITTURA DATI RAGGRUPPATI
    for (const [label, answers] of Object.entries(grouped)) {
        const line = `${label}: ${answers.join(', ')}`;
        if (y + lineHeight > pageHeight - 10) {
            doc.addPage();
            y = 20;
        }
        doc.text(line, 20, y);
        y += lineHeight;
    }

    doc.save("scheda_valutazione.pdf");
}
*/


const inputFoto = document.getElementById('fotoPaziente');
const anteprima = document.getElementById('anteprimaFoto');
const btnCambia = document.getElementById('btnCambiaFoto');
const btnCancella = document.getElementById('btnCancellaFoto');

// Carica foto e mostra anteprima
inputFoto.addEventListener('change', () => {
    if (inputFoto.files.length > 0) {
        const file = inputFoto.files[0];
        const reader = new FileReader();
        reader.onload = e => {
            anteprima.src = e.target.result;
            anteprima.style.display = 'block';
            btnCambia.textContent = "Cambia foto"
        };
        reader.readAsDataURL(file);
    }
});

// Cambia foto → simula click sul file input
btnCambia.addEventListener('click', () => {
    inputFoto.click();
});

// Cancella foto
btnCancella.addEventListener('click', () => {
    inputFoto.value = "";
    anteprima.src = "";
    anteprima.style.display = 'none';
    btnCambia.textContent = "Seleziona/Scatta foto da caricare"
});



async function generaPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text('Riepilogo Valutazione X-A-B-C-D-E', 14, 20);
    doc.setFontSize(12);

    // --- RACCOLTA DATI ---
    doc.text(document.getElementById('gpsLabel').textContent, 10, 10);

    const inputs = document.querySelectorAll('input, textarea, select');
    const rows = [];

    inputs.forEach(input => {
        if (input.closest('#schedaPaziente')) return; // Salta scheda paziente se vuoi

        const label = input.dataset.label || input.name || '';
        let value = '';

        if ((input.type === 'checkbox' || input.type === 'radio') && input.checked) {
            value = input.nextSibling?.textContent?.trim() || input.value;
        } else if (['text', 'number', 'time', 'date'].includes(input.type) || input.tagName === 'TEXTAREA' || input.tagName === 'SELECT') {
            value = input.value.trim();
        }

        if (value) {
            rows.push([label, value]);
        }
    });

    // --- CREA TABELLA ---
    doc.autoTable({
        startY: 30,
        head: [['Campo', 'Valore']],
        body: rows,
        theme: 'grid', // grid, plain, striped
        headStyles: { fillColor: [41, 128, 185], textColor: 255 },
        styles: { fontSize: 12 },
    });
    if (anteprima?.complete && anteprima.naturalWidth > 0) 
    {
        doc.addPage();
        doc.addImage(anteprima.src, 'JPEG', 20, 20, 180, 0);
    }

    doc.save("scheda_valutazione.pdf");
}
