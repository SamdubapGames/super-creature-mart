// ============================================================
// dragDrop.js
// 역할: 길 씬에서 아이템 버튼을 괴물 부위에 드래그하는 인터랙션 처리
//       - 아이템 버튼 = 드래그 소스 (drag source)
//       - #path-current-part = 드롭 타겟 (drop target)
//       - drop 시 팀원의 onItemClick(itemName) 을 호출 → 기존 로직 재사용
//
// ============================================================

function cleanUpDropArea(docTarget) {
    // const target = document.getElementById("path-current-part");
    // 텍스트 클리어
    showPartText("");
    if (docTarget) docTarget.classList.remove("drop-active");
}
// ============================================================
// 메인 진입점: 드래그&드롭 활성화
// ============================================================
// initPathGame() 이 실행된 뒤, 아이템 버튼이 DOM 에 생성된 후 호출해야 함.
// visualWrappers.js 의 initPathGame 래퍼에서 불러줌.
function enableDragDrop() {
    try {
        bindDragSources(); // 아이템 버튼에 드래그 기능 부여
        bindDropTarget(); // 괴물 부위에 드롭 수신 기능 부여
        disableItemClicks(); // 결정 B: 클릭 비활성화 (드래그만 허용)
        console.log("🎯 드래그&드롭 활성화 완료");
    } catch (error) {
        console.error("드래그&드롭 활성화 실패:", error);
    }
}

// ============================================================
// 드래그 소스 설정 (아이템 버튼 4개)
// ============================================================
// DATA.MONSTER_ITEMS 를 기준으로 모든 아이템 버튼에 드래그 기능 부여.
// dragstart: 드래그 시작 시 itemName 을 dataTransfer 에 저장
// dragend:   드래그 종료 시 시각 피드백 초기화 (성공/취소 무관)
function bindDragSources() {
    const target = document.getElementById("path-current-part");

    DATA.MONSTER_ITEMS.forEach(function (itemName) {
        const btn = document.getElementById("path-btn-" + itemName);
        if (!btn) {
            console.warn("드래그 소스 버튼 없음:", itemName);
            return;
        }

        // 브라우저에 "이 요소 드래그 가능" 알림
        btn.setAttribute("draggable", "true");

        // 드래그 시작: itemName 을 drop 이벤트로 전달할 dataTransfer 에 저장
        btn.addEventListener("dragstart", function (e) {
            e.dataTransfer.setData("text/plain", itemName);
            e.dataTransfer.effectAllowed = "move";
            btn.classList.add("dragging");

            DATA.CURRENT_PLAYER_ITEM = itemName;
            // 드래그 부위에 지금 던진다는 걸 알려주는 메세지 띄우기
            showPartText(itemName + " 여기에 던지기");
            // 드롭 영역을 표시하기
            target.classList.add("drop-active");
            console.log("드래그 시작:", itemName);
        });

        // 드래그 종료: 성공적으로 drop 됐든 취소됐든 무조건 호출됨
        // → 시각 피드백 초기화 용도로 사용
        btn.addEventListener("dragend", function () {
            btn.classList.remove("dragging");
            // 혹시 drop 이 안 된 채 끝났어도 타겟 하이라이트 제거
            cleanUpDropArea(target);
        });
    });
}

// ============================================================
// 드롭 타겟 설정 (괴물 부위 영역)
// ============================================================
// #path-current-part 가 드롭 타겟.
// 주의: <img id="monster-layer"> 는 형제 요소라 별도 처리 불필요.
//       #path-current-part 가 투명 텍스트를 담고 있어서 이 쪽이 이벤트 수신.
//       단, path-stage 래퍼로 묶었다면 래퍼를 타겟으로 바꿔야 할 수도 있음.
function bindDropTarget() {
    const target = document.getElementById("path-current-part");
    if (!target) {
        console.warn("드롭 타겟 없음: #path-current-part");
        return;
    }

    // dragover: 타겟 위로 드래그 중일 때 계속 발동
    // ★ preventDefault() 를 반드시 호출해야 drop 이벤트가 발동됨
    //   (HTML5 drag&drop API 의 대표적 "이상한 요구사항")
    target.addEventListener("dragover", function (e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        target.classList.add("drop-active");
    });

    // dragleave: 타겟 밖으로 드래그가 나감
    target.addEventListener("dragleave", function () {
        // target.classList.remove("drop-active");
        cleanUpDropArea(target);
    });

    // drop: 타겟 위에서 마우스 놓음 → 실제 게임 로직 실행
    target.addEventListener("drop", function (e) {
        e.preventDefault();
        const itemName = e.dataTransfer.getData("text/plain");
        // target.classList.remove("drop-active");
        cleanUpDropArea(target);

        if (!itemName) {
            console.warn("drop 이벤트에 itemName 없음");
            return;
        }
        // 텍스트 클리어
        showPartText("");
        console.log("드롭:", itemName);

        const soundFiles = {
            칼: { path: "assets/soundEffect/knife.wav", duration: 1000 },
            담배: { path: "assets/soundEffect/cigar.mp3", duration: 4000 },
            레몬: {
                path: "assets/soundEffect/lemonSqueeze.MP3",
                duration: 2000,
            },
        };

        const soundConfig = soundFiles[itemName];
        if (soundConfig) {
            const audio = new Audio(soundConfig.path);
            audio.volume = 0.5;
            audio.play();
            setTimeout(() => {
                audio.pause();
                onItemClick(itemName);
            }, soundConfig.duration);
        } else {
            // ★ 팀원의 onItemClick 재사용 — 성공/실패 처리 자동으로 돌아감
            onItemClick(itemName);
        }
    });
}

// ============================================================
// 아이템 버튼 클릭 비활성화
// ============================================================
// 드래그만 허용하기로 했으므로 클릭은 동작하지 않게 막는다.
// 방법: capture 단계에서 stopImmediatePropagation → 팀원 핸들러 실행 전 차단.
//
// 왜 이 방식인가:
//   - 버튼을 cloneNode 로 교체하면 dragstart 리스너까지 날아감
//   - CSS pointer-events: none 은 드래그까지 막힘
//   - capture 차단은 드래그는 살리고 click 만 죽일 수 있음
function disableItemClicks() {
    const target = document.getElementById("path-current-part");

    DATA.MONSTER_ITEMS.forEach(function (itemName) {
        const btn = document.getElementById("path-btn-" + itemName);
        if (!btn) return;

        btn.addEventListener(
            "click",
            function (e) {
                e.stopImmediatePropagation();
                e.preventDefault();
                DATA.CURRENT_PLAYER_ITEM = itemName;
                // 클릭은 조용히 무시. 드래그만 유효함을 메시지로 알려도 OK:

                // 드래그만 유효함을 알려주기 드롭 영역을 표시해주기
                target.classList.add("drop-active");

                // 드래그 부위에 지금 던진다는 걸 알려주는 메세지 띄우기
                showPartText(itemName + " 여기에 던지기");
            },
            true,
        ); // ← 세 번째 인자 true = capture phase (다른 리스너보다 먼저 실행)
    });
}
