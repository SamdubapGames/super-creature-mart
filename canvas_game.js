// ============================================================
// canvas_game.js
// 역할: 캔버스 버전 게임 — 레이어 + UI 씬 전환
//       layers.js 의 BgLayer, SmokeLayer, MonsterLayer 사용
//       path.js, shop.js, notebook.js 의 함수 사용
// ============================================================


// ============================================================
// UI 씬 전환
// ============================================================
function showUI(screenId) {
    let screens = document.querySelectorAll(".ui-screen");
    for (let i = 0; i < screens.length; i++) {
        screens[i].classList.remove("active");
    }
    document.getElementById(screenId).classList.add("active");
}


// ============================================================
// 시작 씬
// ============================================================
function enterStart() {
    BgLayer.show("assets/bg/start.png");
    SmokeLayer.stop();
    MonsterLayer.despawn();
    showUI("start-ui");
}


// ============================================================
// 길 씬
// ============================================================
let pathRoute = [];
let pathStep = 0;

function enterPath() {
    pathRoute = generateRoute(
        DATA.MONSTER_PARTS,
        DATA.CONFIG.ROUTE_LENGTH
    );
    pathStep = 0;
    gameState.player.inventory = gameState.player.inventory.length > 0
        ? gameState.player.inventory
        : [...DATA.CONFIG.START_INVENTORY];

    SmokeLayer.start();
    showUI("path-ui");
    showPathStep();
    renderInventoryBar();
}

function showPathStep() {
    if (pathStep >= pathRoute.length) {
        // 경로 끝
        MonsterLayer.despawn();
        document.getElementById("path-message-display").innerText = "🎉 도착!";

        if (gameState.scene.direction === "go") {
            setTimeout(enterShop, 1000);
        } else {
            setTimeout(function () { enterEnding("alive"); }, 1000);
        }
        return;
    }

    // 배경 교체
    let bgImages = DATA.BG_IMAGES.path;
    let bgIndex = Math.min(pathStep, bgImages.length - 1);
    BgLayer.show(bgImages[bgIndex]);

    // 괴물 등장
    let part = pathRoute[pathStep];
    MonsterLayer.spawn(DATA.PART_IMAGES[part]);
    document.getElementById("path-message-display").innerText =
        (pathStep + 1) + "/" + pathRoute.length + " — " + part + " 등장!";
}

function renderInventoryBar() {
    let bar = document.getElementById("inventory-bar");
    bar.innerHTML = "";
    let inv = gameState.player.inventory;
    for (let i = 0; i < inv.length; i++) {
        let item = document.createElement("div");
        item.className = "inv-item";
        item.innerText = inv[i];
        item.draggable = true;
        item.addEventListener("dragstart", function (e) {
            e.dataTransfer.setData("text/plain", inv[i]);
        });
        // 클릭으로도 사용 가능 (드래그&드롭 구현 전 임시)
        item.addEventListener("click", function () {
            onPathItemUse(inv[i]);
        });
        bar.appendChild(item);
    }
}

function onPathItemUse(itemName) {
    let part = pathRoute[pathStep];
    let result = playTurn(
        part,
        itemName,
        gameState.player.inventory,
        DATA.MONSTER_PARTS,
        DATA.MONSTER_ITEMS
    );

    document.getElementById("path-message-display").innerText = result.message;

    if (result.success) {
        MonsterLayer.despawn();
        renderInventoryBar();
        pathStep += 1;
        setTimeout(showPathStep, 600);
    }
}


// ============================================================
// 상점 씬
// ============================================================
let shopStock = [];

function enterShop() {
    BgLayer.show(DATA.BG_IMAGES.shop);
    SmokeLayer.stop();
    MonsterLayer.despawn();

    shopStock = DATA.SHOP_STOCK.slice();
    showUI("shop-ui");
    renderShopUI();
}

function renderShopUI() {
    // 상품 목록
    let listText = showShopList(DATA.SHOP_NAMES, DATA.SHOP_PRICES, shopStock);
    document.getElementById("shop-list").innerText = listText;

    // 구매 버튼들
    let btnContainer = document.getElementById("shop-buy-buttons");
    btnContainer.innerHTML = "";
    for (let i = 0; i < DATA.SHOP_NAMES.length; i++) {
        let btn = document.createElement("button");
        btn.className = "btn-sub";
        btn.innerText = DATA.SHOP_NAMES[i] + " 구매";
        btn.addEventListener("click", function () {
            onShopBuy(DATA.SHOP_NAMES[i]);
        });
        btnContainer.appendChild(btn);
    }

    // 인벤토리
    document.getElementById("inventory-display").innerText =
        gameState.player.inventory.length > 0
            ? gameState.player.inventory.join(", ")
            : "(비어있음)";

    // 예산
    document.getElementById("budget-display").innerText =
        "예산: " + gameState.player.budget + "원";

    document.getElementById("shop-message-canvas").innerText = "";
}

function onShopBuy(itemName) {
    let message = buyItem(
        itemName,
        gameState.player.budget,
        DATA.SHOP_NAMES,
        DATA.SHOP_PRICES,
        shopStock
    );

    document.getElementById("shop-message-canvas").innerText = message;

    if (message.indexOf("구매 완료") !== -1) {
        let idx = findItemIndex(DATA.SHOP_NAMES, itemName);
        gameState.player.budget -= DATA.SHOP_PRICES[idx];
        gameState.player.inventory.push(itemName);
        renderShopUI();
    }
}

function onShopLeaveCanvas() {
    gameState.scene.direction = "back";
    enterPath();
}


// ============================================================
// 엔딩 씬
// ============================================================
function enterEnding(type) {
    BgLayer.show(DATA.BG_IMAGES.ending);
    SmokeLayer.stop();
    MonsterLayer.despawn();

    if (type === "alive") {
        document.getElementById("ending-text").innerText =
            "마트에서 돌아왔다.\n하지만 무언가 달라져 있었다.\n\n생존 성공!";
    } else {
        document.getElementById("ending-text").innerText =
            "그 길에서 멈춰버렸다.\n\n게임 오버...";
    }
    showUI("ending-ui");
}


// ============================================================
// 디버그 점프
// ============================================================
function debugCanvasJump(scene) {
    gameState.player.hp = DATA.CONFIG.STARTING_HP;
    gameState.player.inventory = [...DATA.CONFIG.START_INVENTORY];
    gameState.player.budget = DATA.CONFIG.STARTING_BUDGET;
    gameState.scene.direction = "go";

    if (scene === "start") enterStart();
    else if (scene === "path") enterPath();
    else if (scene === "shop") enterShop();
    else if (scene === "ending") enterEnding("alive");
}


// ============================================================
// 게임 루프
// ============================================================
let lastTime = 0;

function gameLoop(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    SmokeLayer.update(deltaTime);
    MonsterLayer.update();

    SmokeLayer.render();
    MonsterLayer.render();

    requestAnimationFrame(gameLoop);
}


// ============================================================
// 초기화
// ============================================================
window.addEventListener("DOMContentLoaded", function () {
    // gameState 초기화
    gameState.player.hp = DATA.CONFIG.STARTING_HP;
    gameState.player.inventory = [...DATA.CONFIG.START_INVENTORY];
    gameState.player.budget = DATA.CONFIG.STARTING_BUDGET;
    gameState.scene.direction = "go";

    // 레이어 초기화
    BgLayer.init();
    SmokeLayer.init();
    MonsterLayer.init();

    // 이벤트 연결
    document.getElementById("start-btn").addEventListener("click", function () {
        gameState.scene.direction = "go";
        enterPath();
    });

    document.getElementById("leave-btn").addEventListener("click", onShopLeaveCanvas);

    document.getElementById("restart-btn").addEventListener("click", function () {
        gameState.player.hp = DATA.CONFIG.STARTING_HP;
        gameState.player.inventory = [...DATA.CONFIG.START_INVENTORY];
        gameState.player.budget = DATA.CONFIG.STARTING_BUDGET;
        gameState.scene.direction = "go";
        DATA.SHOP_STOCK = [3, 5, 0, 2, 4];
        enterStart();
    });

    document.getElementById("notebook-btn").addEventListener("click", function () {
        let text = showNotebook(DATA.MONSTER_PARTS, DATA.MONSTER_ITEMS);
        document.getElementById("notebook-content").innerText = text || "[미완성] showNotebook";
        document.getElementById("notebook-popup").classList.remove("hidden");
    });

    document.getElementById("notebook-close").addEventListener("click", function () {
        document.getElementById("notebook-popup").classList.add("hidden");
    });

    // 시작
    enterStart();
    requestAnimationFrame(gameLoop);
});
