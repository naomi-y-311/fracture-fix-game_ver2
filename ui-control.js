// 全ての読み込みが終わってから実行
window.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('opening-video');
    const startUI = document.getElementById('start-ui');
    const startBtn = document.getElementById('start-btn');
    const openingLayer = document.getElementById('opening-layer');
    const gameLayer = document.getElementById('game-layer');

    // 要素が正しく取得できているか確認
    if (!video || !openingLayer) {
        console.error("エラー: opening-video 要素が見つかりません。");
        return;
    }
    console.log("UI Control: 準備完了。画面をクリックして再生してください。");

    // 1. 画面のどこをクリックしても動画が再生されるようにする
    const handleFirstClick = () => {
        if (video.paused) {
            video.play()
                .then(() => console.log("動画の再生を開始しました。"))
                .catch(error => console.error("再生失敗:", error));
        }
    };

    document.addEventListener('click', handleFirstClick);

    // 2. 動画が終わったらイラストとボタンを表示
    video.addEventListener('ended', () => {
        console.log("動画が終了しました。");
        video.style.display = 'none';
        startUI.classList.remove('hidden');
        openingLayer.style.background = '#ffcdd2'; 
    });

    // 3. ボタンクリックでゲームレイヤーへ切り替え
    startBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        console.log("ゲーム画面へ切り替えます。");
        
        openingLayer.style.opacity = '0';
        openingLayer.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            openingLayer.classList.add('hidden');
            gameLayer.classList.remove('hidden');
            
            if (typeof init === "function") {
                init(); 
                if (typeof resize === "function") resize();
            }
        }, 500);
    });
});
