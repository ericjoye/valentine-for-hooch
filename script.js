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
    "Not yet! Keep clicking No! 💕",
    "Nope! More Nos needed! 😉",
    "Still locked! 🔒 Keep going!",
    "Not until you earn it! 😏",
    "So close! Just a couple more Nos! 🥺",
    "One more No and you've got me! 💗",
    "Last one! Unlock me! 💝"
];

// River of hearts - seamless bottom to top flow
function createHearts() {
    const heartEmojis = ['❤️', '💕', '💖', '💗', '💓', '💘'];
    const maxHearts = 30;
    
    function spawnHeart() {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        
        // Random properties
        const left = Math.random() * 100;
        const duration = 12 + Math.random() * 8; // 12-20s
        const size = 14 + Math.random() * 18; // 14-32px
        const drift = (Math.random() - 0.5) * 100; // -50 to 50px horizontal drift
        
        heart.style.left = left + '%';
        heart.style.fontSize = size + 'px';
        heart.style.setProperty('--drift', drift + 'px');
        heart.style.animationDuration = duration + 's';
        
        heartsBg.appendChild(heart);
        
        // Remove after animation completes
        setTimeout(() => {
            heart.remove();
        }, duration * 1000);
    }
    
    // Initial batch
    for (let i = 0; i < maxHearts; i++) {
        setTimeout(spawnHeart, i * 400); // Stagger entrance
    }
    
    // Continuous spawning
    setInterval(spawnHeart, 600);
}

function showError() {
    errorMsg.textContent = errorMessages[Math.min(clickCount, errorMessages.length - 1)];
    errorMsg.classList.add('show');
    
    // Shake effect
    btnYes.style.transform = 'translateX(-5px)';
    setTimeout(() => {
        btnYes.style.transform = 'translateX(5px)';
        setTimeout(() => btnYes.style.transform = 'translateX(0)', 100);
    }, 100);
    
    setTimeout(() => errorMsg.classList.remove('show'), 2000);
}

function showSubtitle() {
    const currentSubtitle = subtitles[Math.min(clickCount - 1, subtitles.length - 1)];
    if (currentSubtitle) {
        subtitle.textContent = currentSubtitle;
        subtitle.classList.add('show');
    }
}

function growYes() {
    clickCount++;
    showSubtitle();
    
    // Grow Yes progressively
    const multiplier = 1 + (clickCount * 0.15);
    const clamped = Math.min(multiplier, 1.8);
    requestAnimationFrame(() => {
        btnYes.style.padding = `${16 * clamped}px ${44 * clamped}px`;
        btnYes.style.fontSize = `${17 * clamped}px`;
    });
    
    // UNLOCK YES at stage 6 (after 6 No clicks)
    if (clickCount >= 6) {
        yesReady = true;
        btnYes.classList.add('ready');
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
        requestAnimationFrame(() => page2.classList.add('show'));
    }, 350);
}

btnNo.addEventListener('click', growYes);
btnYes.addEventListener('click', goToResult);

createHearts();