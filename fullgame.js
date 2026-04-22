// ============================================================
// fullgame.js
// 역할: 씬 전환 + 이벤트 연결만 담당
//       게임 로직은 clickPathScene.js, clickShopScene.js 에 있음
// ============================================================

// ============================================================
// 게임 전체 상태
// ============================================================
// var direction = "go"; // "go" = 마트로, "back" = 집으로
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

    // ─── 배경 이미지 교체 ───
    // 길 씬은 step 별이라 별도 처리. 여기서는 길 씬 진입 시 첫 구간(0) 으로.
    if (sceneName === "path") {
        visualLayer.setBackground("path", 0);
    } else {
        visualLayer.setBackground(sceneName);
    }
}

// ============================================================
// 게임 시작
// ============================================================
function startNewGame() {
    switchScene("title");
}
// ============================================================
// 타이틀에서 '게임 시작'버튼 눌렀을 때
// ============================================================
function onGameStartClick() {
    DATA.CURRENT_DIRECTION = "go";
    inventory = DATA.CONFIG.START_INVENTORY.slice();
    budget = DATA.CONFIG.STARTING_BUDGET;
    switchScene("start");
    // 오프닝 (시작할 때)
    playSceneBgm("opening");
}
// ============================================================
// 시작 씬 → 길 씬
// ============================================================
function onStartClick() {
    DATA.CURRENT_DIRECTION = "go";
    initPathGame();
    switchScene("path");
    playSceneBgm("streetGoMart");
}

// ============================================================
// 길 씬 → 다음 씬 (길 클리어 시 호출됨)
// ============================================================
// clickPathScene.js 의 onWalkClick 에서 경로 끝나면 이 함수를 호출하세요.
function onPathClear() {
    if (DATA.CURRENT_DIRECTION === "go") {
        initShopGame();
        switchScene("shop");
        playSceneBgm("mart");
    } else {
        startEndingScene("alive");
    }
}

// ============================================================
// 상점 씬 → 길(back) 씬
// ============================================================
function onShopLeave() {
    budget = remainingBudget;
    DATA.CURRENT_DIRECTION = "back";
    initPathGame();
    switchScene("path");
    playSceneBgm("streetComeback");
}

function onShopCheckoutAndLeave() {
    onCheckout();
    budget = remainingBudget;
    setTimeout(function () {
        DATA.CURRENT_DIRECTION = "back";
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
    playSceneBgm("ending");
}

// ============================================================
// 디버그 점프
// ============================================================
function debugJump(sceneName) {
    inventory = DATA.CONFIG.START_INVENTORY.slice();
    budget = DATA.CONFIG.STARTING_BUDGET;
    DATA.CURRENT_DIRECTION = "go";

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
    // ── 타이틀 ──
    document
        .getElementById("btn-game-start")
        .addEventListener("click", function () {
            // const audio = document.getElementById("openDoorSound");

            if (audio) {
                audio.volume = 0.3;
                audio.currentTime = 0;
                audio.play();
                audio.onended = function () {
                    onGameStartClick();
                };
            } else {
                onGameStartClick();
            }
        });
    // ── 시작 씬 ──
    document.getElementById("btn-start").addEventListener("click", function () {
        const audio = document.getElementById("openDoorSound");

        if (audio) {
            audio.volume = 0.3;
            audio.currentTime = 0;
            audio.play();
            audio.onended = function () {
                onStartClick();
            };
        } else {
            onStartClick();
        }
    });

    // ── 길 씬 ──
    document
        .getElementById("path-btn-walk")
        .addEventListener("click", function () {
            const audio = document.getElementById("walkSound");

            if (audio) {
                audio.currentTime = 0;
                audio.play();
                setTimeout(() => {
                    audio.pause();
                    onWalkClick();
                }, 2000);
            } else {
                onWalkClick();
            }
        });

    document
        .getElementById("path-btn-enter")
        .addEventListener("click", function () {
            onPathClear(); // 이제 여기서 씬 전환
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
                DATA.SHOP_ITEMS,
                DATA.SHOP_PRICES,
                stock,
            );
            document.getElementById("shop-menu-display").innerText = menuText;
            setShopItemButtonsEnabled(true);
            showShopMessageText("물건을 골라서 [담기] 버튼을 누르세요!");
        });

    const container = document.getElementById("shop-item-buttons-container"); // 상점 아이템 코인 오디오
    const audio = document.getElementById("shopItemSound");

    container.addEventListener("click", function (event) {
        if (event.target && event.target.tagName === "BUTTON") {
            if (audio) {
                audio.currentTime = 0;
                audio.play();
            }
        }
    });

    document
        .getElementById("shop-btn-checkout")
        .addEventListener("click", function () {
            const audio = document.getElementById("shopCheckoutSound");

            if (audio) {
                audio.currentTime = 0;
                audio.play();
                audio.onended = function () {
                    onCheckout();
                };
            } else {
                onCheckout();
            }
        });

    document
        .getElementById("shop-btn-leave")
        .addEventListener("click", function () {
            const audio = document.getElementById("shopLeaveSound");

            if (audio) {
                audio.volume = 0.3;
                audio.currentTime = 0;
                audio.play();
                audio.onended = function () {
                    onShopLeave();
                };
            } else {
                onShopLeave();
            }
        });

    document
        .getElementById("shop-btn-skip")
        .addEventListener("click", function () {
            DATA.CURRENT_DIRECTION = "back";
            initPathGame();
            switchScene("path");
        });

    // ── 엔딩 씬 ──
    document
        .getElementById("btn-restart")
        .addEventListener("click", startNewGame);

    // ─── 키보드 단축키 ───
    document.addEventListener("keydown", function (e) {
        // 길 씬에서만, W 키 누르면 걸어가기
        if (currentScene !== "path") return;

        if (e.key === "w" || e.key === "W") {
            const walkBtn = document.getElementById("path-btn-walk");
            // 버튼이 비활성화 상태면 무시 (맞는 아이템 안 썼을 때)
            if (walkBtn.disabled) return;
            walkBtn.click(); // 버튼 클릭 효과 (기존 리스너 그대로 발동)
        }
    });

    // ── 게임 시작 ──
    startNewGame();
});
