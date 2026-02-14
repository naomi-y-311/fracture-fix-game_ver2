// 要素の取得
const video = document.getElementById('opening-video');
const startUI = document.getElementById('start-ui');
const startBtn = document.getElementById('start-btn');
const openingLayer = document.getElementById('opening-layer');
const gameLayer = document.getElementById('game-layer');

// 1. ページ読み込み時に動画を再生
window.addEventListener('load', () => {
    video.play().catch(() => {
        // 自動再生ブロック対策：画面クリックで再生開始
        document.body.addEventListener('click', () => {
            video.play();
        }, { once: true });
    });
});

// 2. 動画が終わったらイラストとボタンを表示
video.addEventListener('ended', () => {
    startUI.classList.remove('hidden');
});

// 3. ボタンクリックでゲームレイヤーへ切り替え
startBtn.addEventListener('click', () => {
    openingLayer.style.opacity = '0';
    openingLayer.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        openingLayer.classList.add('hidden');
        gameLayer.classList.remove('hidden');
        
        // script.js側の初期化（必要であれば呼び出し）
        if (typeof init === "function") {
            init(); 
        }
    }, 500);
});
