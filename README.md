# JWorld-Metaverse

- 메타버스 SNS 서버사이드 만들기
- 싸이월드 모티브

## Notice
- 현재 Oracle Cloud Free Tier의 서버 스펙이 부족하여 서비스 배포를 하지 않고 있는 상태입니다
- 추후 서버 구입 후 서비스 운영 예정입니다.

## Repository

- client: https://github.com/gonnabea/Metaverse-Jworld-Client
- server: https://github.com/gonnabea/Metaverse-Jworld-Server

## 기여도
- 개인 프로젝트 (100%)

## 프로젝트 동기 / 설명

웹 위에서 구동되는 메타버스 컨셉의 프로젝트입니다.
유저가 간편하게 웹 URL을 통해,
3D 공간에 접근하여 마치 3D 온라인 게임 처럼 타 유저와 만나 채팅하고, 
방꾸미기를 할 수 있으며, 전시 작품을 등록, 관람하는 등의
인터랙티브한 경험을 할 수 있는 웹을 만들면 정말 재밌겠다는 생각을 했습니다

## 개발 기간

11월 ~ 1월: 초기 출시

2월 ~ : 현재 진행형, 1차 업데이트 예정 

### 서버사이드 기술스택

- [x] Nest.js (Node.js)
- [x] TypeScript
- [x] GraphQL
- [x] REST API (For Files)
- [x] DB (PostgresQL + Cassandra. etc..)
- [x] Websocket
- [x] JWT Login
- [ ] WebRTC
- [ ] Mediasoup (WebRTC SFU Media Server)
- [x] Docker
- [x] Ubuntu SSH (Oracle Cloud Free Tier)
- [x] Nginx

## 기능

### 초기 출시 ( ~ 2022 - 1 - 15)

- 공통

- [x] 전체 채팅
- [x] 회원가입 / 로그인 구현


- 로비

- [x] 로비룸 구현
- [x] 실시간 연동

- 스트림 월드

- [x] 아바타 실시간 연동
- [ ] 스트리밍 방송

- 미니홈피 (개인 3D룸)

- [x] 미니홈피 생성 & 초기화
- [ ] 방명록 작성 (벽 낙서하기, 책, 게시판)
- [x] 방 크기 커스텀 기능
- [x] 3D 오브젝트 (가구) & 커스텀 배치 기능
- [x] 미니홈피 저장
- [x] 미니홈피 TV에 영상 목록 커스텀 기능 등록
- [x] 액자 생성 기능
- [x] 액자에 유저가 업로드한 이미지 등록 기능

### 1차 대규모 업데이트

- 공통

- [ ] 파티 생성 & 그룹 채팅 기능
- [ ] 귓속말 채팅
- [ ] 회원 탈퇴

- 미니홈피

- [ ] 초대 기능 (초대 수락, 요청)
- [x] 방 생성 기능
- [ ] 음성채팅
- [ ] 미니홈피 추천 기능

- 축구장

- [ ] 축구장 생성 기능
- [ ] 공 연동
- [ ] 스코어 기능

### 2차 대규모 업데이트 (부분 유료화 - 수익 모델)

- 아바타

- [ ] 아이템 추가
- [ ] 아바타 커스텀 기능

- 미니홈피

- [ ] 3D 오브젝트(가구) 추가

- 상점 시스템

- [ ] 아이템 구매 기능
- [ ] 가구 구매 기능

- 화폐 시스템

- [ ] 미니홈피 추천 수에 따른 화폐 지급
- [ ] 축구 등 미니게임 승리 시 화폐 지급


### ERD (데이터 구조)

- https://www.erdcloud.com/d/6CBPbhda2jyTXBWQt
