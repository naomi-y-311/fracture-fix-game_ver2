// 要素の取得
const video = document.getElementById('opening-video');
const startUI = document.getElementById('start-ui');
const startBtn = document.getElementById('start-btn');
const openingLayer = document.getElementById('opening-layer');
const gameLayer = document.getElementById('game-layer');

// 1. 画面のどこをクリックしても動画が再生されるようにする
document.addEventListener('click', () => {
    if (video.paused) {
        video.play().catch(error => {
            console.log("再生に失敗しました:", error);
        });
    }
}, { once: false }); // 何度でも反応するように（または一度だけならonce: true）

// 2. 動画が終わったらイラストとボタンを表示
video.addEventListener('ended', () => {
    startUI.classList.remove('hidden');
    // 動画を非表示にする（ボタンを押しやすくするため）
    video.style.display = 'none';
    // 背景を黒からパズルの背景色に近い色に変えるとスムーズです
    openingLayer.style.background = '#ffcdd2'; 
});

// 3. ボタンクリックでゲームレイヤーへ切り替え
startBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // 親要素のクリックイベント（再生）が走らないようにする
    
    openingLayer.style.opacity = '0';
    openingLayer.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        openingLayer.classList.add('hidden');
        gameLayer.classList.remove('hidden');
        
        // script.js側の初期化
        if (typeof init === "function") {
            init(); 
            // 画面サイズを再計算させる
            if (typeof resize === "function") resize();
        }
    }, 500);
});
