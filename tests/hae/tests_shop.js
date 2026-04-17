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

// ============================================
// 테스트용 데이터
// ============================================
var TEST_NAMES = ["떡", "검", "방패", "장화"];
var TEST_PRICES = [100, 500, 300, 200];
var TEST_STOCK = [3, 1, 0, 5];

// ============================================
// Function 0 테스트: findItemIndex
// ============================================
(function testFindItemIndex() {
    var messages = [];
    var passed = true;

    var t1 = findItemIndex(SHOP_ITEMS, "감자");
    var p1 = t1 === 1;
    if (!p1) passed = false;
    messages.push(
        testLine(
            p1,
            '🔍 findItemIndex(SHOP_ITEMS, "감자") — 인덱스 1',
            "1",
            t1,
            "for문이 i=0부터 시작하는지 확인하세요. names[i] === targetName 일 때 i를 return해야 합니다.",
        ),
    );

    var t2 = findItemIndex(SHOP_ITEMS, "진라면(순한맛)");
    var p2 = t2 === 0;
    if (!p2) passed = false;
    messages.push(
        testLine(
            p2,
            '🔍 findItemIndex(SHOP_ITEMS, "진라면(순한맛)") — 인덱스 0',
            "0",
            t2,
            "return i 를 하고 있는지 확인하세요. names[i] (값) 가 아니라 i (인덱스) 를 반환해야 합니다.",
        ),
    );

    var t3 = findItemIndex(SHOP_ITEMS, "아아");
    var p3 = t3 === 9;
    if (!p3) passed = false;
    messages.push(
        testLine(
            p3,
            '🔍 findItemIndex(SHOP_ITEMS, "아아") — 마지막 인덱스 9',
            "9",
            t3,
            "for문이 names.length 미만까지 도는지 확인하세요.",
        ),
    );

    var t4 = findItemIndex(SHOP_ITEMS, "치킨");
    var p4 = t4 === -1;
    if (!p4) passed = false;
    messages.push(
        testLine(
            p4,
            '🔍 findItemIndex(SHOP_ITEMS, "치킨") — 없으면 -1',
            "-1",
            t4,
            "for문이 끝난 뒤(바깥)에 return -1; 이 있어야 합니다. 들여쓰기를 확인하세요.",
        ),
    );

    var t5 = findItemIndex(SHOP_ITEMS, "두부");
    var p5 = typeof t5 === "number";
    if (!p5) passed = false;
    messages.push(
        testLine(
            p5,
            "🔍 반환값이 숫자(number)인지",
            '"number"',
            typeof t5,
            "return names[i] 처럼 값을 돌려보내지 않았는지 확인하세요. return i 로 인덱스(숫자)를 반환해야 합니다.",
        ),
    );

    var origLen = SHOP_ITEMS.length;
    findItemIndex(SHOP_ITEMS, "감자");
    var p6 = SHOP_ITEMS.length === origLen;
    if (!p6) passed = false;
    messages.push(
        testLine(
            p6,
            "🛡️ 원본 SHOP_ITEMS 배열이 바뀌지 않는지 (부작용 검사)",
            "길이 " + origLen + " 유지",
            "length: " + SHOP_ITEMS.length,
            "SHOP_ITEMS는 읽기만 해야 합니다. splice나 push를 쓰지 않았는지 확인하세요.",
        ),
    );

    showResult("result0", passed, messages);
})();

// ============================================
// Function 1 테스트: getStockLabel
// ============================================
(function testGetStockLabel() {
    var messages = [];
    var passed = true;

    var t1 = getStockLabel(3);
    var p1 = t1 === "(재고: 3개)";
    if (!p1) passed = false;
    messages.push(
        testLine(
            p1,
            '🏷️ getStockLabel(3) → "(재고: 3개)"',
            '"(재고: 3개)"',
            t1,
            '"(재고: " + stock + "개)" 형태로 stock 변수를 끼워넣어야 합니다. 숫자를 직접 쓰면 안 됩니다.',
        ),
    );

    var t2 = getStockLabel(1);
    var p2 = t2 === "(재고: 1개)";
    if (!p2) passed = false;
    messages.push(
        testLine(
            p2,
            '🏷️ getStockLabel(1) → "(재고: 1개)"',
            '"(재고: 1개)"',
            t2,
            '"(재고: " + stock + "개)" 에서 stock 변수를 확인하세요.',
        ),
    );

    var t3 = getStockLabel(0);
    var p3 = t3 === "(품절)";
    if (!p3) passed = false;
    messages.push(
        testLine(
            p3,
            '🏷️ getStockLabel(0) → "(품절)"',
            '"(품절)"',
            t3,
            'if (stock === 0) return "(품절)"; 을 먼저 처리하세요. 0일 때와 아닐 때를 if/else로 나눠야 합니다.',
        ),
    );

    var t4 = getStockLabel(99);
    var p4 = t4 === "(재고: 99개)";
    if (!p4) passed = false;
    messages.push(
        testLine(
            p4,
            '🏷️ getStockLabel(99) → "(재고: 99개)"',
            '"(재고: 99개)"',
            t4,
            '"(재고: " + stock + "개)" 에서 괄호, 콜론, 공백 위치를 정확히 확인하세요.',
        ),
    );

    var p5 = typeof getStockLabel(5) === "string";
    if (!p5) passed = false;
    messages.push(
        testLine(
            p5,
            "🏷️ 반환값이 문자열(string)인지",
            '"string"',
            typeof getStockLabel(5),
            "return 키워드가 있는지, 문자열을 반환하고 있는지 확인하세요.",
        ),
    );

    showResult("result1", passed, messages);
})();

// ============================================
// Function 2 테스트: formatShopLine
// ============================================
(function testFormatShopLine() {
    var messages = [];
    var passed = true;

    var t1 = formatShopLine(1, "떡", 100, "(재고: 3개)");
    var p1 = t1 === "1. 떡 — 100원 (재고: 3개)";
    if (!p1) passed = false;
    messages.push(
        testLine(
            p1,
            '📝 formatShopLine(1, "떡", 100, "(재고: 3개)")',
            '"1. 떡 — 100원 (재고: 3개)"',
            t1,
            'number + ". " + name + " — " + price + "원 " + stockLabel 형태인지 확인하세요. 줄표(—)와 공백 위치를 주의하세요.',
        ),
    );

    var t2 = formatShopLine(2, "방패", 300, "(품절)");
    var p2 = t2 === "2. 방패 — 300원 (품절)";
    if (!p2) passed = false;
    messages.push(
        testLine(
            p2,
            '📝 formatShopLine(2, "방패", 300, "(품절)") — 품절',
            '"2. 방패 — 300원 (품절)"',
            t2,
            "stockLabel 파라미터를 그대로 이어붙이면 됩니다. getStockLabel은 이 함수 안에서 호출하지 않습니다.",
        ),
    );

    var t3 = formatShopLine(5, "장화", 200, "(재고: 1개)");
    var p3 = typeof t3 === "string" && t3.indexOf("5.") !== -1;
    if (!p3) passed = false;
    messages.push(
        testLine(
            p3,
            "📝 번호(5.)가 포함되는지",
            '"5." 포함',
            typeof t3 === "string" ? t3 : t3,
            'number 변수를 그대로 쓰고 뒤에 ". " 을 붙여야 합니다.',
        ),
    );

    var t4 = formatShopLine(1, "검", 500, "(재고: 1개)");
    var p4 = typeof t4 === "string" && t4.indexOf("500원") !== -1;
    if (!p4) passed = false;
    messages.push(
        testLine(
            p4,
            '📝 가격 뒤에 "원"이 붙는지',
            '"500원" 포함',
            t4,
            'price + "원" 으로 붙여야 합니다. 숫자만 쓰면 "원" 이 빠집니다.',
        ),
    );

    var t5 = formatShopLine(3, "떡볶이", 150, "(재고: 7개)");
    var p5 = typeof t5 === "string" && t5.indexOf("(재고: 7개)") !== -1;
    if (!p5) passed = false;
    messages.push(
        testLine(
            p5,
            "📝 stockLabel이 그대로 포함되는지",
            '"(재고: 7개)" 포함',
            t5,
            "stockLabel 파라미터를 그대로 이어붙이면 됩니다.",
        ),
    );

    var p6 = typeof formatShopLine(1, "A", 100, "(재고: 1개)") === "string";
    if (!p6) passed = false;
    messages.push(
        testLine(
            p6,
            "📝 반환값이 문자열(string)인지",
            '"string"',
            typeof formatShopLine(1, "A", 100, "(재고: 1개)"),
            "return 키워드로 문자열을 반환하고 있는지 확인하세요.",
        ),
    );

    showResult("result2", passed, messages);
})();

// ============================================
// Function 3 테스트: showShopList
// ============================================
(function testShowShopList() {
    var messages = [];
    var passed = true;

    var t1 = showShopList(TEST_NAMES, TEST_PRICES, TEST_STOCK);
    var p1 = typeof t1 === "string";
    if (!p1) passed = false;
    messages.push(
        testLine(
            p1,
            "📜 반환값이 문자열(string)인지",
            '"string"',
            typeof t1,
            'let result = "" 로 빈 문자열을 만들고 이어붙인 뒤 return result 해야 합니다.',
        ),
    );

    var p2 =
        typeof t1 === "string" &&
        t1.indexOf("떡") !== -1 &&
        t1.indexOf("검") !== -1 &&
        t1.indexOf("방패") !== -1 &&
        t1.indexOf("장화") !== -1;
    if (!p2) passed = false;
    messages.push(
        testLine(
            p2,
            "📜 4개 상품(떡, 검, 방패, 장화) 모두 포함되는지",
            "전부 포함",
            p2 ? "전부 포함" : t1,
            "for문이 names.length번 도는지 확인하세요. getStockLabel(stock[i]) 와 formatShopLine(i+1, names[i], prices[i], stockLabel) 을 호출해야 합니다.",
        ),
    );

    var p3 =
        typeof t1 === "string" &&
        t1.indexOf("1.") !== -1 &&
        t1.indexOf("0.") === -1;
    if (!p3) passed = false;
    messages.push(
        testLine(
            p3,
            "📜 번호가 0이 아니라 1부터 시작하는지",
            '"1." 있고 "0." 없음',
            typeof t1 === "string"
                ? t1.indexOf("1.") !== -1
                    ? '"1." 있음'
                    : '"1." 없음'
                : t1,
            "formatShopLine을 호출할 때 첫 번째 인자를 i가 아니라 i+1 로 넘겨야 합니다.",
        ),
    );

    var p4 = typeof t1 === "string" && t1.indexOf("\n") !== -1;
    if (!p4) passed = false;
    messages.push(
        testLine(
            p4,
            "📜 줄바꿈(\\n)으로 구분되는지",
            '"\\n" 포함',
            typeof t1 === "string"
                ? t1.indexOf("\n") !== -1
                    ? "\\n 있음"
                    : "\\n 없음"
                : t1,
            "첫 번째 줄은 \\n 없이, 나머지는 앞에 \\n 붙여서 이어붙이세요.",
        ),
    );

    var p5 = typeof t1 === "string" && t1.indexOf("품절") !== -1;
    if (!p5) passed = false;
    messages.push(
        testLine(
            p5,
            '📜 재고 0인 "방패"에 품절 표시가 나오는지',
            '"품절" 포함',
            typeof t1 === "string"
                ? t1.indexOf("품절") !== -1
                    ? '"품절" 있음'
                    : '"품절" 없음'
                : t1,
            "getStockLabel(stock[i]) 을 호출하고 그 결과를 formatShopLine의 네 번째 인자로 넘기고 있는지 확인하세요.",
        ),
    );

    var origNamesLen = TEST_NAMES.length;
    showShopList(TEST_NAMES, TEST_PRICES, TEST_STOCK);
    var p6 = TEST_NAMES.length === origNamesLen;
    if (!p6) passed = false;
    messages.push(
        testLine(
            p6,
            "🛡️ 원본 배열이 바뀌지 않는지 (부작용 검사)",
            "길이 " + origNamesLen + " 유지",
            "length: " + TEST_NAMES.length,
            "배열은 읽기만 해야 합니다. push나 splice를 쓰지 않았는지 확인하세요.",
        ),
    );

    showResult("result3", passed, messages);
})();

// ============================================
// Function 4 테스트: isAffordable
// ============================================
(function testIsAffordable() {
    var messages = [];
    var passed = true;

    var t1 = isAffordable(9000, 10000);
    var p1 = t1 === true;
    if (!p1) passed = false;
    messages.push(
        testLine(
            p1,
            "💰 isAffordable(9000, 10000) — 예산이 가격보다 많음 → true",
            "true",
            t1,
            "return price <= budget; 또는 return budget >= price; 형태인지 확인하세요.",
        ),
    );

    var t2 = isAffordable(9000, 9000);
    var p2 = t2 === true;
    if (!p2) passed = false;
    messages.push(
        testLine(
            p2,
            "💰 isAffordable(9000, 9000) — 딱 맞음 → true (경계값)",
            "true",
            t2,
            "<= (작거나 같음) 또는 >= (크거나 같음) 를 써야 합니다. < 만 쓰면 딱 맞을 때 false가 나옵니다.",
        ),
    );

    var t3 = isAffordable(9000, 8000);
    var p3 = t3 === false;
    if (!p3) passed = false;
    messages.push(
        testLine(
            p3,
            "💰 isAffordable(9000, 8000) — 예산 부족 → false",
            "false",
            t3,
            "price와 budget 위치가 바뀌지 않았는지 확인하세요. isAffordable(price, budget) 에서 price가 첫 번째, budget이 두 번째입니다.",
        ),
    );

    var t4 = isAffordable(100, 0);
    var p4 = t4 === false;
    if (!p4) passed = false;
    messages.push(
        testLine(
            p4,
            "💰 isAffordable(100, 0) — 예산 0 → false (경계값)",
            "false",
            t4,
            "100 <= 0 은 false입니다. 별도 처리 없이 return price <= budget; 만 해도 됩니다.",
        ),
    );

    var p5 = typeof isAffordable(100, 1000) === "boolean";
    if (!p5) passed = false;
    messages.push(
        testLine(
            p5,
            "💰 반환값이 boolean인지",
            '"boolean"',
            typeof isAffordable(100, 1000),
            "return price <= budget; 비교 연산 자체가 true/false를 반환합니다. 숫자나 문자열을 반환하지 않았는지 확인하세요.",
        ),
    );

    showResult("result4", passed, messages);
})();

// ============================================
// Function 5 테스트: buyItem
// ============================================
(function testBuyItem() {
    var messages = [];
    var passed = true;

    // 성공 케이스: 진라면(순한맛) 9000원, 재고 10, 예산 10000
    var testNames1 = ["진라면(순한맛)", "감자"];
    var testPrices1 = [9000, 500];
    var testStock1 = [10, 30];
    var t1 = buyItem(
        "진라면(순한맛)",
        10000,
        testNames1,
        testPrices1,
        testStock1,
    );
    var p1 = typeof t1 === "string" && t1.indexOf("구매 완료") !== -1;
    if (!p1) passed = false;
    messages.push(
        testLine(
            p1,
            '🛍️ 구매 성공 시 "구매 완료" 포함 메시지 반환',
            '"구매 완료" 포함',
            t1,
            '성공 분기에서 name + " 구매 완료! (" + prices[인덱스] + "원)" 을 반환해야 합니다.',
        ),
    );

    var p2 = testStock1[0] === 9;
    if (!p2) passed = false;
    messages.push(
        testLine(
            p2,
            "🛍️ 구매 후 재고가 1 감소하는지 (10 → 9)",
            "stock: 9",
            "stock: " + testStock1[0],
            "구매 성공 분기 안에서 stock[인덱스]-- 를 해야 합니다.",
        ),
    );

    // 품절 케이스
    var testNames2 = ["참치마요삼각김밥"];
    var testPrices2 = [12000];
    var testStock2 = [0];
    var t3 = buyItem(
        "참치마요삼각김밥",
        50000,
        testNames2,
        testPrices2,
        testStock2,
    );
    var p3 = typeof t3 === "string" && t3.indexOf("품절") !== -1;
    if (!p3) passed = false;
    messages.push(
        testLine(
            p3,
            '🛍️ 품절 상품 구매 시도 → "품절" 메시지',
            '"품절" 포함',
            t3,
            'stock[인덱스] === 0 이면 "품절이에요, 나중에 다시오세요!" 를 return 하세요.',
        ),
    );

    // 예산 부족 케이스
    var testNames3 = ["두부"];
    var testPrices3 = [180000];
    var testStock3 = [7];
    var t5 = buyItem("두부", 5000, testNames3, testPrices3, testStock3);
    var p5 = typeof t5 === "string" && t5.indexOf("예산") !== -1;
    if (!p5) passed = false;
    messages.push(
        testLine(
            p5,
            '🛍️ 예산 부족 시 "예산" 포함 메시지',
            '"예산" 포함',
            t5,
            'isAffordable(prices[인덱스], budget) 가 false 이면 "예산이 부족합니다" 를 return 하세요.',
        ),
    );

    var p5b = testStock3[0] === 7;
    if (!p5b) passed = false;
    messages.push(
        testLine(
            p5b,
            "🛍️ 예산 부족 시 재고 변화 없는지",
            "stock: 7",
            "stock: " + testStock3[0],
            "예산 부족으로 return하면 그 아래 stock[인덱스]-- 가 실행되지 않습니다. return 위치를 확인하세요.",
        ),
    );

    // 없는 아이템 케이스
    var testNames4 = ["감자"];
    var testPrices4 = [500];
    var testStock4 = [30];
    var t6 = buyItem("치킨", 99999, testNames4, testPrices4, testStock4);
    var p6 = typeof t6 === "string" && t6.indexOf("없는 아이템") !== -1;
    if (!p6) passed = false;
    messages.push(
        testLine(
            p6,
            '🛍️ 없는 아이템 → "없는 아이템" 메시지',
            '"없는 아이템" 포함',
            t6,
            'findItemIndex가 -1을 반환하면 "없는 아이템입니다" 를 return 하세요.',
        ),
    );

    showResult("result5", passed, messages);
})();

// ============================================
// Function 6 테스트: calcTotal
// ============================================
(function testCalcTotal() {
    var messages = [];
    var passed = true;

    var t1 = calcTotal(["감자", "팬돌이 음료"], SHOP_ITEMS, SHOP_PRICES);
    var p1 = t1 === 600;
    if (!p1) passed = false;
    messages.push(
        testLine(
            p1,
            '🧮 calcTotal(["감자", "팬돌이 음료"], ...) → 600',
            "600",
            t1,
            "let total = 0; 후 for문에서 findItemIndex(names, cart[i]) 로 인덱스를 찾고 total += prices[인덱스]; 를 반복하세요.",
        ),
    );

    var t2 = calcTotal(["아아"], SHOP_ITEMS, SHOP_PRICES);
    var p2 = t2 === 10000;
    if (!p2) passed = false;
    messages.push(
        testLine(
            p2,
            '🧮 calcTotal(["아아"], ...) → 10000',
            "10000",
            t2,
            "findItemIndex(names, cart[i]) 로 인덱스를 찾고 prices[인덱스]를 더하고 있는지 확인하세요.",
        ),
    );

    var t3 = calcTotal([], SHOP_ITEMS, SHOP_PRICES);
    var p3 = t3 === 0;
    if (!p3) passed = false;
    messages.push(
        testLine(
            p3,
            "🧮 calcTotal([], ...) → 0 (경계값)",
            "0",
            t3,
            "let total = 0; 으로 시작하면 빈 배열일 때 for문이 안 돌아서 0이 반환됩니다. 별도 처리 불필요합니다.",
        ),
    );

    var t4 = calcTotal(["감자", "아아", "바나나우유"], SHOP_ITEMS, SHOP_PRICES);
    var p4 = t4 === 20500;
    if (!p4) passed = false;
    messages.push(
        testLine(
            p4,
            '🧮 calcTotal(["감자", "아아", "바나나우유"], ...) → 20500',
            "20500",
            t4,
            "for문이 cart.length 번 전부 도는지 확인하세요.",
        ),
    );

    var p5 = typeof calcTotal(["감자"], SHOP_ITEMS, SHOP_PRICES) === "number";
    if (!p5) passed = false;
    messages.push(
        testLine(
            p5,
            "🧮 반환값이 숫자(number)인지",
            '"number"',
            typeof calcTotal(["감자"], SHOP_ITEMS, SHOP_PRICES),
            "return total; 에서 total이 숫자인지 확인하세요. 문자열로 변환되지 않았는지 확인하세요.",
        ),
    );

    var origCartLen = 2;
    var origCart = ["감자", "아아"];
    calcTotal(origCart, SHOP_ITEMS, SHOP_PRICES);
    var p6 = origCart.length === origCartLen;
    if (!p6) passed = false;
    messages.push(
        testLine(
            p6,
            "🛡️ 원본 cart 배열이 바뀌지 않는지 (부작용 검사)",
            "길이 " + origCartLen + " 유지",
            "length: " + origCart.length,
            "cart는 읽기만 해야 합니다. splice나 pop을 쓰지 않았는지 확인하세요.",
        ),
    );

    showResult("result6", passed, messages);
})();

// ============================================
// Function 7 테스트: showReceipt
// ============================================
(function testShowReceipt() {
    var messages = [];
    var passed = true;

    var cart1 = ["아아", "바나나우유"];

    var t1 = showReceipt(cart1, SHOP_ITEMS, SHOP_PRICES);
    var p1 = typeof t1 === "string";
    if (!p1) passed = false;
    messages.push(
        testLine(
            p1,
            "🧾 반환값이 문자열(string)인지",
            '"string"',
            typeof t1,
            "return 으로 문자열을 반환해야 합니다. 객체나 배열이 아닌 문자열 하나여야 합니다.",
        ),
    );

    var p2 =
        typeof t1 === "string" &&
        t1.indexOf("아아") !== -1 &&
        t1.indexOf("바나나우유") !== -1;
    if (!p2) passed = false;
    messages.push(
        testLine(
            p2,
            "🧾 구매한 상품명(아아, 바나나우유)이 포함되는지",
            '"아아", "바나나우유" 포함',
            p2 ? "포함" : t1,
            "for문으로 cart를 순회하면서 cart[i] 를 영수증 문자열에 이어붙여야 합니다.",
        ),
    );

    var total = calcTotal(cart1, SHOP_ITEMS, SHOP_PRICES);
    var p3 = typeof t1 === "string" && t1.indexOf(String(total)) !== -1;
    if (!p3) passed = false;
    messages.push(
        testLine(
            p3,
            "🧾 총액(" + total + ")이 영수증에 포함되는지",
            '"' + total + '" 포함',
            typeof t1 === "string"
                ? t1.indexOf(String(total)) !== -1
                    ? '"' + total + '" 있음'
                    : '"' + total + '" 없음'
                : t1,
            "calcTotal(cart, names, prices) 로 합계를 구하고 영수증 문자열에 포함시키세요.",
        ),
    );

    var p3b = typeof t1 === "string" && t1.indexOf(RECEIPT_HEADER) !== -1;
    if (!p3b) passed = false;
    messages.push(
        testLine(
            p3b,
            "🧾 RECEIPT_HEADER 가 포함되는지",
            "RECEIPT_HEADER 포함",
            p3b ? "RECEIPT_HEADER 있음" : "RECEIPT_HEADER 없음",
            "result = RECEIPT_HEADER 로 시작해야 합니다.",
        ),
    );

    var p3c = typeof t1 === "string" && t1.indexOf(RECEIPT_FOOTER) !== -1;
    if (!p3c) passed = false;
    messages.push(
        testLine(
            p3c,
            "🧾 RECEIPT_FOOTER 가 포함되는지",
            "RECEIPT_FOOTER 포함",
            p3c ? "RECEIPT_FOOTER 있음" : "RECEIPT_FOOTER 없음",
            'result += "\\n\\n" + RECEIPT_FOOTER 로 끝나야 합니다.',
        ),
    );

    var t4 = showReceipt([], SHOP_ITEMS, SHOP_PRICES);
    var p4 = typeof t4 === "string";
    if (!p4) passed = false;
    messages.push(
        testLine(
            p4,
            "🧾 빈 내가 구매한 영수증도 문자열로 반환되는지 (경계값)",
            "문자열",
            typeof t4,
            "빈 배열이어도 오류 없이 문자열을 반환해야 합니다. for문은 cart.length가 0이면 자연스럽게 안 돌아갑니다.",
        ),
    );

    var cart5 = ["검"];
    var testNames5 = ["검"];
    var testPrices5 = [500];
    var t5 = showReceipt(cart5, testNames5, testPrices5);
    var p5 = typeof t5 === "string" && t5.indexOf("500") !== -1;
    if (!p5) passed = false;
    messages.push(
        testLine(
            p5,
            "🧾 calcTotal 결과(500)가 영수증에 반영되는지 (연동 확인)",
            '"500" 포함',
            typeof t5 === "string"
                ? t5.indexOf("500") !== -1
                    ? '"500" 있음'
                    : '"500" 없음'
                : t5,
            "showReceipt 안에서 반드시 calcTotal(cart, names, prices) 를 호출해서 합계를 구해야 합니다.",
        ),
    );

    showResult("result7", passed, messages);
})();

console.log("=== shop.js 테스트 완료! 브라우저 화면에서 결과를 확인하세요 ===");
