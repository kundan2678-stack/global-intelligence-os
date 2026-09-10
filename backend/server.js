require('dotenv').config();
const express = require('express');
const { OpenAI } = require('openai');

const app = express();
app.use(express.json()); 

// OpenAI ka connection set kar rahe hain (.env file se key utha kar)
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Ye wo route hai jo Frontend se baat karegi
app.post('/api/chat', async (req, res) => {
    try {
        const userMessage = req.body.message; 

        // OpenAI ko message bhejna
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini", // Aapke paas jo model ho wo use karein
            messages: [{ role: "user", content: userMessage }],
        });

        // OpenAI ka reply wapas frontend ko bhej dena
        res.json({ reply: response.choices[0].message.content });

    } catch (error) {
        console.error("OpenAI Error:", error.message);
        res.status(500).json({ error: "Kuch galat ho gaya, check logs." });
    }
});

// Server ko port 3000 par start karna
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`✅ Server perfectly running on port ${PORT}`);
});