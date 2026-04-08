// ============================================================
// engine.js
// 역할: 게임 루프 + SceneManager + 초기화
// ============================================================

// ─────────────────────────────────────────────
// SceneManager
//
// 개념: State Machine (상태 기계)
//   게임은 항상 하나의 씬 안에 있다
//   씬 전환 = 상태 전환
//   각 씬은 enter → update/render 반복 → exit 사이클을 가진다
//
//   왜 이렇게 하는가:
//   if (screen === "start") { ... }
//   if (screen === "path")  { ... }
//   이런 분기가 update/render 곳곳에 생기면 스파게티가 됨
//   씬 객체로 분리하면 각 씬이 자기 일만 함
// ─────────────────────────────────────────────
const SceneManager = {
    scenes: {},
    current: null,
    currentName: null,

    register(name, scene) {
        this.scenes[name] = scene;
    },

    switchTo(name) {
        console.log(`씬 전환: ${this.currentName} → ${name}`);

        if (this.current) {
            this.current.exit();
        }

        this.current = this.scenes[name];
        this.currentName = name;
        gameState.scene.current = name;

        this.current.enter();
    },

    update() {
        if (this.current) this.current.update();
    },

    render() {
        if (this.current) this.current.render();
    },
};

// ─────────────────────────────────────────────
// 게임 루프
// ─────────────────────────────────────────────
let lastTime = 0;

function gameLoop(timestamp) {
    // deltaTime: 지난 프레임과 현재 프레임 사이의 시간 (ms)
    // 왜 필요한가:
    //   컴퓨터마다 프레임 속도가 다름
    //   deltaTime을 곱하면 어떤 컴퓨터에서도 같은 속도로 움직임
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    SceneManager.update(deltaTime);
    SceneManager.render();

    requestAnimationFrame(gameLoop);
}

// ─────────────────────────────────────────────
// 초기화
// ─────────────────────────────────────────────
function init() {
    // 1. gameState 초기값 세팅
    gameState.player.hp = DATA.CONFIG.STARTING_HP;
    gameState.player.inventory = [...DATA.CONFIG.START_INVENTORY];
    gameState.player.budget = DATA.CONFIG.STARTING_BUDGET;

    // 2. 레이어 초기화
    BgLayer.init();
    SmokeLayer.init();
    MonsterLayer.init();

    // 3. 씬 등록
    SceneManager.register("start", startScene);
    SceneManager.register("path", pathScene);
    SceneManager.register("shop", shopScene);
    SceneManager.register("ending", endingScene);

    // 4. 이벤트 리스너 등록 (드래그&드롭은 별도 구현)
    initDragDrop();

    // 5. 시작 씬으로
    SceneManager.switchTo("start");

    // 6. 게임 루프 시작
    requestAnimationFrame(gameLoop);
}

// HTML 로드 완료 후 init 실행
window.addEventListener("DOMContentLoaded", init);
