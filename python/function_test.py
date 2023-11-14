import json

import openai
from flask import Flask, jsonify, render_template, request

app = Flask(__name__)

# Replace with your OpenAI API key
OPENAI_API_KEY = ""
client = openai.OpenAI(api_key=OPENAI_API_KEY)


@app.route("/")
def index():
    return render_template("index.html")


conversation = []


@app.route("/chat", methods=["POST"])
def chat():
    # 사용자로부터 입력 받기
    people = request.form["people"]
    time = request.form["time"]
    budget = request.form["budget"]

    # GPT-3.5-turbo에 대화 추가
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo-0613",
        messages=[
            {
                "role": "system",
                "content": "당신은 뭐하고 놀지를 추천해주는 사람입니다. '인원 수', '만나는 시간대', '예산'을 고려하여 다양한 놀거리를 추천합니다. 코멘트에서는 맛집이나 카페도 포함하여 추천해주세요. 친구들과 함께 편안하게 즐길 수 있는 놀거리를 추천해주세요. 말투는 여행 서비스직원이 추천해주듯 친절하게 해주세요. 반드시 매 시행마다 실내/실외 추천은 각각 3가지 이상씩 추천해줘. 반드시 만나는 시간대와 예산을 고려해서 가능한 활동만 추천해줘. \n반드시 다음 포맷인 입력, 답변, 코멘트에 따라서 작성해줘. \n '''입력 : \n인원 수: 4명\n만나는 시간대: 08 : 00 ~10 : 00 \n 예산 : 1만원 ~3만원 \n''' '''답변 : 실내 : 방탈출, 클라이밍, 볼링 \n 실외 : 레저활동, 축구, 피크닉\n 코멘트 : 4명이서 놀러가시는군요! 4명이서 하면 짝수가 맞아서 놀러가기도 쉽습니다.레저 물놀이도 갈 수 있고, 실내에서는 2: 2 볼링도 하면서 내기 한판 ? ! 아침에 만나서 활동하시면 점심으로 가벼운 햄버거 같은거 어떠신가요 ?",
            },
            {
                "role": "user",
                "content": f"'인원 수': {people}, '만나는 시간대': {time}, '예산': {budget}",
            },
        ],
        functions=[
            {
                "name": "recommend_what_to_do",
                "description": "놀 거리 추천하기",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "실내": {"type": "string", "description": "실내에서 할 수 있는 놀거리 추천"},
                        "실외": {"type": "string", "description": "실외에서 할 수 있는 놀거리 추천"},
                        "코멘트": {"type": "string", "description": "추천에 대한 코멘트"},
                    },
                    "required": ["실내", "실외", "코멘트"],
                },
            }
        ],
        temperature=1,
        max_tokens=1024,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0,
    )

    # 완성된 응답을 전달
    assistant_response = completion.choices[0].message.function_call.arguments
    response_dict = json.loads(assistant_response)
    indoor = response_dict.get("실내", "")
    outdoor = response_dict.get("실외", "")
    comment = response_dict.get("코멘트", "")
    app.logger.info(f"실내: {indoor}")
    app.logger.info(f"실외: {outdoor}")
    app.logger.info(f"코멘트: {comment}")
    conversation.append([indoor, outdoor, comment])
    return render_template(
        "index.html",
        people=people,
        time=time,
        budget=budget,
        assistant_response=assistant_response,
        indoor=indoor,
        outdoor=outdoor,
        comment=comment,
        conversation=conversation,
    )


if __name__ == "__main__":
    app.run(debug=True)
