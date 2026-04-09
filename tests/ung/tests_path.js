// ============================================
// 테스트 파일 (이 파일은 수정하지 마세요!)
// ============================================

function showResult(elementId, passed, messages) {
    var el = document.getElementById(elementId);
    if (passed) {
        el.className = "result pass";
        el.innerHTML = "✅ 통과!<br><br>" + messages.join("<br>");
    } else {
        el.className = "result fail";
        el.innerHTML = "❌ 아직이에요!<br><br>" + messages.join("<br>");
    }
}

function testLine(passed, situation, expected, actual, hint) {
    var line = (passed ? "✅ " : "❌ ") + situation;
    line += '<div class="sub">나와야 하는 결과: ' + expected + "</div>";
    if (!passed) {
        var display;
        if (actual === undefined) {
            display = "(아직 없음 — return을 써주세요!)";
        } else if (Array.isArray(actual)) {
            display = JSON.stringify(actual);
        } else if (actual !== null && typeof actual === "object") {
            display = JSON.stringify(actual);
        } else {
            display = JSON.stringify(actual);
        }
        line += '<div class="sub">내가 쓴 결과: ' + display + "</div>";
        if (hint) {
            line += '<div class="sub hint">💡 힌트: ' + hint + "</div>";
        }
    }
    return line;
}

function arraysEqual(a, b) {
    if (!Array.isArray(a) || !Array.isArray(b)) return false;
    if (a.length !== b.length) return false;
    for (var i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

function safeIncludes(arr, item) {
    if (!Array.isArray(arr)) return false;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === item) return true;
    }
    return false;
}

var PARTS = ["머리", "몸통", "꼬리", "발"];
var ITEMS = ["검", "방패", "떡", "장화"];

// ============================================
// Function 1 테스트: findPartIndex
// ============================================
(function testFindPartIndex() {
    var messages = [];
    var passed = true;

    var t1 = findPartIndex(PARTS, "머리");
    var p1 = t1 === 0;
    if (!p1) passed = false;
    messages.push(
        testLine(
            p1,
            '🔍 findPartIndex(PARTS, "머리") — 인덱스 0',
            "0",
            t1,
            "for문이 i=0부터 시작하는지 확인하세요. parts[i] === targetPart 일 때 i를 return해야 합니다.",
        ),
    );

    var t2 = findPartIndex(PARTS, "꼬리");
    var p2 = t2 === 2;
    if (!p2) passed = false;
    messages.push(
        testLine(
            p2,
            '🔍 findPartIndex(PARTS, "꼬리") — 인덱스 2',
            "2",
            t2,
            "return i 를 하고 있는지 확인하세요. parts[i] (값) 가 아니라 i (인덱스) 를 반환해야 합니다.",
        ),
    );

    var t3 = findPartIndex(PARTS, "발");
    var p3 = t3 === 3;
    if (!p3) passed = false;
    messages.push(
        testLine(
            p3,
            '🔍 findPartIndex(PARTS, "발") — 인덱스 3',
            "3",
            t3,
            "for문이 parts.length 미만까지 도는지 확인하세요.",
        ),
    );

    var t4 = findPartIndex(PARTS, "날개");
    var p4 = t4 === -1;
    if (!p4) passed = false;
    messages.push(
        testLine(
            p4,
            '🔍 findPartIndex(PARTS, "날개") — 없으면 -1',
            "-1",
            t4,
            "for문이 끝난 뒤(바깥)에 return -1; 이 있어야 합니다. 들여쓰기를 확인하세요.",
        ),
    );

    var t5 = findPartIndex(PARTS, "몸통");
    var p5 = typeof t5 === "number";
    if (!p5) passed = false;
    messages.push(
        testLine(
            p5,
            "🔍 반환값이 숫자(number)인지",
            '"number"',
            typeof t5,
            "return parts[i] 처럼 값을 돌려보내지 않았는지 확인하세요. return i 로 인덱스(숫자)를 반환해야 합니다.",
        ),
    );

    var origParts = PARTS.slice();
    findPartIndex(PARTS, "머리");
    var p6 = arraysEqual(PARTS, origParts);
    if (!p6) passed = false;
    messages.push(
        testLine(
            p6,
            "🛡️ 원본 PARTS 배열이 바뀌지 않는지 (부작용 검사)",
            "원본 유지",
            p6 ? "원본 유지" : "원본 변경됨!",
            "PARTS는 읽기만 해야 합니다. splice나 push를 쓰지 않았는지 확인하세요.",
        ),
    );

    showResult("result1", passed, messages);
})();

// ============================================
// Function 2 테스트: generateRoute
// ============================================
(function testGenerateRoute() {
    var messages = [];
    var passed = true;

    var t1 = generateRoute(PARTS, 5);
    var p1 = Array.isArray(t1);
    if (!p1) passed = false;
    messages.push(
        testLine(
            p1,
            "🎲 반환값이 배열인지",
            "배열",
            t1,
            "let route = [] 로 빈 배열을 만들고 push한 뒤 return route 해야 합니다.",
        ),
    );

    var t2 = generateRoute(PARTS, 5);
    var p2 = Array.isArray(t2) && t2.length === 5;
    if (!p2) passed = false;
    messages.push(
        testLine(
            p2,
            "🎲 n=5 요청 → 배열 길이 5",
            "길이: 5",
            Array.isArray(t2) ? "길이: " + t2.length : t2,
            "for (let i = 0; i < n; i++) 에서 n이 맞는지 확인하세요.",
        ),
    );

    var t3 = generateRoute(PARTS, 1);
    var p3 = Array.isArray(t3) && t3.length === 1;
    if (!p3) passed = false;
    messages.push(
        testLine(
            p3,
            "🎲 n=1 → 길이 1",
            "길이: 1",
            Array.isArray(t3) ? "길이: " + t3.length : t3,
            "for문이 n번 정확히 도는지 확인하세요.",
        ),
    );

    var t4 = generateRoute(PARTS, 0);
    var p4 = arraysEqual(t4, []);
    if (!p4) passed = false;
    messages.push(
        testLine(
            p4,
            "🎲 n=0 → 빈 배열 (경계값)",
            "[]",
            t4,
            "n이 0이면 for문이 한 번도 안 돌아서 빈 배열이 반환됩니다. 별도 처리 없이 그냥 return route 하면 됩니다.",
        ),
    );

    var allValid = true;
    var invalidItem = null;
    for (var s = 0; s < 50; s++) {
        var route = generateRoute(PARTS, 6);
        if (Array.isArray(route)) {
            for (var j = 0; j < route.length; j++) {
                if (!safeIncludes(PARTS, route[j])) {
                    allValid = false;
                    invalidItem = route[j];
                }
            }
        }
    }
    var p5 = allValid;
    if (!p5) passed = false;
    messages.push(
        testLine(
            p5,
            "🎲 [스트레스] 50회 × 6칸 경로, 전부 유효한 부위인지",
            "전부 유효",
            allValid ? "전부 유효" : "유효하지 않은 값: " + invalidItem,
            "Math.floor(Math.random() * parts.length) 로 인덱스를 구해야 합니다. 고정 숫자나 +1을 하면 범위를 벗어납니다.",
        ),
    );

    var seen = {};
    for (var r = 0; r < 50; r++) {
        var rr = generateRoute(PARTS, 1);
        if (Array.isArray(rr) && rr.length > 0) seen[rr[0]] = true;
    }
    var kinds = Object.keys(seen).length;
    var p6 = kinds >= 2;
    if (!p6) passed = false;
    messages.push(
        testLine(
            p6,
            "🎲 [스트레스] 50번 생성 → 최소 2종류 이상 (랜덤 확인)",
            "2종류 이상",
            kinds + "종류: " + Object.keys(seen).join(", "),
            "let idx = Math.floor(Math.random() * parts.length) 가 for문 안에 있어야 합니다. 밖에서 한 번 계산하면 매번 같은 결과가 나옵니다.",
        ),
    );

    var origParts = PARTS.slice();
    generateRoute(PARTS, 10);
    var p7 = arraysEqual(PARTS, origParts);
    if (!p7) passed = false;
    messages.push(
        testLine(
            p7,
            "🛡️ 원본 PARTS 배열이 바뀌지 않는지 (부작용 검사)",
            "원본 유지",
            p7 ? "원본 유지" : "원본 변경됨!",
            "parts.splice() 를 쓰지 말고, route.push(parts[idx]) 만 해야 합니다. 같은 부위가 반복 뽑혀도 됩니다.",
        ),
    );

    showResult("result2", passed, messages);
})();

// ============================================
// Function 3 테스트: checkMatch
// ============================================
(function testCheckMatch() {
    var messages = [];
    var passed = true;

    var t1 = checkMatch("머리", "검", PARTS, ITEMS);
    var p1 = t1 === true;
    if (!p1) passed = false;
    messages.push(
        testLine(
            p1,
            '🎯 checkMatch("머리", "검", PARTS, ITEMS) — 올바른 짝 → true',
            "true",
            t1,
            "findPartIndex(parts, part) 로 인덱스를 찾고 items[인덱스] === item 일 때 return true 해야 합니다.",
        ),
    );

    var t2 = checkMatch("꼬리", "떡", PARTS, ITEMS);
    var p2 = t2 === true;
    if (!p2) passed = false;
    messages.push(
        testLine(
            p2,
            '🎯 checkMatch("꼬리", "떡", PARTS, ITEMS) → true',
            "true",
            t2,
            "findPartIndex로 찾은 인덱스로 items[인덱스]를 확인하고 있는지 확인하세요.",
        ),
    );

    var t3 = checkMatch("머리", "방패", PARTS, ITEMS);
    var p3 = t3 === false;
    if (!p3) passed = false;
    messages.push(
        testLine(
            p3,
            '🎯 checkMatch("머리", "방패", PARTS, ITEMS) — 부위는 있지만 아이템 틀림 → false',
            "false",
            t3,
            "findPartIndex로 인덱스를 찾은 뒤, items[인덱스] === item 이 아니면 false를 반환해야 합니다.",
        ),
    );

    var t4 = checkMatch("날개", "검", PARTS, ITEMS);
    var p4 = t4 === false;
    if (!p4) passed = false;
    messages.push(
        testLine(
            p4,
            '🎯 checkMatch("날개", "검", PARTS, ITEMS) — 없는 부위 → false',
            "false",
            t4,
            "findPartIndex가 -1을 반환하면 false를 반환해야 합니다.",
        ),
    );

    var t5 = checkMatch("몸통", "방패", PARTS, ITEMS);
    var p5 = typeof t5 === "boolean";
    if (!p5) passed = false;
    messages.push(
        testLine(
            p5,
            "🎯 반환값이 boolean인지",
            '"boolean"',
            typeof t5,
            "return 1 / return 0 이 아니라 return true / return false 를 써야 합니다.",
        ),
    );

    var origPartsLen = PARTS.length;
    var origItemsLen = ITEMS.length;
    checkMatch("머리", "검", PARTS, ITEMS);
    var p6 = PARTS.length === origPartsLen && ITEMS.length === origItemsLen;
    if (!p6) passed = false;
    messages.push(
        testLine(
            p6,
            "🛡️ 원본 PARTS/ITEMS 배열이 바뀌지 않는지 (부작용 검사)",
            "길이 유지",
            "PARTS: " + PARTS.length + ", ITEMS: " + ITEMS.length,
            "PARTS, ITEMS는 읽기만 해야 합니다.",
        ),
    );

    showResult("result3", passed, messages);
})();

// ============================================
// Function 4 테스트: useItem
// ============================================
(function testUseItem() {
    var messages = [];
    var passed = true;

    var inv1 = ["검", "방패", "떡"];
    useItem(inv1, "방패");
    var p1 = arraysEqual(inv1, ["검", "떡"]);
    if (!p1) passed = false;
    messages.push(
        testLine(
            p1,
            '🎒 "방패" 사용 후 인벤토리에서 제거되는지',
            '["검", "떡"]',
            inv1,
            "inventory.splice(i, 1) 을 찾은 위치(i)에서 호출해야 합니다.",
        ),
    );

    var inv2 = ["검", "방패", "떡"];
    useItem(inv2, "검");
    var p2 = arraysEqual(inv2, ["방패", "떡"]);
    if (!p2) passed = false;
    messages.push(
        testLine(
            p2,
            '🎒 맨 앞 "검" 제거 — 나머지가 앞으로 밀리는지',
            '["방패", "떡"]',
            inv2,
            "splice는 그 자리를 완전히 없애고 뒤 항목을 앞으로 당겨줍니다. inventory[i] = undefined 처럼 값만 지우면 안 됩니다.",
        ),
    );

    var inv3 = ["검", "방패", "떡"];
    useItem(inv3, "떡");
    var p3 = arraysEqual(inv3, ["검", "방패"]);
    if (!p3) passed = false;
    messages.push(
        testLine(
            p3,
            '🎒 맨 뒤 "떡" 제거',
            '["검", "방패"]',
            inv3,
            "for문이 배열 끝까지 도는지 확인하세요.",
        ),
    );

    var inv4 = ["검", "방패"];
    useItem(inv4, "장화");
    var p4 = arraysEqual(inv4, ["검", "방패"]);
    if (!p4) passed = false;
    messages.push(
        testLine(
            p4,
            '🎒 없는 아이템 "장화" 사용 시도 → 인벤토리 변화 없는지',
            '["검", "방패"] 그대로',
            inv4,
            "splice는 아이템을 찾았을 때(if문 안)에서만 호출해야 합니다. 못 찾으면 아무것도 하지 않으면 됩니다.",
        ),
    );

    var inv5 = ["검", "떡", "검"];
    useItem(inv5, "검");
    var p5 = arraysEqual(inv5, ["떡", "검"]);
    if (!p5) passed = false;
    messages.push(
        testLine(
            p5,
            '🎒 "검"이 2개일 때 첫 번째만 제거되는지',
            '["떡", "검"]',
            inv5,
            "splice 후 바로 return 하면 첫 번째만 제거하고 멈춥니다. splice와 return이 같은 if 블록 안에 있는지 확인하세요.",
        ),
    );

    var inv6 = [];
    useItem(inv6, "검");
    var p6 = arraysEqual(inv6, []);
    if (!p6) passed = false;
    messages.push(
        testLine(
            p6,
            "🎒 빈 인벤토리에 useItem 해도 오류 없는지 (경계값)",
            "[] 그대로",
            inv6,
            "inventory.length가 0이면 for문이 안 돌아서 자연스럽게 통과합니다. 별도 예외처리 필요 없습니다.",
        ),
    );

    var inv7 = ["검", "방패", "떡", "장화"];
    useItem(inv7, "검");
    useItem(inv7, "떡");
    var p7 = arraysEqual(inv7, ["방패", "장화"]);
    if (!p7) passed = false;
    messages.push(
        testLine(
            p7,
            "🎒 검 → 떡 연속 사용 후 남은 것",
            '["방패", "장화"]',
            inv7,
            "두 번 연속 호출해도 각각 정상 동작해야 합니다. 첫 번째 호출 이후 배열 상태가 올바른지 확인하세요.",
        ),
    );

    showResult("result4", passed, messages);
})();

// ============================================
// Function 5 테스트: playTurn
// ============================================
(function testPlayTurn() {
    var messages = [];
    var passed = true;

    function freshInv() {
        return ["검", "방패", "떡", "장화"];
    }

    var inv1 = freshInv();
    var t1 = playTurn("머리", "검", inv1, PARTS, ITEMS);
    var p1 = t1 !== null && typeof t1 === "object" && !Array.isArray(t1);
    if (!p1) passed = false;
    messages.push(
        testLine(
            p1,
            "⚔️ 반환값이 객체({ success, message })인지",
            "객체",
            JSON.stringify(t1),
            'return { success: true, message: "..." } 처럼 객체를 반환해야 합니다. 문자열이나 true/false만 반환하면 안 됩니다.',
        ),
    );

    var inv2 = freshInv();
    var t2 = playTurn("머리", "검", inv2, PARTS, ITEMS);
    var p2 = t2 !== null && typeof t2 === "object" && "success" in t2;
    if (!p2) passed = false;
    messages.push(
        testLine(
            p2,
            '⚔️ 반환 객체에 "success" 필드가 있는지',
            '"success" 포함',
            JSON.stringify(t2),
            "반환 객체의 키 이름이 정확히 success 인지 확인하세요. 오타(succes, succeed 등)가 없어야 합니다.",
        ),
    );

    var p3 = t2 !== null && typeof t2 === "object" && "message" in t2;
    if (!p3) passed = false;
    messages.push(
        testLine(
            p3,
            '⚔️ 반환 객체에 "message" 필드가 있는지',
            '"message" 포함',
            JSON.stringify(t2),
            "반환 객체의 키 이름이 정확히 message 인지 확인하세요.",
        ),
    );

    var inv4 = freshInv();
    var t4 = playTurn("머리", "검", inv4, PARTS, ITEMS);
    var p4 = t4 && t4.success === true;
    if (!p4) passed = false;
    messages.push(
        testLine(
            p4,
            '⚔️ 올바른 짝("머리" + "검") → success: true',
            "success: true",
            t4 ? JSON.stringify(t4) : t4,
            "checkMatch(part, chosenItem, parts, items) 가 true를 반환할 때 { success: true, ... } 를 반환해야 합니다.",
        ),
    );

    var p5 = !safeIncludes(inv4, "검");
    if (!p5) passed = false;
    messages.push(
        testLine(
            p5,
            '⚔️ 성공 후 "검"이 인벤토리에서 사라지는지',
            '"검" 제거됨',
            JSON.stringify(inv4),
            "성공 분기 안에서 useItem(inventory, chosenItem) 을 호출해야 합니다.",
        ),
    );

    var inv6 = freshInv();
    var t6 = playTurn("머리", "떡", inv6, PARTS, ITEMS);
    var p6 = t6 && t6.success === false;
    if (!p6) passed = false;
    messages.push(
        testLine(
            p6,
            '⚔️ 틀린 짝("머리" + "떡") → success: false',
            "success: false",
            t6 ? JSON.stringify(t6) : t6,
            "checkMatch가 false를 반환할 때 { success: false, ... } 를 반환하는 분기가 있는지 확인하세요.",
        ),
    );

    var p7 = arraysEqual(inv6, freshInv());
    if (!p7) passed = false;
    messages.push(
        testLine(
            p7,
            "⚔️ 실패 시 인벤토리가 바뀌지 않는지 (부작용 검사)",
            JSON.stringify(freshInv()),
            inv6,
            "useItem은 성공 분기에서만 호출해야 합니다. checkMatch가 false일 때도 useItem을 호출하고 있지 않은지 확인하세요.",
        ),
    );

    var inv8 = freshInv();
    var t8 = playTurn("꼬리", "떡", inv8, PARTS, ITEMS);
    var p8 = t8 && typeof t8.message === "string";
    if (!p8) passed = false;
    messages.push(
        testLine(
            p8,
            "⚔️ message 필드가 문자열(string)인지",
            '"string"',
            t8 ? typeof t8.message : t8,
            'message 값이 문자열인지 확인하세요. 숫자나 boolean이 아닌 "..." 형태의 문자열이어야 합니다.',
        ),
    );

    showResult("result5", passed, messages);
})();

console.log("=== path.js 테스트 완료! 브라우저 화면에서 결과를 확인하세요 ===");
