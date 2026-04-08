// ============================================
// tests_path.js — 수정하지 마세요!
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

var PATH_PARTS = ["입", "꼬리", "코", "눈"];
var PATH_ITEMS = ["떡",  "칼",  "캣닙 담배", "레몬"];


// ============================================
// generateRoute 테스트
// 개념: 랜덤 함수는 결과값을 고정할 수 없다
//       대신 "항상 참이어야 하는 조건(불변식)"을 테스트한다
//       게임업계 QA에서 랜덤 기능을 검증하는 방식
// ============================================
(function testGenerateRoute() {
  var messages = [];
  var passed = true;

  // 1. 반환값이 배열인지
  var r1;
  try { r1 = generateRoute(PATH_PARTS, 5); } catch(e) { r1 = undefined; }
  var p1 = Array.isArray(r1);
  if (!p1) passed = false;
  messages.push(testLine(p1,
    'generateRoute(parts, 5) 는 배열을 반환한다',
    "배열(Array)", typeof r1));

  // 2. 길이가 정확히 n=5
  var p2 = r1 && r1.length === 5;
  if (!p2) passed = false;
  messages.push(testLine(p2,
    'n=5 로 호출하면 길이가 5인 배열을 반환한다',
    "길이 5", r1 ? r1.length : "?"));

  // 3. n=1 도 동작한다
  var r3;
  try { r3 = generateRoute(PATH_PARTS, 1); } catch(e) { r3 = undefined; }
  var p3 = r3 && r3.length === 1;
  if (!p3) passed = false;
  messages.push(testLine(p3,
    'n=1 로 호출하면 길이가 1인 배열을 반환한다',
    "길이 1", r3 ? r3.length : "?"));

  // 4. n=10 도 동작한다
  var r4;
  try { r4 = generateRoute(PATH_PARTS, 10); } catch(e) { r4 = undefined; }
  var p4 = r4 && r4.length === 10;
  if (!p4) passed = false;
  messages.push(testLine(p4,
    'n=10 으로 호출하면 길이가 10인 배열을 반환한다',
    "길이 10", r4 ? r4.length : "?"));

  // 5. 모든 요소가 parts 안에 있다
  var r5;
  try { r5 = generateRoute(PATH_PARTS, 5); } catch(e) { r5 = undefined; }
  var allValid5 = r5 && r5.every(function(el) { return PATH_PARTS.includes(el); });
  var p5 = !!allValid5;
  if (!p5) passed = false;
  messages.push(testLine(p5,
    '모든 요소가 parts 배열 안의 값이다',
    'parts 에 있는 값만 나온다', r5));

  // 6-10. 스트레스 테스트: 50번 반복해도 항상 조건을 만족한다
  //       게임QA에서 랜덤 기능은 반복 실행으로 검증한다
  var stressPass = true;
  var stressFail = null;
  for (var i = 0; i < 50; i++) {
    var r;
    try { r = generateRoute(PATH_PARTS, 5); } catch(e) { stressPass = false; stressFail = "오류: " + e.message; break; }
    if (!Array.isArray(r) || r.length !== 5) { stressPass = false; stressFail = "길이 5가 아님: " + JSON.stringify(r); break; }
    if (!r.every(function(el) { return PATH_PARTS.includes(el); })) { stressPass = false; stressFail = "parts 밖의 값 등장: " + JSON.stringify(r); break; }
  }
  if (!stressPass) passed = false;
  messages.push(testLine(stressPass,
    '50번 반복해도 항상 올바른 배열을 반환한다 (스트레스 테스트)',
    '50번 모두 통과', stressFail));

  // 7. 원래 parts 배열이 바뀌지 않는다 (부작용 없음)
  var originalParts = ["입", "꼬리", "코", "눈"];
  var partsCopy = originalParts.slice();
  try { generateRoute(originalParts, 5); } catch(e) {}
  var p7 = JSON.stringify(originalParts) === JSON.stringify(partsCopy);
  if (!p7) passed = false;
  messages.push(testLine(p7,
    'generateRoute 를 실행해도 원래 parts 배열이 바뀌지 않는다',
    '원본 배열 유지', JSON.stringify(originalParts)));

  // 8. 중복된 값이 나올 수 있다 (랜덤이므로 정상)
  //    단, 모든 게 같을 수도 있으므로 → 대신 "parts 요소인지" 만 체크
  var r8;
  try { r8 = generateRoute(PATH_PARTS, 8); } catch(e) { r8 = []; }
  var p8 = r8 && r8.length === 8 && r8.every(function(el) { return PATH_PARTS.includes(el); });
  if (!p8) passed = false;
  messages.push(testLine(p8,
    'n=8 일 때 중복을 포함한 길이 8 배열 반환 (중복 허용)',
    '길이 8, 전부 parts 안의 값', r8));

  showResult("result-generateRoute", passed, messages);
})();


// ============================================
// checkMatch 테스트
// ============================================
(function testCheckMatch() {
  var messages = [];
  var passed = true;

  // 1-4. 올바른 짝 4개 전부
  var pairs = [
    ["입", "떡",        "인덱스 0"],
    ["꼬리", "칼",      "인덱스 1"],
    ["코", "캣닙 담배", "인덱스 2"],
    ["눈", "레몬",      "인덱스 3"],
  ];
  pairs.forEach(function(pair) {
    var part = pair[0], item = pair[1], label = pair[2];
    var t;
    try { t = checkMatch(part, item, PATH_PARTS, PATH_ITEMS); } catch(e) { t = undefined; }
    var p = t === true;
    if (!p) passed = false;
    messages.push(testLine(p,
      'checkMatch("' + part + '", "' + item + '") — 올바른 짝 (' + label + ')',
      'true', t));
  });

  // 5. 틀린 짝: 입 + 칼
  var t5;
  try { t5 = checkMatch("입", "칼", PATH_PARTS, PATH_ITEMS); } catch(e) { t5 = undefined; }
  var p5 = t5 === false;
  if (!p5) passed = false;
  messages.push(testLine(p5,
    'checkMatch("입", "칼") — 틀린 짝',
    'false', t5));

  // 6. 틀린 짝: 눈 + 떡
  var t6;
  try { t6 = checkMatch("눈", "떡", PATH_PARTS, PATH_ITEMS); } catch(e) { t6 = undefined; }
  var p6 = t6 === false;
  if (!p6) passed = false;
  messages.push(testLine(p6,
    'checkMatch("눈", "떡") — 틀린 짝',
    'false', t6));

  // 7. 틀린 짝: 꼬리 + 레몬
  var t7;
  try { t7 = checkMatch("꼬리", "레몬", PATH_PARTS, PATH_ITEMS); } catch(e) { t7 = undefined; }
  var p7 = t7 === false;
  if (!p7) passed = false;
  messages.push(testLine(p7,
    'checkMatch("꼬리", "레몬") — 틀린 짝',
    'false', t7));

  // 8. 없는 부위 → false
  var t8;
  try { t8 = checkMatch("발", "떡", PATH_PARTS, PATH_ITEMS); } catch(e) { t8 = undefined; }
  var p8 = t8 === false;
  if (!p8) passed = false;
  messages.push(testLine(p8,
    'checkMatch("발", "떡") — 없는 부위는 false',
    'false', t8));

  // 9. 없는 아이템 → false
  var t9;
  try { t9 = checkMatch("입", "폭탄", PATH_PARTS, PATH_ITEMS); } catch(e) { t9 = undefined; }
  var p9 = t9 === false;
  if (!p9) passed = false;
  messages.push(testLine(p9,
    'checkMatch("입", "폭탄") — 없는 아이템은 false',
    'false', t9));

  // 10. 둘 다 없음 → false
  var t10;
  try { t10 = checkMatch("발", "폭탄", PATH_PARTS, PATH_ITEMS); } catch(e) { t10 = undefined; }
  var p10 = t10 === false;
  if (!p10) passed = false;
  messages.push(testLine(p10,
    'checkMatch("발", "폭탄") — 둘 다 없으면 false',
    'false', t10));

  // 11. 빈 문자열 → false
  var t11;
  try { t11 = checkMatch("", "", PATH_PARTS, PATH_ITEMS); } catch(e) { t11 = undefined; }
  var p11 = t11 === false;
  if (!p11) passed = false;
  messages.push(testLine(p11,
    'checkMatch("", "") — 빈 문자열은 false',
    'false', t11));

  // 12. 반환값이 boolean 이다 (truthy/falsy 가 아닌 정확한 true/false)
  var t12;
  try { t12 = checkMatch("입", "떡", PATH_PARTS, PATH_ITEMS); } catch(e) { t12 = undefined; }
  var p12 = t12 === true;
  if (!p12) passed = false;
  messages.push(testLine(p12,
    '반환값이 정확히 true 다 (숫자 1이나 문자열이 아님)',
    'true (boolean)', t12));

  showResult("result-checkMatch", passed, messages);
})();


// ============================================
// useItem 테스트
// ============================================
(function testUseItem() {
  var messages = [];
  var passed = true;

  // 1. 있는 아이템 제거 성공 → true 반환
  var inv1 = ["떡", "레몬", "칼"];
  var t1;
  try { t1 = useItem(inv1, "레몬"); } catch(e) { t1 = undefined; }
  var p1 = t1 === true;
  if (!p1) passed = false;
  messages.push(testLine(p1,
    'useItem(["떡","레몬","칼"], "레몬") — 있는 아이템 → true 반환',
    'true', t1));

  // 2. 제거 후 배열 길이가 1 줄어든다
  var p2 = inv1.length === 2;
  if (!p2) passed = false;
  messages.push(testLine(p2,
    '제거 후 배열 길이가 3 → 2 로 줄어든다',
    "길이 2", inv1.length));

  // 3. 제거 후 해당 아이템이 배열에 없다
  var p3 = !inv1.includes("레몬");
  if (!p3) passed = false;
  messages.push(testLine(p3,
    '제거 후 "레몬" 이 배열에 없다',
    '"레몬" 없음', inv1));

  // 4. 제거 후 나머지 아이템은 유지된다
  var p4 = inv1.includes("떡") && inv1.includes("칼");
  if (!p4) passed = false;
  messages.push(testLine(p4,
    '제거 후 다른 아이템("떡", "칼")은 그대로 남는다',
    '"떡", "칼" 유지', inv1));

  // 5. 없는 아이템 → false 반환
  var inv5 = ["떡", "칼"];
  var t5;
  try { t5 = useItem(inv5, "레몬"); } catch(e) { t5 = undefined; }
  var p5 = t5 === false;
  if (!p5) passed = false;
  messages.push(testLine(p5,
    'useItem(["떡","칼"], "레몬") — 없는 아이템 → false 반환',
    'false', t5));

  // 6. 없을 때 배열 길이 변화 없다
  var p6 = inv5.length === 2;
  if (!p6) passed = false;
  messages.push(testLine(p6,
    '없는 아이템 시도 후 배열 길이 변화 없다',
    "길이 2 유지", inv5.length));

  // 7. 빈 인벤토리 → false
  var inv7 = [];
  var t7;
  try { t7 = useItem(inv7, "떡"); } catch(e) { t7 = undefined; }
  var p7 = t7 === false;
  if (!p7) passed = false;
  messages.push(testLine(p7,
    'useItem([], "떡") — 빈 인벤토리는 false',
    'false', t7));

  // 8. 중복 아이템: 첫 번째 것만 제거된다
  var inv8 = ["떡", "레몬", "떡"];
  var t8;
  try { t8 = useItem(inv8, "떡"); } catch(e) { t8 = undefined; }
  var p8 = t8 === true && inv8.length === 2 && inv8.filter(function(x) { return x === "떡"; }).length === 1;
  if (!p8) passed = false;
  messages.push(testLine(p8,
    'useItem(["떡","레몬","떡"], "떡") — 중복 아이템은 첫 번째 1개만 제거',
    'true, 길이 2, 떡 1개 남음', JSON.stringify(inv8)));

  // 9. 중복 아이템 제거 후 "레몬" 은 유지
  var p9 = inv8.includes("레몬");
  if (!p9) passed = false;
  messages.push(testLine(p9,
    '중복 아이템 제거 후 "레몬" 은 그대로 남는다',
    '"레몬" 유지', inv8));

  // 10. 아이템 1개짜리 인벤토리, 성공
  var inv10 = ["캣닙 담배"];
  var t10;
  try { t10 = useItem(inv10, "캣닙 담배"); } catch(e) { t10 = undefined; }
  var p10 = t10 === true && inv10.length === 0;
  if (!p10) passed = false;
  messages.push(testLine(p10,
    'useItem(["캣닙 담배"], "캣닙 담배") — 1개짜리 인벤토리, 제거 후 빈 배열',
    'true, 길이 0', JSON.stringify(inv10)));

  // 11. 반환값이 boolean 이다
  var inv11 = ["떡"];
  var t11;
  try { t11 = useItem(inv11, "떡"); } catch(e) { t11 = undefined; }
  var p11 = t11 === true;
  if (!p11) passed = false;
  messages.push(testLine(p11,
    '반환값이 정확히 true 다 (숫자 1이나 문자열이 아님)',
    'true (boolean)', t11));

  showResult("result-useItem", passed, messages);
})();


// ============================================
// playTurn 테스트
// ============================================
(function testPlayTurn() {
  var messages = [];
  var passed = true;

  // 1. 올바른 아이템 → success: true
  var inv1 = ["떡", "레몬"];
  var r1;
  try { r1 = playTurn("입", "떡", inv1, PATH_PARTS, PATH_ITEMS); } catch(e) { r1 = undefined; }
  var p1 = r1 && r1.success === true;
  if (!p1) passed = false;
  messages.push(testLine(p1,
    'playTurn("입", "떡") — 올바른 짝 → success: true',
    '{ success: true, ... }', r1));

  // 2. 성공 시 인벤토리에서 아이템이 사라진다
  var p2 = !inv1.includes("떡");
  if (!p2) passed = false;
  messages.push(testLine(p2,
    '성공 후 인벤토리에서 "떡" 이 사라진다',
    '"떡" 없음', inv1));

  // 3. 성공 시 다른 아이템("레몬")은 유지된다
  var p3 = inv1.includes("레몬");
  if (!p3) passed = false;
  messages.push(testLine(p3,
    '성공 후 다른 아이템 "레몬" 은 그대로 있다',
    '"레몬" 유지', inv1));

  // 4. 틀린 아이템 → success: false
  var inv4 = ["칼", "레몬"];
  var r4;
  try { r4 = playTurn("입", "칼", inv4, PATH_PARTS, PATH_ITEMS); } catch(e) { r4 = undefined; }
  var p4 = r4 && r4.success === false;
  if (!p4) passed = false;
  messages.push(testLine(p4,
    'playTurn("입", "칼") — 틀린 짝 → success: false',
    '{ success: false, ... }', r4));

  // 5. 실패 시 아이템이 사라지지 않는다
  var p5 = inv4.includes("칼");
  if (!p5) passed = false;
  messages.push(testLine(p5,
    '실패 후 인벤토리에서 "칼" 이 사라지지 않는다',
    '"칼" 유지', inv4));

  // 6. 반환값에 message 가 있다
  var inv6 = ["떡"];
  var r6;
  try { r6 = playTurn("입", "떡", inv6, PATH_PARTS, PATH_ITEMS); } catch(e) { r6 = undefined; }
  var p6 = r6 && typeof r6.message === "string";
  if (!p6) passed = false;
  messages.push(testLine(p6,
    '반환값에 message 가 있고 string 이다',
    '{ success: ..., message: "..." }', r6));

  // 7. 실패 반환값에도 message 가 있다
  var inv7 = ["칼"];
  var r7;
  try { r7 = playTurn("입", "칼", inv7, PATH_PARTS, PATH_ITEMS); } catch(e) { r7 = undefined; }
  var p7 = r7 && typeof r7.message === "string" && r7.success === false;
  if (!p7) passed = false;
  messages.push(testLine(p7,
    '실패할 때도 message 가 있고 success 는 false 다',
    '{ success: false, message: "..." }', r7));

  // 8. 다른 올바른 짝도 동작한다: 눈 + 레몬
  var inv8 = ["레몬", "칼"];
  var r8;
  try { r8 = playTurn("눈", "레몬", inv8, PATH_PARTS, PATH_ITEMS); } catch(e) { r8 = undefined; }
  var p8 = r8 && r8.success === true && !inv8.includes("레몬");
  if (!p8) passed = false;
  messages.push(testLine(p8,
    'playTurn("눈", "레몬") — 눈+레몬 성공, 레몬 제거됨',
    '{ success: true }, 레몬 없음', JSON.stringify(inv8)));

  // 9. 코 + 캣닙 담배 (공백 포함 아이템)
  var inv9 = ["캣닙 담배"];
  var r9;
  try { r9 = playTurn("코", "캣닙 담배", inv9, PATH_PARTS, PATH_ITEMS); } catch(e) { r9 = undefined; }
  var p9 = r9 && r9.success === true && inv9.length === 0;
  if (!p9) passed = false;
  messages.push(testLine(p9,
    'playTurn("코", "캣닙 담배") — 공백 포함 아이템도 성공',
    '{ success: true }, 인벤토리 빔', r9));

  // 10. 반환값이 object 다 (null 아님)
  var inv10 = ["떡"];
  var r10;
  try { r10 = playTurn("입", "떡", inv10, PATH_PARTS, PATH_ITEMS); } catch(e) { r10 = undefined; }
  var p10 = r10 !== null && typeof r10 === "object" && "success" in r10;
  if (!p10) passed = false;
  messages.push(testLine(p10,
    '반환값이 { success, message } 형태의 object 다',
    'object with "success" key', r10));

  showResult("result-playTurn", passed, messages);
})();
