// ============================================
// tests_notebook.js — 수정하지 마세요!
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
var NB_PARTS = ["입", "꼬리", "코", "눈"];
var NB_ITEMS = ["떡", "칼", "캣닙 담배", "레몬"];

// ============================================
// showNotebook 테스트
// ============================================
(function testShowNotebook() {
  var messages = [];
  var passed = true;
  var result;

  try { result = showNotebook(NB_PARTS, NB_ITEMS); } catch(e) {
    document.getElementById("result-showNotebook").className = "result fail";
    document.getElementById("result-showNotebook").innerHTML = "❌ 함수 실행 중 오류: " + e.message;
    return;
  }

  // 1. 반환값이 string 인지
  var p1 = typeof result === "string";
  if (!p1) passed = false;
  messages.push(testLine(p1,
    'string 을 반환한다',
    '"string" 타입', typeof result));

  // 2. "입 → 떡" 포함
  var p2 = !!(result && result.includes("입 → 떡"));
  if (!p2) passed = false;
  messages.push(testLine(p2,
    '"입 → 떡" 이 포함되어 있다',
    '"입 → 떡" 포함', result));

  // 3. "꼬리 → 칼" 포함
  var p3 = !!(result && result.includes("꼬리 → 칼"));
  if (!p3) passed = false;
  messages.push(testLine(p3,
    '"꼬리 → 칼" 이 포함되어 있다',
    '"꼬리 → 칼" 포함', result));

  // 4. "코 → 캣닙 담배" 포함
  var p4 = !!(result && result.includes("코 → 캣닙 담배"));
  if (!p4) passed = false;
  messages.push(testLine(p4,
    '"코 → 캣닙 담배" 이 포함되어 있다',
    '"코 → 캣닙 담배" 포함', result));

  // 5. "눈 → 레몬" 포함
  var p5 = !!(result && result.includes("눈 → 레몬"));
  if (!p5) passed = false;
  messages.push(testLine(p5,
    '"눈 → 레몬" 이 포함되어 있다',
    '"눈 → 레몬" 포함', result));

  // 6. 화살표(→) 형식을 사용한다
  var p6 = !!(result && result.includes("→"));
  if (!p6) passed = false;
  messages.push(testLine(p6,
    '"→" 기호가 있다 (형식 확인)',
    '"→" 포함', result));

  // 7. 줄바꿈(\n)이 있다 — 항목이 여러 줄로 나뉜다
  var p7 = !!(result && result.includes("\n"));
  if (!p7) passed = false;
  messages.push(testLine(p7,
    '줄바꿈(\\n) 이 있다 — 한 줄에 하나씩 나온다',
    '"\\n" 포함', result));

  // 8. 4줄이 나온다 (부위 4개이므로)
  var lineCount = result ? result.trim().split("\n").length : 0;
  var p8 = lineCount === 4;
  if (!p8) passed = false;
  messages.push(testLine(p8,
    '총 4줄이다 (부위가 4개이므로)',
    "4줄", lineCount + "줄"));

  // 9. 순서: "입"이 "꼬리"보다 먼저 나온다
  var p9 = !!(result && result.indexOf("입") < result.indexOf("꼬리"));
  if (!p9) passed = false;
  messages.push(testLine(p9,
    '"입" 이 "꼬리" 보다 먼저 나온다 — 배열 순서대로 출력',
    '"입" 이 앞에', ''));

  // 10. 순서: "코"가 "눈"보다 먼저 나온다
  var p10 = !!(result && result.indexOf("코") < result.indexOf("눈"));
  if (!p10) passed = false;
  messages.push(testLine(p10,
    '"코" 가 "눈" 보다 먼저 나온다',
    '"코" 가 앞에', ''));

  // 11. 배열 1개짜리도 동작한다
  var single;
  try { single = showNotebook(["입"], ["떡"]); } catch(e) { single = null; }
  var p11 = !!(single && single.includes("입 → 떡"));
  if (!p11) passed = false;
  messages.push(testLine(p11,
    'showNotebook(["입"], ["떡"]) — 배열 1개짜리도 동작한다',
    '"입 → 떡" 포함', single));

  // 12. 아이템 이름이 정확히 들어간다 (오타 없음)
  var p12 = !!(result && result.includes("캣닙 담배"));
  if (!p12) passed = false;
  messages.push(testLine(p12,
    '"캣닙 담배" 가 정확히 들어간다 (띄어쓰기 포함)',
    '"캣닙 담배" 포함', result));

  showResult("result-showNotebook", passed, messages);
})();


// ============================================
// findTip 테스트
// ============================================
(function testFindTip() {
  var messages = [];
  var passed = true;

  // 1. 인덱스 0 찾기 ("입" → "떡")
  var t1;
  try { t1 = findTip(NB_PARTS, NB_ITEMS, "입"); } catch(e) { t1 = undefined; }
  var p1 = t1 === "떡";
  if (!p1) passed = false;
  messages.push(testLine(p1,
    'findTip("입") — 인덱스 0, 첫 번째 항목',
    '"떡"', t1));

  // 2. 인덱스 1 찾기 ("꼬리" → "칼")
  var t2;
  try { t2 = findTip(NB_PARTS, NB_ITEMS, "꼬리"); } catch(e) { t2 = undefined; }
  var p2 = t2 === "칼";
  if (!p2) passed = false;
  messages.push(testLine(p2,
    'findTip("꼬리") — 인덱스 1',
    '"칼"', t2));

  // 3. 인덱스 2 찾기 ("코" → "캣닙 담배")
  var t3;
  try { t3 = findTip(NB_PARTS, NB_ITEMS, "코"); } catch(e) { t3 = undefined; }
  var p3 = t3 === "캣닙 담배";
  if (!p3) passed = false;
  messages.push(testLine(p3,
    'findTip("코") — 인덱스 2, 공백 포함 아이템',
    '"캣닙 담배"', t3));

  // 4. 마지막 인덱스 찾기 ("눈" → "레몬")
  var t4;
  try { t4 = findTip(NB_PARTS, NB_ITEMS, "눈"); } catch(e) { t4 = undefined; }
  var p4 = t4 === "레몬";
  if (!p4) passed = false;
  messages.push(testLine(p4,
    'findTip("눈") — 인덱스 3, 마지막 항목',
    '"레몬"', t4));

  // 5. 없는 부위 → null
  var t5;
  try { t5 = findTip(NB_PARTS, NB_ITEMS, "발"); } catch(e) { t5 = undefined; }
  var p5 = t5 === null;
  if (!p5) passed = false;
  messages.push(testLine(p5,
    'findTip("발") — 없는 부위는 null 반환',
    'null', t5));

  // 6. 빈 문자열 → null
  var t6;
  try { t6 = findTip(NB_PARTS, NB_ITEMS, ""); } catch(e) { t6 = undefined; }
  var p6 = t6 === null;
  if (!p6) passed = false;
  messages.push(testLine(p6,
    'findTip("") — 빈 문자열은 null',
    'null', t6));

  // 7. 비슷하지만 다른 이름 → null
  var t7;
  try { t7 = findTip(NB_PARTS, NB_ITEMS, "입입"); } catch(e) { t7 = undefined; }
  var p7 = t7 === null;
  if (!p7) passed = false;
  messages.push(testLine(p7,
    'findTip("입입") — 비슷하지만 다른 이름은 null',
    'null', t7));

  // 8. 아이템 이름으로 검색하면 안 됨 ("떡" 은 부위가 아님)
  var t8;
  try { t8 = findTip(NB_PARTS, NB_ITEMS, "떡"); } catch(e) { t8 = undefined; }
  var p8 = t8 === null;
  if (!p8) passed = false;
  messages.push(testLine(p8,
    'findTip("떡") — 아이템 이름으로 찾으면 null (부위 배열에 없음)',
    'null', t8));

  // 9. 배열 1개짜리, 찾는 경우
  var t9;
  try { t9 = findTip(["입"], ["떡"], "입"); } catch(e) { t9 = undefined; }
  var p9 = t9 === "떡";
  if (!p9) passed = false;
  messages.push(testLine(p9,
    'findTip(["입"], ["떡"], "입") — 배열 1개짜리, 있는 경우',
    '"떡"', t9));

  // 10. 배열 1개짜리, 못 찾는 경우
  var t10;
  try { t10 = findTip(["입"], ["떡"], "코"); } catch(e) { t10 = undefined; }
  var p10 = t10 === null;
  if (!p10) passed = false;
  messages.push(testLine(p10,
    'findTip(["입"], ["떡"], "코") — 배열 1개짜리, 없는 경우',
    'null', t10));

  // 11. undefined 가 아니라 null 을 반환한다
  var t11;
  try { t11 = findTip(NB_PARTS, NB_ITEMS, "날개"); } catch(e) { t11 = undefined; }
  var p11 = t11 === null && t11 !== undefined;
  if (!p11) passed = false;
  messages.push(testLine(p11,
    'findTip("날개") — 없을 때 undefined 가 아니라 정확히 null 을 return 한다',
    'null (undefined 아님)', t11));

  // 12. 반환값 타입이 string 이다 (찾은 경우)
  var t12;
  try { t12 = findTip(NB_PARTS, NB_ITEMS, "입"); } catch(e) { t12 = undefined; }
  var p12 = typeof t12 === "string";
  if (!p12) passed = false;
  messages.push(testLine(p12,
    'findTip("입") 반환값은 string 타입이다',
    '"string" 타입', typeof t12));

  // 13. 대/소문자 구분: 배열에 없는 형태는 null
  var t13;
  try { t13 = findTip(["눈"], ["레몬"], "눈"); } catch(e) { t13 = undefined; }
  var p13 = t13 === "레몬";
  if (!p13) passed = false;
  messages.push(testLine(p13,
    'findTip(["눈"], ["레몬"], "눈") — 단일 배열에서 정확히 일치',
    '"레몬"', t13));

  showResult("result-findTip", passed, messages);
})();
