// 全ての読み込みが終わってから実行
window.addEventListener('load', () => { // DOMContentLoadedより確実なloadを使用
    const video = document.getElementById('opening-video');
    const startUI = document.getElementById('start-ui');
    const startBtn = document.getElementById('start-btn');
    const openingLayer = document.getElementById('opening-layer');
    const gameLayer = document.getElementById('game-layer');

    if (!video || !openingLayer) {
        console.error("エラー: 要素が見つかりません。");
        return;
    }

    console.log("UI Control: 準備完了。画面をクリックして再生してください。");

    // 1. 黒い画面全体をクリック対象にする
    openingLayer.addEventListener('click', function handleFirstClick() {
        if (video.paused) {
            video.play()
                .then(() => {
                    console.log("動画の再生を開始しました。");
                    // 再生が始まったら、このクリックイベントは不要なので削除
                    openingLayer.removeEventListener('click', handleFirstClick);
                })
                .catch(error => console.error("再生失敗:", error));
        }
    });

    // 2. 動画が終わったらボタンを表示
    video.addEventListener('ended', () => {
        console.log("動画が終了しました。");
        video.style.display = 'none';
        startUI.classList.remove('hidden');
        openingLayer.style.background = '#8eadd8'; 
    });

    // 3. ボタンクリックでゲームレイヤーへ切り替え
    startBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // 親要素（openingLayer）のクリックイベント連動を防ぐ

        // 音声を完全に止める
        video.pause();
        video.currentTime = 0;
        video.load(); 

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
