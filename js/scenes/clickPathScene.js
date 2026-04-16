// ============================================================
// clickPathScene.js
// 담당: 응
// 역할: 길 미니게임 — 버튼으로 플레이하는 텍스트 버전
//
// 규칙:
//   - 함수 이름, 파라미터 이름 바꾸지 말 것
//   - 함수 안의 로직만 채울 것
//   - path.js 의 함수를 호출해서 씁니다!
//
// 함수를 채우는 법:
//   1. 이 함수는 뭘 해야 하는가? (한 문장)
//   2. 그러려면 어떤 정보가 필요한가? (재료 나열)
//   3. 그 재료를 어디서 가져오는가? (변수/함수 찾기)
//   → 이 세 가지를 주석으로 먼저 쓴 다음에 코드로 번역하세요.
//
// 순서: Function 1 → 2 → 3 → 4 → 5 → 6 → 7 순서대로 풀어주세요.
//       각 함수 아래에 ✅ 확인법이 적혀있습니다.
//
// 새로 배우는 것:
//   document.getElementById("아이디")  — HTML 요소를 가져온다
//   요소.innerText = "텍스트"          — 요소 안의 글자를 바꾼다
//   버튼.disabled = true / false       — 버튼을 비활성화/활성화
//   요소.style.display = "none"        — 요소를 숨긴다
//   요소.style.display = "inline-block" — 요소를 다시 보여준다
//
// HTML 요소 아이디 목록:
//   "path-route-display"    — 경로 배열 표시하는 곳
//   "path-current-part"     — 현재 부위 크게 표시하는 곳
//   "path-message"          — 결과 메시지 표시하는 곳
//   "path-btn-advance"      — 전진 버튼
//   "path-btn-떡"           — 아이템 버튼
//   "path-btn-칼"           — 아이템 버튼
//   "path-btn-캣닙 담배"    — 아이템 버튼
//   "path-btn-레몬"         — 아이템 버튼
//   "path-btn-reset"        — 다시하기 버튼
// ============================================================

// ============================================================
// 게임 데이터 — data.js 에서 가져오는 것들
// ============================================================
// let PARTS = DATA.MONSTER_PARTS; // ["입", "꼬리", "코", "눈"]
// let ITEMS = DATA.MONSTER_ITEMS; // ["떡", "칼", "캣닙 담배", "레몬"]
// let ROUTE_LENGTH = DATA.CONFIG.ROUTE_LENGTH; // 5
// let START_INVENTORY = DATA.CONFIG.START_INVENTORY; // ["떡", "칼", "레몬"]

// ============================================================
// 게임 상태 변수 — 게임 진행 중에 바뀌는 값들
// ============================================================
let route = []; // generateRoute()가 만든 경로 배열
let currentStep = 0; // 현재 몇 번째 구간인지 (0부터 시작)
let inventory = []; // 플레이어가 가진 아이템들
let pathGameOver = false; // 게임이 끝났는지

// ============================================================
// initPathGame — 게임 시작 (이미 완성됨!)
// ============================================================
function initPathGame() {
    route = generateRoute(DATA.MONSTER_PARTS, DATA.CONFIG.ROUTE_LENGTH);
    currentStep = 0;
    inventory = DATA.CONFIG.START_INVENTORY.slice();
    pathGameOver = false;

    showRoute();
    showCurrentPart();
    showMessageText("아이템 버튼을 눌러서 부위에 맞는 아이템을 사용하세요!");

    // 아이템 버튼 동적 생성
    let btnContainer = document.getElementById("path-item-buttons");
    if (btnContainer) {
        btnContainer.innerHTML = "";
        for (let i = 0; i < DATA.MONSTER_ITEMS.length; i++) {
            let btn = document.createElement("button");
            btn.id = "path-btn-" + DATA.MONSTER_ITEMS[i];
            btn.className = "item-btn";
            btn.innerText = DATA.MONSTER_ITEMS[i];
            btn.addEventListener("click", function () {
                onItemClick(DATA.MONSTER_ITEMS[i]);
            });
            btnContainer.appendChild(btn);
        }
    }

    setPathItemButtons(false);
    document.getElementById("path-btn-advance").disabled = true;
    let resetBtn = document.getElementById("path-btn-reset");
    if (resetBtn) resetBtn.style.display = "none";
}

// ============================================================
// resetPathGame — 다시 하기 (이미 완성됨!)
// ============================================================
function resetPathGame() {
    initPathGame();
}

// ============================================================
// setPathItemButtons — 아이템 버튼 전체 활성화/비활성화 (이미 완성됨!)
// ============================================================
function setPathItemButtons(disabled) {
    for (let i = 0; i < DATA.MONSTER_ITEMS.length; i++) {
        document.getElementById("path-btn-" + DATA.MONSTER_ITEMS[i]).disabled =
            disabled;
    }
}

// ============================================================
// Function 1: 메시지 텍스트 표시
// ============================================================
// 하는 것: 전달받은 텍스트를 메시지 영역에 보여준다.
//
// 인풋: text (문자열)
// 필요한 재료: document.getElementById("message"), .innerText
// 리턴: 없음

function showMessageText(text) {
    // 여기를 채우세요
    document.getElementById("path-message").innerText = text;
}

// ✅ 확인법: test_path_game.html 을 브라우저에서 열어보세요.
//    → 버튼 위쪽 노란 메시지 영역에
//      "아이템 버튼을 눌러서 부위에 맞는 아이템을 사용하세요!"
//      가 보이면 성공!
//    → 빈칸이면 아직 안 된 것.

// ============================================================
// Function 2: 부위 텍스트 표시
// ============================================================
// 하는 것: 전달받은 텍스트를 화면 가운데 부위 영역에 보여준다.
//          (showMessageText와 같은 패턴, 대상 요소만 다름)
//
// 인풋: text (문자열)
// 필요한 재료: document.getElementById("path-current-part"), .innerText
// 리턴: 없음

function showPartText(text) {
    // 여기를 채우세요
}

// ✅ 확인법: F12 → Console 에서 직접 테스트:
//      showPartText("테스트")  → 화면 가운데에 "테스트"가 크게 뜨면 성공!
//      showPartText("")        → 글자가 사라지면 성공!

// ============================================================
// Function 3: 경로 텍스트 표시
// ============================================================
// 하는 것: 전달받은 텍스트를 화면 상단 경로 영역에 보여준다.
//          (showMessageText와 같은 패턴, 대상 요소만 다름)
//
// 인풋: text (문자열)
// 필요한 재료: document.getElementById("path-route-display"), .innerText
// 리턴: 없음

function showRouteText(text) {
    // 여기를 채우세요
}

// ✅ 확인법: F12 → Console 에서 직접 테스트:
//      showRouteText("입  꼬리  눈")  → 상단 파란 박스에 텍스트가 뜨면 성공!

// ============================================================
// Function 4: 현재 부위 보여주기
// ============================================================
// 하는 것: 지금 구간의 부위 이름을 화면 가운데에 크게 보여준다.
//          경로가 끝났으면 비워둔다.
//
// 필요한 재료: route 배열, currentStep, showPartText(함수)
// 리턴: 없음

function showCurrentPart() {
    // 여기를 채우세요
}

// ✅ 확인법: 브라우저를 새로고침하세요.
//    → 화면 가운데에 빨간 글씨로 부위 이름 (입/꼬리/코/눈 중 하나)이
//      크게 보이면 성공!
//    → 아무것도 안 보이면 아직 안 된 것.

// ============================================================
// Function 5: 경로 보여주기
// ============================================================
// 하는 것: route 배열을 텍스트로 만들어서 화면 상단에 보여준다.
//          현재 위치에는 ▼ 를 붙여서 어디까지 왔는지 표시한다.
//
// 예시: route = ["입", "꼬리", "눈", "입", "코"], currentStep = 2
//       → "입  꼬리  ▼눈  입  코"
//
// 필요한 재료: route 배열, currentStep, showRouteText(함수)
// 리턴: 없음

function showRoute() {
    // 여기를 채우세요
}

// ✅ 확인법: 브라우저를 새로고침하세요.
//    → 상단 파란 박스에 경로가 보이고,
//      첫 번째 부위 앞에 ▼ 가 붙어있으면 성공!
//    → "경로 로딩중..." 이 그대로이면 아직 안 된 것.
//    → ▼ 없이 부위만 나열되면 currentStep 비교 부분을 확인하세요.

// ============================================================
// Function 6: 아이템 버튼 클릭 처리
// ============================================================
// 하는 것: 아이템 버튼을 눌렀을 때,
//          지금 부위에 이 아이템이 맞는지 확인하고,
//          맞으면 → 메시지 보여주고, 아이템 버튼 끄고, 전진 버튼 켜기
//          틀리면 → 메시지만 보여주기 (다시 시도 가능)
//
// 인풋: itemName (문자열 — 어떤 아이템 버튼을 눌렀는지)
// 필요한 재료: route[currentStep], inventory, PARTS, DATA.MONSTER_ITEMS,
//             playTurn(함수, path.js), showMessageText(함수), setPathItemButtons(함수)
// playTurn 이 돌려주는 값: .success (true/false), .message (문자열)
// HTML 요소: "path-btn-advance"
// 리턴: 없음

function onItemClick(itemName) {
    // 여기를 채우세요
}

// ✅ 확인법: 브라우저에서 화면 가운데 부위를 보고 맞는 아이템 버튼을 누르세요.
//    (입→떡, 꼬리→칼, 코→캣닙 담배, 눈→레몬)
//    → 맞는 버튼 클릭: 메시지에 "사용 성공!" 이 뜨고,
//      아이템 버튼들이 회색으로 비활성화되고,
//      전진 버튼이 클릭 가능해지면 성공!
//    → 틀린 버튼 클릭: "효과가 없었다..." 메시지가 뜨고,
//      아이템 버튼이 여전히 눌리면 성공!
//    → 아무 반응이 없으면 playTurn 호출 부분을 확인하세요.

// ============================================================
// Function 7: 전진 버튼 클릭 처리
// ============================================================
// 하는 것: 다음 구간으로 이동한다.
//          경로가 끝났으면 → 클리어 처리 (부위 비우기, 메시지, 버튼 끄기,
//                           다시하기 버튼 보여주기, pathGameOver = true)
//          아직 남았으면   → 경로 표시 업데이트, 다음 부위 보여주기,
//                           아이템 버튼 다시 켜기, 전진 버튼 끄기
//
// 필요한 재료: currentStep, route.length,
//             showRoute(함수), showCurrentPart(함수),
//             showMessageText(함수), setPathItemButtons(함수)
// HTML 요소: "path-btn-advance", "path-btn-reset"
// 리턴: 없음

function onAdvanceClick() {
    // 여기를 채우세요
}

// ✅ 확인법: Function 6까지 성공한 상태에서 전진 버튼을 누르세요.
//    → 상단 경로에서 ▼ 가 다음 부위로 이동하고,
//      화면 가운데에 새로운 부위가 나타나고,
//      아이템 버튼이 다시 활성화되면 성공!
//    → 5구간 전부 클리어하면:
//      "🎉 클리어!" 메시지가 뜨고,
//      다시하기 버튼이 나타나면 완벽!

// ============================================================
// 이벤트 연결 — 이미 완성됨!
// ============================================================
window.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("path-btn-reset") === null) return;
    if (document.getElementById("path-btn-advance") === null) return;

    document
        .getElementById("path-btn-advance")
        .addEventListener("click", function () {
            onAdvanceClick();
        });

    document
        .getElementById("path-btn-reset")
        .addEventListener("click", function () {
            resetPathGame();
        });

    initPathGame();
});
