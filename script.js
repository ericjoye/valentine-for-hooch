const page1 = document.getElementById('page1');
const page2 = document.getElementById('page2');
const btnYes = document.getElementById('btnYes');
const btnNo = document.getElementById('btnNo');
const subtitle = document.getElementById('subtitle');
const errorMsg = document.getElementById('errorMsg');
const btnRow = document.getElementById('btnRow');
const heartsBg = document.getElementById('heartsBg');

let clickCount = 0;
let yesReady = false;

const subtitles = [
    "Well can I have some hooch? 😏",
    "Pretty please? 🥺",
    "How about a kis? 😜",
    "40 kis's behind... Ready to pay up? 😘",
    "You're really making me work for this, huh? 🤔",
    "Pretty please with a cherry on top? 🥲"
];

const errorMessages = [
    "Not so fast! Click No first 💕",
    "You gotta say no before you say yes! 🥺",
    "I'm not gonna make this easy 😏",
    "Keep trying the No button... 😉",
    "Almost there, just a few more Nos! 💗",
    "Almost... just a little more work! 🥰",
    "Last one! I promise! 💝"
];

// Create floating hearts
function createHearts() {
    const heartEmojis = ['❤️', '💕', '💖', '💗', '💓', '💘'];
    
    for (let i = 0; i < 25; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        
        // Random positioning
        const left = Math.random() * 100;
        const delay = Math.random() * 15;
        const duration = 10 + Math.random() * 10;
        const size = 16 + Math.random() * 20;
        
        heart.style.left = left + '%';
        heart.style.animationDelay = delay + 's';
        heart.style.animationDuration = duration + 's';
        heart.style.fontSize = size + 'px';
        
        heartsBg.appendChild(heart);
    }
}

function showError() {
    const msgIndex = Math.min(clickCount, errorMessages.length - 1);
    errorMsg.textContent = errorMessages[msgIndex];
    errorMsg.classList.add('show');
    
    // Shake animation
    btnYes.style.transform = 'translateX(-5px)';
    setTimeout(() => {
        btnYes.style.transform = 'translateX(5px)';
        setTimeout(() => {
            btnYes.style.transform = 'translateX(0)';
        }, 100);
    }, 100);
    
    setTimeout(() => {
        errorMsg.classList.remove('show');
    }, 2000);
}

function showSubtitle() {
    const msgIndex = clickCount - 1;
    if (msgIndex < subtitles.length) {
        subtitle.textContent = subtitles[msgIndex];
        subtitle.classList.add('show');
    }
}

function growYes() {
    clickCount++;
    
    // Show subtitle
    showSubtitle();
    
    // Enable Yes after first click
    if (!yesReady) {
        yesReady = true;
        btnYes.classList.add('ready');
    }
    
    // Incremental growth before final
    if (clickCount < 6) {
        const multiplier = 1 + (clickCount * 0.15);
        const clamped = Math.min(multiplier, 1.8);
        requestAnimationFrame(() => {
            btnYes.style.padding = `${16 * clamped}px ${44 * clamped}px`;
            btnYes.style.fontSize = `${17 * clamped}px`;
        });
    }
    
    // Final stage - Yes takes over
    if (clickCount >= 6) {
        btnNo.classList.add('hide');
        btnYes.classList.add('full');
        btnRow.classList.add('full-width');
    }
}

function goToResult() {
    if (!yesReady) {
        showError();
        return;
    }
    
    page1.style.opacity = '0';
    setTimeout(() => {
        page1.style.display = 'none';
        page2.style.display = 'flex';
        requestAnimationFrame(() => {
            page2.classList.add('show');
        });
    }, 350);
}

btnNo.addEventListener('click', growYes);
btnYes.addEventListener('click', goToResult);

createHearts();