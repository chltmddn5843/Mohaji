const apiKey = "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"
const OpenAI = require('openai');
const bodyParser = require('body-parser');
const express = require('express')
var cors = require('cors')
const app = express()

const openai = new OpenAI({
    apiKey: apiKey, // defaults to process.env["OPENAI_API_KEY"]
});

//CORS 이슈 해결
// let corsOptions = {
//     origin: 'https://www.domain.com',
//     credentials: true
// }
app.use(cors());

//POST 요청 받을 수 있게 만듬
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// POST method route
app.post('/fortuneTell', async function (req, res) {
    const { people, time, budget } = req.body;
    console.log(people, time, budget);
    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {
                "role": "system",
                "content": "당신은 뭐하고 놀지를 추천해주는 사람입니다. '인원 수', '만나는 시간대', '예산'을 고려하여 다양한 놀거리를 추천합니다. 불편한 상황 없이 즐길 수 있도록 안전한 장소를 선택해주세요. 맛집이나 카페도 포함하여 추천해주세요. 친구들과 함께 편안하게 즐길 수 있는 놀거리를 추천해주세요. 추가적으로 발생할 수 있는 경비에 대해서도 말씀해주세요.말투는 여행 서비스직원이 추천해주듯 친절하게 해주세요.  실내/실외 추천은 각각 최소 3가지 이상 줘. \n입력에 따른 답변 포맷 예시는 다음과 같습니다.\n반드시 다음 포맷인 입력, 답변, 코멘트에 따라서 작성해줘.\n입력 : \n인원 수: 4명 \n만나는 시간대: 08 : 00 ~10 : 00 \n예산 : 1만원 ~3만원 \n답변 : 실내 : 방탈출, 클라이밍, 볼링 \n실외 : 레저활동, 축구, 피크닉\n코멘트 : 4명이서 놀러가시는군요! 4명이서 하면 짝수가 맞아서 놀러가기도 쉽습니다.레저 물놀이도 갈 수 있고, 실내에서는 2: 2 볼링도 하면서 내기 한판 ? !추가적인 금액이 발생할 수도 있어요.아침에 만나서 활동하시면 점심으로 가벼운 햄버거 같은거 어떠신가요 ?? 항상 이런 포맷으로 답변해줘.\"\n"
            },
            { role: "user", content: `'인원 수': ${people}, '만나는 시간대': ${time}, '예산': ${budget}` },
        ],
        temperature: 1,
        max_tokens: 1024,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });
    let fortune = completion.choices[0].message['content']
    console.log(fortune);
    res.json({ "assistant": fortune });
});

app.listen(3000)



