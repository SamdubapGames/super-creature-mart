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
  line += '<div class="sub">나와야 하는 결과: ' + expected + '</div>';
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
    line += '<div class="sub">내가 쓴 결과: ' + display + '</div>';
    if (hint) {
      line += '<div class="sub hint">💡 힌트: ' + hint + '</div>';
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

function freshItems() {
  return [
    { name: "떡",   price: 100, stock: 3 },
    { name: "검",   price: 500, stock: 1 },
    { name: "방패", price: 300, stock: 0 },
    { name: "장화", price: 200, stock: 5 }
  ];
}

// ============================================
// Function 1 테스트: getStockLabel
// ============================================
(function testGetStockLabel() {
  var messages = [];
  var passed = true;

  var t1 = getStockLabel(3);
  var p1 = t1 === "(재고: 3개)";
  if (!p1) passed = false;
  messages.push(testLine(p1,
    '🏷️ getStockLabel(3) → "(재고: 3개)"',
    '"(재고: 3개)"', t1,
    '"(재고: " + stock + "개)" 형태로 stock 변수를 끼워넣어야 합니다. 숫자를 직접 쓰면 안 됩니다.'));

  var t2 = getStockLabel(1);
  var p2 = t2 === "(재고: 1개)";
  if (!p2) passed = false;
  messages.push(testLine(p2,
    '🏷️ getStockLabel(1) → "(재고: 1개)"',
    '"(재고: 1개)"', t2,
    '"(재고: " + stock + "개)" 에서 stock 변수를 확인하세요.'));

  var t3 = getStockLabel(0);
  var p3 = t3 === "(품절)";
  if (!p3) passed = false;
  messages.push(testLine(p3,
    '🏷️ getStockLabel(0) → "(품절)"',
    '"(품절)"', t3,
    'if (stock === 0) return "(품절)"; 을 먼저 처리하세요. 0일 때와 아닐 때를 if/else로 나눠야 합니다.'));

  var t4 = getStockLabel(99);
  var p4 = t4 === "(재고: 99개)";
  if (!p4) passed = false;
  messages.push(testLine(p4,
    '🏷️ getStockLabel(99) → "(재고: 99개)"',
    '"(재고: 99개)"', t4,
    '"(재고: " + stock + "개)" 에서 괄호, 콜론, 공백 위치를 정확히 확인하세요.'));

  var p5 = typeof getStockLabel(5) === "string";
  if (!p5) passed = false;
  messages.push(testLine(p5,
    '🏷️ 반환값이 문자열(string)인지',
    '"string"', typeof getStockLabel(5),
    'return 키워드가 있는지, 문자열을 반환하고 있는지 확인하세요.'));

  showResult("result1", passed, messages);
})();

// ============================================
// Function 2 테스트: formatShopLine
// ============================================
(function testFormatShopLine() {
  var messages = [];
  var passed = true;

  var t1 = formatShopLine(1, "떡", 100, 3);
  var p1 = t1 === "1. 떡 — 100원 (재고: 3개)";
  if (!p1) passed = false;
  messages.push(testLine(p1,
    '📝 formatShopLine(1, "떡", 100, 3)',
    '"1. 떡 — 100원 (재고: 3개)"', t1,
    'index + ". " + name + " — " + price + "원 " + getStockLabel(stock) 형태인지 확인하세요. 줄표(—)와 공백 위치를 주의하세요.'));

  var t2 = formatShopLine(2, "방패", 300, 0);
  var p2 = t2 === "2. 방패 — 300원 (품절)";
  if (!p2) passed = false;
  messages.push(testLine(p2,
    '📝 formatShopLine(2, "방패", 300, 0) — 품절',
    '"2. 방패 — 300원 (품절)"', t2,
    'stock=0 일 때 getStockLabel(0) 을 호출하면 "(품절)" 이 자동으로 나옵니다. getStockLabel을 반드시 호출하세요.'));

  var t3 = formatShopLine(5, "장화", 200, 1);
  var p3 = typeof t3 === "string" && t3.indexOf("5.") !== -1;
  if (!p3) passed = false;
  messages.push(testLine(p3,
    '📝 번호(5.)가 포함되는지',
    '"5." 포함', typeof t3 === "string" ? t3 : t3,
    'index 변수를 그대로 쓰고 뒤에 ". " 을 붙여야 합니다.'));

  var t4 = formatShopLine(1, "검", 500, 1);
  var p4 = typeof t4 === "string" && t4.indexOf("500원") !== -1;
  if (!p4) passed = false;
  messages.push(testLine(p4,
    '📝 가격 뒤에 "원"이 붙는지',
    '"500원" 포함', t4,
    'price + "원" 으로 붙여야 합니다. 숫자만 쓰면 "원" 이 빠집니다.'));

  var t5 = formatShopLine(3, "떡볶이", 150, 7);
  var stockLabel = getStockLabel(7);
  var p5 = typeof t5 === "string" && t5.indexOf(stockLabel) !== -1;
  if (!p5) passed = false;
  messages.push(testLine(p5,
    '📝 getStockLabel 결과가 포함되는지 (연동 확인)',
    '"' + stockLabel + '" 포함', t5,
    'getStockLabel(stock) 을 직접 호출해서 결과를 이어붙여야 합니다. 재고 텍스트를 직접 만들지 마세요.'));

  var p6 = typeof formatShopLine(1, "A", 100, 1) === "string";
  if (!p6) passed = false;
  messages.push(testLine(p6,
    '📝 반환값이 문자열(string)인지',
    '"string"', typeof formatShopLine(1, "A", 100, 1),
    'return 키워드로 문자열을 반환하고 있는지 확인하세요.'));

  showResult("result2", passed, messages);
})();

// ============================================
// Function 3 테스트: showShopList
// ============================================
(function testShowShopList() {
  var messages = [];
  var passed = true;

  var items = freshItems();

  var t1 = showShopList(items);
  var p1 = typeof t1 === "string";
  if (!p1) passed = false;
  messages.push(testLine(p1,
    '📜 반환값이 문자열(string)인지',
    '"string"', typeof t1,
    'let result = "" 로 빈 문자열을 만들고 이어붙인 뒤 return result 해야 합니다.'));

  var p2 = typeof t1 === "string"
    && t1.indexOf("떡") !== -1
    && t1.indexOf("검") !== -1
    && t1.indexOf("방패") !== -1
    && t1.indexOf("장화") !== -1;
  if (!p2) passed = false;
  messages.push(testLine(p2,
    '📜 4개 상품(떡, 검, 방패, 장화) 모두 포함되는지',
    '전부 포함', p2 ? '전부 포함' : t1,
    'for문이 items.length번 도는지 확인하세요. formatShopLine(i+1, items[i].name, items[i].price, items[i].stock) 결과를 이어붙여야 합니다.'));

  var p3 = typeof t1 === "string" && t1.indexOf("1.") !== -1 && t1.indexOf("0.") === -1;
  if (!p3) passed = false;
  messages.push(testLine(p3,
    '📜 번호가 0이 아니라 1부터 시작하는지',
    '"1." 있고 "0." 없음', typeof t1 === "string" ? (t1.indexOf("1.") !== -1 ? '"1." 있음' : '"1." 없음') : t1,
    'formatShopLine을 호출할 때 첫 번째 인자를 i가 아니라 i+1 로 넘겨야 합니다.'));

  var p4 = typeof t1 === "string" && t1.indexOf("\n") !== -1;
  if (!p4) passed = false;
  messages.push(testLine(p4,
    '📜 줄바꿈(\\n)으로 구분되는지',
    '"\\n" 포함', typeof t1 === "string" ? (t1.indexOf("\n") !== -1 ? "\\n 있음" : "\\n 없음") : t1,
    '각 줄 뒤에 "\\n" 을 붙여야 합니다. 예: result += formatShopLine(...) + "\\n"'));

  var p5 = typeof t1 === "string" && t1.indexOf("품절") !== -1;
  if (!p5) passed = false;
  messages.push(testLine(p5,
    '📜 재고 0인 "방패"에 품절 표시가 나오는지',
    '"품절" 포함', typeof t1 === "string" ? (t1.indexOf("품절") !== -1 ? '"품절" 있음' : '"품절" 없음') : t1,
    'formatShopLine에 items[i].stock 을 네 번째 인자로 넘기고 있는지 확인하세요.'));

  var origLen = items.length;
  showShopList(items);
  var p6 = items.length === origLen;
  if (!p6) passed = false;
  messages.push(testLine(p6,
    '🛡️ 원본 items 배열이 바뀌지 않는지 (부작용 검사)',
    '길이 ' + origLen + ' 유지', 'length: ' + items.length,
    'items는 읽기만 해야 합니다. push나 splice를 쓰지 않았는지 확인하세요.'));

  showResult("result3", passed, messages);
})();

// ============================================
// Function 4 테스트: isAffordable
// ============================================
(function testIsAffordable() {
  var messages = [];
  var passed = true;

  var t1 = isAffordable(500, 300);
  var p1 = t1 === true;
  if (!p1) passed = false;
  messages.push(testLine(p1,
    '💰 isAffordable(500, 300) — 예산 충분 → true',
    'true', t1,
    'return budget >= price; 형태인지 확인하세요. 첫 번째 인자가 budget, 두 번째가 price입니다.'));

  var t2 = isAffordable(300, 300);
  var p2 = t2 === true;
  if (!p2) passed = false;
  messages.push(testLine(p2,
    '💰 isAffordable(300, 300) — 딱 맞음 → true (경계값)',
    'true', t2,
    '>= (크거나 같음) 를 써야 합니다. > (초과) 만 쓰면 딱 맞을 때 false가 나옵니다.'));

  var t3 = isAffordable(200, 300);
  var p3 = t3 === false;
  if (!p3) passed = false;
  messages.push(testLine(p3,
    '💰 isAffordable(200, 300) — 예산 부족 → false',
    'false', t3,
    'budget과 price 위치가 바뀌지 않았는지 확인하세요. budget >= price 순서여야 합니다.'));

  var t4 = isAffordable(0, 100);
  var p4 = t4 === false;
  if (!p4) passed = false;
  messages.push(testLine(p4,
    '💰 isAffordable(0, 100) — 예산 0 → false (경계값)',
    'false', t4,
    '0 >= 100 은 false입니다. 별도 처리 없이 return budget >= price 만 해도 됩니다.'));

  var p5 = typeof isAffordable(1000, 100) === "boolean";
  if (!p5) passed = false;
  messages.push(testLine(p5,
    '💰 반환값이 boolean인지',
    '"boolean"', typeof isAffordable(1000, 100),
    'return budget >= price; 비교 연산 자체가 true/false를 반환합니다. 숫자나 문자열을 반환하지 않았는지 확인하세요.'));

  showResult("result4", passed, messages);
})();

// ============================================
// Function 5 테스트: buyItem
// ============================================
(function testBuyItem() {
  var messages = [];
  var passed = true;

  var item1 = { name: "떡", price: 100, stock: 3 };
  var cart1 = [];
  var budget1 = { gold: 500 };
  var t1 = buyItem(item1, budget1, cart1);
  var p1 = typeof t1 === "string";
  if (!p1) passed = false;
  messages.push(testLine(p1,
    '🛍️ 구매 성공 시 문자열 메시지가 반환되는지',
    '문자열', typeof t1,
    '구매 성공 분기에서 return "..." 으로 문자열 메시지를 반환해야 합니다.'));

  var item2 = { name: "떡", price: 100, stock: 3 };
  var cart2 = [];
  var budget2 = { gold: 500 };
  buyItem(item2, budget2, cart2);
  var p2 = cart2.length === 1;
  if (!p2) passed = false;
  messages.push(testLine(p2,
    '🛍️ 구매 후 장바구니에 1개 추가됐는지',
    '장바구니 길이: 1', '장바구니 길이: ' + cart2.length,
    '구매 성공 분기 안에서 cart.push(item) 을 호출해야 합니다.'));

  var item3 = { name: "방패", price: 300, stock: 0 };
  var cart3 = [];
  var budget3 = { gold: 1000 };
  var t3 = buyItem(item3, budget3, cart3);
  var p3 = typeof t3 === "string" && t3.indexOf("품절") !== -1;
  if (!p3) passed = false;
  messages.push(testLine(p3,
    '🛍️ 품절 상품 구매 시도 → "품절" 메시지',
    '"품절" 포함', t3,
    '가장 먼저 if (item.stock === 0) 으로 품절을 체크하고 "품절" 이 포함된 메시지를 return 하세요.'));

  var p4 = cart3.length === 0;
  if (!p4) passed = false;
  messages.push(testLine(p4,
    '🛍️ 품절 시 장바구니가 바뀌지 않는지',
    '장바구니 길이: 0', '장바구니 길이: ' + cart3.length,
    '품절 체크에서 return 하면 그 아래 cart.push가 실행되지 않습니다. return 위치를 확인하세요.'));

  var item5 = { name: "검", price: 500, stock: 1 };
  var cart5 = [];
  var budget5 = { gold: 100 };
  var t5 = buyItem(item5, budget5, cart5);
  var p5 = typeof t5 === "string" && cart5.length === 0;
  if (!p5) passed = false;
  messages.push(testLine(p5,
    '🛍️ 예산 부족 시 구매 실패 + 장바구니 변화 없는지',
    '장바구니 길이: 0', '장바구니 길이: ' + cart5.length + ' / 메시지: ' + t5,
    'isAffordable(budget.gold, item.price) 가 false 일 때 cart.push 없이 메시지만 return 해야 합니다.'));

  var item6 = { name: "장화", price: 200, stock: 5 };
  var cart6 = [];
  var budget6 = { gold: 1000 };
  buyItem(item6, budget6, cart6);
  var p6 = item6.stock === 4;
  if (!p6) passed = false;
  messages.push(testLine(p6,
    '🛍️ 구매 후 재고가 1 감소하는지 (5 → 4)',
    'stock: 4', 'stock: ' + item6.stock,
    '구매 성공 분기 안에서 item.stock -= 1; 을 해야 합니다.'));

  showResult("result5", passed, messages);
})();

// ============================================
// Function 6 테스트: calcTotal
// ============================================
(function testCalcTotal() {
  var messages = [];
  var passed = true;

  var cart1 = [{ name: "떡", price: 100 }, { name: "장화", price: 200 }];
  var t1 = calcTotal(cart1);
  var p1 = t1 === 300;
  if (!p1) passed = false;
  messages.push(testLine(p1,
    '🧮 calcTotal([떡 100, 장화 200]) → 300',
    '300', t1,
    'let total = 0; 후 for문에서 total += cart[i].price; 를 반복하고 return total; 해야 합니다.'));

  var cart2 = [{ name: "검", price: 500 }];
  var t2 = calcTotal(cart2);
  var p2 = t2 === 500;
  if (!p2) passed = false;
  messages.push(testLine(p2,
    '🧮 calcTotal([검 500]) → 500',
    '500', t2,
    'cart[i].price 를 더하고 있는지 확인하세요.'));

  var t3 = calcTotal([]);
  var p3 = t3 === 0;
  if (!p3) passed = false;
  messages.push(testLine(p3,
    '🧮 calcTotal([]) → 0 (경계값)',
    '0', t3,
    'let total = 0; 으로 시작하면 빈 배열일 때 for문이 안 돌아서 0이 반환됩니다. 별도 처리 불필요합니다.'));

  var cart4 = [
    { name: "떡", price: 100 },
    { name: "검", price: 500 },
    { name: "장화", price: 200 }
  ];
  var t4 = calcTotal(cart4);
  var p4 = t4 === 800;
  if (!p4) passed = false;
  messages.push(testLine(p4,
    '🧮 calcTotal([떡 100, 검 500, 장화 200]) → 800',
    '800', t4,
    'for문이 cart.length 번 전부 도는지 확인하세요.'));

  var p5 = typeof calcTotal([{ name: "A", price: 50 }]) === "number";
  if (!p5) passed = false;
  messages.push(testLine(p5,
    '🧮 반환값이 숫자(number)인지',
    '"number"', typeof calcTotal([{ name: "A", price: 50 }]),
    'return total; 에서 total이 숫자인지 확인하세요. 문자열로 변환되지 않았는지 확인하세요.'));

  var origCart = [{ name: "떡", price: 100 }, { name: "검", price: 500 }];
  var origLen = origCart.length;
  calcTotal(origCart);
  var p6 = origCart.length === origLen;
  if (!p6) passed = false;
  messages.push(testLine(p6,
    '🛡️ 원본 cart 배열이 바뀌지 않는지 (부작용 검사)',
    '길이 ' + origLen + ' 유지', 'length: ' + origCart.length,
    'cart는 읽기만 해야 합니다. splice나 pop을 쓰지 않았는지 확인하세요.'));

  showResult("result6", passed, messages);
})();

// ============================================
// Function 7 테스트: showReceipt
// ============================================
(function testShowReceipt() {
  var messages = [];
  var passed = true;

  var cart1 = [
    { name: "떡", price: 100 },
    { name: "장화", price: 200 }
  ];

  var t1 = showReceipt(cart1);
  var p1 = typeof t1 === "string";
  if (!p1) passed = false;
  messages.push(testLine(p1,
    '🧾 반환값이 문자열(string)인지',
    '"string"', typeof t1,
    'return 으로 문자열을 반환해야 합니다. 객체나 배열이 아닌 문자열 하나여야 합니다.'));

  var p2 = typeof t1 === "string"
    && t1.indexOf("떡") !== -1
    && t1.indexOf("장화") !== -1;
  if (!p2) passed = false;
  messages.push(testLine(p2,
    '🧾 구매한 상품명(떡, 장화)이 포함되는지',
    '"떡", "장화" 포함', p2 ? '포함' : t1,
    'for문으로 cart를 순회하면서 cart[i].name 을 영수증 문자열에 이어붙여야 합니다.'));

  var total = calcTotal(cart1);
  var p3 = typeof t1 === "string" && t1.indexOf(String(total)) !== -1;
  if (!p3) passed = false;
  messages.push(testLine(p3,
    '🧾 총액(' + total + ')이 영수증에 포함되는지',
    '"' + total + '" 포함', typeof t1 === "string" ? (t1.indexOf(String(total)) !== -1 ? '"' + total + '" 있음' : '"' + total + '" 없음') : t1,
    'let total = calcTotal(cart); 로 합계를 구하고 영수증 문자열에 포함시키세요.'));

  var t4 = showReceipt([]);
  var p4 = typeof t4 === "string";
  if (!p4) passed = false;
  messages.push(testLine(p4,
    '🧾 빈 장바구니 영수증도 문자열로 반환되는지 (경계값)',
    '문자열', typeof t4,
    '빈 배열이어도 오류 없이 문자열을 반환해야 합니다. for문은 cart.length가 0이면 자연스럽게 안 돌아갑니다.'));

  var cart5 = [{ name: "검", price: 500 }];
  var t5 = showReceipt(cart5);
  var p5 = typeof t5 === "string" && t5.indexOf("500") !== -1;
  if (!p5) passed = false;
  messages.push(testLine(p5,
    '🧾 calcTotal 결과(500)가 영수증에 반영되는지 (연동 확인)',
    '"500" 포함', typeof t5 === "string" ? (t5.indexOf("500") !== -1 ? '"500" 있음' : '"500" 없음') : t5,
    'showReceipt 안에서 반드시 calcTotal(cart) 를 호출해서 합계를 구해야 합니다.'));

  showResult("result7", passed, messages);
})();

console.log("=== shop.js 테스트 완료! 브라우저 화면에서 결과를 확인하세요 ===");
