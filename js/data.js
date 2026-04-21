const DATA = {
    // 괴물 데이터
    MONSTER_PARTS: ["입", "꼬리", "코", "눈"],
    MONSTER_ITEMS: ["떡", "칼", "담배", "레몬"],
    // parts[i] 와 items[i] 는 항상 한 쌍:
    //   입 ↔ 떡, 꼬리 ↔ 칼, 코 ↔ 담배, 눈 ↔ 레몬
    // 나중에 object 단계 오면 → [{part:"입", item:"떡"}, ...] 로 합쳐짐

    ITEM_IMAGES: {
        레몬: "assets/items/lemon.png",
        떡: "assets/items/tteok.png",
        칼: "assets/items/knief.png",
        담배: "assets/items/cigar.png",
    },
    // ─────────────────────────────
    // 배경 이미지 경로
    // ─────────────────────────────
    BG_IMAGES: {
        start: "assets/bg/start.png", // 벙커 문
        path: [
            "assets/bg/path001.png", // 출발 직후
            "assets/bg/path002.png", // 중간
            "assets/bg/path003.png", // 중간
            "assets/bg/path004.png", // 중간
            "assets/bg/path005.png", // 마트 근처
        ],
        shop: "assets/bg/shop.png", // 마트 내부
        ending: "assets/bg/ending.png", // 엔딩
    },
    // 참고: path 배열 길이 = 배경 사진 장수
    // route 길이(5)가 path 배열 길이보다 길면 나머지는 마지막 사진 재사용
    // → pathScene에서 BG_IMAGES.path[step] ?? BG_IMAGES.path.at(-1) 로 처리

    PART_IMAGES: {
        입: "assets/monster/part_mouth.png",
        꼬리: "assets/monster/part_tail.png",
        코: "assets/monster/part_nose.png",
        눈: "assets/monster/part_eye.png",
    },
    // object(딕셔너리)로 관리하는 이유:
    // PART_IMAGES["입"] 으로 바로 꺼낼 수 있음
    // 배열로 하면 인덱스 계산이 또 필요해짐

    // ─────────────────────────────
    // 마트 데이터 (삼두밥 마트)
    // ─────────────────────────────
    SHOP_ITEMS: [
        "점라면(낱개)",
        "감자",
        "아이스크림 대파맛",
        "레몬",
        "두부",
        "탄산수",
    ],
    SHOP_PRICES: [5000, 8000, 6000, 10000, 12000, 500],
    SHOP_STOCK: [3, 5, 0, 2, 4, 1],
    // items[i], prices[i], stock[i] 는 항상 한 세트
    // stock 이 0 이면 품절

    // ─────────────────────────────
    // 게임 설정값
    // ─────────────────────────────
    CONFIG: {
        STARTING_HP: 3, // 현재는 사용 안 함 (LATER: HP 시스템)
        STARTING_BUDGET: 30000,
        ROUTE_LENGTH: 5, // generateRoute()에 넘길 n

        // 시작 인벤토리: 모든 아이템을 한 번씩.
        // 현재는 path.js 의 playTurn 이 인벤토리에서 차감하지 않으므로
        // 갯수는 사실상 의미 없음. 배열 자체는 LATER 확장 위해 남겨둠.
        START_INVENTORY: ["떡", "칼", "담배", "레몬"],
    },
    // 설정값을 따로 묶는 이유:
    // 나중에 난이도 조정할 때 이 숫자만 바꾸면 됨
    // 코드 여기저기 3이나 30000이 박혀있으면 찾기 힘들어짐
    // 업계 용어로 "매직 넘버를 없앤다"고 함
};
