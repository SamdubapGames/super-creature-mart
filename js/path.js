// ============================================================
// path.js
// 담당: 응
// 역할: 길에서 일어나는 일들을 처리하는 함수들
//
// 규칙:
//   - 함수 이름, 파라미터 이름 바꾸지 말 것
//   - 함수 안의 로직만 채울 것
//   - console.log로 중간 확인해도 됨
// comment: 야호! 테스트 파일을 얻었다!
// ============================================================

// ============================================================
// Function 1: 부위 인덱스 찾기
// ============================================================
// 부위 배열에서 찾는 부위가 몇 번째에 있는지 반환합니다.
// 없으면 -1 을 반환합니다.
//
// 인풋(파라미터):
// - parts: 배열(string[]). 부위 이름들.
//   → ["입", "꼬리", "코", "눈"]
// - targetPart: 문자열. 찾을 부위 이름.
//   → "코"
//
// 리턴(반환값):
// - 숫자(number). 찾은 인덱스. 없으면 -1.
//   → findPartIndex(["입", "꼬리", "코", "눈"], "코") 는 2
//   → findPartIndex(["입", "꼬리", "코", "눈"], "발") 는 -1

function findPartIndex(parts, targetPart) {
    // 기능: parts 배열에서 targetPart 와 일치하는 인덱스를 찾아 반환. 없으면 -1.
    // input(parameter): parts(배열), targetPart(string)
    // return값 타입: number
    for (let i = 0; i < parts.length; i++) {
        if (parts[i] === targetPart) {
            return i;
        }
    }
    return -1;
}

// ✅ 함수 완성 후 아래 주석을 풀어서 확인해보세요

console.log(findPartIndex(["입", "꼬리", "코", "눈"], "코")); // 2
console.log(findPartIndex(["입", "꼬리", "코", "눈"], "입")); // 0
console.log(findPartIndex(["입", "꼬리", "코", "눈"], "발")); // -1

// ============================================================
// Function 2: 경로 생성
// ============================================================
// 부위 배열에서 랜덤으로 n개를 뽑아 경로 배열을 만들어 반환합니다.
// 같은 부위가 여러 번 나와도 됩니다.
//
// 인풋(파라미터):
// - parts: 배열(string[]). 뽑을 부위 목록.
//   → ["입", "꼬리", "코", "눈"]
// - n: 숫자. 뽑을 개수.
//   → 5
//
// 리턴(반환값):
// - 배열(string[]). 랜덤으로 뽑힌 부위들.
//   → ["꼬리", "입", "눈", "입", "코"]
//
// 참고: Math.random() 은 0.0 ~ 0.999... 사이의 소수를 랜덤으로 줍니다.
//       Math.floor(Math.random() * parts.length)
//       → 0 이상 parts.length 미만의 랜덤 정수

function generateRoute(parts, n) {
    // 기능: parts 에서 랜덤으로 n개 뽑아 새 배열을 만들어 반환
    // input(parameter): parts(배열), n(number)
    // return값 타입: 배열
    // 꼭 써야 하는 것:
    //   빈 배열 route 만들어서 거기에 채우기
    let randomParts = [];
    for (let i = 0; i < n; i++) {
        randomParts.push(parts[Math.floor(Math.random() * parts.length)]);
    }
    return randomParts;
}

// ✅ 함수 완성 후 아래 주석을 풀어서 확인해보세요

console.log(generateRoute(["입", "꼬리", "코", "눈"], 5)); // 예: ["꼬리", "입", "눈", "입", "코"]
console.log(generateRoute(["입", "꼬리", "코", "눈"], 3)); // 예: ["코", "코", "입"]

// ============================================================
// Function 3: 짝 확인
// ============================================================
// 부위와 아이템이 올바른 짝인지 확인합니다.
//
// 인풋(파라미터):
// - part: 문자열. 현재 등장한 부위. 예: "입"
// - item: 문자열. 플레이어가 선택한 아이템. 예: "떡"
// - parts: 배열(string[]). 부위 목록. 예: ["입", "꼬리", "코", "눈"]
// - items: 배열(string[]). 아이템 목록. 예: ["떡", "칼", "캣닙 담배", "레몬"]
//   → parts[i] 와 items[i] 는 항상 한 쌍입니다.
//   → parts[0]="입" 의 짝은 items[0]="떡"
//
// 리턴(반환값):
// - boolean(true/false). 올바른 짝이면 true, 아니면 false.
//   → checkMatch("입", "떡", ...) 는 true
//   → checkMatch("입", "칼", ...) 는 false
//   → checkMatch("발", "떡", ...) 는 false  (없는 부위)

function checkMatch(part, item, parts, items) {
    // 기능: part 와 item 이 올바른 짝인지 확인해 true/false 반환
    // input(parameter): part(string), item(string), parts(배열), items(배열)
    // return값 타입: boolean
    // 꼭 써야 하는 것:
    //   findPartIndex(parts, part) 호출해서 인덱스 찾기
    //   인덱스가 -1 이면 → false 반환
    //   items[인덱스] === item 이면 → true, 아니면 → false

    let i = findPartIndex(parts, part);
    if (i > -1 && items[i] === item) {
        return true;
    } else {
        return false;
    }
}

// // ✅ 함수 완성 후 아래 주석을 풀어서 확인해보세요

// var PARTS = ["입", "꼬리", "코", "눈"];
// var ITEMS = ["떡", "칼", "캣닙 담배", "레몬"];

// console.log(checkMatch("입", "떡", PARTS, ITEMS)); // true
// console.log(checkMatch("입", "칼", PARTS, ITEMS)); // false
// console.log(checkMatch("발", "떡", PARTS, ITEMS)); // false
// console.log(checkMatch("눈", "레몬", PARTS, ITEMS)); // true

// ============================================================
// Function 4: 아이템 사용
// ============================================================
// 인벤토리에서 아이템을 찾아서 제거합니다.
// 찾으면 제거 후 true, 없으면 false 를 반환합니다.
//
// 인풋(파라미터):
// - inventory: 배열(string[]). 플레이어 인벤토리.
//   → ["떡", "레몬", "칼"]
// - itemName: 문자열. 제거할 아이템 이름.
//   → "레몬"
//
// 리턴(반환값):
// - boolean(true/false). 제거 성공이면 true, 없으면 false.
//
// 참고: splice(i, 1) 은 인덱스 i 에서 1개를 제거합니다.
//       배열 자체가 바뀝니다.
//       같은 아이템이 여러 개면 첫 번째 것만 제거합니다.

function useItem(inventory, itemName) {
    // 기능: inventory 에서 itemName 을 찾아 제거. 성공 여부 반환.
    // input(parameter): inventory(배열), itemName(string)
    // return값 타입: boolean
    // 꼭 써야 하는 것:
    //   for 문으로 inventory 순회
    //   inventory[i] === itemName 이면 → splice(i, 1) 로 제거 → true 반환
    //   끝까지 못 찾으면 → false 반환
    for (let i = 0; i < inventory.length; i++) {
        if (inventory[i] === itemName) {
            inventory.splice(i, 1);
            return true;
        }
    }
    return false;
}

// ✅ 함수 완성 후 아래 주석을 풀어서 확인해보세요

// var inv = ["떡", "레몬", "칼"];
// console.log(useItem(inv, "레몬")); // true
// console.log(inv); // ["떡", "칼"] — 레몬이 사라짐
// console.log(useItem(inv, "폭탄")); // false
// console.log(inv); // ["떡", "칼"] — 변화 없음

// ============================================================
// Function 5: 한 턴 처리 (아래 완성된 예시를 읽고 참고하세요!)
// ============================================================
// checkMatch 와 useItem 을 조합해서 한 턴 전체를 처리합니다.
// 결과를 { success, message } 형태로 반환합니다.
//
// 인풋(파라미터):
// - part: 문자열. 현재 등장한 부위. 예: "입"
// - chosenItem: 문자열. 플레이어가 선택한 아이템. 예: "떡"
// - inventory: 배열. 플레이어 인벤토리.
// - parts: 배열. 부위 목록.
// - items: 배열. 아이템 목록.
//
// 리턴(반환값):
// - object. { success: true/false, message: "..." } 형태.
//   → 성공: { success: true,  message: "입에 떡 사용 성공!" }
//   → 실패: { success: false, message: "효과가 없었다..." }
//
// 참고: return { success: true, message: "..." } 처럼
//       중괄호 안에 여러 값을 한 번에 돌려줄 수 있습니다.

// ── 완성된 예시 (읽어보세요) ──────────────────────────────
function playTurnExample(part, chosenItem, inventory, parts, items) {
    let matched = checkMatch(part, chosenItem, parts, items); // 짝 확인
    if (matched) {
        useItem(inventory, chosenItem); // 인벤토리에서 제거
        return {
            success: true,
            message: part + "에 " + chosenItem + " 사용 성공!",
        };
    } else {
        return { success: false, message: "효과가 없었다..." };
    }
}
// ─────────────────────────────────────────────────────────

function playTurn(part, chosenItem, inventory, parts, items) {
    // 기능: checkMatch 로 짝 확인 → 맞으면 useItem 호출 → 결과 반환
    // input(parameter): part(string), chosenItem(string), inventory(배열), parts(배열), items(배열)
    // return값 타입: object { success: boolean, message: string }
    // 꼭 써야 하는 것:
    //   checkMatch(part, chosenItem, parts, items) 호출
    //   맞으면 → useItem(inventory, chosenItem) 호출 후 { success: true, message: ... } 반환
    //   틀리면 → { success: false, message: ... } 반환
    let matched = checkMatch(part, chosenItem, parts, items); // 짝 확인
    if (matched) {
        useItem(inventory, chosenItem); // 인벤토리에서 제거
        return {
            success: true,
            message: part + "에 " + chosenItem + " 사용 성공!",
        };
    } else {
        return { success: false, message: "효과가 없었다..." };
    }
}

// ✅ 함수 완성 후 아래 주석을 풀어서 확인해보세요

// var PARTS = ["입", "꼬리", "코", "눈"];
// var ITEMS = ["떡", "칼", "캣닙 담배", "레몬"];

// var inv2 = ["떡", "레몬"];
// console.log(playTurn("입", "떡", inv2, PARTS, ITEMS));  // { success: true, message: "입에 떡 사용 성공!" }
// console.log(inv2);                                       // ["레몬"] — 떡이 사라짐

// var inv3 = ["칼", "레몬"];
// console.log(playTurn("입", "칼", inv3, PARTS, ITEMS));  // { success: false, message: "효과가 없었다..." }
// console.log(inv3);                                       // ["칼", "레몬"] — 변화 없음
