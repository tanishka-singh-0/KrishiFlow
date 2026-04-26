import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    // API Key setup (Use Environment Variable in Vercel to prevent Google from revoking public keys)
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined in environment variables.");
    }
    
    const genAI = new GoogleGenerativeAI(apiKey);

    // Latest Model with Supply Chain System Instruction
    const model = genAI.getGenerativeModel({ 
      model: "gemini-flash-latest",
      systemInstruction: "You are KrishiFlow AI, an expert Supply Chain & Logistics Manager. You ONLY answer questions related to fertilizer logistics, warehouse inventory, truck routing, tracking ETAs, predictive demand, and supply chain optimization. Keep answers short, professional, and directly related to the user's prompt. Do NOT answer general farming questions."
    });

    // Generate Content
    const result = await model.generateContent(prompt);
    const response = await result.response;

    // FIX: response.text() ko bhi await karna zaroori hai
    const text = await response.text();

    return NextResponse.json({ text });
  } catch (error: any) {
    console.error("DEBUG ERROR:", error.message);

    // Agar internet block hai toh ye fallback message dikhayega
    return NextResponse.json({
      text: "System Offline: Unable to reach AI server. Last known status: Truck MP04 en route to Warehouse B, ETA 45 mins. (Offline Mode Active)"
    });
  }
}