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
// 채우기 전에:
//   → "길 씬 설계 문서 (path_scene_design.md)" 를 먼저 읽어주세요.
//   → 특히 5번 섹션 "버튼이 언제 켜지고 꺼지는지" 표가
//     onItemClick / onWalkClick 안에 뭘 써야 하는지 알려줍니다.
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
//   요소.innerText = "텍스트"           — 요소 안의 글자를 바꾼다
//   버튼.disabled = true  → disabled (꺼짐)
//   버튼.disabled = false → enabled (켜짐)
//   요소.style.display = "none"         — 요소를 숨긴다
//   요소.style.display = "inline-block" — 요소를 다시 보여준다
//
// HTML 요소 아이디 목록:
//   "path-route-display"    — 경로 배열 표시하는 곳
//   "path-current-part"     — 현재 부위 크게 표시하는 곳
//   "path-message"          — 결과 메시지 표시하는 곳
//   "path-btn-walk"         — 걸어가기 버튼
//   "path-btn-떡"           — 아이템 버튼
//   "path-btn-칼"           — 아이템 버튼
//   "path-btn-담배"         — 아이템 버튼
//   "path-btn-레몬"         — 아이템 버튼
//   "path-btn-reset"        — 다시하기 버튼
// ============================================================

// ============================================================
// 게임 데이터 — data.js 에서 가져오는 것들
// ============================================================
// DATA.MONSTER_PARTS          // ["입", "꼬리", "코", "눈"]
// DATA.MONSTER_ITEMS          // ["떡", "칼", "담배", "레몬"]
// DATA.CONFIG.ROUTE_LENGTH    // 5
// DATA.CONFIG.START_INVENTORY // ["떡", "칼", "담배", "레몬"]
//
// 부위 ↔ 아이템 짝 (같은 인덱스끼리):
//   입 ↔ 떡, 꼬리 ↔ 칼, 코 ↔ 담배, 눈 ↔ 레몬

// ============================================================
// 게임 상태 변수 — 게임 진행 중에 바뀌는 값들
// ============================================================
let route = []; // generateRoute()가 만든 경로 배열
let currentStep = 0; // 현재 몇 번째 구간인지 (0부터 시작)
let inventory = []; // 플레이어가 가진 아이템들
let isPathCleared = false; // 길 씬을 클리어했는지 (true/false)

// 추가
function createRoute(numOfMonsterOccurance, totalNumOfSteps, numOfSafeStart) {
    // 몬스터 출현 횟수와 전체 발걸음을 가지고 최종 루트를 만든다.
    let numOfSafeLeftover =
        totalNumOfSteps - numOfMonsterOccurance - numOfSafeStart - 1;
    DATA.CONFIG.ROUTE_LENGTH = totalNumOfSteps;
    let safeLeftoverArr = Array(numOfSafeLeftover).fill("");
    let safeStartArr = Array(numOfSafeStart).fill("");

    // 랜덤 괴물 리스트
    let randomMonsterRoute = generateRoute(
        DATA.MONSTER_PARTS,
        numOfMonsterOccurance,
    );
    // 랜덤괴물리스트+안전구간리스트 -> 랜덤화
    randomMonsterRoute = shuffle(randomMonsterRoute.concat(safeLeftoverArr));
    console.log(
        "정말 랜덤한가?" +
            randomMonsterRoute +
            "길이" +
            randomMonsterRoute.length,
    );

    // 처음 시작할때 무조건 안전한 구간의 횟수: numOfSafeStart -> 랜덤화리스트 앞에 붙임
    let finalRoute = safeStartArr.concat(randomMonsterRoute);
    // 마지막도 무조건 안전한 구간 (일단은)
    finalRoute.push("");

    return finalRoute;
}

// ============================================================
// initPathGame — 게임 시작 (이미 완성됨!)
// ============================================================
function initPathGame() {
    // 시작 값들 초기화

    // 모든 스텝에 몬스터 출현:
    // DATA.ROUTE = generateRoute(DATA.MONSTER_PARTS, DATA.CONFIG.ROUTE_LENGTH);

    // 게임 최종용 (몬스터 나오는 구간:5, 안나오는 구간 구분 있음(총 10걸음))
    DATA.ROUTE = createRoute(5, 10, 2);
    route = DATA.ROUTE;
    console.log("최종 루트:" + DATA.ROUTE + DATA.ROUTE.length + "걸음");
    currentStep = 0;
    inventory = DATA.CONFIG.START_INVENTORY.slice();
    isPathCleared = false;

    // 화면에 보여주기
    // showRoute();
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

    // 시작 상태: 아이템 버튼 enabled(켜짐), 걸어가기 버튼 disabled(꺼짐)
    setItemButtonsEnabled(true);
    // 현재 부위에 따라 걸어가기 버튼 설정 (맨처음은 항상 안전구간이라 걸을 수 있음)
    setWalkButtonStatus(DATA.CURRENT_PART);

    // 다시하기 버튼은 숨김 (클리어하면 다시 보임)
    let resetBtn = document.getElementById("path-btn-reset");
    if (resetBtn) resetBtn.style.display = "none";

    // 마트 들어가기 버튼 숨김 (마지막 스텝에 보임)
    let martBtn = document.getElementById("path-btn-enter");
    if (martBtn) martBtn.style.display = "none";
}

// ============================================================
// resetPathGame — 다시 하기 (이미 완성됨!)
// ============================================================
function resetPathGame() {
    initPathGame();
}

// ============================================================
// setItemButtonsEnabled — 아이템 버튼 전체 켜기/끄기 (이미 완성됨!)
// ============================================================
// isEnabled 가 true  → 모든 아이템 버튼 enabled (클릭 가능)
// isEnabled 가 false → 모든 아이템 버튼 disabled (클릭 불가)
function setItemButtonsEnabled(isEnabled) {
    for (let i = 0; i < DATA.MONSTER_ITEMS.length; i++) {
        document.getElementById("path-btn-" + DATA.MONSTER_ITEMS[i]).disabled =
            !isEnabled;
    }
}

// 추가
function setWalkButtonStatus(currPart) {
    // 현재 부위에 따라서 걷기 활성화/비활성화
    if (currPart === "") {
        // 안전구간: 걸을 수 있음
        document.getElementById("path-btn-walk").disabled = false;
    } else {
        //괴물 부위 출현: 걸을 수 없음(아이템이용시까지)
        document.getElementById("path-btn-walk").disabled = true;
    }
}
// ============================================================
// Function 1: 메시지 텍스트 표시
// ============================================================
// 하는 것: 전달받은 텍스트를 메시지 영역에 보여준다.
//
// 인풋: text (문자열)
// 필요한 재료: document.getElementById("path-message"), .innerText
// 리턴: 없음

function showMessageText(text) {
    // fullgame.html에서는 이용 안함
    if (document.getElementById("path-message") === null) return;

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
    // fullgame.html에는 혹시 없을 수도 있어서
    if (document.getElementById("path-current-part") === null) return;

    document.getElementById("path-current-part").innerText = text;
}

// ✅ 확인법: F12 → Console 에서 직접 테스트:
//      showPartText("테스트")  //→ 화면 가운데에 "테스트"가 크게 뜨면 성공!
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
    // fullgame.html에서는 이용 안함
    if (document.getElementById("path-route-display") === null) return;

    document.getElementById("path-route-display").innerText = text;
}

// ✅ 확인법: F12 → Console 에서 직접 테스트:
//      showRouteText("입\t꼬리\t눈")  //→ 상단 파란 박스에 텍스트가 뜨면 성공!

// ============================================================
// Function 4: 현재 부위 보여주기
// ============================================================
// 하는 것: 지금 구간의 부위 이름을 화면 가운데에 크게 보여준다.
//          경로가 끝났으면 비워둔다.
//
// 필요한 재료: route 배열, currentStep, showPartText(함수)
// 리턴: 없음

function showCurrentPart() {
    if (currentStep < route.length) {
        // 현재 부위 가져오기
        let partName = route[currentStep];
        // 추가: data.js에 현재 부위 업데이트하기
        updateCurrentMonster(partName);

        // 화면에 크게 표시하기- fullgame.html에서는 안써서 코멘트 처리
        // showPartText(partName);
    } else {
        showPartText("");
    }
}

// ✅ 확인법: 브라우저를 새로고침하세요.
//    → 화면 가운데에 빨간 글씨로 부위 이름 (입/꼬리/코/눈 중 하나)이
//      크게 보이면 성공!
//    → 아무것도 안 보이면 아직 안 된 것.

// 추가: data.js에 현재 몬스터 부위을 ->  CURRENT_PART에 저장하기
// + 그에 대응하는 올바른 아이템을 찾아서 CURRENT_PART_CORRECT_ITEM을 저장하기
// 리턴 없음
function updateCurrentMonster(targetPart) {
    if (targetPart === "") {
        // 안전한 구간 (몬스터 출현 x)
        DATA.CURRENT_PART_CORRECT_ITEM = "";
    } else {
        // 몬스터 출현
        let targetIndex = findPartIndex(DATA.MONSTER_PARTS, targetPart);
        DATA.CURRENT_PART_CORRECT_ITEM = DATA.MONSTER_ITEMS[targetIndex];
    }
    DATA.CURRENT_PART = targetPart;
}

// ============================================================
// Function 5: 경로 보여주기
// ============================================================
// 하는 것: route 배열을 텍스트로 만들어서 화면 상단에 보여준다.
//          현재 위치에는 ▼ 를 붙여서 어디까지 왔는지 표시한다.
//          부위 사이는 탭("\t")으로 구분한다.
//
// 예시: route = ["입", "꼬리", "눈", "입", "코"], currentStep = 2
//       → "입\t꼬리\t▼눈\t입\t코"
//
// 필요한 재료: route 배열, currentStep, showRouteText(함수)
// 리턴: 없음
//
// 꼭 써야 하는 것:
//   빈 문자열로 시작해서, for 문으로 route 를 돌면서 한 조각씩 이어붙이기
//   현재 위치(currentStep)에는 "▼" 를 붙일 것
//   마지막 부위 뒤에는 "\t" 가 붙지 않도록 할 것
//
// 생각해볼 것:
//   - "▼" 는 언제 어떻게 붙이지?
//   - "\t" 를 붙이면 안 되는 건 언제지? (힌트: 마지막 인덱스는 route.length - 1)
//
// 참고: "\t" 는 탭 문자.

function showRoute() {
    let routeName = "";
    for (let i = 0; i < route.length; i++) {
        if (i === currentStep) {
            routeName += "▼";
        }
        routeName += route[i];
        if (i < route.length - 1) {
            routeName += "\t";
        }
    }
    showRouteText(routeName);
}

// ✅ 확인법: 브라우저를 새로고침하세요.
//    → 상단 파란 박스에 경로가 보이고,
//      첫 번째 부위 앞에 ▼ 가 붙어있으면 성공!
//    → "경로 로딩중..." 이 그대로이면 아직 안 된 것.
//    → ▼ 없이 부위만 나열되면 currentStep 비교 부분을 확인하세요.

// ============================================================
// Function 6: 아이템 버튼 클릭 처리
// ============================================================
// 하는 것: 아이템 버튼이 클릭됐을 때 호출된다.
//          playTurn 으로 짝을 확인하고, 결과 메시지를 화면에 띄우고,
//          성공이면 아이템 버튼들을 끄고 걸어가기 버튼을 켠다.
//          실패면 메시지만 바꾸고 버튼 상태는 그대로 둔다 (다시 시도 가능).
//
// 인풋: itemName (문자열 — 어떤 아이템 버튼을 눌렀는지)
// 필요한 재료: route[currentStep], inventory, DATA.MONSTER_PARTS, DATA.MONSTER_ITEMS,
//             playTurn(함수, path.js), showMessageText(함수), setItemButtonsEnabled(함수)
// playTurn 이 돌려주는 값: { success: true/false, message: "..." }
// HTML 요소: "path-btn-walk"
// 리턴: 없음
//
// 꼭 써야 하는 것:
//   1. playTurn(...) 호출해서 결과 저장
//      → 리턴값은 { success, message } 형태 (path.js 참고)
//
//   2. 결과 메시지를 showMessageText 로 띄우기
//
//   3. 성공이면:
//      → 아이템 버튼들 disabled (setItemButtonsEnabled 사용)
//      → 걸어가기 버튼 enabled
//
//   4. 실패면 추가 동작 없음 (버튼 상태 그대로)

function onItemClick(itemName) {
    let currentPart = route[currentStep];
    let { success, message } = playTurn(
        currentPart,
        itemName,
        inventory,
        DATA.MONSTER_PARTS,
        DATA.MONSTER_ITEMS,
    );

    showMessageText(message);

    if (success === true) {
        setItemButtonsEnabled(false);
        document.getElementById("path-btn-walk").disabled = false;
        document.getElementById("monster-layer").style.display = "none";
    }
}

// ✅ 확인법: 브라우저에서 화면 가운데 부위를 보고 맞는 아이템 버튼을 누르세요.
//    (입→떡, 꼬리→칼, 코→담배, 눈→레몬)
//    → 맞는 버튼 클릭: 메시지에 "사용 성공!" 이 뜨고,
//      아이템 버튼들이 회색으로 비활성화되고,
//      걸어가기 버튼이 클릭 가능해지면 성공!
//    → 틀린 버튼 클릭: "효과가 없었다..." 메시지가 뜨고,
//      아이템 버튼이 여전히 눌리면 성공!
//    → 아무 반응이 없으면 playTurn 호출 부분을 확인하세요.

// ============================================================
// Function 7: 걸어가기 버튼 클릭 처리
// ============================================================
// 하는 것: 다음 구간으로 이동한다.
//          경로가 끝났으면 → 클리어 처리 (부위 비우기, 메시지, 버튼 끄기,
//                           다시하기 버튼 보여주기, isPathCleared = true)
//          아직 남았으면   → 경로 표시 업데이트, 다음 부위 보여주기,
//                           아이템 버튼 다시 켜기, 걸어가기 버튼 끄기
//
// 필요한 재료: currentStep, route.length,
//             showRoute(함수), showCurrentPart(함수),
//             showMessageText(함수), setItemButtonsEnabled(함수)
// HTML 요소: "path-btn-walk", "path-btn-reset"
// 리턴: 없음
//
// 꼭 써야 하는 것:
//   1. currentStep 을 1 증가
//
//   2. if (currentStep < route.length) — 아직 남음:
//        → 경로 / 부위 다시 그리기
//      등.. 문서를 보고 채워봐욥
//
//   3. else — 마지막 걸음이었음 (클리어):
//        // 문서를 보고 채워보세욥
//
//        // LATER: 풀게임 연동은 점이 채움. 여기는 무시하세욥
//        //   if (typeof onPathClear === "function") {
//        //       document.getElementById("path-btn-enter-shop").style.display = "inline-block";
//        //   }

function onWalkClick() {
    currentStep++;
    if (currentStep < route.length) {
        // 걷는 동안
        // showRoute();
        showCurrentPart();
        setItemButtonsEnabled(true);
        setWalkButtonStatus(DATA.CURRENT_PART);
    } else {
        // ─── 여기가 "마지막 걸음 = 클리어" 처리 ───
        console.log("마지막이야" + currentStep);
        isPathCleared = true;
        // showRoute();
        // showPartText("");
        setItemButtonsEnabled(false);

        // 풀게임 vs 독립 미니게임 분기
        if (typeof onPathClear === "function") {
            // 풀게임: fullgame.js 가 씬 전환 담당
            showMessageText("마트 도착!");
            console.log("마트도착..");
            // 걸어가기 버튼 비활성화, 숨기기
            document.getElementById("path-btn-walk").disabled = true;
            document.getElementById("path-monster-area").style.display = "none";
            document.getElementById("path-button-area").style.display = "none";

            // 마트 들어가기 버튼 활성화
            let martEnterBtn = document.getElementById("path-btn-enter");
            martEnterBtn.disabled = false;
            martEnterBtn.style.display = "inline-block";
            // onPathClear();
        } else {
            // 독립 미니게임: 다시하기 버튼 표시
            showMessageText("클리어!");
            let resetBtn = document.getElementById("path-btn-reset");
            if (resetBtn) resetBtn.style.display = "inline-block";
        }
    }
}
// ✅ 확인법: Function 6까지 성공한 상태에서 걸어가기 버튼을 누르세요.
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
    if (document.getElementById("path-btn-walk") === null) return;
    if (document.getElementById("path-current-part") === null) return;
    if (document.getElementById("path-route-display") === null) return;
    if (document.getElementById("path-message") === null) return;
    if (document.getElementById("path-current-part") === null) return;

    document
        .getElementById("path-btn-walk")
        .addEventListener("click", function () {
            onWalkClick();
        });

    document
        .getElementById("path-btn-reset")
        .addEventListener("click", function () {
            resetPathGame();
        });

    initPathGame();
});
