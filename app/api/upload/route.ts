import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import pdfParse from "pdf-parse";
// import { parseDocx } from "docx-parser";
import mongoose, { Schema, Document, Model } from "mongoose";
import multer from "multer";
import { promisify } from "util";

const uploadsDir = path.join(process.cwd(), "uploads");

// Ensure the uploads directory exists
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// MongoDB Schema and Model
interface IResume extends Document {
    name: string;
    email: string;
    phone: string;
    education?: string;
    experience?: string;
    skills?: string[];
    profilePicture?: string;
    filePath: string;
}

const ResumeSchema = new Schema<IResume>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    education: String,
    experience: String,
    skills: [String],
    profilePicture: String,
    filePath: { type: String, required: true },
});

const Resume: Model<IResume> = mongoose.models.Resume || mongoose.model<IResume>("Resume", ResumeSchema);

const connectDB = async (): Promise<void> => {
    if (!mongoose.connection.readyState) {
        await mongoose.connect("mongodb://127.0.0.1:27017/resumeDB", {
        });
    }
};

const parseText = (text: string): Partial<IResume> => {
    const nameMatch = text.match(/Name:\s*(.*)/);
    const emailMatch = text.match(/Email:\s*(.*)/);
    const phoneMatch = text.match(/Phone:\s*(.*)/);

    return {
        name: nameMatch ? nameMatch[1] : "Unknown",
        email: emailMatch ? emailMatch[1] : "Unknown",
        phone: phoneMatch ? phoneMatch[1] : "Unknown",
    };
};

// Handle file uploads with Multer
const upload = multer({ dest: uploadsDir });
const uploadMiddleware = promisify(upload.single("resume"));

export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        const formData = await req.formData();
        const file = formData.get("resume") as File;

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        const filePath = path.join(uploadsDir, file.name);
        const buffer = Buffer.from(await file.arrayBuffer());
        fs.writeFileSync(filePath, buffer);

        const fileExtension = file.name.split(".").pop();
        let extractedData: Partial<IResume> = {};

        if (fileExtension === "pdf") {
            const parsedData = await pdfParse(buffer);
            extractedData = parseText(parsedData.text);
        }
        // else if (fileExtension === "docx") {
        //     const parsedData = await parseDocx(filePath);
        //     extractedData = parseText(parsedData);
        // }

        await connectDB();

        const resume = new Resume({ ...extractedData, filePath });
        await resume.save();

        return NextResponse.json({ message: "Resume uploaded and parsed!", resume });
    } catch (err) {
        return NextResponse.json({ error: (err as Error).message }, { status: 500 });
    }
}
