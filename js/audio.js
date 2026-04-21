const bgms = {
    opening: new Audio('./assets/bgm/opening.mp3'),
    streetGoMart: new Audio('./assets/bgm/street_goMart.mp3'),
    mart: new Audio('./assets/bgm/mart.mp3'),
    streetComeback: new Audio('./assets/bgm/street_comeback.mp3'),
    ending: new Audio('./assets/bgm/ending.mp3')
};

// 각 파일별로 초기 볼륨 세팅
bgms.opening.volume = 0.5;
bgms.streetGoMart.volume = 0.5;
bgms.mart.volume = 0.5;
bgms.streetComeback.volume = 0.5;
bgms.ending.volume = 0.5;

let currentBgm = null;

function playSceneBgm(sceneName) {
    if (currentBgm) {
        currentBgm.pause();
        currentBgm.currentTime = 0;
    }

    currentBgm = bgms[sceneName];

    if (currentBgm) {
        currentBgm.loop = true;
        currentBgm.volume = 0.5; 
        
        currentBgm.play().catch(e => console.log("재생 오류:", e)); 
    }
}

// 마트 입장 버튼 클릭 시
//martBtn.addEventListener('click', () => {
//    playSceneBgm('streetComeback');
//});

// 엔딩 장면 전환 시
//endingBtn.addEventListener('click', () => {
//    playSceneBgm('ending');
//});