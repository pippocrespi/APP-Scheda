async function fillPdfBrowser() {

  const url = 'https://raw.githubusercontent.com/pippocrespi/APP-Scheda/main/scheda_sanitaria_fields.pdf';

  // Carica il PDF
  const existingPdfBytes = await fetch(url).then(res => {
    if (!res.ok) throw new Error('Impossibile caricare il PDF');
    return res.arrayBuffer();
  });

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

document.querySelector('#btnCompilaPDF').addEventListener('click', fillPdfBrowser);

