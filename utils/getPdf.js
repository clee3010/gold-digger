import fs from 'node:fs';
import PDFDocument from 'pdfkit'
import path from 'node:path'

export function getPdf(dir, price, paid, date) {


    const receiptDir = path.join(dir, 'receipts', date + '.pdf');

    const doc = new PDFDocument();

    const stream = fs.createWriteStream(receiptDir)

    doc.pipe(stream);

    doc.text(`GoldDigger Receipt: \n Amount paid: $${paid} \n Gold price: $${price} / oz \n Gold purchased: $${paid/price} oz`);

    doc.end();
}
