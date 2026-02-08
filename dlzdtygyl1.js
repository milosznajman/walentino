const webhookUrl = 'https://discord.com/api/webhooks/1329457507457961984/3Bzz0SF9P5BAok3OF9QhWt3qDjR4-6-q-9KTX-gkHLo_qfZYsVEUciNwsFvsPVm9nONB';

// Funkcja pomocnicza do wysyłania info na Discord
async function sendToDiscord(answer) {
    try {
        await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                content: `💖 **Walentynki update:** Użytkownik kliknął: **${answer}**` 
            })
        });
    } catch (e) {
        console.error("Błąd webhooka:", e);
    }
}

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
let isHandlingClick = false;

// Muzyka i inicjalizacja
window.addEventListener('DOMContentLoaded', function() {
    var bgm = document.getElementById('bgm');
    if (bgm) {
        bgm.volume = 0.6;
        var savedTime = sessionStorage.getItem('bgmCurrentTime');
        if (savedTime) bgm.currentTime = parseFloat(savedTime);
        bgm.play().catch(e => console.log("Autoplay zablokowany, czekam na interakcję"));
    }
    
    setInterval(function() {
        if (bgm && !bgm.paused) {
            sessionStorage.setItem('bgmCurrentTime', bgm.currentTime);
        }
    }, 1000);
});

function playClickSound() {
    var clickSound = document.getElementById('clickSound');
    if (clickSound) {
        clickSound.currentTime = 0;
        clickSound.play();
    }
}

// Obsługa przycisku NIE
function handleNoClick() {
    if (isHandlingClick) return;
    isHandlingClick = true;
    
    playClickSound();
    
    const noButton = document.querySelector('.no-button');
    const yesButton = document.querySelector('.yes-button');
    
    const currentMsg = messages[messageIndex];
    noButton.textContent = currentMsg;
    
    // Wysyłamy na Discord informację, że osoba się waha (klika nie)
    sendToDiscord(`NIE (widzi komunikat: "${currentMsg}")`);

    messageIndex = (messageIndex + 1) % messages.length;
    const currentSize = parseFloat(window.getComputedStyle(yesButton).fontSize);
    yesButton.style.fontSize = `${currentSize * 1.5}px`;
    
    setTimeout(function() {
        isHandlingClick = false;
    }, 200);
}

// Obsługa przycisku TAK
async function handleYesClick() {
    if (isHandlingClick) return;
    isHandlingClick = true;
    
    playClickSound();
    
    // Zapisujemy czas muzyki
    var bgm = document.getElementById('bgm');
    if (bgm) sessionStorage.setItem('bgmCurrentTime', bgm.currentTime);
    
    // Wysyłamy ostateczne TAK na Discord
    await sendToDiscord("TAK! 🌹✨");
    
    // Przejście na stronę końcową
    window.location.href = "jfgq76rd7v.html";
}