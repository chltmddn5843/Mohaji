# index.py 실행 방법
1. python 최신버전 설치 (https://www.python.org/downloads/)

2. vscode -> 확장 -> python 설치

3. python interpreter 설정 
   Ctrl+Shift+P -> 파이썬 인터프리터 설정 -> 경로 찾기 -> C:\Users\이창희\AppData\Local\Programs\Python\Python311\python.exe (각자 다름. 해당 경로로 설정)
   
4. 환경변수 설정 (시스템 속성 -> 고급 -> 환경 변수 -> Path -> 편집 -> 
   - C:\Users\이창희\AppData\Local\Programs\Python\Python311\
   - C:\Users\이창희\AppData\Local\Programs\Python\Python311\Scripts\)
![KakaoTalk_20231114_131854904](https://github.com/GDSC-Meuru/Mohaji/assets/129058247/bf118fd6-5a47-477f-8b86-6ca052555169)

5. 라이브러리 설치
    - ```$ pip install openai --upgrade``` (cmd나 vscode 터미널 command prompt에 입력, $제외하고 입력)
    
6. vscode -> 터미널 -> $ py index.py -> 실행 완료

---
## function_test.py 실행 방법
7. 라이브러리 추가 설치
- ```$ pip install openai --upgrade``` (cmd나 vscode 터미널 command prompt에 입력, $제외하고 입력)
- ```$ pip install Flask``` (python 프레임워크 설치)
- ```$ pip install Flask-Cors``` (Cors를 통해 로컬 웹서버에 호스팅)
8. localhost:5000 접속
  
