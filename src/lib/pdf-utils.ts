import { promises as fs } from 'fs';
// import pdf from 'pdf-parse/lib/pdf-parse';
import * as pdfjsLib from "pdfjs-dist";
// import "pdfjs-dist/build/pdf.worker.entry";
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();
// async function parsePdf(file: File): Promise<any> {
// const arrayBuffer = await file.arrayBuffer();
// const buffer = Buffer.from(arrayBuffer);
// const pdfParser = new PDFParser();

// return new Promise((resolve, reject) => {
//     pdfParser.on('pdfParser_dataError', (errData: { parserError: any }) => reject(errData.parserError));
//     pdfParser.on('pdfParser_dataReady', (pdfData: any) => resolve(pdfData));
//     pdfParser.parseBuffer(buffer);
// });
// }

export async function extractPDFText(file: File): Promise<any> {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    console.log('Buffer:', buffer);

    const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;

    console.log('PDF:', pdf);

    const numPages = pdf.numPages;
    const jsonData = [];
    let str = "";

    for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        for (const item of textContent.items) {
            if ("str" in item) {
                str += " " + item?.str;
            }
        }
    }

    return str;
}