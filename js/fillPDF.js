//import { PDFDocument } from 'https://cdn.jsdelivr.net/npm/pdf-lib/dist/pdf-lib.min.js';

async function fillPdfBrowser() {
  /*// Carica PDF compilabile
  const url = 'modulo.pdf';
  const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer());

  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const form = pdfDoc.getForm();

  // Popola campi testuali
  form.getTextField('dolore').setText('7');

  // Checkbox
  form.getCheckBox('emorragia_massiva_si').check();
  form.getCheckBox('emorragia_massiva_no').uncheck();

  // Genera PDF e lo scarica
  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'modulo_compilato.pdf';
  link.click();*/


  const fileInput = document.querySelector('#pdfFile');
  if (!fileInput.files.length) return alert('Seleziona un PDF!');

  const existingPdfBytes = await fileInput.files[0].arrayBuffer();
  const pdfDoc = await PDFLib.PDFDocument.load(existingPdfBytes);
  const form = pdfDoc.getForm();

  //form.getTextField('dolore').setText('7');
  form.getCheckBox('emorragia_x_Sì').check();

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'modulo_compilato.pdf';
  link.click();



}

// esempio trigger
document.querySelector('#btnCompilaPDF').addEventListener('click', fillPdfBrowser);

