import { promises as fs } from 'fs';
// import pdf from 'pdf-parse/lib/pdf-parse';
import * as pdfjsLib from "pdfjs-dist";
// import "pdfjs-dist/build/pdf.worker.entry";
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

export async function extractPDFText(file: File): Promise<any> {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    console.log('Buffer:', buffer);

    const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;

    console.log('PDF:', pdf);

    const numPages = pdf.numPages;
    const jsonData = [];
    let str = "";


    // for (let i = 1; i <= numPages; i++) {
    //     const page = await pdf.getPage(i);
    //     const textContent = await page.getTextContent();
    //     jsonData.push(textContent);
    //     for (const item of textContent.items) {
    //         if ("str" in item) {
    //             console.log(item.str);
    //             if (item.transform[5] > 500) {
    //                 str += item.str;
    //             }
    //         }
    //     }
    // }

    const spaceBetweenWordsThreshold = 6;

    for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const numItems = textContent.items.length;

        for (let j = 0; j < numItems; j++) {
            const item = textContent.items[j];
            const prevItem = textContent.items[j - 1];
            const nextItem = textContent.items[j + 1];
            jsonData.push(item);

            let distanceX = 0; let distanceY = 0; let avgCharWidth = 0;
            if (j > 0 && "hasEOL" in item && "transform" in prevItem && "transform" in item) {

                distanceX = Math.abs((prevItem.transform[4] + prevItem.width) - item.transform[4]);

                distanceY = Math.abs((prevItem.transform[5]) - item.transform[5]);

                avgCharWidth = item.width / item.str.length;

                console.log('Distance:', (prevItem.transform[5]), item.transform[5]);
            }



            if ("str" in item && prevItem && nextItem && "str" in prevItem && "str" in nextItem) {
                console.log(item.str, distanceX, distanceY, spaceBetweenWordsThreshold);
                // if (distance > spaceBetweenWordsThreshold) { str += "\n"; }
                if (item.hasEOL || distanceX > 50 || distanceY > 10 || avgCharWidth > 10) { str += "\n"; }
                if (prevItem.hasEOL && nextItem.hasEOL && item.fontName.endsWith("f2") && isUpperCase(item.str)) { str += "\n\n\n\n" + item.str + "\n----------------------------------------------------------------\n"; }
                else if (prevItem.hasEOL && nextItem.hasEOL && (item.fontName.endsWith("f2") || isUpperCase(item.str))) { str += "\n\n\n\n" + item.str + "\n===========================================================\n"; }
                // if (distanceX > 50) { str += "\n"; }
                // if (distanceY > 10) { str += "\n"; }
                else { str += item.str; }

            }
        }
    }



    console.log('Text:', str);
    return jsonData;
    // return str;
    // return new ResumeParser().parse(str);
}

const isUpperCase = (str: String) => str === str.toUpperCase();

function SortResumeInformation(str: String): string[] {
    return [];
}


interface ResumeExtractionResult {
    emails: string[];
    phoneNumbers: string[];
    degrees: string[];
    jobTitles: string[];
    companies: string[];
    techSkills: string[];
}

class ResumeParser {
    // Contact Information Patterns
    private readonly emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
    private readonly phonePattern = /(\+\d{1,2}\s?)?(\(?\d{3}\)?[\s.-])?\d{3}[\s.-]\d{4}/g;
    private readonly linkedinPattern = /https?:\/\/(?:www\.)?linkedin\.com\/in\/[A-Za-z0-9_-]+/g;

    // Education Patterns
    private readonly degreePattern = /(?:Bachelor|Master|PhD|Associate)\s*(?:of|in)?\s*[A-Za-z\s]+/g;
    private readonly universityPattern = /[A-Z][a-z]+(?:\s[A-Z][a-z]+)?\s(?:University|College|Institute)/g;

    // Work Experience Patterns
    private readonly jobTitlePattern = /[A-Z][a-z]+(?:\s[A-Z][a-z]+)*\s(?:Manager|Director|Specialist|Engineer|Analyst)/g;
    private readonly companyPattern = /[A-Z][a-z]+(?:\s[A-Z][a-z]+)*\s?(?:Inc\.|LLC|Corp\.)?/g;

    // Date Patterns
    private readonly datePattern = /(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s\d{4}/g;

    // Skills and Technologies
    private readonly techSkillPattern = /\b(?:Python|Java|JavaScript|React|SQL|AWS|Machine Learning)\b/g;

    /**
     * Extract all matching patterns from the resume text
     * @param resumeText - Full text of the resume
     * @returns Comprehensive extraction results
     */
    public parse(resumeText: string): ResumeExtractionResult {
        return {
            emails: this.extractMatches(resumeText, this.emailPattern),
            phoneNumbers: this.extractMatches(resumeText, this.phonePattern),
            degrees: this.extractMatches(resumeText, this.degreePattern),
            jobTitles: this.extractMatches(resumeText, this.jobTitlePattern),
            companies: this.extractMatches(resumeText, this.companyPattern),
            techSkills: this.extractMatches(resumeText, this.techSkillPattern)
        };
    }

    /**
     * Generic method to extract matches based on a regex pattern
     * @param text - Text to search
     * @param pattern - Regular expression pattern
     * @returns Array of matched strings
     */
    private extractMatches(text: string, pattern: RegExp): string[] {
        return (text.match(pattern) || [])
            .filter((match, index, self) => self.indexOf(match) === index) // Remove duplicates
            .map(match => match.trim()); // Trim whitespace
    }

    /**
     * Advanced method to score resume relevance
     * @param resumeText - Full text of the resume
     * @returns Relevance score (0-100)
     */
    public calculateRelevanceScore(resumeText: string): number {
        const result = this.parse(resumeText);

        let score = 0;
        score += result.emails.length * 10;
        score += result.phoneNumbers.length * 15;
        score += result.degrees.length * 20;
        score += result.jobTitles.length * 25;
        score += result.companies.length * 20;
        score += result.techSkills.length * 10;

        return Math.min(Math.max(score, 0), 100);
    }
}