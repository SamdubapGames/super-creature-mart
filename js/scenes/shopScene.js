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
        // showShopList(names, prices, stock) → 문자열
        const shopText = showShopList(
            DATA.SHOP_ITEMS,
            DATA.SHOP_PRICES,
            DATA.SHOP_STOCK,
        );
        document.getElementById("shop-list").innerText = shopText;

        // 인벤토리 표시 (간단히 이름만 나열)
        const inv = gameState.player.inventory;
        document.getElementById("inventory-display").innerText =
            inv.length > 0 ? inv.join(", ") : "(비어 있음)";

        document.getElementById("budget-display").innerText =
            `예산: ${gameState.player.budget}원`;
    },

    onBuyClick(itemName) {
        // 팀원 헤의 함수 호출
        // buyItem(name, budget, names, prices, stock) → 문자열 메시지
        const message = buyItem(
            itemName,
            gameState.player.budget,
            DATA.SHOP_ITEMS,
            DATA.SHOP_PRICES,
            DATA.SHOP_STOCK,
        );

        // 구매 성공 시 예산 차감 + 인벤토리 추가
        if (message.indexOf("구매 완료") !== -1) {
            const idx = findItemIndex(DATA.SHOP_ITEMS, itemName);
            gameState.player.budget -= DATA.SHOP_PRICES[idx];
            gameState.player.inventory.push(itemName);
        }

        document.getElementById("shop-message").innerText = message;
        this._renderShop(); // UI 다시 그리기
    },

    update() {},
    render() {},

    exit() {
        document.getElementById("shop-ui").style.display = "none";
    },
};
