# 🐶 산책할게  

### 나도 강아지도 혼자였던 산책에서 벗어나, 산책 메이트와 일상을 공유하고 같이 산책하는 서비스 '산책할개'입니다.  

<img src="https://user-images.githubusercontent.com/88166362/144694893-52789e67-866c-4ead-b9a0-f63069c7dfbf.png" width="700" height="700">

[산책할개 사이트](https://togaether.shop/)  
[시연 영상](https://www.youtube.com/watch?v=dKcawThqUME&t=16s)  

<br>

# :family_man_woman_boy_boy: 멤버구성
- Front-end : [김다원](https://github.com/DawonEllaKim), [김효진](https://github.com/hyojin-k),[이수창](https://github.com/eternalclash) 
- Back-end : [황유정](https://github.com/eujeong-hwang), [탁정규](https://github.com/tak-codes),[허선희](https://github.com/SunHeeHeo) 
- Designer : 서연수, 이성원 

<br>

# :bookmark_tabs: 개발기간
2021.10.25 - 2021.12.03 (총 6주)

<br>

# :sparkles: 아키텍쳐
<img width="772" alt="KakaoTalk_Photo_2021-12-04-12-08-16" src="https://user-images.githubusercontent.com/88166362/144694918-ab86d1e8-c61d-461a-92ca-e77a10ffc9cf.png">

<br>

# :hammer_and_wrench: 기술스택
기술스택|설명
:---|:---:
Node.js | JS 런타임
MySQL | MySQL
Express | 웹 프레임워크
Nginx | 프록시 서버

<br>

# : : 라이브러리
|라이브러리|설명|
---|:---
<img src='https://img.shields.io/badge/express-1.7.9-lightgrey'> | 웹 프레임워크
<img src='https://img.shields.io/badge/bcrypt-5.0.1-lightgrey'> | 비밀번호 암호화
<img src='https://img.shields.io/badge/cors-2.8.5-lightgrey'> | 교차 출처 리소스 공유
<img src='https://img.shields.io/badge/dotenv-10.0.0-lightgrey'>  | 환경변수 설정
<img src='https://img.shields.io/badge/helmet-4.6.0-lightgrey'>  | HTTP 헤더 보안
<img src='https://img.shields.io/badge/jest-27.3.1-lightgrey'>  | 테스트 코드
<img src='https://img.shields.io/badge/jsonwebtoken-8.5.1-lightgrey'>  | 토큰 기반 인증
<img src='https://img.shields.io/badge/morgan-1.10.0-lightgrey'> | 로거 미들웨어
<img src='https://img.shields.io/badge/mysql-2.3.2-lightgrey'> | MySQL
<img src='https://img.shields.io/badge/swagger--ui--express-4.1.6-lightgrey'> | API 문서편집기
<img src='https://img.shields.io/badge/winston-3.3.3-lightgrey'> | Log 파일 관리
<img src='https://img.shields.io/badge/sharp-0.29.3-lightgrey'> | 이미지 처리
<img src='https://img.shields.io/badge/multer-1.4.3-lightgrey'> | 파일 업로드

- 로그인 / 회원가입 / 강아지 정보 등록 
  - 로그인 할 시 JWT 토큰을 발급
  - 회원가입 시 비밀번호의 보안을 위해 bcrypt 모듈 사용

- 메인페이지

  - 현재 날씨 조회
  - 최신 개스타그램 조회
  - 카테고리별 산책 목록 조회

- 산책등록

  - 카카오맵 api를 사용해 제공하는 산책로 선택
  - 날짜, 시간 선택

- 산책가자 (산책목록 조회 페이지)

  - 장소별 산책목록 확인
  - 원하는 산책 신청 및 쪽지하기 기능

- 개스타그램 (강아지 일상 공유 페이지)

  - 최신순, 좋아요 순 정렬
  - 일상 공유하는 페이지 등록
  - 좋아요, 댓글, 쪽지 보내기 기능

- 마이페이지

  - 유저가 등록한 개스타그램, 산책목록 조회
  - 유저 데이터, 강아지 데이터 조회 및 수정
  - 다른 유저 페이지 방문 가능

- 쪽지

  - 받은 쪽지, 산책 신청 알람 기능
  - 받은 산책 신청 수락/거절
  - 쪽지 보내기, 답장하기

<br>

# :writing_hand: 개발 일지
- [Team Notion](https://togaether.shop/)
- [Front-end github](https://github.com/O-K-O-K-O-K/Front-end)
- [Back-end github](https://github.com/O-K-O-K-O-K/Back_End)
