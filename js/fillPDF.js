async function fillPdfBrowser() {

  const url = 'https://raw.githubusercontent.com/pippocrespi/APP-Scheda/main/scheda_sanitaria_fields.pdf';

  // Carica il PDF
  const existingPdfBytes = await fetch(url).then(res => {
    if (!res.ok) throw new Error('Impossibile caricare il PDF');
    return res.arrayBuffer();
  });

  const pdfDoc = await PDFLib.PDFDocument.load(existingPdfBytes);
  const form = pdfDoc.getForm();



  if (document.getElementById("emorragia_x_Sì").checked) {
    form.getCheckBox('emorragia_x_Sì').check();
  }
  if (document.getElementById("emorragia_x_No").checked) {
    form.getCheckBox('emorragia_x_No').check();
  }
  if (document.getElementById("x_presidi_Compressione").checked) {
    form.getCheckBox('x_presidi_Compressione').check();
  }
  if (document.getElementById("x_presidi_Medicazione").checked) {
    form.getCheckBox('x_presidi_Medicazione').check();
  }
  if (document.getElementById("x_presidi_Israele").checked) {
    form.getCheckBox('x_presidi_Israele').check();
  }
  if (document.getElementById("x_presidi_Tourniquet").checked) {
    form.getCheckBox('x_presidi_Tourniquet').check();
  }
  if (document.getElementById("coscienza_Sì").checked) {
    form.getCheckBox('coscienza_Sì').check();
  }
  if (document.getElementById("coscienza_No").checked) {
    form.getCheckBox('coscienza_No').check();
  }
  if (document.getElementById("respira_Sì").checked) {
    form.getCheckBox('respira_Sì').check();
  }
  if (document.getElementById("respira_No").checked) {
    form.getCheckBox('respira_No').check();
  }
  if (document.getElementById("vie_aeree_Pervie").checked) {
    form.getCheckBox('vie_aeree_Pervie').check();
  }
  if (document.getElementById("vie_aeree_Ostruite").checked) {
    form.getCheckBox('vie_aeree_Ostruite').check();
  }
  if (document.getElementById("immobilizzazione_Sì").checked) {
    form.getCheckBox('immobilizzazione_Sì').check();
  }
  if (document.getElementById("immobilizzazione_No").checked) {
    form.getCheckBox('immobilizzazione_No').check();
  }
  if (document.getElementById("a_presidi_Disostruzione").checked) {
    form.getCheckBox('a_presidi_Disostruzione').check();
  }
  if (document.getElementById("a_presidi_Ventilazione").checked) {
    form.getCheckBox('a_presidi_Ventilazione').check();
  }
  if (document.getElementById("a_presidi_Cannula").checked) {
    form.getCheckBox('a_presidi_Cannula').check();
  }
  if (document.getElementById("a_presidi_Collare").checked) {
    form.getCheckBox('a_presidi_Collare').check();
  }

  if (document.getElementById("difficolta_respiratoria_No").checked) {
    form.getCheckBox('difficolta_respiratoria_No').check();
  }
  if (document.getElementById("difficolta_respiratoria_Sì").checked) {
    form.getCheckBox('difficolta_respiratoria_Sì').check();
  }




  /* manca _NO nel pdf
    opacs_O_simmetrico
    opacs_P_enfisema
    opacs_A_rumori
  */



  if (document.getElementById("frequenza_respiratoria").value) {
    form.getTextField('frequenza_respiratoria').setText(document.getElementById("frequenza_respiratoria").value.toString());
  }
  if (document.getElementById("saturimetria").value) {
    form.getTextField('saturimetria').setText(document.getElementById("saturimetria").value.toString());
  }

  if (document.getElementById("polso_periferico_Sì").checked) {
    form.getCheckBox('polso_periferico_Sì').check();
  }
  if (document.getElementById("polso_periferico_No").checked) {
    form.getCheckBox('polso_periferico_No').check();
  }

  if (document.getElementById("polso_centrale_Sì").checked) {
    form.getCheckBox('polso_centrale_Sì').check();
  }
  if (document.getElementById("polso_centrale_No").checked) {
    form.getCheckBox('polso_centrale_No').check();
  }


  if (document.getElementById("ferite_esterne_No").checked) {
    form.getCheckBox('ferite_esterne_No').check();
  }
  if (document.getElementById("ferite_esterne_Sì").checked) {
    form.getCheckBox('ferite_esterne_Sì').check();
  }

  if (document.getElementById("Polso_forte").checked) {
    form.getCheckBox('Polso_forte').check();
  }
  if (document.getElementById("Polso_debole").checked) {
    form.getCheckBox('Polso_debole').check();
  }
  if (document.getElementById("Polso_irregolare").checked) {
    form.getCheckBox('Polso_irregolare').check();
  }
  if (document.getElementById("Cute_sudata").checked) {
    form.getCheckBox('Cute_sudata').check();
  }
  if (document.getElementById("Cute_fredda").checked) {
    form.getCheckBox('Cute_fredda').check();
  }
  if (document.getElementById("Cute_pallida").checked) {
    form.getCheckBox('Cute_pallida').check();
  }
  if (document.getElementById("Cute_cianotica").checked) {
    form.getCheckBox('Cute_cianotica').check();
  }
  if (document.getElementById("Medicazione_ferite").checked) {
    form.getCheckBox('Medicazione_ferite').check();
  }





  /* manca nel HTML
    
  data
  nome_cognome
  nato_a
  nato_il
  residenza
  data_incidente
  eta
  nazionalita
  numero_cellulare
  luogo
  text_81rfge // altro
  dinamica
  
  
  checkbox_37wpse //REFILL CAPILARE
  
  evento_trauma
  evento_medico
  evento_altro
    

  */


  if (document.getElementById("frequenza_cardiaca").value) {
    form.getTextField('frequenza_cardiaca').setText(document.getElementById("frequenza_cardiaca").value.toString());
  }
  if (document.getElementById("Bacino_deformato").checked) {
    form.getCheckBox('Bacino_deformato').check();
  }
  if (document.getElementById("Bacino_dolore").checked) {
    form.getCheckBox('Bacino_dolore').check();
  }
  if (document.getElementById("Bacino_fascia_pelvica").checked) {
    form.getCheckBox('Bacino_fascia_pelvica').check();
  }


  if (document.getElementById("avpu_A").checked) {
    form.getCheckBox('avpu_A').check();
  }
  if (document.getElementById("avpu_B").checked) {
    form.getCheckBox('avpu_B').check();
  }
  if (document.getElementById("avpu_P").checked) {
    form.getCheckBox('avpu_P').check();
  }
  if (document.getElementById("avpu_U").checked) {
    form.getCheckBox('avpu_U').check();
  }

  if (document.getElementById("DF_sup_DX").checked) {
    form.getCheckBox('DF_sup_DX').check();
  }
  if (document.getElementById("DF_sup_SX").checked) {
    form.getCheckBox('DF_sup_SX').check();
  }
  if (document.getElementById("DF_inf_DX").checked) {
    form.getCheckBox('DF_inf_DX').check();
  }
  if (document.getElementById("DF_inf_SX").checked) {
    form.getCheckBox('DF_inf_SX').check();
  }

  if (document.getElementById("DS_sup_DX").checked) {
    form.getCheckBox('DS_sup_DX').check();
  }
  if (document.getElementById("DS_sup_SX").checked) {
    form.getCheckBox('DS_sup_SX').check();
  }
  if (document.getElementById("DS_inf_DX").checked) {
    form.getCheckBox('DS_inf_DX').check();
  }
  if (document.getElementById("DS_inf_SX").checked) {
    form.getCheckBox('DS_inf_SX').check();
  }

  if (document.getElementById("non_muove").value) {
    form.getTextField('non_muove').setText(document.getElementById("non_muove").value.toString());
  }
  if (document.getElementById("non_sente").value) {
    form.getTextField('non_sente').setText(document.getElementById("non_sente").value.toString());
  }
  if (document.getElementById("Agitazione_psicomotoria").checked) {
    form.getCheckBox('Agitazione_psicomotoria').check();
  }
  if (document.getElementById("Trauma_cranico").checked) {
    form.getCheckBox('Trauma_cranico').check();
  }
  if (document.getElementById("Convulsioni").checked) {
    form.getCheckBox('Convulsioni').check();
  }
  if (document.getElementById("doloreRange").value) {
    form.getTextField('doloreRange').setText(document.getElementById("doloreRange").value.toString());
  }
  if (document.getElementById("allergie").value) {
    form.getTextField('allergie').setText(document.getElementById("allergie").value.toString());
  }
  if (document.getElementById("patologie").value) {
    form.getTextField('patologie').setText(document.getElementById("patologie").value.toString());
  }
  if (document.getElementById("farmaci").value) {
    form.getTextField('farmaci').setText(document.getElementById("farmaci").value.toString());
  }
  if (document.getElementById("ultimo_pasto").value) {
    form.getTextField('ultimo_pasto').setText(document.getElementById("ultimo_pasto").value.toString());
  }
  //sentro html c'è anche "altro"

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'modulo_compilato.pdf';
  link.click();


}

document.querySelector('#btnCompilaPDF').addEventListener('click', fillPdfBrowser);

