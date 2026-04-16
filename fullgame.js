// ============================================================
// fullgame.js
// 역할: 씬 전환 + 이벤트 연결만 담당
//       게임 로직은 clickPathScene.js, clickShopScene.js 에 있음
// ============================================================

// ============================================================
// 게임 전체 상태
// ============================================================
var direction = "go"; // "go" = 마트로, "back" = 집으로
var budget = 0;
// 주의: inventory 는 clickPathScene.js 에서 선언됨, 여기서 다시 선언하지 않음

// ============================================================
// 씬 전환
// ============================================================
var currentScene = null;

function switchScene(sceneName) {
    var scenes = document.querySelectorAll(".scene");
    for (var i = 0; i < scenes.length; i++) {
        scenes[i].classList.remove("active");
    }
    document.getElementById("scene-" + sceneName).classList.add("active");
    currentScene = sceneName;
    console.log("씬 전환 →", sceneName);
}

// ============================================================
// 게임 시작
// ============================================================
function startNewGame() {
    direction = "go";
    inventory = DATA.CONFIG.START_INVENTORY.slice();
    budget = DATA.CONFIG.STARTING_BUDGET;
    switchScene("start");
}

// ============================================================
// 시작 씬 → 길 씬
// ============================================================
function onStartClick() {
    direction = "go";
    initPathGame();
    switchScene("path");
}

// ============================================================
// 길 씬 → 다음 씬 (길 클리어 시 호출됨)
// ============================================================
// clickPathScene.js 의 onAdvanceClick 에서 경로 끝나면 이 함수를 호출하세요.
function onPathClear() {
    if (direction === "go") {
        initShopGame();
        switchScene("shop");
    } else {
        startEndingScene("alive");
    }
}

// ============================================================
// 상점 씬 → 길(back) 씬
// ============================================================
function onShopLeave() {
    budget = remainingBudget;
    direction = "back";
    initPathGame();
    switchScene("path");
}

function onShopCheckoutAndLeave() {
    onCheckout();
    budget = remainingBudget;
    setTimeout(function () {
        direction = "back";
        initPathGame();
        switchScene("path");
    }, 1500);
}

// ============================================================
// 엔딩 씬
// ============================================================
function startEndingScene(type) {
    if (type === "alive") {
        document.getElementById("ending-text").innerText =
            "마트에서 돌아왔다.\n하지만 무언가 달라져 있었다.\n\n생존 성공!";
    } else {
        document.getElementById("ending-text").innerText =
            "그 길에서 멈춰버렸다.\n\n게임 오버...";
    }
    switchScene("ending");
}

// ============================================================
// 디버그 점프
// ============================================================
function debugJump(sceneName) {
    inventory = DATA.CONFIG.START_INVENTORY.slice();
    budget = DATA.CONFIG.STARTING_BUDGET;
    direction = "go";

    if (sceneName === "start") {
        switchScene("start");
    } else if (sceneName === "path") {
        initPathGame();
        switchScene("path");
    } else if (sceneName === "shop") {
        initShopGame();
        switchScene("shop");
    } else if (sceneName === "ending") {
        startEndingScene("alive");
    }
}

// ============================================================
// 이벤트 연결
// ============================================================
window.addEventListener("DOMContentLoaded", function () {
    // ── 시작 씬 ──
    document
        .getElementById("btn-start")
        .addEventListener("click", onStartClick);

    // ── 길 씬 ──
    document
        .getElementById("path-btn-advance")
        .addEventListener("click", function () {
            onAdvanceClick();
        });
    document
        .getElementById("path-btn-skip")
        .addEventListener("click", function () {
            onPathClear();
        });

    // ── 상점 씬 ──
    document
        .getElementById("shop-btn-show-menu")
        .addEventListener("click", function () {
            var menuText = showShopList(
                DATA.SHOP_NAMES,
                DATA.SHOP_PRICES,
                stock,
            );
            document.getElementById("shop-menu-display").innerText = menuText;
            setShopItemButtons(false);
            showShopMessageText("물건을 골라서 [담기] 버튼을 누르세요!");
        });
    document
        .getElementById("shop-btn-checkout")
        .addEventListener("click", function () {
            onShopCheckoutAndLeave();
        });
    document
        .getElementById("shop-btn-leave")
        .addEventListener("click", function () {
            onShopLeave();
        });
    document
        .getElementById("shop-btn-skip")
        .addEventListener("click", function () {
            direction = "back";
            initPathGame();
            switchScene("path");
        });

    // ── 엔딩 씬 ──
    document
        .getElementById("btn-restart")
        .addEventListener("click", startNewGame);

    // ── 게임 시작 ──
    startNewGame();
});
