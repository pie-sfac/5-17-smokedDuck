# PoinT 통증관리 시스템

<div align="center">
<img width="330" alt="image" src="src/assets/Logo.svg">
</div>

## 프로젝트 정보

> **Udemy & 스나이퍼팩토리 & Piehealthcare**
<br/>**기록을 위한 센터의 기록 템플릿 관리 및 아카이브 링크(링크 보관함) 관리 기능 제작** 
<br/>**개발기간: 2023.07.17 ~ 2023.08.10**

## 배포 주소
> **링크:**

## 팀 소개

|팀장|팀원|팀원|팀원|
|:---:|:---:|:---:|:---:|
|이승훈|허지연|김기현|김민정|
|[@mandarin-sep](https://github.com/mandarin-sep)|[@Heojiyeon](https://github.com/Heojiyeon)|[@TomyoKim](https://github.com/TomyoKim)|[@minjeong19](https://github.com/minjeong19)|

## 프로젝트 소개
**통증 관리 전문가들을 위한 올인원 고객 관리 전문 SaaS, 포인티**
</br>
</br>
PC에서도 동일한 서비스를 이용하고자 Web 페이지를 개발했습니다.
</br>
원활한 기록 관리와 미디어 관리를 제공할 수 있도록 합니다.


## 시작 가이드

### Requirements

For building and running the application you need:

- [Node.js](https://nodejs.org/ko/download)
- [npm](https://www.npmjs.com/package/package)

### Installation

``` bash
$ git clone https://github.com/pie-sfac/5-17-smokedDuck.git
$ cd 5-17-smokedDuck
$ npm ci
$ npm run dev
```

## Stacks

### Environment

![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?style=for-the-badge&logo=Visual%20Studio%20Code&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white)
![Github](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white)

### Config

![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white) 

### Development

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Typescript](https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Axios](https://img.shields.io/badge/axios-5A29E4.svg?&style=for-the-badge&logo=axios&logoColor=white)
![Eslint](https://img.shields.io/badge/eslint-4B32C3.svg?&style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/prettier-DF0067.svg?&style=for-the-badge&logo=prettier&logoColor=white)


### Communication

![Slack](https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=Slack&logoColor=white)
![Notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white)
![Discord](https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=Discord&logoColor=white)
![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=Figma&logoColor=white)

## 화면 구성

## 주요 기능

### Login
- 관리자 권한의 로그인이 가능합니다.
- 잘못된 ID 혹은 password 입력시 Alert 창을 통해 안내합니다.

### Record

#### 문진 템플릿
- 

#### 처치 템플릿
- 

### Media

#### 카테고리
- 미디어 관리 카테고리의 생성, 조회, 수정, 삭제가 가능합니다.
- 카테고리 삭제시, 해당 카테고리의 모든 센터 링크는 함께 삭제됩니다.
- 최대 10개의 카테고리 항목을 생성할 수 있으며, 카테고리명은 15자로 제한됩니다.

#### 센터 링크
- 센터 링크의 생성, 조회, 수정, 삭제가 가능합니다.
- 센터 링크 생성/삭제에서 유튜브 링크 입력시, 메타데이터를 파싱해 해당 링크의 정보를 불러올 수 있습니다.
- 생성/수정된 센터 링크는 최신순으로 정렬됩니다.
