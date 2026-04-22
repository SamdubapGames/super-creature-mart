// ============================================================
// clickShopScene.js
// 담당: 헤
// 역할: 상점 미니게임 — 버튼으로 플레이하는 텍스트 버전
//
// 규칙:
//   - 함수 이름, 파라미터 이름 바꾸지 말 것
//   - 함수 안의 로직만 채울 것
//   - shop.js 의 함수를 호출해서 씁니다!
//
// 채우기 전에:
//   → "상점 씬 설계 문서 (shop_scene_design.md)" 를 먼저 읽어주세요.
//   → 특히 5번 섹션 "버튼이 언제 켜지고 꺼지는지" 표가
//     onBuyItem / onCheckout 안에 뭘 써야 하는지 알려줍니다.
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
//   "shop-message"             — 결과 메시지 표시하는 곳
//   "shop-remaining-display"   — 남은 예산 표시하는 곳
//   "shop-purchased-display"   — 구매한 목록 표시하는 곳
//   "shop-menu-display"        — 메뉴판 표시하는 곳
//   "shop-receipt-display"     — 영수증 표시하는 곳
//   "shop-btn-show-menu"       — 마트 물건 리스트 보기 버튼
//   "shop-btn-점라면(낱개)"    — 구매 버튼들
//   "shop-btn-감자"
//   "shop-btn-아이스크림 대파맛"
//   "shop-btn-레몬"
//   "shop-btn-두부"
//   "shop-btn-탄산수"
//   "shop-btn-checkout"        — 구매 완료 버튼
//   "shop-btn-reset"           — 다시하기 버튼
// ============================================================

// ============================================================
// 게임 데이터 — data.js 에서 가져오는 것들
// ============================================================
// DATA.SHOP_ITEMS             // ["점라면(낱개)", "감자", ..., "탄산수"]
// DATA.SHOP_PRICES            // [5000, 8000, 6000, 10000, 12000, 500]
// DATA.SHOP_STOCK             // [3, 5, 0, 2, 4, 1]
// DATA.CONFIG.STARTING_BUDGET // 30000

// ============================================================
// 게임 상태 변수 — 게임 진행 중에 바뀌는 값들
// ============================================================
let remainingBudget = 0; // 남은 예산
let purchased = []; // 구매한 목록 (산 아이템 이름 배열)
let stock = []; // 현재 재고 (구매할 때마다 줄어듦)
let isShopCheckedOut = false; // 구매 완료했는지 (true/false)

// ============================================================
// initShopGame — 게임 시작 (이미 완성됨!)
// ============================================================
function initShopGame() {
    remainingBudget = DATA.CONFIG.STARTING_BUDGET;
    purchased = [];
    stock = DATA.SHOP_STOCK.slice();
    isShopCheckedOut = false;

    // 1. 구매 버튼 동적 생성 (제일 먼저!)
    let btnContainer = document.getElementById("shop-item-buttons-container");
    btnContainer.innerHTML = "";

    for (let i = 0; i < DATA.SHOP_ITEMS.length; i++) {
        const itemName = DATA.SHOP_ITEMS[i];

        // 1) 행 전체 래퍼 (flex 컨테이너)
        const row = document.createElement("div");
        row.className = "shop-item-btn-row";

        // 2) 아이템 아이콘
        const icon = document.createElement("img");
        icon.className = "shop-item-icon";
        icon.src = "";
        if (DATA.SHOP_ITEM_IMAGES[itemName]) {
            icon.src = DATA.SHOP_ITEM_IMAGES[itemName];
        } else {
            icon.src = DATA.SHOP_ITEM_IMAGES["dummy"];
        }

        // 3) 아이템 이름
        const label = document.createElement("p");
        label.className = "shop-item-name";
        label.innerText = itemName;

        // 4) 사기 버튼
        const btn = document.createElement("button");
        btn.id = "shop-btn-" + itemName;
        btn.className = "item-btn";
        btn.innerText = "구매하기";
        btn.addEventListener("click", function () {
            onBuyItem(itemName);
        });

        // 5) 행에 순서대로 붙이기 (왼쪽 → 오른쪽)
        row.appendChild(icon);
        row.appendChild(label);
        row.appendChild(btn);

        // 6) 컨테이너에 행 붙이기
        btnContainer.appendChild(row);
    }

    // 2. 버튼 생성 끝난 뒤에 비활성화 (리스트 보기 누르기 전까지 못 삼)
    setShopItemButtonsEnabled(false);

    // 3. 화면 그리기
    showBudget();
    showPurchased();
    showShopMessageText("마트에 오신 걸 환영합니다! 물건 리스트를 확인하세요.");

    // 4. 나머지 초기화
    document.getElementById("shop-menu-display").innerText = "";
    document.getElementById("shop-receipt-display").innerText = "";
    document.getElementById("shop-btn-checkout").disabled = true;
    document.getElementById("shop-btn-show-menu").disabled = false;
    let resetBtn = document.getElementById("shop-btn-reset");
    if (resetBtn) resetBtn.style.display = "none";
}

// ============================================================
// resetShopGame — 다시 하기 (이미 완성됨!)
// ============================================================
function resetShopGame() {
    initShopGame();
}

// ============================================================
// setShopItemButtonsEnabled — 구매 버튼 전체 켜기/끄기 (이미 완성됨!)
// ============================================================
// isEnabled 가 true  → 모든 구매 버튼 enabled (클릭 가능)
// isEnabled 가 false → 모든 구매 버튼 disabled (클릭 불가)
function setShopItemButtonsEnabled(isEnabled) {
    for (let i = 0; i < DATA.SHOP_ITEMS.length; i++) {
        document.getElementById("shop-btn-" + DATA.SHOP_ITEMS[i]).disabled =
            isEnabled;
    }
}

// ============================================================
// Function 1: 메시지 텍스트 표시 (이미 완성됨! 참고용)
// ============================================================
// 하는 것: 전달받은 텍스트를 메시지 영역에 보여준다.
//
// 인풋: text (문자열)
// 필요한 재료: document.getElementById("shop-message"), .innerText
// 리턴: 없음

function showShopMessageText(text) {
    document.getElementById("shop-message").innerText = text;
}

// ✅ 확인법: test_shop_game.html 을 브라우저에서 열어보세요.
//    → 메시지 영역에 환영 메시지가 보이면 성공!

// ============================================================
// Function 2: 남은 예산 텍스트 표시
// ============================================================
// 하는 것: 전달받은 텍스트를 남은 예산 영역에 보여준다.
//          (showShopMessageText와 같은 패턴, 대상 요소만 다름)
//
// 인풋: text (문자열)
// 필요한 재료: document.getElementById("shop-remaining-display"), .innerText
// 리턴: 없음

function showBudgetText(text) {
    document.getElementById("shop-remaining-display").innerText = text;
}

// ✅ 확인법: F12 → Console 에서 직접 테스트:
//      showBudgetText("테스트")  → 남은 예산 자리에 "테스트"가 뜨면 성공!

// ============================================================
// Function 3: 구매한 목록 텍스트 표시
// ============================================================
// 하는 것: 전달받은 텍스트를 구매한 목록 영역에 보여준다.
//          (showShopMessageText와 같은 패턴, 대상 요소만 다름)
//
// 인풋: text (문자열)
// 필요한 재료: document.getElementById("shop-purchased-display"), .innerText
// 리턴: 없음

function showPurchasedText(text) {
    document.getElementById("shop-purchased-display").innerText = text;
}

// ✅ 확인법: F12 → Console 에서 직접 테스트:
//      showPurchasedText("점라면, 레몬")  → 구매한 목록 자리에 "점라면, 레몬"이 뜨면 성공!

// ============================================================
// Function 4: 남은 예산 보여주기
// ============================================================
// 하는 것: 현재 남은 예산을 "남은 예산: ___원" 형태로 화면에 보여준다.
//
// 필요한 재료: remainingBudget, showBudgetText(함수)
// 리턴: 없음

function showBudget() {
    showBudgetText("남은 예산:" + remainingBudget + "원");
}

// ✅ 확인법: 브라우저를 새로고침하세요.
//    → "남은 예산: 30000원" 이 보이면 성공!
//    → 빈칸이거나 "undefined" 가 보이면 아직 안 된 것.

// ============================================================
// Function 5: 구매한 목록 보여주기 + 구매 완료 버튼 상태 관리
// ============================================================
// 하는 것: purchased 배열의 내용을 화면에 보여준다.
//          그리고 purchased 상태에 따라 구매 완료 버튼도 켜거나 끈다.
//
//          비어있으면 "구매한 목록: (비어있음)" + 구매 완료 버튼 disabled
//          아이템이 있으면 "구매한 목록: 점라면, 레몬" + 구매 완료 버튼 enabled
//
// 필요한 재료: purchased 배열, showPurchasedText(함수)
// HTML 요소: "shop-btn-checkout"
// 리턴: 없음
//
//
// 참고:  - (purchased.length === 0) 로 비었는지 확인할수도 잇음
//    - 배열을 ", " 로 이어붙이려면
//       - purchased.join(", ") 를 쓰면 자동으로 이어붙여짐 (배열은 건드리지 않음)
//       - 또는 그냥 purchased 를 문자열에 쓰면 ,(공백없는 콤마)로 자동 변환됨

function showPurchased() {
    if (purchased.length === 0) {
        showPurchasedText("구매한 목록: (비어있음)");
        document.getElementById("shop-btn-checkout").disabled = true;
    } else {
        showPurchasedText("구매한 목록: " + purchased.join(", "));
        document.getElementById("shop-btn-checkout").disabled = false;
    }
}

// ✅ 확인법: 브라우저를 새로고침하세요.
//    → "구매한 목록: (비어있음)" 이 보이면 성공!
//    → F12 → Console 에서 purchased.push("점라면(낱개)"); showPurchased();
//      → "구매한 목록: 점라면(낱개)" 이 보이고, 구매 완료 버튼이 켜지면 성공!

// ============================================================
// Function 6: 구매 버튼 클릭 처리
//               ([‘구매하기'  버튼 클릭 — 성공] / [‘구매하기'  버튼 클릭 — 실패] 분기)
// ============================================================
// 하는 것: 구매 버튼을 눌렀을 때,
//          buyItem 으로 살 수 있는지 확인하고,
//          살 수 있으면 → 예산 차감, 구매한 목록 추가, 화면 갱신
//                        (메시지에 "환불은 불가합니다" 안내 추가)
//          못 사면     → 메시지만 보여주기
//
// 인풋: itemName (문자열 — 어떤 물건 버튼을 눌렀는지. 예: "점라면(낱개)")
// 필요한 재료: remainingBudget, purchased, stock (전역),
//             DATA.SHOP_ITEMS, DATA.SHOP_PRICES,
//             buyItem(함수, shop.js), findItemIndex(함수, shop.js),
//             showShopMessageText(함수), showBudget(함수), showPurchased(함수)
// buyItem 이 돌려주는 값: 문자열 (메시지)
//   → "구매 완료!" 가 포함되면 성공
//   → "품절" / "예산이 부족" / "없는 아이템" 이면 실패
// 리턴: 없음
//
// 주의: buyItem 이 재고(stock)는 알아서 차감합니다!
//       여기서는 예산 차감 + 구매한 목록 추가 + 화면 갱신만 하면 됩니다.
//
// 꼭 써야 하는 것:
//   1. buyItem(...) 호출해서 결과 메시지 저장
//      → 리턴값은 문자열. (shop.js 참고)
//
//   2. 성공 여부 판단: result.indexOf("구매 완료!") !== -1 이면 성공
//      (shopSession 에서 썼던 패턴과 같음)
//
//   3. 성공이면: (문서 참고)
//
//   4. 실패면 메시지만 그대로 띄우기:
//      → showShopMessageText(result)

function onBuyItem(itemName) {
    let result = buyItem(
        itemName,
        remainingBudget,
        DATA.SHOP_ITEMS,
        DATA.SHOP_PRICES,
        // DATA.SHOP_STOCK,
        stock,
    );
    if (result.indexOf("구매 완료!") !== -1) {
        let itemIndex = findItemIndex(DATA.SHOP_ITEMS, itemName);
        remainingBudget -= DATA.SHOP_PRICES[itemIndex];
        showBudget();
        // 메뉴판 업데이트
        let menuText = showShopList(DATA.SHOP_ITEMS, DATA.SHOP_PRICES, stock);
        document.getElementById("shop-menu-display").innerText = menuText;
        purchased.push(itemName);

        showPurchased();
        showShopMessageText(result);
    } else {
        showShopMessageText(result);
    }
}

// ✅ 확인법: [마트 물건 리스트 보기]를 누른 뒤 [점라면(낱개) 사기] 버튼을 누르세요.
//    → 메시지에 "점라면(낱개) 구매 완료! (5000원) 환불은 불가합니다." 가 뜨고,
//      남은 예산이 25000원으로 줄어들고,
//      구매한 목록에 "점라면(낱개)" 이 추가되고,
//      구매 완료 버튼이 enabled 되면 성공!
//    → [아이스크림 대파맛 사기]를 누르면 "품절" 메시지가 뜨고
//      예산과 구매한 목록은 변하지 않으면 성공!
//    → 비싼 물건 여러 번 사려 하면 "예산이 부족합니다" 메시지 성공!

// ============================================================
// Function 7: 구매 완료 버튼 클릭 처리
// ([구매 완료 클릭 — 비어있음] / [구매 완료 클릭 — 물건 있음] 분기)
// ============================================================
// 하는 것: [구매 완료] 버튼을 눌렀을 때,
//          구매한 게 없으면 → 메시지만 보여주기 (안전망)
//          물건이 있으면 → 영수증 표시, 모든 구매 관련 버튼 disabled,
//                         다시하기 버튼 보이기, isShopCheckedOut = true
//
// 필요한 재료: purchased 배열, DATA.SHOP_ITEMS, DATA.SHOP_PRICES,
//             showReceipt(함수, shop.js), showShopMessageText(함수),
//             setShopItemButtonsEnabled(함수)
// HTML 요소: "shop-receipt-display", "shop-btn-checkout",
//            "shop-btn-show-menu", "shop-btn-reset"
// 리턴: 없음
//
// 꼭 써야 하는 것:
//   1. if (purchased.length === 0) — 구매한 게 없으면:
//        → showShopMessageText("구매한 물건이 없습니다")
//        → return 으로 함수 종료 (아래는 실행 안 함)
//
//   2. 영수증 만들기:
//        → let receipt = showReceipt(..)
//        → getElementById("shop-receipt-display").innerText = receipt
//
//   3. 모든 구매 관련 버튼 disabled:
//
//   4. 상태 업데이트 + 다시하기 버튼 보이기:
//
//        // LATER: 풀게임 연동은 점이 채움.
//        //   풀게임에서는 "마트에서 나가기" 버튼을 보여줌.
//        //   if (typeof onShopCheckout === "function") {
//        //       document.getElementById("shop-btn-leave").style.display = "inline-block";
//        //   }

function onCheckout() {
    if (purchased.length === 0) {
        return showShopMessageText("구매한 물건이 없습니다");
    } else {
        let receipt = showReceipt(purchased, DATA.SHOP_ITEMS, DATA.SHOP_PRICES);
        document.getElementById("shop-receipt-display").innerText = receipt;
        document.getElementById("shop-btn-checkout").disabled = true;
        document.getElementById("shop-btn-show-menu").disabled = true;
        document.getElementById("shop-btn-reset").style.display =
            "inline-block";
        document.getElementById("shop-btn-reset").disabled = false;
    }
    // 풀게임 vs 독립 미니게임 분기
    if (typeof onShopCheckout === "function") {
        // 풀게임: 마트에서 나가기 버튼 활성화
        onShopCheckout();
    } else {
        // 독립 미니게임: 다시하기 버튼 표시
        document.getElementById("shop-btn-reset").style.display =
            "inline-block";
    }
}

// ✅ 확인법: 물건을 몇 개 산 뒤 [구매 완료] 버튼을 누르세요.
//    → 영수증이 화면 하단에 표시되고,
//      구매/구매 완료/리스트 보기 버튼들이 비활성화되고,
//      다시하기 버튼이 나타나면 성공!
//    → (구매한 게 없으면 구매 완료 버튼이 어차피 disabled 라
//       이 시나리오는 테스트하기 어려움 — 그래도 안전망 코드는 필요)

// ============================================================
// 이벤트 연결 — 이미 완성됨!
// ============================================================
window.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("shop-btn-reset") === null) return;

    // 마트 물건 리스트 보기 버튼
    document
        .getElementById("shop-btn-show-menu")
        .addEventListener("click", function () {
            let menuText = showShopList(
                DATA.SHOP_ITEMS,
                DATA.SHOP_PRICES,
                stock,
            );
            document.getElementById("shop-menu-display").innerText = menuText;
            setShopItemButtonsEnabled(true); // 구매 버튼 활성화
            showShopMessageText("물건을 골라서 구매 버튼을 누르세요!");
        });

    // 구매 버튼들은 initShopGame 에서 동적 생성 + 이벤트 연결됨

    // 구매 완료 버튼
    document
        .getElementById("shop-btn-checkout")
        .addEventListener("click", function () {
            onCheckout();
        });

    // 다시하기 버튼
    document
        .getElementById("shop-btn-reset")
        .addEventListener("click", function () {
            resetShopGame();
        });

    // 게임 시작!
    initShopGame();
});
