# SSAFY생들 간의 코딩장비 공유 서비스 - COALA
> 자신에게 맞는 코딩장비를 찾아보고, P2P 대여 및 거래를 진행하는 중개 사이트

<br>

### 프로젝트 기간 🗓️
- 2023.07.04 ~ 2023.08.18

<br>

### 개발환경 🛠️
>
> Java 17.
> >
> Spring Boot 3.1.2.
> > 
> Node.js 18.
> >
> Next 13.2.4.
> >
> React 18.2.0.

<br>

## 0. 팀원 🧑‍🤝‍🧑

| 팀원| 역할 | 담당 | 파트 |
|:---|:---|:---|:---|
|정선재|팀장| Front End | |
|심은진|팀원| Front End | |
|서지호|팀원| Front End | |
|강승현|팀원| Back End | 인프라 구축, 멤버 관리, 거래 게시판 | 
|권민우|팀원| Back End | 커뮤니티 게시판, 디버깅, 코드 테스트 |
|김수찬|팀원| Back End | 인프라 구축, 채팅I/O, 거래 및 계약 |

### 0.1 상세 업무 분담 내역
---
<br>

**공통**: 
- 데이터베이스 모델링 
- 컴포넌트 구조 분석
- 시스템 목업

**정선재**: 
| 개발 분야| 역할 |
|:---:|:---|
|인프라 구축| - 적어주세요<br> - 적어주세요<br> - 적어주세요 <br> - 적어주세요|
|멤버 관리| - 적어주세요<br> - 적어주세요|

**심은진**:
| 개발 분야| 역할 |
|:---:|:---|
|인프라 구축| - 적어주세요<br> - 적어주세요<br> - 적어주세요 <br> - 적어주세요|
|멤버 관리| - 적어주세요<br> - 적어주세요|

**서지호**: 
| 개발 분야| 역할 |
|:---:|:---|
|인프라 구축| - 적어주세요<br> - 적어주세요<br> - 적어주세요 <br> - 적어주세요|
|멤버 관리| - 적어주세요<br> - 적어주세요|

**강승현**:
| 개발 분야| 역할 |
|:---:|:---|
|인프라 구축| - 적어주세요<br> - 적어주세요<br> - 적어주세요 <br> - 적어주세요|
|멤버 관리| - 적어주세요<br> - 적어주세요|

**권민우**: 
| 개발 분야| 역할 |
|:---:|:---|
|인프라 구축| - 적어주세요<br> - 적어주세요<br> - 적어주세요 <br> - 적어주세요|
|멤버 관리| - 적어주세요<br> - 적어주세요|

**김수찬**:
| 개발 분야| 역할 |
|:---:|:---|
| 인프라 구축 | - Jenkins을 활용하여 Docker Hub에 Image 관리 <br> - Docker Hub를 통한 버전 관리 <br> - Service를 분할하여 서버의 가용성을 높임 <br> - S3를 활용한 이미지 저장 |
| 채팅 I/O | - Next.js 를 활용하여 채팅 중계 서버 생성 <br> - Node.js의 특징인 이벤트 드리븐 모델을 활용 효율성을 높임 <br> - 프론트와 동일한 언어 사용으로 개발 및 유지보수성을 높임 |
| 거래 및 계약 | - 계약서 정보를 받아와 png 형태로 계약서를 저장 <br> - 저장된 계약서는 S3 에서 수정 불가능 하게 관리 |

<br>

## 1. 구조도

### 1.1. 아키텍쳐 구조 🔗
![이미지 추가해주세요](./docs/Structure/COALA_Architecture.png)

---
### 1.2. ERD 구조 🎛
![이미지 추가해주세요](./docs/Structure/COALA_ERD_summery.png)

---
### 1.3. 컴포넌트 구조 🎞
![이미지를 추가해주세요](./docs/Structure/COALA_Component.PNG)


<br>

### 1.4. 폴더 구조
---
#### 폴더 양이 많기에 따로 위치시켰습니다.
[파일 구조도 위치](./docs/File_Content/README.md)


<br>

## 2. 개요 📑

### 2.1 목표 서비스
```
    1. 목표 서비스 작성
    2. 목표 서비스 작성
    3. 목표 서비스 작성
```
### 2.2 상세 네용
> 0. 시작페이지
```
1. 목표 서비스 작성
2. 목표 서비스 작성
3. 목표 서비스 작성
```

> 1. 메인페이지
```
1. 목표 서비스 작성
2. 목표 서비스 작성
3. 목표 서비스 작성
4. 목표 서비스 작성
5. 목표 서비스 작성
```

> 2. 마이 페이지
```
1. 목표 서비스 작성
2. 목표 서비스 작성
3. 목표 서비스 작성
```

> 3. 자유게시판 및 테크게시판
```
1. 목표 서비스 작성
2. 목표 서비스 작성
3. 목표 서비스 작성
4. 목표 서비스 작성
5. 목표 서비스 작성
```

> 4. 제공자 게시판
```
1. 목표 서비스 작성
2. 목표 서비스 작성
3. 목표 서비스 작성
4. 목표 서비스 작성
```

> 5. 이용자 게시판
```
1. 목표 서비스 작성
2. 목표 서비스 작성
3. 목표 서비스 작성
4. 목표 서비스 작성
```


> 6. 채팅
```
1. 목표 서비스 작성
2. 목표 서비스 작성
```


> 7. 계약서 작성
```
1. 목표 서비스 작성
2. 목표 서비스 작성
```

<br>

## 3. 웹 사이트 예시 📺

### **메인 페이지**
![](./docs/example/mainpage1.PNG)
![](./docs/example/mainpage2.PNG)

<br>

### **마이 페이지**
![](./docs/example/mypage1.PNG)

<br>


### **자유게시판 **
![](./docs/example/freePost1.PNG)

<br>

### **자유게시판 **
![](./docs/example/techPost1.PNG)


<br>

### **제공자 게시판**
![](./docs/example/store1.PNG)
![](./docs/example/store2.PNG)


<br>

### **이용자 게시판**
![](./docs/example/auction1.PNG)
![](./docs/example/auction2.PNG)


<br>

### **채팅**
![](./docs/example/chat1.PNG)
![](./docs/example/chat2.PNG)


<br>

### **계약서 작성**


<br>

