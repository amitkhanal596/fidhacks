require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const multer = require("multer");
const pdf = require("pdf-parse");
const axios = require("axios");

const app = express();


app.use(cors({ origin: "http://localhost:5173" }));


const upload = multer({ dest: "uploads/" });

//Gemini Config
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-1.5-flash";
const GEMINI_VERSION = process.env.GEMINI_VERSION || "v1";

if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY not set in environment");
}

const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/${GEMINI_VERSION}/models/${GEMINI_MODEL}:generateContent?key=${process.env.GEMINI_API_KEY}`;

//Helper Function
function extractJson(text) {
    const fenced = text.match(/```(?:json)?[\r\n]+([\s\S]*?)```/i);
    if (fenced) text = fenced[1].trim();
    const first = text.indexOf("{");
    const last = text.lastIndexOf("}");
    if (first !== -1 && last !== -1 && last > first)
        return text.slice(first, last + 1);
    return text;
}

function addInsight(obj) {
    const fact =
        "According to Harvard Business Review, women tend to apply for jobs only when they meet 100% of the qualifications, while men apply when they meet about 60%.";
    if (!obj || typeof obj !== "object") {
        return {
            ...obj,
            insight: `${fact} Men often apply even when missing qualifications—don’t underestimate yourself!`,
        };
    }
    let pct = null;
    if (obj.matchPercentage !== undefined && obj.matchPercentage !== null) {
        pct = parseFloat(String(obj.matchPercentage).replace(/[^0-9.]+/g, ""));
        if (Number.isNaN(pct)) pct = null;
    }
    if (pct === null) {
        obj.insight = `${fact} Men often apply even when missing qualifications—don’t underestimate yourself!`;
    } else if (pct >= 60) {
        obj.insight = `${fact} Your match is ${pct}%, comfortably above that 60% benchmark—feel confident applying even if you don’t tick every single box.`;
    } else {
        obj.insight = `${fact} Your match is ${pct}%. Men still apply at this level, so consider applying—you could still be a strong candidate.`;
    }
    return obj;
}

//Route
app.post("/api/match", upload.single("resume"), async (req, res) => {
    if (!req.file)
        return res.status(400).json({ error: "No resume file uploaded." });
    if (!req.body.jobDescription) {
        fs.unlink(req.file.path, () => {});
        return res.status(400).json({ error: "No job description provided." });
    }

    try {
        //Extract resume text
        const buffer = fs.readFileSync(req.file.path);
        const { text: resumeText } = await pdf(buffer);

        //Stay under token limit
        const MAX_CHARS = 3000;
        const truncatedResume = resumeText.slice(0, MAX_CHARS);
        const truncatedJob = req.body.jobDescription.slice(0, MAX_CHARS);

        const prompt = `Compare the following resume and job description. Return a JSON object with:\n- matchPercentage: 0–100\n- explanation: 2–3 sentences why the resume matches.\n\nResume:\n'''${truncatedResume}'''\nJob Description:\n'''${truncatedJob}'''\n\nRespond with the JSON object only.`;

        //Gemini api call
        const apiRes = await axios.post(
            GEMINI_ENDPOINT,
            {
                contents: [
                    {
                        role: "user",
                        parts: [
                            {
                                text: "You are a helpful assistant that compares resumes to job descriptions and outputs JSON.",
                            },
                        ],
                    },
                    { role: "user", parts: [{ text: prompt }] },
                ],
                generationConfig: { temperature: 0.5, topP: 1, topK: 40 },
            },
            { headers: { "Content-Type": "application/json" } }
        );

        const raw =
            apiRes.data.candidates?.[0]?.content?.parts?.[0]?.text || "";
        const clean = extractJson(raw);

        let result;
        try {
            result = JSON.parse(clean);
        } catch {
            result = { matchPercentage: null, explanation: raw };
        }

        result = addInsight(result);

        res.json(result);
    } catch (err) {
        const status = err.response?.status;
        if (status === 429)
            return res
                .status(503)
                .json({
                    error: "Rate-limited by Gemini API. Try again shortly.",
                });
        console.error("Processing error:", err?.response?.data || err.message);
        res.status(500).json({ error: "Failed to process resume." });
    } finally {
        fs.unlink(
            req.file.path,
            (e) => e && console.error("Cleanup error:", e)
        );
    }
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
