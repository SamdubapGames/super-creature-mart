# super-creature-mart

먼지가 뒤덮은 세상, 괴생명체가 돌아다니는 밖. 두렵지만... 배가고프다. 마트에 가야한다. ..살아 돌아올 수 있을까?

---

전달:

1. 함수 안을 채운다!
2. 파일 맨 아래 콘솔 열고 ✅ 뜨면 완성
3. console.log 마음껏 써도 됨
4. 테스트 케이스 바꾸지 말 것

---

### 파일 구조

```
js/
    data.js  ←  고정. 모든 초기 데이터.
    state.js ←  gameState 오브젝트 + 상태 변경 함수들
    engine.js ← 게임 루프 + SceneManager
    layers.js ← bg / smoke / monster 레이어 렌더링
    notebook.js ← 헤
    path.js ← 응
    shop.js ← 헤
    scenes/
        startScene.js
        pathScene.js ← path_go, path_back 둘 다 재사용
        shopScene.js
        endingScene.js
    assets/
      bg/
        start.png
        path_01.png
        path_02.png
        path_03.png
        shop.png
        ending.png
      monster/
        part_mouth.png   ← 입
        part_tail.png    ← 꼬리
        part_nose.png    ← 코
        part_eye.png     ← 눈
```

---

# 모듈 구조 문서

---

## 📓 notebook.js

### 함수 구조

| 함수            | 설명                            |
| --------------- | ------------------------------- |
| `formatTipLine` | "입 → 떡" 한 줄 만들기          |
| `showNotebook`  | `formatTipLine` 조합, 전체 목록 |

### 게임 흐름

```
공책 버튼 클릭  → showNotebook 호출 → 전체 팁 목록 문자열 반환
                → engine.js 가 공책 팝업에 표시
공책 닫기       → engine.js 가 팝업 숨김 (notebook.js 범위 밖)
```

---

## 🗺️ path.js

### 함수 구조

| 함수            | 설명                                                         |
| --------------- | ------------------------------------------------------------ |
| `findPartIndex` | 부위 인덱스 찾기                                             |
| `generateRoute` | 1 조합, 랜덤 경로 배열 생성                                  |
| `checkMatch`    | 1 조합, 부위+아이템 짝 판정                                  |
| `useItem`       | 인벤토리에서 아이템 제거                                     |
| `playTurn`      | `checkMatch` + `useItem` 조합, 한 턴 전체 처리 (완성본 참고) |

### 게임 흐름

```
씬 시작         → generateRoute 호출 → 경로 배열 생성
괴물 등장       → engine.js 가 MonsterLayer 에 부위 표시
아이템 드롭     → playTurn 호출 → { success, message } 반환
성공            → engine.js 가 MonsterLayer 제거 → 다음 스텝
실패            → engine.js 가 hp 차감
경로 끝         → engine.js 가 다음 씬으로 전환 (path.js 범위 밖)
```

---

## 🛒 shop.js

### 함수 구조

| 함수             | 설명                                               |
| ---------------- | -------------------------------------------------- |
| `findItemIndex`  | _(예시 — 완성본)_                                  |
| `getStockLabel`  | `"(품절)"` / `"(재고: N개)"`                       |
| `formatShopLine` | `"1. 떡 — 100원 (재고: 3개)"`                      |
| `showShopList`   | `getStockLabel` + `formatShopLine` 조합, 전체 목록 |
| `isAffordable`   | 예산 확인                                          |
| `buyItem`        | `getStockLabel` + `isAffordable` 조합, 구매 처리   |
| `calcTotal`      | 내가 구매한 합산                                   |
| `showReceipt`    | `calcTotal` 조합, 영수증 생성 _(stub)_             |
| `shopSession`    | 완성본, 전체 흐름                                  |

### 게임 흐름

```
아이템 클릭     → buyItem 호출 → "품절이에요, 나중에 다시오세요!" 또는 구매 완료
계산하기 버튼   → shopSession 호출 → showReceipt 반환
영수증 클릭     → engine.js 가 씬 종료 (shop.js 범위 밖)
```

---

### TODO

설계 ✅ 완료
코드 ✅ 완료 (stub 포함)

남은 것[임시]:

1. assets/ 이미지 제작 (점)
2. 팀원 stub 로직 채우기 (응, 헤)
3. 드래그&드롭 구현 (점, pathScene 안)
4. shopScene onBuyClick 버튼 동적 생성

---

### 전체 흐름

```
init()
  └─ SceneManager.switchTo("start")
       └─ startScene.enter()
            └─ 시작버튼 클릭 → SceneManager.switchTo("path")
                 └─ pathScene.enter()
                      └─ generateRoute() 호출 (팀원 응)
                      └─ 스텝마다 onItemDrop() → playTurn() (팀원 응)
                      └─ 경로 끝 → SceneManager.switchTo("shop")
                           └─ shopScene.enter()
                                └─ buyItem() 호출 (팀원 헤)
                                └─ 구매완료 → direction = "back"
                                           → SceneManager.switchTo("path")
                                                └─ 같은 pathScene 재사용
                                                     └─ 끝 → "ending"
```
