# Catch-poo

<br>

## 소개
누군가 바다에 더러운 💩 을 버렸네요!<br />
게임을 플레이해서 버려진 💩 을 청소해 바다 생물이 행복하게 살 수 있도록 도와주세요!<br />

<br>

## 구현 기능
  - 플레이 버튼을 누르면 플레이 버튼이 정지 버튼으로 변하고,<br />
  타이머 기능이 활성화, 💩의 갯수가 뜹니다.<br />
  그리고 아이템들이 화면에 랜덤으로 뿌려집니다.
  - 바다 생물을 클릭하면 `YOU LOSE`라는 팝업창이 뜨며, Replay버튼이 생성됩니다.
  - 💩 을 전부 없애면 `YOU WIN`이라는 팝업이 뜨며, Replay버튼이 생성됩니다.

<br>

## 사용 기능 설명 
  - font Awesome과 classList.add/remove를 사용해 게임 시작 시 stop버튼으로 바꾸고, 게임이 정지 시 start버튼으로 바꾸도록 했습니다.
  - addItem이라는 함수에 세가지 인자를 받게 만든 후 gameInit 함수에 addItem 인자값만 넣어 쉽게 해양생물 가짓수와 💩의 갯수를 컨트롤할 수 있도록 했습니다.
  - Math.random()을 사용해 렌덤한 위치에 아이템이 뿌려지도록 했습니다.
  - getBoundingClientRect()로 랜덤한 위치에 뿌려진 아이템들이 화면 밖으로 잘려나가는 오류를 잡아내었습니다.
  - .matches()를 이용해 💩을 잡아내면 아이템이 삭제되고, 점수가 올라가도록 하고, 해양생물을 클릭하면 lose팝업을 띄우도록 했습니다.
  - setInterval과 clearInterval을 사용해 타이머를 실행하고, 멈추도록 했습니다.

<br>

## 문제 사항
  - [ ] 성공 시 다음 단계 플레이

<br>

## 개발 환경
  - 개발도구: VSCode, Github
  - 사용언어: html, css, vanilla JS

<br>

## 최종 결과물
Game Intro <br />
<img width="640" alt="최종 결과물-Intro" src="https://user-images.githubusercontent.com/93115007/160332276-02cc9770-b234-45e0-8c60-1eb2a67e6101.png">

Playing <br />
<img width="640" alt="최종 결과물-Playing" src="https://user-images.githubusercontent.com/93115007/160332417-a4a4e454-0ada-4aaf-aedc-e9e33010fdaf.png">

Lose<br />
<img width="640" alt="최종 결과물-Lose" src="https://user-images.githubusercontent.com/93115007/160332443-1d149b81-852c-4e45-8070-b51914475bc4.png">

Win<br />
<img width="640" alt="최종 결과물-Win" src="https://user-images.githubusercontent.com/93115007/160332471-e888bd59-3cfb-46b1-96b0-4fbf8df05a58.png">