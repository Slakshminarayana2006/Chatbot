const express = require('express');
const cors = require('cors');
require('dotenv').config();

const OpenAI = require('openai');

const app = express();

app.use(cors());
app.use(express.json());


const client = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1"
});

app.post('/chat', async (req, res) => {
    const { message } = req.body;

    try {
        const completion = await client.chat.completions.create({
            model: "meta-llama/llama-3-8b-instruct",
            messages: [
                { role: "user", content: message }
            ]
        });

        res.json({
            success: true,
            reply: completion.choices[0].message.content
        });

    } catch (error) {
        console.error("FULL ERROR:", error);

        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});