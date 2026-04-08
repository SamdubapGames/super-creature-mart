// ─────────────────────────────────────────────
// shopScene.js
// ─────────────────────────────────────────────
const shopScene = {
    enter() {
        BgLayer.show(DATA.BG_IMAGES.shop);
        document.getElementById("shop-ui").style.display = "block";
        this._renderShop();

        document.getElementById("leave-btn").addEventListener("click", () => {
            // 오는 길 시작
            gameState.scene.direction = "back";
            SceneManager.switchTo("path");
        });
    },

    _renderShop() {
        // 팀원 헤의 함수 호출 → 결과를 UI에 표시
        const shopText = showShop(
            DATA.SHOP_NAMES,
            DATA.SHOP_PRICES,
            DATA.SHOP_STOCK,
        );
        document.getElementById("shop-list").innerText = shopText;

        const invText = showInventory(gameState.player.inventory);
        document.getElementById("inventory-display").innerText = invText;

        document.getElementById("budget-display").innerText =
            `예산: ${gameState.player.budget}원`;
    },

    onBuyClick(itemName) {
        // 팀원 헤의 함수 호출
        const result = buyItem(
            DATA.SHOP_NAMES,
            DATA.SHOP_PRICES,
            DATA.SHOP_STOCK,
            gameState.player.inventory,
            gameState.player.budget,
            itemName,
        );

        if (result.success) {
            gameState.player.budget = result.newBudget;
        }

        document.getElementById("shop-message").innerText = result.message;
        this._renderShop(); // UI 다시 그리기
    },

    update() {},
    render() {},

    exit() {
        document.getElementById("shop-ui").style.display = "none";
    },
};
