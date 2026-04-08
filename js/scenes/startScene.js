// ─────────────────────────────────────────────
// startScene.js
// ─────────────────────────────────────────────
const startScene = {
    enter() {
        BgLayer.show(DATA.BG_IMAGES.start);
        document.getElementById("start-btn").style.display = "block";
        document
            .getElementById("start-btn")
            .addEventListener("click", () => SceneManager.switchTo("path"));
    },

    update() {},
    render() {},

    exit() {
        document.getElementById("start-btn").style.display = "none";
    },
};
