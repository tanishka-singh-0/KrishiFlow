import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    // API Key setup
    const genAI = new GoogleGenerativeAI("AIzaSyCdIufeLm7sSBoHTGOyWIrFZYYXJriU1oo");

    // Latest Model
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

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
      text: "Bhai, server thoda busy hai. Narmadapuram mandi mein Soyabean aur Gehu ka rate badhiya chal raha hai! (Offline Mode Active)"
    });
  }
}