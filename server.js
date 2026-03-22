import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(__dirname));

const client = new OpenAI({
apiKey: process.env.OPENAI_API_KEY
});

app.post("/translate", async (req,res)=>{

try{

const {text,tone} = req.body;

const prompt = `
Rewrite the following sentence in polite corporate language.

Tone: ${tone}

Text:
"${text}"
`;

const response = await client.chat.completions.create({

model:"gpt-4o-mini",

messages:[
{
role:"user",
content:prompt
}
]

});

res.json({
result: response.choices[0].message.content
});

}catch(error){

console.log(error);

res.status(500).json({
error:"AI failed"
});

}

});

app.listen(3000,()=>{

console.log("Server running");

});