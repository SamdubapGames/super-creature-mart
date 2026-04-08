// ============================================================
// shop.js
// 담당: 헤
// 역할: 마트에서 일어나는 일들을 처리하는 함수들
//
// 규칙:
//   - 함수 이름, 파라미터 이름 바꾸지 말 것
//   - 함수 안의 로직만 채울 것
//   - console.log로 중간 확인해도 됨
// ============================================================

// ============================================================
// 공용 데이터 안내 — 수정하지 마세요!
// ============================================================
// 이 파일의 함수들은 아래 데이터를 파라미터로 받아서 씁니다.
// 실제 게임에서는 data.js 의 DATA.SHOP_NAMES 등이 들어옵니다.
// 여기서는 테스트용으로 아래 변수를 씁니다.

var SHOP_NAMES = [
    "진라면(순한맛)",
    "감자",
    "참치마요삼각김밥",
    "대파맛 지렁이 젤리",
    "바나나우유",
    "참치캔",
    "두부",
    "깐도리",
    "팬돌이 음료",
    "아아",
];
var SHOP_PRICES = [
    9000, 500, 12000, 500, 10000, 20000, 180000, 800, 100, 10000,
];
var SHOP_STOCK = [10, 30, 0, 5, 5, 2, 7, 0, 2, 1];
// ↑ 0인 것들: 참치마요삼각김밥, 깐도리 — 품절!

var RECEIPT_HEADER =
    "=====================================\n      똥고양이 마트 영수증\n=====================================";
var RECEIPT_FOOTER =
    "=====================================\n  또 방문하실 수 있길 바라며,\n  생존을 응원합니다.\n=====================================";

// ============================================================
// Function 1: 재고 라벨 만들기
// ============================================================
// 재고 숫자를 받아서 표시용 문자열을 반환합니다.
//
// 인풋(파라미터):
// - stock: 숫자. 재고 수량.
//   → 0 이면 품절, 1 이상이면 재고 있음
//
// 리턴(반환값):
// - 문자열(string).
//   → getStockLabel(0)  는 "(품절)"
//   → getStockLabel(5)  는 "(재고: 5개)"
//   → getStockLabel(30) 는 "(재고: 30개)"

function getStockLabel(stock) {
    // 기능: stock 이 0 이면 "(품절)", 아니면 "(재고: N개)" 반환
    // input(parameter): stock(number)
    // return값 타입: string
    // 여기를 채우세요
}

// ✅ 함수 완성 후 아래 주석을 풀어서 확인해보세요
/*
console.log(getStockLabel(0));   // "(품절)"
console.log(getStockLabel(5));   // "(재고: 5개)"
console.log(getStockLabel(30));  // "(재고: 30개)"
*/

// ============================================================
// Function 2: 상점 한 줄 포맷
// ============================================================
// 번호, 이름, 가격, 재고 라벨을 받아서
// 화면에 표시할 한 줄 문자열을 반환합니다.
//
// 인풋(파라미터):
// - number: 숫자. 목록 번호. 예: 1
// - name: 문자열. 아이템 이름. 예: "진라면(순한맛)"
// - price: 숫자. 가격. 예: 9000
// - stockLabel: 문자열. 재고 라벨. 예: "(재고: 10개)"
//
// 리턴(반환값):
// - 문자열(string). "번호. 이름 — 가격원 라벨" 형태.
//   → formatShopLine(1, "진라면(순한맛)", 9000, "(재고: 10개)")
//      는 "1. 진라면(순한맛) — 9000원 (재고: 10개)"
//   → formatShopLine(3, "참치마요삼각김밥", 12000, "(품절)")
//      는 "3. 참치마요삼각김밥 — 12000원 (품절)"

function formatShopLine(number, name, price, stockLabel) {
    // 기능: 번호, 이름, 가격, 재고 라벨을 이어붙인 한 줄 문자열 반환
    // input(parameter): number(number), name(string), price(number), stockLabel(string)
    // return값 타입: string
    // 여기를 채우세요
}

// ✅ 함수 완성 후 아래 주석을 풀어서 확인해보세요
/*
console.log(formatShopLine(1, "진라면(순한맛)", 9000, "(재고: 10개)"));
// "1. 진라면(순한맛) — 9000원 (재고: 10개)"
console.log(formatShopLine(3, "참치마요삼각김밥", 12000, "(품절)"));
// "3. 참치마요삼각김밥 — 12000원 (품절)"
*/

// ============================================================
// Function 3: 상점 목록 전체 표시
// ============================================================
// 세 배열을 받아서 전체 목록을 여러 줄 문자열로 반환합니다.
//
// 인풋(파라미터):
// - names:  배열(string[]). 아이템 이름 목록.
// - prices: 배열(number[]). 가격 목록.
// - stock:  배열(number[]). 재고 목록.
//   → names[i], prices[i], stock[i] 는 항상 한 세트입니다.
//
// 리턴(반환값):
// - 문자열(string). \n 으로 구분된 전체 목록.
//   → "1. 감자 — 500원 (재고: 30개)\n2. 두부 — 180000원 (재고: 7개)"

function showShopList(names, prices, stock) {
    // 기능: 세 배열을 동시에 순회하며 전체 목록 문자열 반환
    // input(parameter): names(배열), prices(배열), stock(배열)
    // return값 타입: string
    // 꼭 써야 하는 것:
    //   for 문으로 세 배열 동시 순회 (names[i], prices[i], stock[i])
    //   getStockLabel(stock[i]) 호출해서 재고 라벨 얻기
    //   formatShopLine(i+1, names[i], prices[i], stockLabel) 호출해서 한 줄 얻기
    //   첫 번째 줄은 \n 없이, 나머지는 앞에 \n 붙여서 이어붙이기
    //   여기를 채우세요
}

// ✅ 함수 완성 후 아래 주석을 풀어서 확인해보세요
/*
console.log(showShopList(SHOP_NAMES, SHOP_PRICES, SHOP_STOCK));
// 1. 진라면(순한맛) — 9000원 (재고: 10개)
// 2. 감자 — 500원 (재고: 30개)
// 3. 참치마요삼각김밥 — 12000원 (품절)
// ...

console.log(showShopList(["감자", "두부"], [500, 180000], [30, 7]));
// 1. 감자 — 500원 (재고: 30개)
// 2. 두부 — 180000원 (재고: 7개)
*/

// ============================================================
// Function 4: 예산 확인
// ============================================================
// 가격과 예산을 받아서 살 수 있는지 확인합니다.
//
// 인풋(파라미터):
// - price:  숫자. 아이템 가격.
// - budget: 숫자. 현재 예산.
//
// 리턴(반환값):
// - boolean(true/false).
//   → isAffordable(9000, 10000) 는 true   (예산이 가격보다 많음)
//   → isAffordable(9000, 9000)  는 true   (딱 맞아도 살 수 있음)
//   → isAffordable(9000, 8000)  는 false  (예산 부족)

function isAffordable(price, budget) {
    // 기능: price 가 budget 이하면 true, 초과면 false 반환
    // input(parameter): price(number), budget(number)
    // return값 타입: boolean
    // 여기를 채우세요
}

// ✅ 함수 완성 후 아래 주석을 풀어서 확인해보세요
/*
console.log(isAffordable(9000, 10000));  // true
console.log(isAffordable(9000, 9000));   // true
console.log(isAffordable(9000, 8000));   // false
*/

// ============================================================
// Function 5: 아이템 구매
// ============================================================
// 아이템 이름과 예산을 받아서 구매를 처리하고 결과 메시지를 반환합니다.
// 구매 성공 시 stock 배열이 직접 수정됩니다 (재고 1 차감).
//
// 인풋(파라미터):
// - name:   문자열. 구매할 아이템 이름.
// - budget: 숫자. 현재 예산.
// - names:  배열. 아이템 이름 목록.
// - prices: 배열. 가격 목록.
// - stock:  배열. 재고 목록. ← 구매 성공 시 이 배열이 직접 바뀜!
//
// 리턴(반환값):
// - 문자열(string). 결과 메시지.
//   → 없는 아이템: "없는 아이템입니다"
//   → 품절:        "품절이에요, 나중에 다시오세요!"
//   → 예산 부족:   "예산이 부족합니다"
//   → 성공:        "진라면(순한맛) 구매 완료! (9000원)"

function buyItem(name, budget, names, prices, stock) {
    // 기능: 아이템 찾기 → 재고 확인 → 예산 확인 → 구매 처리 → 결과 메시지 반환
    // input(parameter): name(string), budget(number), names(배열), prices(배열), stock(배열)
    // return값 타입: string
    // 꼭 써야 하는 것:
    //   findItemIndex(names, name) 호출해서 인덱스 찾기
    //   인덱스 === -1 이면 → "없는 아이템입니다" return
    //   stock[인덱스] === 0 이면 → "품절이에요, 나중에 다시오세요!" return
    //   isAffordable(prices[인덱스], budget) 가 false 이면 → "예산이 부족합니다" return
    //   위 세 가지 다 통과하면:
    //     stock[인덱스]-- (재고 1 차감)
    //     name + " 구매 완료! (" + prices[인덱스] + "원)" return
    //   여기를 채우세요
}

// ✅ 함수 완성 후 아래 주석을 풀어서 확인해보세요
/*
var testStock = SHOP_STOCK.slice();  // 원본 보호용 복사

console.log(buyItem("진라면(순한맛)", 10000, SHOP_NAMES, SHOP_PRICES, testStock));
// "진라면(순한맛) 구매 완료! (9000원)"
console.log(buyItem("참치마요삼각김밥", 50000, SHOP_NAMES, SHOP_PRICES, testStock));
// "품절이에요, 나중에 다시오세요!"
console.log(buyItem("두부", 5000, SHOP_NAMES, SHOP_PRICES, testStock));
// "예산이 부족합니다"
console.log(buyItem("치킨", 99999, SHOP_NAMES, SHOP_PRICES, testStock));
// "없는 아이템입니다"
*/

// ============================================================
// Function 6: 장바구니 합계 계산
// ============================================================
// 장바구니 배열을 받아서 전체 금액을 합산해 반환합니다.
//
// 인풋(파라미터):
// - cart:   배열(string[]). 구매한 아이템 이름 목록.
//   → ["감자", "팬돌이 음료"]
// - names:  배열. 아이템 이름 목록.
// - prices: 배열. 가격 목록.
//
// 리턴(반환값):
// - 숫자(number). 합계 금액.
//   → calcTotal(["감자", "팬돌이 음료"], SHOP_NAMES, SHOP_PRICES) 는 600
//   → calcTotal([], SHOP_NAMES, SHOP_PRICES) 는 0

function calcTotal(cart, names, prices) {
    // 기능: cart 를 순회하며 각 아이템 가격을 찾아 합산 후 반환
    // input(parameter): cart(배열), names(배열), prices(배열)
    // return값 타입: number
    // 꼭 써야 하는 것:
    //   total = 0 으로 시작
    //   findItemIndex(names, cart[i]) 호출해서 인덱스 찾기
    //   여기를 채우세요
}

// ✅ 함수 완성 후 아래 주석을 풀어서 확인해보세요
/*
console.log(calcTotal(["감자", "팬돌이 음료"], SHOP_NAMES, SHOP_PRICES));  // 600
console.log(calcTotal(["아아"], SHOP_NAMES, SHOP_PRICES));                 // 10000
console.log(calcTotal([], SHOP_NAMES, SHOP_PRICES));                       // 0
*/

// ============================================================
// Function 7: 영수증 만들기
// ============================================================
// 장바구니를 받아서 영수증 문자열을 만들어 반환합니다.
// 이 함수가 반환한 문자열이 화면에 표시됩니다.
// 플레이어가 영수증을 클릭하면 마트를 나가는 것은 engine.js 가 처리합니다.
//
// 인풋(파라미터):
// - cart:   배열(string[]). 구매한 아이템 이름 목록.
// - names:  배열. 아이템 이름 목록.
// - prices: 배열. 가격 목록.
//
// 리턴(반환값):
// - 문자열(string). 아래 형태:
//
//   =====================================
//         똥고양이 마트 영수증
//   =====================================
//
//     진라면(순한맛) — 9000원
//     감자 — 500원
//
//     -----------------------------------
//     합계: 9500원
//
//   =====================================
//     또 방문하실 수 있길 바라며,
//     생존을 응원합니다.
//   =====================================

function showReceipt(cart, names, prices) {
    // 기능: RECEIPT_HEADER + 아이템 목록 + 합계 + RECEIPT_FOOTER 를 이어붙여 반환
    // input(parameter): cart(배열), names(배열), prices(배열)
    // return값 타입: string
    // 꼭 써야 하는 것:
    //   result = RECEIPT_HEADER 로 시작
    //   result += "\n" 으로 빈 줄 추가
    //   for 문으로 cart 순회
    //     findItemIndex(names, cart[i]) 로 인덱스 찾기
    //     result += "\n  " + cart[i] + " — " + prices[인덱스] + "원"
    //   result += "\n\n  -----------------------------------"
    //   result += "\n  합계: " + calcTotal(cart, names, prices) + "원"
    //   result += "\n\n" + RECEIPT_FOOTER
    //   return result
    //   여기를 채우세요
}

// ✅ 함수 완성 후 아래 주석을 풀어서 확인해보세요
/*
console.log(showReceipt(["아아", "바나나우유"], SHOP_NAMES, SHOP_PRICES));
// =====================================
//       똥고양이 마트 영수증
// =====================================
//
//   아아 — 10000원
//   바나나우유 — 10000원
//
//   -----------------------------------
//   합계: 20000원
//
// =====================================
//   또 방문하실 수 있길 바라며,
//   생존을 응원합니다.
// =====================================
*/

// ============================================================
// Function 8: 쇼핑 세션 (이미 완성된 함수입니다 — 읽어보세요!)
// ============================================================
// 쇼핑 목록과 예산을 받아서 전체 구매 흐름을 처리하고
// 최종 영수증을 반환합니다.
// 구매한 것이 하나도 없으면 "구매한 상품이 없습니다" 를 반환합니다.
//
// 인풋(파라미터):
// - shoppingList: 배열(string[]). 사려는 아이템 목록.
// - budget:       숫자. 현재 예산.
// - names:        배열. 아이템 이름 목록.
// - prices:       배열. 가격 목록.
// - stock:        배열. 재고 목록.
//
// 리턴(반환값):
// - 문자열(string). 영수증 또는 "구매한 상품이 없습니다".
//
// 참고: engine.js 의 onCheckoutClick 이 이 함수를 호출합니다.
//       반환된 영수증 문자열을 화면에 표시하고,
//       플레이어가 영수증을 클릭하면 engine.js 가 마트 씬을 종료합니다.

function shopSession(shoppingList, budget, names, prices, stock) {
    let cart = [];
    let remainingBudget = budget;

    for (let i = 0; i < shoppingList.length; i++) {
        let result = buyItem(
            shoppingList[i],
            remainingBudget,
            names,
            prices,
            stock,
        );
        if (result.indexOf("구매 완료!") !== -1) {
            let index = findItemIndex(names, shoppingList[i]);
            remainingBudget -= prices[index];
            cart.push(shoppingList[i]);
        }
    }

    if (cart.length === 0) {
        return "구매한 상품이 없습니다";
    }

    return showReceipt(cart, names, prices);
}

// ✅ 확인용
/*
var testStock2 = SHOP_STOCK.slice();
console.log(shopSession(
    ["진라면(순한맛)", "감자", "치킨", "참치마요삼각김밥"],
    10000,
    SHOP_NAMES, SHOP_PRICES, testStock2
));
// 진라면(순한맛) 구매 완료, 감자 구매 완료
// 치킨은 없는 아이템, 참치마요삼각김밥은 품절
// → 진라면+감자 영수증 출력
*/
