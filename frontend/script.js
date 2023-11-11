const apiKey = "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";
const OpenAI = require('openai');
const express = require('express');
var cors = require('cors');
const app = express();

const openai = new OpenAI({
    apiKey: apiKey,
});

// CORS issue resolution
app.use(cors());

// Enable POST requests
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// POST method route
app.post('/fortuneTell', async function (req, res) {
    try {
        const { people, time, budget } = req.body;

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "..." },  // unchanged
                { role: "user", content: `'인원 수': ${people}명, '만나는 시간대': ${time}, '예산': ${budget}` },
            ],
        });

        const fortune = completion.choices[0].message['content'];
        console.log(fortune);
        res.json({ "assistant": fortune });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
