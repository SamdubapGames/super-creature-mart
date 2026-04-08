// ─────────────────────────────────────────────
// endingScene.js
// ─────────────────────────────────────────────
const endingScene = {
    enter() {
        BgLayer.show(DATA.BG_IMAGES.ending);

        // 엔딩 분기
        // 개념: 데이터로 분기를 관리
        //   endingType을 gameState에 넣어두고
        //   여기서 읽어서 텍스트 결정
        //   나중에 엔딩 종류 늘어나도 여기만 수정
        const endings = {
            alive: "마트에서 돌아왔다.\n하지만 무언가 달라져 있었다.",
            dead: "그 길에서 멈춰버렸다.",
        };

        const type = gameState.scene.endingType || "alive";
        document.getElementById("ending-text").innerText = endings[type];
        document.getElementById("ending-ui").style.display = "block";

        document.getElementById("restart-btn").addEventListener("click", () => {
            // 게임 상태 리셋 후 처음부터
            gameState.player.hp = DATA.CONFIG.STARTING_HP;
            gameState.player.inventory = [...DATA.CONFIG.START_INVENTORY];
            gameState.player.budget = DATA.CONFIG.STARTING_BUDGET;
            gameState.scene.direction = "go";
            // 상점 재고도 리셋
            DATA.SHOP_STOCK = [3, 5, 0, 2, 4];
            SceneManager.switchTo("start");
        });
    },

    update() {},
    render() {},

    exit() {
        document.getElementById("ending-ui").style.display = "none";
    },
};
