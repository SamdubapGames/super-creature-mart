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
//   "shop-message"        — 결과 메시지 표시하는 곳
//   "shop-remaining-display"   — 남은 예산 표시하는 곳
//   "shop-cart-display"        — 장바구니 내용 표시하는 곳
//   "shop-menu-display"        — 메뉴판 표시하는 곳
//   "shop-receipt-display"     — 영수증 표시하는 곳
//   "shop-btn-show-menu"       — 마트 물건 리스트 보기 버튼
//   "shop-btn-떡"              — 물건 담기 버튼들
//   "shop-btn-칼"
//   "shop-btn-캣닙 담배"
//   "shop-btn-레몬"
//   "shop-btn-방울"
//   "shop-btn-checkout"        — 구매하기 버튼
//   "shop-btn-reset"           — 다시하기 버튼
// ============================================================

// ============================================================
// 게임 데이터 — data.js 에서 가져오는 것들
// ============================================================
// let NAMES = DATA.SHOP_DATA.SHOP_NAMES; // ["떡", "칼", "캣닙 담배", "레몬", "방울"]
// let PRICES = DATA.SHOP_PRICES; // [100, 75, 50, 80, 30]
// let STOCK = DATA.SHOP_STOCK; // [3, 5, 0, 2, 4]
// let STARTING_BUDGET = DATA.CONFIG.STARTING_BUDGET; // 300

// ============================================================
// 게임 상태 변수 — 게임 진행 중에 바뀌는 값들
// ============================================================
let remainingBudget = 0; // 남은 예산
let cart = []; // 장바구니 (구매한 아이템 이름 배열)
let stock = []; // 현재 재고 (구매할 때마다 줄어듦)

// ============================================================
// initShopGame — 게임 시작 (이미 완성됨!)
// ============================================================

function initShopGame() {
    remainingBudget = DATA.CONFIG.STARTING_BUDGET;
    cart = [];
    stock = DATA.SHOP_STOCK.slice();

    // 1. 담기 버튼 동적 생성 (제일 먼저!)
    let btnContainer = document.getElementById("shop-item-buttons");
    btnContainer.innerHTML = "";
    for (let i = 0; i < DATA.SHOP_NAMES.length; i++) {
        let btn = document.createElement("button");
        btn.id = "shop-btn-" + DATA.SHOP_NAMES[i];
        btn.className = "item-btn";
        btn.innerText = DATA.SHOP_NAMES[i] + " 담기";
        btn.addEventListener("click", function () {
            onAddToCart(DATA.SHOP_NAMES[i]);
        });
        btnContainer.appendChild(btn);
    }

    // 2. 버튼 생성 끝난 뒤에 비활성화
    setShopItemButtons(true);

    // 3. 화면 그리기
    showBudget();
    showCart();
    showShopMessageText("마트에 오신 걸 환영합니다! 물건 리스트를 확인하세요.");

    // 4. 나머지 초기화
    document.getElementById("shop-menu-display").innerText = "";
    document.getElementById("shop-receipt-display").innerText = "";
    document.getElementById("shop-btn-checkout").disabled = true;
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
// setShopItemButtons — 물건 담기 버튼 전체 활성화/비활성화 (이미 완성됨!)
// ============================================================
function setShopItemButtons(disabled) {
    for (let i = 0; i < DATA.SHOP_NAMES.length; i++) {
        document.getElementById("shop-btn-" + DATA.SHOP_NAMES[i]).disabled =
            disabled;
    }
}

// ============================================================
// Function 1: 메시지 텍스트 표시
// ============================================================
// 하는 것: 전달받은 텍스트를 메시지 영역에 보여준다.
//
// 인풋: text (문자열)
// 필요한 재료: document.getElementById("shop-message"), .innerText
// 리턴: 없음

function showShopMessageText(text) {
    // 여기를 채우세요
    // document.getElementById("shop-message").innerText = text;
}

// ✅ 확인법: test_shop_game.html 을 브라우저에서 열어보세요.
//    → 메시지 영역에
//      "마트에 오신 걸 환영합니다! 물건 리스트를 확인하세요."
//      가 보이면 성공!
//    → 빈칸이면 아직 안 된 것.

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
    // 여기를 채우세요
}

// ✅ 확인법: F12 → Console 에서 직접 테스트:
//      showBudgetText("테스트")  → 남은 예산 자리에 "테스트"가 뜨면 성공!

// ============================================================
// Function 3: 장바구니 텍스트 표시
// ============================================================
// 하는 것: 전달받은 텍스트를 장바구니 영역에 보여준다.
//          (showShopMessageText와 같은 패턴, 대상 요소만 다름)
//
// 인풋: text (문자열)
// 필요한 재료: document.getElementById("shop-cart-display"), .innerText
// 리턴: 없음

function showCartText(text) {
    // 여기를 채우세요
}

// ✅ 확인법: F12 → Console 에서 직접 테스트:
//      showCartText("떡, 레몬")  → 장바구니 자리에 "떡, 레몬"이 뜨면 성공!

// ============================================================
// Function 4: 남은 예산 보여주기
// ============================================================
// 하는 것: 현재 남은 예산을 "남은 예산: ___원" 형태로 화면에 보여준다.
//
// 필요한 재료: remainingBudget, showBudgetText(함수)
// 리턴: 없음

function showBudget() {
    // 여기를 채우세요
}

// ✅ 확인법: 브라우저를 새로고침하세요.
//    → "남은 예산: 300원" 이 보이면 성공!
//    → 빈칸이거나 "undefined" 가 보이면 아직 안 된 것.

// ============================================================
// Function 5: 장바구니 보여주기
// ============================================================
// 하는 것: 장바구니 배열의 내용을 화면에 보여준다.
//          비어있으면 "장바구니: (비어있음)" 으로 보여준다.
//          아이템이 있으면 "장바구니: 떡, 레몬" 형태로 보여준다.
//
// 필요한 재료: cart 배열, showCartText(함수)
// 리턴: 없음
//
// 힌트: 배열을 ", " 로 이어붙이려면
//       cart[0] + ", " + cart[1] + ... 을 직접 해도 되고
//       그냥 cart 를 문자열로 쓰면 자동으로 콤마가 붙습니다

function showCart() {
    // 여기를 채우세요
}

// ✅ 확인법: 브라우저를 새로고침하세요.
//    → "장바구니: (비어있음)" 이 보이면 성공!
//    → F12 → Console 에서 cart.push("떡"); showCart();
//      → "장바구니: 떡" 이 보이면 성공!

// ============================================================
// Function 6: 물건 담기 버튼 클릭 처리
// ============================================================
// 하는 것: [담기] 버튼을 눌렀을 때,
//          이 물건을 살 수 있는지 확인하고 (shop.js의 buyItem 사용),
//          살 수 있으면 → 장바구니에 추가, 예산 차감, 화면 갱신
//          못 사면     → 메시지만 보여주기
//
// 인풋: itemName (문자열 — 어떤 물건 버튼을 눌렀는지)
// 필요한 재료: remainingBudget, cart 배열, DATA.SHOP_NAMES, DATA.SHOP_PRICES, stock,
//             buyItem(함수, shop.js), findItemIndex(함수, shop.js),
//             showShopMessageText(함수), showBudget(함수), showCart(함수)
// buyItem 이 돌려주는 값: 문자열 (메시지)
//   → "구매 완료!" 가 포함되면 성공
//   → "품절" / "예산이 부족" / "없는 아이템" 이면 실패
// 리턴: 없음
//
// 주의: buyItem은 재고(stock)를 알아서 줄여줍니다.
//       여기서는 추가로 remainingBudget 차감 + cart에 이름 추가만 하면 됩니다.
//       구매하기 버튼도 활성화해야 합니다: shop-btn-checkout

function onAddToCart(itemName) {
    // 여기를 채우세요
}

// ✅ 확인법: [마트 물건 리스트 보기]를 누른 뒤 [떡 담기] 버튼을 누르세요.
//    → 메시지에 "떡 구매 완료! (100원)" 이 뜨고,
//      남은 예산이 200원으로 줄어들고,
//      장바구니에 "떡" 이 추가되면 성공!
//    → [캣닙 담배 담기]를 누르면 "품절" 메시지가 뜨고
//      예산과 장바구니는 변하지 않으면 성공!

// ============================================================
// Function 7: 구매하기 버튼 클릭 처리
// ============================================================
// 하는 것: [구매하기] 버튼을 눌렀을 때,
//          장바구니가 비어있으면 → 메시지만 보여주기
//          장바구니에 물건이 있으면 → 영수증을 만들어서 화면에 보여주기
//                                   담기 버튼들 비활성화
//                                   구매하기 버튼 비활성화
//                                   다시하기 버튼 보여주기
//
// 필요한 재료: cart 배열, DATA.SHOP_NAMES, DATA.SHOP_PRICES,
//             showReceipt(함수, shop.js), showShopMessageText(함수)
// HTML 요소: "shop-receipt-display", "shop-btn-checkout", "shop-btn-reset"
// 리턴: 없음

function onCheckout() {
    // 여기를 채우세요
}

// ✅ 확인법: 물건을 몇 개 담은 뒤 [구매하기] 버튼을 누르세요.
//    → 영수증이 화면 하단에 표시되고,
//      담기 버튼들이 비활성화되고,
//      다시하기 버튼이 나타나면 성공!
//    → 장바구니가 빈 상태에서 누르면
//      "장바구니가 비어있습니다" 메시지가 뜨면 성공!

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
                DATA.SHOP_NAMES,
                DATA.SHOP_PRICES,
                stock,
            );
            document.getElementById("shop-menu-display").innerText = menuText;
            setShopItemButtons(false); // 담기 버튼 활성화
            showShopMessageText("물건을 골라서 [담기] 버튼을 누르세요!");
        });

    // 물건 담기 버튼 5개 연결

    // 구매하기 버튼
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
