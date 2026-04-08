// ============================================
// tests_shop.js — 수정하지 마세요!
// ============================================

function showResult(elementId, passed, messages) {
  var el = document.getElementById(elementId);
  if (passed) {
    el.className = "result pass";
    el.innerHTML = "✅ 전부 통과!<br><br>" + messages.join("<br>");
  } else {
    el.className = "result fail";
    el.innerHTML = "❌ 아직이에요! 틀린 항목을 확인하세요<br><br>" + messages.join("<br>");
  }
}

function testLine(passed, situation, expected, actual) {
  var line = (passed ? "✅ " : "❌ ") + situation;
  line += '<div class="sub">나와야 하는 결과: ' + expected + '</div>';
  if (!passed) {
    line += '<div class="sub">내가 쓴 결과: ' + (actual === undefined ? "(아직 없음 — return 을 써주세요!)" : JSON.stringify(actual)) + '</div>';
  }
  return line;
}

// 이 파일에서만 쓰는 테스트 데이터
var SH_NAMES  = ["떡", "칼", "캣닙 담배", "레몬", "방울"];
var SH_PRICES = [100,   75,   50,          80,     30  ];
// 초기 재고: 캣닙 담배만 품절(0)
var BASE_STOCK = [3, 5, 0, 2, 4];

// 매 테스트마다 재고를 새로 복사해서 쓴다
// 개념: 테스트끼리 서로 영향을 주면 안 된다 — 테스트 독립성
function freshStock() { return BASE_STOCK.slice(); }
function freshInv()   { return []; }


// ============================================
// showShop 테스트
// ============================================
(function testShowShop() {
  var messages = [];
  var passed = true;
  var result;

  try { result = showShop(SH_NAMES, SH_PRICES, freshStock()); } catch(e) {
    document.getElementById("result-showShop").className = "result fail";
    document.getElementById("result-showShop").innerHTML = "❌ 함수 실행 중 오류: " + e.message;
    return;
  }

  // 1. string 을 반환한다
  var p1 = typeof result === "string";
  if (!p1) passed = false;
  messages.push(testLine(p1, 'string 을 반환한다', '"string" 타입', typeof result));

  // 2. 재고 있는 아이템 "떡" 이 포함된다
  var p2 = !!(result && result.includes("떡"));
  if (!p2) passed = false;
  messages.push(testLine(p2, '"떡" 이 포함된다', '"떡" 포함', result));

  // 3. 가격 "100" 이 포함된다 (떡 가격)
  var p3 = !!(result && result.includes("100"));
  if (!p3) passed = false;
  messages.push(testLine(p3, '"100" (떡 가격) 이 포함된다', '"100" 포함', result));

  // 4. 재고 0 인 아이템("캣닙 담배")에 "품절" 표시
  var p4 = !!(result && result.includes("품절"));
  if (!p4) passed = false;
  messages.push(testLine(p4, 'stock=0 인 "캣닙 담배" 에 "품절" 이 표시된다', '"품절" 포함', result));

  // 5. 품절 아이템에 가격(50)이 표시되지 않는다
  //    "캣닙 담배" 줄에만 50이 없어야 함
  //    단순 검사: "캣닙 담배 — 50" 이 없는지
  var p5 = !(result && result.includes("캣닙 담배") && result.includes("캣닙 담배 — 50"));
  if (!p5) passed = false;
  messages.push(testLine(p5, '품절 아이템에 가격(50)이 같이 표시되지 않는다', '"캣닙 담배 — 50" 없음', result));

  // 6. 재고 있는 아이템에 "품절" 이 붙지 않는다
  //    "떡" 바로 뒤에 "품절" 이 오면 안 됨 — 단순하게 "떡 — 품절" 없는지 체크
  var p6 = !(result && result.includes("떡 — 품절"));
  if (!p6) passed = false;
  messages.push(testLine(p6, '재고 있는 "떡" 에 "품절" 이 붙지 않는다', '"떡 — 품절" 없음', result));

  // 7. 다섯 아이템 이름이 전부 포함된다
  var allNames = SH_NAMES.every(function(n) { return result && result.includes(n); });
  if (!allNames) passed = false;
  messages.push(testLine(allNames, '5개 아이템 이름이 전부 표시된다', '5개 이름 포함', result));

  // 8. 줄바꿈이 있다 (여러 줄)
  var p8 = !!(result && result.includes("\n"));
  if (!p8) passed = false;
  messages.push(testLine(p8, '줄바꿈(\\n)이 있다 — 아이템마다 한 줄씩', '"\\n" 포함', result));

  // 9. 재고 수량이 표시된다 (예: "3" 포함)
  var p9 = !!(result && result.includes("3"));
  if (!p9) passed = false;
  messages.push(testLine(p9, '재고 수량이 표시된다 (예: "재고: 3")', '"3" 포함', result));

  // 10. 모든 품절이 되었을 때 전부 "품절" 표시
  var allSoldOut;
  try { allSoldOut = showShop(["떡"], [100], [0]); } catch(e) { allSoldOut = null; }
  var p10 = !!(allSoldOut && allSoldOut.includes("품절"));
  if (!p10) passed = false;
  messages.push(testLine(p10,
    'showShop(["떡"], [100], [0]) — 재고 0 이면 품절 표시',
    '"품절" 포함', allSoldOut));

  showResult("result-showShop", passed, messages);
})();


// ============================================
// buyItem 테스트
// 중요: 각 케이스마다 freshStock(), freshInv() 로 새 배열을 만든다
//       테스트 독립성 — 이전 테스트 결과가 다음 테스트에 영향 주면 안 됨
// ============================================
(function testBuyItem() {
  var messages = [];
  var passed = true;

  // 1. 기본 구매 성공 → success: true
  var s1 = freshStock(), i1 = freshInv();
  var r1;
  try { r1 = buyItem(SH_NAMES, SH_PRICES, s1, i1, 300, "떡"); } catch(e) { r1 = undefined; }
  var p1 = !!(r1 && r1.success === true);
  if (!p1) passed = false;
  messages.push(testLine(p1, '"떡" 구매 — success: true 반환', '{ success: true, ... }', r1));

  // 2. newBudget 이 300 - 100 = 200
  var p2 = !!(r1 && r1.newBudget === 200);
  if (!p2) passed = false;
  messages.push(testLine(p2, '"떡"(100원) 구매 후 newBudget 이 200', '200', r1 && r1.newBudget));

  // 3. 인벤토리에 "떡" 이 추가됨
  var p3 = i1.includes("떡");
  if (!p3) passed = false;
  messages.push(testLine(p3, '구매 후 인벤토리에 "떡" 이 추가됨', '"떡" 포함', i1));

  // 4. 재고가 3 → 2 로 줄어든다
  var p4 = s1[0] === 2;
  if (!p4) passed = false;
  messages.push(testLine(p4, '"떡" 구매 후 재고가 3 → 2 로 줄어든다', '재고 2', s1[0]));

  // 5. 품절 아이템 구매 → success: false
  var s5 = freshStock(), i5 = freshInv();
  var r5;
  try { r5 = buyItem(SH_NAMES, SH_PRICES, s5, i5, 300, "캣닙 담배"); } catch(e) { r5 = undefined; }
  var p5 = !!(r5 && r5.success === false);
  if (!p5) passed = false;
  messages.push(testLine(p5, '"캣닙 담배"(품절) 구매 → success: false', '{ success: false, ... }', r5));

  // 6. 품절 시 인벤토리 변화 없음
  var p6 = i5.length === 0;
  if (!p6) passed = false;
  messages.push(testLine(p6, '품절 시 인벤토리 변화 없음', '빈 배열', i5));

  // 7. 품절 시 재고 변화 없음
  var p7 = s5[2] === 0;
  if (!p7) passed = false;
  messages.push(testLine(p7, '품절 시 재고 변화 없음', '재고 0 유지', s5[2]));

  // 8. 예산 부족 → success: false
  var s8 = freshStock(), i8 = freshInv();
  var r8;
  try { r8 = buyItem(SH_NAMES, SH_PRICES, s8, i8, 10, "레몬"); } catch(e) { r8 = undefined; }
  var p8 = !!(r8 && r8.success === false);
  if (!p8) passed = false;
  messages.push(testLine(p8, '예산 10원으로 레몬(80원) 구매 → success: false', '{ success: false, ... }', r8));

  // 9. 예산 부족 시 인벤토리 변화 없음
  var p9 = i8.length === 0;
  if (!p9) passed = false;
  messages.push(testLine(p9, '예산 부족 시 인벤토리 변화 없음', '빈 배열', i8));

  // 10. 예산 부족 시 newBudget 은 원래 예산 그대로
  var p10 = !!(r8 && r8.newBudget === 10);
  if (!p10) passed = false;
  messages.push(testLine(p10, '예산 부족 시 newBudget 은 10 그대로', '10', r8 && r8.newBudget));

  // 11. 없는 아이템 → success: false
  var s11 = freshStock(), i11 = freshInv();
  var r11;
  try { r11 = buyItem(SH_NAMES, SH_PRICES, s11, i11, 300, "폭탄"); } catch(e) { r11 = undefined; }
  var p11 = !!(r11 && r11.success === false);
  if (!p11) passed = false;
  messages.push(testLine(p11, '없는 아이템 "폭탄" 구매 → success: false', '{ success: false, ... }', r11));

  // 12. 경계값: 예산이 정확히 가격과 같다 → 성공
  //     방울 가격 30원, 예산 30원
  var s12 = freshStock(), i12 = freshInv();
  var r12;
  try { r12 = buyItem(SH_NAMES, SH_PRICES, s12, i12, 30, "방울"); } catch(e) { r12 = undefined; }
  var p12 = !!(r12 && r12.success === true && r12.newBudget === 0);
  if (!p12) passed = false;
  messages.push(testLine(p12,
    '경계값: 예산 30원 = 방울 가격 30원 → 성공, newBudget 0',
    '{ success: true, newBudget: 0 }', r12));

  // 13. 경계값: 예산이 1원 부족 → 실패
  var s13 = freshStock(), i13 = freshInv();
  var r13;
  try { r13 = buyItem(SH_NAMES, SH_PRICES, s13, i13, 29, "방울"); } catch(e) { r13 = undefined; }
  var p13 = !!(r13 && r13.success === false);
  if (!p13) passed = false;
  messages.push(testLine(p13,
    '경계값: 예산 29원으로 방울(30원) → 1원 부족, 실패',
    '{ success: false, ... }', r13));

  // 14. 반환값에 message 가 있다
  var s14 = freshStock(), i14 = freshInv();
  var r14;
  try { r14 = buyItem(SH_NAMES, SH_PRICES, s14, i14, 300, "칼"); } catch(e) { r14 = undefined; }
  var p14 = !!(r14 && typeof r14.message === "string" && r14.message.length > 0);
  if (!p14) passed = false;
  messages.push(testLine(p14,
    '반환값에 message 가 있고 빈 문자열이 아니다',
    '{ success: ..., newBudget: ..., message: "..." }', r14));

  // 15. 같은 아이템 두 번 구매 → 재고 2번 감소
  var s15 = freshStock(), i15 = freshInv();
  try { buyItem(SH_NAMES, SH_PRICES, s15, i15, 300, "떡"); } catch(e) {}
  var r15b;
  try { r15b = buyItem(SH_NAMES, SH_PRICES, s15, i15, 200, "떡"); } catch(e) { r15b = undefined; }
  var p15 = !!(r15b && r15b.success === true && s15[0] === 1 && i15.length === 2);
  if (!p15) passed = false;
  messages.push(testLine(p15,
    '"떡" 두 번 구매 → 재고 3→1, 인벤토리에 떡 2개',
    '재고 1, 인벤토리 길이 2', JSON.stringify({ stock0: s15[0], invLen: i15.length })));

  showResult("result-buyItem", passed, messages);
})();


// ============================================
// showInventory 테스트
// ============================================
(function testShowInventory() {
  var messages = [];
  var passed = true;

  // 1. 빈 배열 → "없음"
  var t1;
  try { t1 = showInventory([]); } catch(e) { t1 = undefined; }
  var p1 = t1 === "없음";
  if (!p1) passed = false;
  messages.push(testLine(p1, 'showInventory([]) → "없음"', '"없음"', t1));

  // 2. string 을 반환한다
  var t2;
  try { t2 = showInventory(["떡"]); } catch(e) { t2 = undefined; }
  var p2 = typeof t2 === "string";
  if (!p2) passed = false;
  messages.push(testLine(p2, 'string 을 반환한다', '"string" 타입', typeof t2));

  // 3. 단일 아이템 포함 여부
  var p3 = !!(t2 && t2.includes("떡"));
  if (!p3) passed = false;
  messages.push(testLine(p3, 'showInventory(["떡"]) — "떡" 이 포함된다', '"떡" 포함', t2));

  // 4. 여러 아이템: 전부 포함
  var t4;
  try { t4 = showInventory(["떡", "레몬", "칼"]); } catch(e) { t4 = undefined; }
  var p4 = !!(t4 && t4.includes("떡") && t4.includes("레몬") && t4.includes("칼"));
  if (!p4) passed = false;
  messages.push(testLine(p4, 'showInventory(["떡","레몬","칼"]) — 3개 모두 포함', '"떡","레몬","칼" 포함', t4));

  // 5. 중복 아이템: 둘 다 표시된다
  var t5;
  try { t5 = showInventory(["떡", "레몬", "떡"]); } catch(e) { t5 = undefined; }
  // "떡"이 두 번 나오는지 체크 — indexOf 와 lastIndexOf 가 다르면 두 번 이상 있음
  var p5 = !!(t5 && t5.indexOf("떡") !== t5.lastIndexOf("떡"));
  if (!p5) passed = false;
  messages.push(testLine(p5,
    'showInventory(["떡","레몬","떡"]) — "떡" 이 두 번 표시된다',
    '"떡" 두 번 포함', t5));

  // 6. "없음" 이 아니면 아이템 이름이 나온다 (undefined 아님)
  var t6;
  try { t6 = showInventory(["캣닙 담배"]); } catch(e) { t6 = undefined; }
  var p6 = !!(t6 && t6.includes("캣닙 담배") && t6 !== "없음");
  if (!p6) passed = false;
  messages.push(testLine(p6,
    'showInventory(["캣닙 담배"]) — "캣닙 담배" 포함, "없음" 아님',
    '"캣닙 담배" 포함', t6));

  // 7. 빈 배열이 아닐 때 "없음" 이 나오지 않는다
  var t7;
  try { t7 = showInventory(["떡"]); } catch(e) { t7 = undefined; }
  var p7 = !!(t7 && !t7.includes("없음"));
  if (!p7) passed = false;
  messages.push(testLine(p7,
    'showInventory(["떡"]) — "없음" 이 포함되지 않는다',
    '"없음" 없음', t7));

  showResult("result-showInventory", passed, messages);
})();


// ============================================
// calculateTotal 테스트
// ============================================
(function testCalculateTotal() {
  var messages = [];
  var passed = true;

  // 1. 기본 합산: 떡(100) + 레몬(80) = 180
  var t1;
  try { t1 = calculateTotal(["떡", "레몬"], SH_PRICES, SH_NAMES); } catch(e) { t1 = undefined; }
  var p1 = t1 === 180;
  if (!p1) passed = false;
  messages.push(testLine(p1, 'calculateTotal(["떡","레몬"]) — 100+80=180', '180', t1));

  // 2. 빈 장바구니 → 0
  var t2;
  try { t2 = calculateTotal([], SH_PRICES, SH_NAMES); } catch(e) { t2 = undefined; }
  var p2 = t2 === 0;
  if (!p2) passed = false;
  messages.push(testLine(p2, 'calculateTotal([]) — 빈 장바구니는 0', '0', t2));

  // 3. 단일 아이템: 방울(30)
  var t3;
  try { t3 = calculateTotal(["방울"], SH_PRICES, SH_NAMES); } catch(e) { t3 = undefined; }
  var p3 = t3 === 30;
  if (!p3) passed = false;
  messages.push(testLine(p3, 'calculateTotal(["방울"]) — 방울 1개=30', '30', t3));

  // 4. 중복 아이템: 떡 2개 = 200
  var t4;
  try { t4 = calculateTotal(["떡", "떡"], SH_PRICES, SH_NAMES); } catch(e) { t4 = undefined; }
  var p4 = t4 === 200;
  if (!p4) passed = false;
  messages.push(testLine(p4, 'calculateTotal(["떡","떡"]) — 떡 2개=200', '200', t4));

  // 5. 전체 아이템 합산: 100+75+50+80+30=335
  var t5;
  try { t5 = calculateTotal(["떡","칼","캣닙 담배","레몬","방울"], SH_PRICES, SH_NAMES); } catch(e) { t5 = undefined; }
  var p5 = t5 === 335;
  if (!p5) passed = false;
  messages.push(testLine(p5, '전체 5개 합산 100+75+50+80+30=335', '335', t5));

  // 6. 없는 아이템이 포함되면 0 으로 계산 (무시)
  //    떡(100) + 폭탄(없음=0) = 100
  var t6;
  try { t6 = calculateTotal(["떡", "폭탄"], SH_PRICES, SH_NAMES); } catch(e) { t6 = undefined; }
  var p6 = t6 === 100;
  if (!p6) passed = false;
  messages.push(testLine(p6,
    'calculateTotal(["떡","폭탄"]) — 없는 아이템은 0으로 처리, 합계 100',
    '100', t6));

  // 7. 반환값이 number 타입이다
  var t7;
  try { t7 = calculateTotal(["떡"], SH_PRICES, SH_NAMES); } catch(e) { t7 = undefined; }
  var p7 = typeof t7 === "number";
  if (!p7) passed = false;
  messages.push(testLine(p7, '반환값이 number 타입이다', '"number" 타입', typeof t7));

  // 8. 공백 포함 아이템 이름도 찾는다: 캣닙 담배(50) + 방울(30) = 80
  var t8;
  try { t8 = calculateTotal(["캣닙 담배", "방울"], SH_PRICES, SH_NAMES); } catch(e) { t8 = undefined; }
  var p8 = t8 === 80;
  if (!p8) passed = false;
  messages.push(testLine(p8,
    'calculateTotal(["캣닙 담배","방울"]) — 공백 포함 이름도 찾는다. 50+30=80',
    '80', t8));

  // 9. 칼(75) 단일
  var t9;
  try { t9 = calculateTotal(["칼"], SH_PRICES, SH_NAMES); } catch(e) { t9 = undefined; }
  var p9 = t9 === 75;
  if (!p9) passed = false;
  messages.push(testLine(p9, 'calculateTotal(["칼"]) — 칼 1개=75', '75', t9));

  showResult("result-calculateTotal", passed, messages);
})();
