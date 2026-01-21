(async function checkForUpdates() {
    const currentVersion = "1.0";
    const versionUrl = "https://raw.githubusercontent.com/ivysone/Will-you-be-my-Valentine-/main/version.json"; 

    try {
        const response = await fetch(versionUrl);
        if (!response.ok) {
            console.warn("Could not fetch version information.");
            return;
        }
        const data = await response.json();
        const latestVersion = data.version;
        const updateMessage = data.updateMessage;

        if (currentVersion !== latestVersion) {
            alert(updateMessage);
        } else {
            console.log("You are using the latest version.");
        }
    } catch (error) {
        console.error("Error checking for updates:", error);
    }
})();
const messages = [
    "Jesteś pewna?",
    "Na pewno??",
    "Jesteś tego pozytywnie pewna?",
    "Pysiu, proszę...",
    "Po prostu się nad tym zastanów!",
    "Jeśli powiesz nie, będzie mi naprawdę smutno...",
    "Będę bardzo smutny...",
    "Będę bardzo, bardzo, bardzo smutny...",
    "No dobrze, przestanę pytać...",
    "Żartuję, powiedz tak, proszę! ❤️",
    "Naprawdę tak myślisz?",  
    "Tak całkowicie, absolutnie pewna??",  
    "Na sto procent?",  
    "Oj weź, proszę...",  
    "Daj sobie chwilę, przemyśl to jeszcze raz!",  
    "Jeśli powiesz nie, moje serce pęknie...",  
    "Będę zdruzgotany...",  
    "Będę po prostu niepocieszony...",  
    "Dobra, dobra, już przestaję...",  
    "Tylko się droczę proszę, powiedz tak! ❤️"  
];

let messageIndex = 0;
let isHandlingClick = false; // 防止重复点击

// 页面加载完毕后自动播放背景音乐
window.addEventListener('DOMContentLoaded', function() {
    // 播放背景音乐并恢复播放进度
    var bgm = document.getElementById('bgm');
    bgm.volume = 0.6;
    
    // 恢复音乐播放进度
    var savedTime = sessionStorage.getItem('bgmCurrentTime');
    if (savedTime) {
        bgm.currentTime = parseFloat(savedTime);
    }
    
    bgm.play();
    
    // 定期保存音乐播放进度
    setInterval(function() {
        if (!bgm.paused) {
            sessionStorage.setItem('bgmCurrentTime', bgm.currentTime);
        }
    }, 1000);
});

// 播放点击音效函数
function playClickSound() {
    var clickSound = document.getElementById('clickSound');
    clickSound.currentTime = 0;
    clickSound.play();
}

function handleNoClick() {
    if (isHandlingClick) return;
    isHandlingClick = true;
    
    playClickSound();
    
    const noButton = document.querySelector('.no-button');
    const yesButton = document.querySelector('.yes-button');
    noButton.textContent = messages[messageIndex];
    messageIndex = (messageIndex + 1) % messages.length;
    const currentSize = parseFloat(window.getComputedStyle(yesButton).fontSize);
    yesButton.style.fontSize = `${currentSize * 1.5}px`;
    
    setTimeout(function() {
        isHandlingClick = false;
    }, 200);
}

function handleYesClick() {
    if (isHandlingClick) return;
    isHandlingClick = true;
    
    playClickSound();
    
    // 保存当前音乐播放进度
    var bgm = document.getElementById('bgm');
    sessionStorage.setItem('bgmCurrentTime', bgm.currentTime);
    
    // 立即跳转页面
    window.location.href = "jfgq76rd7v.html";
}