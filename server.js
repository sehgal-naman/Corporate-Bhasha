import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

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

Rules:
- keep meaning same
- sound professional
- slightly polite corporate tone
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

error:"AI connection failed"

});

}

});

app.listen(3000,()=>{

console.log("Server running on http://localhost:3000");

});