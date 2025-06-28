require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function testGemini() {
  try {
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent("Give me a brief personality analysis based on sun sign Leo.");
    const response = await result.response;
    console.log("Gemini Output:", await response.text());
  } catch (error) {
    console.error("Gemini test failed:", error.message);
  }
}

testGemini();

