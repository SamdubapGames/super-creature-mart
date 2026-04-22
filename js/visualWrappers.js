//============================================================
// ─── Phase 1: 걸음마다 배경 교체 (래핑) ───
// clickPathScene.js 의 onWalkClick 을 감싸서, 걸음 후 배경 업데이트
//============================================================
const _originalOnWalkClick = onWalkClick;
onWalkClick = function () {
    _originalOnWalkClick(); // 팀원 코드 먼저 실행 (currentStep++ 포함)
    // 이 시점에 currentStep 이 이미 증가돼 있음
    updatePathImage();
    // currentStep === ROUTE_LENGTH 인 경우는 씬 전환이 일어나므로 배경 안 건드림
};

function updatePathImage() {
    if (currentStep < DATA.CONFIG.ROUTE_LENGTH) {
        visualLayer.setBackground("path", currentStep);
    }
}
// ============================================================
// Phase 2: 괴물 부위 이미지 표시
// PHASE6TODO: 팀원 작업 완료 후, 이 래핑을 제거하고
//             clickPathScene.js 의 showCurrentPart 안에
//             updateMonsterImage() 호출을 직접 넣기.
//             (래핑은 팀원 파일 0 수정 원칙 때문에 쓰는 우회책)
// ============================================================

const _originalShowCurrentPart = showCurrentPart;
showCurrentPart = function () {
    _originalShowCurrentPart();
    updateMonsterImage();
};

function updateMonsterImage() {
    const part = DATA.PARTNAME;
    const img = document.getElementById("monster-layer");
    console.log("어떤부위????" + part);
    console.log("어떤부위????" + DATA.PART_IMAGES[part]);
    if (part && DATA.PART_IMAGES[part]) {
        img.src = DATA.PART_IMAGES[part];
        img.style.display = "inline-block";
    } else {
        // 마지막 걸음 후 빈 문자열인 경우 이미지 숨김
        img.style.display = "none";
    }
}

// ============================================================
// Phase 3: 아이템 이미지 버튼
// PHASE6TODO: 팀원 작업 완료 후 이 래핑 제거 →
//             clickPathScene.js 의 initPathGame 안에서
//             버튼 생성 직후 injectItemImages() 호출
// ============================================================

const _originalInitPathGame = initPathGame;
initPathGame = function () {
    _originalInitPathGame(); // 팀원 코드가 버튼들 생성
    injectItemImages(); // 그 다음에 이미지 주입
    enableDragDrop(); // 드래그&드롭 활성화
};

function injectItemImages() {
    DATA.MONSTER_ITEMS.forEach(function (itemName) {
        const btn = document.getElementById("path-btn-" + itemName);
        if (!btn) {
            console.warn("아이템 버튼 없음:", itemName);
            return;
        }
        const src = DATA.ITEM_IMAGES[itemName];
        btn.innerHTML = `<img src="${src}" alt="${itemName}">`;
    });
}
