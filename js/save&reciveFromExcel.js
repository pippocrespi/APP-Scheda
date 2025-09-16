// Blocca il submit classico del form
const form = document.querySelector("form");
form.addEventListener("submit", function (e) {
    e.preventDefault();
});

async function inviaDatiAlFoglio() {
    // Raccogli i dati dai campi
    const dati = new FormData();
    dati.append("data", document.getElementById('data')?.value || '');
    dati.append("numero_scheda", document.getElementById('numero_scheda')?.value || '');
    dati.append("ora_incidente", document.getElementById('ora_incidente')?.value || '');
    dati.append("ora_attivazione", document.getElementById('ora_attivazione')?.value || '');
    dati.append("dinamica", document.getElementById('dinamica')?.value || '');
    dati.append("ora", document.getElementById('ora')?.value || '');
    dati.append("nome_cognome", document.getElementById('nome_cognome')?.value || '');
    dati.append("data_nascita", document.getElementById('data_nascita')?.value || '');
    dati.append("Comune_nascita", document.getElementById('Comune_nascita')?.value || '');
    dati.append("emorragia_x", document.getElementById('emorragia_x_Sì')?.checked ? 'Sì' : (document.getElementById('emorragia_x_No')?.checked ? 'No' : ''));
    dati.append("x_presidi_Compressione", document.getElementById('x_presidi_Compressione')?.checked ? 'Sì' : '');
    dati.append("x_presidi_Medicazione", document.getElementById('x_presidi_Medicazione')?.checked ? 'Sì' : '');
    dati.append("x_presidi_Israele", document.getElementById('x_presidi_Israele')?.checked ? 'Sì' : '');
    dati.append("x_presidi_Tourniquet", document.getElementById('x_presidi_Tourniquet')?.checked ? 'Sì' : '');
    dati.append("coscienza", document.getElementById('coscienza_Sì')?.checked ? 'Sì' : (document.getElementById('coscienza_No')?.checked ? 'No' : ''));
    dati.append("respira", document.getElementById('respira_Sì')?.checked ? 'Sì' : (document.getElementById('respira_No')?.checked ? 'No' : ''));
    dati.append("vie_aeree", document.getElementById('vie_aeree_Pervie')?.checked ? 'Pervie' : (document.getElementById('vie_aeree_Ostruite')?.checked ? 'Ostruite' : ''));
    dati.append("immobilizzazione", document.getElementById('immobilizzazione_Sì')?.checked ? 'Sì' : (document.getElementById('immobilizzazione_No')?.checked ? 'No' : ''));
    dati.append("a_presidi_Collare", document.getElementById('a_presidi_Collare')?.checked ? 'Sì' : '');
    dati.append("a_presidi_Disostruzione", document.getElementById('a_presidi_Disostruzione')?.checked ? 'Sì' : '');
    dati.append("a_presidi_Cannula", document.getElementById('a_presidi_Cannula')?.checked ? 'Sì' : '');
    dati.append("a_presidi_Ventilazione", document.getElementById('a_presidi_Ventilazione')?.checked ? 'Sì' : '');
    dati.append("difficolta_respiratoria", document.querySelector('input[name="difficolta_respiratoria"]:checked')?.value || '');
    dati.append("opacs_O_simmetrico", document.querySelector('input[name="opacs"][value="O_simmetrico"]')?.checked ? 'Sì' : '');
    dati.append("opacs_P_enfisema", document.querySelector('input[name="opacs"][value="P_enfisema"]')?.checked ? 'Sì' : '');
    dati.append("opacs_A_rumori", document.querySelector('input[name="opacs"][value="A_rumori"]')?.checked ? 'Sì' : '');
    dati.append("frequenza_respiratoria", document.getElementById('frequenza_respiratoria')?.value || '');
    dati.append("saturimetria", document.getElementById('saturimetria')?.value || '');
    dati.append("polso_periferico", document.getElementById('polso_periferico_Sì')?.checked ? 'Sì' : (document.getElementById('polso_periferico_No')?.checked ? 'No' : ''));
    dati.append("polso_centrale", document.getElementById('polso_centrale_Sì')?.checked ? 'Sì' : (document.getElementById('polso_centrale_No')?.checked ? 'No' : ''));
    dati.append("ferite_esterne", document.getElementById('ferite_esterne_Sì')?.checked ? 'Sì' : (document.getElementById('ferite_esterne_No')?.checked ? 'No' : ''));
    dati.append("frequenza_cardiaca", document.getElementById('frequenza_cardiaca')?.value || '');
    dati.append("avpu", document.querySelector('input[name="avpu"]:checked')?.value || '');
    dati.append("testaPiedi", document.getElementById('testaPiedi')?.checked ? 'Sì' : '');
    dati.append("dolore", document.getElementById('doloreRange')?.value || '');
    dati.append("allergie", document.getElementById('allergie')?.value || '');
    dati.append("farmaci", document.getElementById('farmaci')?.value || '');
    dati.append("patologie", document.getElementById('patologie')?.value || '');
    dati.append("ultimo_pasto", document.getElementById('ultimo_pasto')?.value || '');
    dati.append("altro", document.querySelector('input[name="altro"]')?.value || '');

    try {
        const response = await fetch("https://script.google.com/macros/s/AKfycbxPUZB40TeiauipSl-KchKfm4efpsh3QyyFnGDL7nKol7p4SY47rGvxwKKml2uTp-Cqmw/exec", {
            method: "POST",
            body: dati
        });
    } catch (err) {
        console.error("❌ Errore durante l'invio:", err);
    }
}


// Collega il bottone all'invio (OLD)
//document.getElementById("btnInviaDatiSheet").addEventListener("click", inviaDatiAlFoglio);

//post ogni modifica
document.addEventListener("DOMContentLoaded", () => {
    const campi = document.querySelectorAll(`
input[type="text"],
input[type="number"],
input[type="range"],
input[type="date"],
input[type="time"],
input[type="radio"],
input[type="checkbox"],
textarea,
select
`);

    let debounceTimer;

    const debounce = (callback, delay = 400) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(callback, delay);
    };

    campi.forEach(campo => {
        // Per input scrivibili: salva mentre l'utente digita, con debounce
        if (["text", "number", "range", "date", "time"].includes(campo.type) || campo.tagName.toLowerCase() === "textarea") {
            campo.addEventListener("input", () => {
                debounce(() => {
                    inviaDatiAlFoglio();
                });
            });
        }

        // Per checkbox, radio, select: salva subito
        campo.addEventListener("change", () => {
            inviaDatiAlFoglio();
        });
    });
});


//recive
document.getElementById("numero_scheda")?.addEventListener("numero_scheda", async () => {
    const codice = document.getElementById("numero_scheda").value.trim();
    if (!codice) return;

    try {
        const response = await fetch(`https://script.google.com/macros/s/AKfycbxPUZB40TeiauipSl-KchKfm4efpsh3QyyFnGDL7nKol7p4SY47rGvxwKKml2uTp-Cqmw/exec?codice=${encodeURIComponent(codice)}`);
        const dati = await response.json();

        if (dati && dati.codice) {
            // Precompila tutti i campi che trovi nel foglio
            for (const [chiave, valore] of Object.entries(dati)) {
                const campo = document.getElementById(chiave);

                if (campo) {
                    if (campo.type === "checkbox") {
                        campo.checked = valore === "Sì";
                    } else {
                        campo.value = valore;
                    }
                }

                // Per radio button
                const radio = document.querySelectorAll(`input[name="${chiave}"]`);
                radio.forEach(r => {
                    r.checked = r.value === valore;
                });
            }

            console.log("✅ Dati precompilati dal foglio per codice:", codice);
        } else {
            console.warn("⚠️ Nessun dato trovato per il codice inserito");
        }
    } catch (err) {
        console.error("❌ Errore nel recupero dati:", err);
    }
});




/*
      //VEDERE IN FOGLI Google Sheet
      //Estensioni > Apps Script
 
      function doPost(e) {
        const foglio = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Foglio1");
        const params = e.parameter;
        const codice = params["numero_scheda"];
 
        if (!codice) {
          return ContentService.createTextOutput("❌ numero_scheda mancante").setMimeType(ContentService.MimeType.TEXT);
        }
 
        const intestazioni = foglio.getRange(1, 1, 1, foglio.getLastColumn()).getValues()[0];
        const righe = foglio.getDataRange().getValues();
        const indiceColonnaCodice = intestazioni.indexOf("codice");
 
        // Cerca riga con lo stesso codice
        let rigaTrovata = -1;
        for (let i = 1; i < righe.length; i++) {
          if (righe[i][indiceColonnaCodice] == codice) {
            rigaTrovata = i + 1;
            break;
          }
        }
 
        // Prepara array da scrivere
        const valori = [];
        for (let i = 0; i < intestazioni.length; i++) {
          const nomeCampo = intestazioni[i];
          valori.push(params[nomeCampo] || '');
        }
 
        if (rigaTrovata > 0) {
          // Aggiorna la riga esistente
          foglio.getRange(rigaTrovata, 1, 1, valori.length).setValues([valori]);
        } else {
          // Aggiunge una nuova riga
          foglio.appendRow(valori);
        }
 
        return ContentService.createTextOutput("✅ Dati salvati");
      }
 
 
      function doGet(e) {
        const codice = e.parameter.codice;
        if (!codice) {
          return ContentService.createTextOutput(JSON.stringify({ errore: "Codice mancante" }))
            .setMimeType(ContentService.MimeType.JSON);
        }
 
        const foglio = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Foglio1");
        const dati = foglio.getDataRange().getValues();
        const intestazioni = dati[0];
        const indiceCodice = intestazioni.indexOf("codice");
 
        for (let i = 1; i < dati.length; i++) {
          if (dati[i][indiceCodice] == codice) {
            const risultato = {};
            for (let j = 0; j < intestazioni.length; j++) {
              risultato[intestazioni[j]] = dati[i][j];
            }
            return ContentService.createTextOutput(JSON.stringify(risultato))
              .setMimeType(ContentService.MimeType.JSON);
          }
        }
 
        return ContentService.createTextOutput(JSON.stringify({ trovato: false }))
          .setMimeType(ContentService.MimeType.JSON);
      }
 
*/


