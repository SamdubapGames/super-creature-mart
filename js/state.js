const gameState = {
    // 씬 관리
    scene: {
        current: "start", // "start" | "path" | "shop" | "ending"
        direction: "go", // "go" | "back"
    },

    // 플레이어 상태
    player: {
        hp: 3,          // 체력 (맞을 때 마다 -1)
        inventory: [],  // 플레이어 인벤토리
        budget: 300,    // 마트에서 쓸 수 있는 예산
    },

    // 길 상태 (pathScene에서만 사용)
    path: {
        route: [],              // generateRoute()가 만든 경로 배열
        currentStep: 0,         // 현재 경로 위치 인덱스
        isMonsterVisible: false,// 현재 괴물 부위 등장 여부
        currentPart: null,      // 현재 등장한 부위 이름
    },

    // UI 상태
    ui: {
        notebookVisible: false,
    },
};

// 상태 변경은 이 함수들을 통해서만
const StateActions = {
    takeDamage() {
        // 플레이어 HP를 1 깎는다
        gameState.player.hp -= 1;
    },
    addItem(item) {
        // 아이템을 플레이어 인벤토리에 추가한다
        gameState.player.inventory.push(item);
    },
    spendBudget(n) {
        // 예산을 n만큼 차감한다
        gameState.player.budget -= n;
    },
    setMonster(part) {
        // 현재 구간에 몬스터를 등장시킨다
        gameState.path.currentPart = part;
        gameState.path.isMonsterVisible = true;
    },
    clearMonster() {
        // 현재 구간의 몬스터를 제거한다
        gameState.path.currentPart = null;
        gameState.path.isMonsterVisible = false;
    },
    nextStep() {
        // 다음 스텝으로 이동한다
        gameState.path.currentStep += 1;
    },
};
