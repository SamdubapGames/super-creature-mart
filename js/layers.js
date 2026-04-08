// ============================================================
// layers.js
// 역할: 배경 / 연기 / 괴물 세 레이어 관리
// ============================================================

// ─────────────────────────────────────────────
// BgLayer — 배경 이미지 레이어
//
// 개념: 가장 단순한 레이어
//   Canvas 아님. img 태그의 src를 교체하는 방식.
//   CSS transition으로 교체 시 줌 효과.
// ─────────────────────────────────────────────
const BgLayer = {
    el: null,

    init() {
        this.el = document.getElementById("background");
    },

    show(imagePath) {
        // 줌 트윈: 클래스 제거 후 재추가로 CSS transition 재실행
        this.el.classList.remove("zoom-in");
        void this.el.offsetWidth; // reflow 강제 (트릭)
        this.el.src = imagePath;
        this.el.classList.add("zoom-in");
    },

    clear() {
        this.el.src = "";
        this.el.classList.remove("zoom-in");
    },
};

// ─────────────────────────────────────────────
// SmokeLayer — 연기 레이어
//
// 개념: 파티클 시스템의 아주 단순한 버전
//   파티클 = 각자 위치/투명도/속도를 가진 작은 오브젝트
//   매 프레임마다 sin파로 흔들리며 독립적으로 움직임
// ─────────────────────────────────────────────
const SmokeLayer = {
    canvas: null,
    ctx: null,
    particles: [],
    time: 0,
    active: false,

    init() {
        this.canvas = document.getElementById("fx");
        this.ctx = this.canvas.getContext("2d");
        this.particles = this._createParticles();
    },

    _createParticles() {
        // _ 접두사 관례: 이 오브젝트 내부에서만 쓰는 함수
        const list = [];
        for (let i = 0; i < 8; i++) {
            list.push({
                x: Math.random() * this.canvas.width,
                y: this.canvas.height * 0.3 + Math.random() * 100,
                width: 150 + Math.random() * 100,
                height: 60 + Math.random() * 40,
                alpha: 0.05 + Math.random() * 0.08,
                offset: Math.random() * Math.PI * 2, // sin 파 위상 차이
                speed: 0.3 + Math.random() * 0.4,
            });
        }
        return list;
    },

    start() {
        this.active = true;
    },
    stop() {
        this.active = false;
    },

    update(deltaTime) {
        if (!this.active) return;
        this.time += 0.01;
    },

    render() {
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (!this.active) return;

        this.particles.forEach((p) => {
            // sin파로 좌우 일렁임
            const x = p.x + Math.sin(this.time + p.offset) * 15;
            // sin파로 투명도 파동
            const alpha =
                p.alpha + Math.sin(this.time * p.speed + p.offset) * 0.03;

            ctx.globalAlpha = Math.max(0, alpha);
            ctx.fillStyle = "#b0b0b0";
            ctx.beginPath();
            ctx.ellipse(x, p.y, p.width, p.height, 0, 0, Math.PI * 2);
            ctx.fill();
        });

        ctx.globalAlpha = 1; // 다른 레이어에 영향 안 주도록 리셋
    },
};

// ─────────────────────────────────────────────
// MonsterLayer — 괴물 부위 레이어
//
// 개념: 유한 상태 기계 (Finite State Machine, FSM)
//   hidden → fadein → visible → fadeout → hidden
//   각 상태에서만 할 수 있는 행동이 다름
//   상태를 문자열로 관리하고 매 프레임마다 체크
//
//   왜 FSM인가:
//   if (isVisible && !isFading) 같은 불리언 조합은
//   경우의 수가 늘어날수록 버그가 생기기 쉬움
//   상태를 하나의 변수로 관리하면 명확함
// ─────────────────────────────────────────────
const MonsterLayer = {
    canvas: null,
    ctx: null,
    state: "hidden", // "hidden" | "fadein" | "visible" | "fadeout"
    alpha: 0,
    currentImage: null,
    FADE_SPEED: 0.05,

    init() {
        this.canvas = document.getElementById("monster");
        this.ctx = this.canvas.getContext("2d");
    },

    // 외부에서 호출하는 함수들
    spawn(imagePath) {
        const img = new Image();
        img.src = imagePath;
        img.onload = () => {
            this.currentImage = img;
            this.state = "fadein";
            this.alpha = 0;
        };
    },

    despawn() {
        if (this.state === "visible" || this.state === "fadein") {
            this.state = "fadeout";
        }
    },

    // FSM 업데이트
    update() {
        if (this.state === "fadein") {
            this.alpha += this.FADE_SPEED;
            if (this.alpha >= 1) {
                this.alpha = 1;
                this.state = "visible";
            }
        }

        if (this.state === "fadeout") {
            this.alpha -= this.FADE_SPEED;
            if (this.alpha <= 0) {
                this.alpha = 0;
                this.state = "hidden";
                this.currentImage = null;
            }
        }
    },

    render() {
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (this.state === "hidden" || !this.currentImage) return;

        ctx.globalAlpha = this.alpha;
        // 화면 중앙에 그리기
        const x = (this.canvas.width - this.currentImage.width) / 2;
        const y = (this.canvas.height - this.currentImage.height) / 2;
        ctx.drawImage(this.currentImage, x, y);
        ctx.globalAlpha = 1;
    },
};
