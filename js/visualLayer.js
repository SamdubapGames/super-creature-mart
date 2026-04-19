// ============================================================
// visualLayer.js
// 역할: 배경 이미지, 괴물 부위 이미지 등 비주얼 레이어 제어
// ============================================================

var visualLayer = {
    // 배경 이미지 교체
    // sceneName: "start" | "path" | "shop" | "ending"
    // stepIndex: 길 씬일 때만 사용 (0~4)
    setBackground: function (sceneName, stepIndex) {
        var bg = document.getElementById("bg-layer");
        if (!bg) {
            console.warn("visualLayer: #bg-layer 요소가 없습니다");
            return;
        }

        if (sceneName === "start") {
            bg.src = DATA.BG_IMAGES.start;
        } else if (sceneName === "shop") {
            bg.src = DATA.BG_IMAGES.shop;
        } else if (sceneName === "ending") {
            bg.src = DATA.BG_IMAGES.ending;
        } else if (sceneName === "path") {
            // 길 씬: stepIndex 기반. 없으면 0번 (첫 구간)
            var idx = typeof stepIndex === "number" ? stepIndex : 0;
            // 배열 범위 벗어나면 마지막 것 사용 (안전장치)
            if (idx >= DATA.BG_IMAGES.path.length) {
                idx = DATA.BG_IMAGES.path.length - 1;
            }
            bg.src = DATA.BG_IMAGES.path[idx];
        }
    },
};
