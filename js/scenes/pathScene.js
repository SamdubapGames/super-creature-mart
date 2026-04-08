// ─────────────────────────────────────────────
// pathScene.js
//
// 개념: 같은 씬을 두 번 재사용
//   direction이 "go"  → 마트로 가는 길
//   direction이 "back"→ 집으로 돌아오는 길
//   씬 코드는 똑같고 데이터(direction)만 다름
// ─────────────────────────────────────────────
const pathScene = {
    enter() {
        // 팀원 응의 함수 호출
        gameState.path.route = generateRoute(
            DATA.MONSTER_PARTS,
            DATA.CONFIG.ROUTE_LENGTH,
        );
        gameState.path.currentStep = 0;

        SmokeLayer.start();
        this._showCurrentStep();
    },

    _showCurrentStep() {
        const step = gameState.path.currentStep;
        const route = gameState.path.route;

        // 경로 끝 → 다음 씬으로
        if (step >= route.length) {
            this._goToNextScene();
            return;
        }

        // 배경 교체
        const bgImages = DATA.BG_IMAGES.path;
        const bgIndex = Math.min(step, bgImages.length - 1);
        BgLayer.show(bgImages[bgIndex]);

        // 괴물 등장
        const part = route[step];
        StateActions.setMonster(part);
        MonsterLayer.spawn(DATA.PART_IMAGES[part]);
    },

    // A의 드래그&드롭 이벤트가 이 함수 호출
    onItemDrop(itemName) {
        const part = gameState.path.currentPart;

        // 팀원 응의 함수 호출
        const result = playTurn(
            part,
            itemName,
            gameState.player.inventory,
            DATA.MONSTER_PARTS,
            DATA.MONSTER_ITEMS,
        );

        if (result.success) {
            MonsterLayer.despawn();
            StateActions.clearMonster();
            StateActions.nextStep();
            setTimeout(() => this._showCurrentStep(), 600);
        } else {
            StateActions.takeDamage();
            // hp 0이면 ending으로
            if (gameState.player.hp <= 0) {
                gameState.scene.endingType = "dead";
                SceneManager.switchTo("ending");
            }
        }
    },

    _goToNextScene() {
        if (gameState.scene.direction === "go") {
            SceneManager.switchTo("shop");
        } else {
            gameState.scene.endingType = "alive";
            SceneManager.switchTo("ending");
        }
    },

    update() {
        SmokeLayer.update();
        MonsterLayer.update();
    },

    render() {
        SmokeLayer.render();
        MonsterLayer.render();
    },

    exit() {
        SmokeLayer.stop();
        MonsterLayer.despawn();
        StateActions.clearMonster();
    },
};
