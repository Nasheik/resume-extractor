import { NextRequest, NextResponse } from "next/server";
import PDFParser from "pdf2json";

export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        const formData = await req.formData();
        const file = formData.get("resume") as File;

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        if (file.type !== "application/pdf") {
            return NextResponse.json({ error: "Uploaded file is not a PDF" }, { status: 400 });
        }

        // Convert file to buffer
        const buffer = Buffer.from(await file.arrayBuffer());

        // Initialize PDFParser
        const pdfParser = new PDFParser();

        // Process the PDF and wait for results
        const pdfData = await new Promise((resolve, reject) => {
            pdfParser.on("pdfParser_dataReady", (data: any) => {
                resolve(data);
            });

            pdfParser.on("pdfParser_dataError", (err: any) => {
                reject(err);
            });

            pdfParser.parseBuffer(buffer);
        });
        const jsonString = JSON.parse(JSON.stringify(pdfData));
        // console.log(jsonString);
        console.log(jsonString.Pages[0].Texts[1].R);
        // Extract text or process `pdfData` as needed
        // const extractedText = pdfData?.formImage?.Pages?.map((page: any) =>
        //     page.Texts.map((textObj: any) =>
        //         decodeURIComponent(textObj.R[0].T) // Decode the text
        //     ).join(" ")
        // ).join("\n");

        return NextResponse.json({ message: "PDF processed successfully", text: jsonString.Pages[0].Texts[0].R }, { status: 200 });
    } catch (error) {
        console.error("Error processing PDF:", error);
        return NextResponse.json({ error: "Failed to process PDF" }, { status: 500 });
    }
}
