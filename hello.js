import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { input } = req.body;
  if (!input) {
    return res.status(400).json({ error: "Missing input" });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Missing Gemini API key" });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: input,
    });
    const answer = response.text;
    console.log("Input:", input);
    console.log("Gemini Answer:", answer);
    return res.status(200).json({ answer });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to get answer from Gemini" });
  }
}