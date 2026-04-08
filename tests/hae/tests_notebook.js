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

// ============================================
// Function 1 테스트: formatTipLine
// ============================================
(function testFormatTipLine() {
  var messages = [];
  var passed = true;

  var t1 = formatTipLine("입", "떡");
  var p1 = t1 === "입 → 떡";
  if (!p1) passed = false;
  messages.push(testLine(p1,
    '✍️ formatTipLine("입", "떡")',
    '"입 → 떡"', t1,
    'return input + " → " + output; 형태인지 확인하세요. 화살표(→) 양쪽에 공백이 있어야 합니다.'));

  var t2 = formatTipLine("머리", "검");
  var p2 = t2 === "머리 → 검";
  if (!p2) passed = false;
  messages.push(testLine(p2,
    '✍️ formatTipLine("머리", "검")',
    '"머리 → 검"', t2,
    'return input + " → " + output; 형태인지 확인하세요.'));

  var t3 = formatTipLine("꼬리", "방패");
  var p3 = typeof t3 === "string" && t3.indexOf("→") !== -1;
  if (!p3) passed = false;
  messages.push(testLine(p3,
    '✍️ 결과에 "→" 기호가 포함되어 있는지',
    '"→" 포함', typeof t3 === "string" ? t3 : t3,
    '"->" 나 "=>" 가 아니라 특수문자 → 를 써야 합니다. 이 힌트에서 복사하세요: →'));

  var t4 = formatTipLine("눈", "활");
  var p4 = typeof t4 === "string" && t4.indexOf("눈") < t4.indexOf("활");
  if (!p4) passed = false;
  messages.push(testLine(p4,
    '✍️ input이 앞, output이 뒤에 오는지',
    '"눈"이 "활"보다 앞', t4,
    '함수 선언의 매개변수 순서를 확인하세요. 첫 번째가 input, 두 번째가 output입니다.'));

  var t5 = formatTipLine("뾰족한발톱", "독버섯파이");
  var p5 = t5 === "뾰족한발톱 → 독버섯파이";
  if (!p5) passed = false;
  messages.push(testLine(p5,
    '✍️ formatTipLine("뾰족한발톱", "독버섯파이") — 긴 단어도 정확한지',
    '"뾰족한발톱 → 독버섯파이"', t5,
    '단어를 직접 쓰지 말고 변수 input, output을 그대로 이어붙여야 합니다.'));

  var t6 = formatTipLine("A", "B");
  var p6 = typeof t6 === "string";
  if (!p6) passed = false;
  messages.push(testLine(p6,
    '✍️ 반환값이 문자열(string)인지',
    '"string"', typeof t6,
    'console.log만 쓰고 return을 빠뜨리지 않았는지 확인하세요.'));

  showResult("result1", passed, messages);
})();

// ============================================
// Function 2 테스트: showNotebook
// ============================================
(function testShowNotebook() {
  var messages = [];
  var passed = true;

  var tips3 = [
    { input: "입", output: "떡" },
    { input: "머리", output: "검" },
    { input: "꼬리", output: "방패" }
  ];

  var t1 = showNotebook(tips3);
  var p1 = typeof t1 === "string";
  if (!p1) passed = false;
  messages.push(testLine(p1,
    '📋 반환값이 문자열(string)인지',
    '"string"', typeof t1,
    'console.log가 아니라 return으로 문자열을 돌려줘야 합니다.'));

  var p2 = typeof t1 === "string"
    && t1.indexOf("입 → 떡") !== -1
    && t1.indexOf("머리 → 검") !== -1
    && t1.indexOf("꼬리 → 방패") !== -1;
  if (!p2) passed = false;
  messages.push(testLine(p2,
    '📋 3개 팁("입 → 떡", "머리 → 검", "꼬리 → 방패") 이 모두 포함되는지',
    '세 줄 모두 포함', t1,
    'for문이 tips.length번 돌고 있는지 확인하세요. formatTipLine(tips[i].input, tips[i].output) 결과를 result에 이어붙이고 있나요?'));

  var p3 = typeof t1 === "string" && t1.indexOf("\n") !== -1;
  if (!p3) passed = false;
  messages.push(testLine(p3,
    '📋 줄바꿈(\\n)으로 구분되는지',
    '"\\n" 포함', typeof t1 === "string" ? (t1.indexOf("\n") !== -1 ? "\\n 있음" : "\\n 없음") : t1,
    '각 팁 줄 뒤에 "\\n"을 붙여야 합니다. 예: result += line + "\\n"'));

  var p4 = typeof t1 === "string"
    && t1.indexOf("입 → 떡") < t1.indexOf("머리 → 검")
    && t1.indexOf("머리 → 검") < t1.indexOf("꼬리 → 방패");
  if (!p4) passed = false;
  messages.push(testLine(p4,
    '📋 팁이 배열 순서대로 나오는지',
    '입→떡 먼저, 꼬리→방패 마지막', t1,
    'for문을 i=0부터 tips.length 미만까지 순서대로 돌아야 합니다.'));

  var tips1 = [{ input: "배", output: "사과" }];
  var t5 = showNotebook(tips1);
  var p5 = typeof t5 === "string" && t5.indexOf("배 → 사과") !== -1;
  if (!p5) passed = false;
  messages.push(testLine(p5,
    '📋 팁 1개만 있을 때도 동작하는지',
    '"배 → 사과" 포함', t5,
    'for문이 배열 길이에 맞게 돌고 있는지 확인하세요. tips.length가 1이면 1번만 돌아야 합니다.'));

  var tipsSingle = [{ input: "X", output: "Y" }];
  var expected = formatTipLine("X", "Y");
  var t6 = showNotebook(tipsSingle);
  var p6 = typeof t6 === "string" && t6.indexOf(expected) !== -1;
  if (!p6) passed = false;
  messages.push(testLine(p6,
    '📋 showNotebook가 formatTipLine 결과를 사용하는지 (연동 확인)',
    '"' + expected + '" 포함', t6,
    'showNotebook 안에서 formatTipLine(tips[i].input, tips[i].output) 을 호출해서 그 결과를 이어붙이세요.'));

  var origTips = [
    { input: "입", output: "떡" },
    { input: "머리", output: "검" }
  ];
  var origLen = origTips.length;
  showNotebook(origTips);
  var p7 = origTips.length === origLen;
  if (!p7) passed = false;
  messages.push(testLine(p7,
    '🛡️ 원본 tips 배열이 바뀌지 않는지 (부작용 검사)',
    '길이 ' + origLen + ' 유지', '길이: ' + origTips.length,
    'tips 배열은 읽기만 해야 합니다. tips.push() 나 tips.splice() 를 쓰지 않았는지 확인하세요.'));

  showResult("result2", passed, messages);
})();

console.log("=== notebook.js 테스트 완료! 브라우저 화면에서 결과를 확인하세요 ===");
