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

// Track occupied lanes to prevent overlap
const lanes = new Set();
const laneWidth = 12; // percentage
const totalLanes = Math.floor(100 / laneWidth);

function getRandomLane() {
    // Find available lanes
    const available = [];
    for (let i = 0; i < totalLanes; i++) {
        if (!lanes.has(i)) {
            available.push(i);
        }
    }
    
    // If all lanes occupied, pick random and allow slight overlap
    if (available.length === 0) {
        return Math.floor(Math.random() * totalLanes);
    }
    
    // Pick random available lane
    const lane = available[Math.floor(Math.random() * available.length)];
    lanes.add(lane);
    
    // Remove from occupied after animation starts
    setTimeout(() => lanes.delete(lane), 2000);
    
    return lane;
}

// River of hearts - no overlap
function createHearts() {
    const heartEmojis = ['❤️', '💕', '💖', '💗', '💓', '💘'];
    
    function spawnHeart() {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        
        // Get non-overlapping lane
        const lane = getRandomLane();
        const left = lane * laneWidth;
        const randomOffset = Math.random() * (laneWidth - 5);
        const finalLeft = left + randomOffset;
        
        const duration = 15 + Math.random() * 10; // 15-25s
        const size = 12 + Math.random() * 16; // 12-28px
        const drift = (Math.random() - 0.5) * 60; // -30 to 30px
        const delay = Math.random() * 2;
        
        heart.style.left = finalLeft + '%';
        heart.style.fontSize = size + 'px';
        heart.style.setProperty('--drift', drift + 'px');
        heart.style.animationDuration = duration + 's';
        heart.style.animationDelay = delay + 's';
        
        heartsBg.appendChild(heart);
        
        setTimeout(() => heart.remove(), (duration + delay) * 1000);
    }
    
    // Spawning interval - slower to prevent crowding
    setInterval(spawnHeart, 900);
    
    // Initial hearts
    for (let i = 0; i < 12; i++) {
        setTimeout(spawnHeart, i * 300);
    }
}

function showError() {
    errorMsg.textContent = errorMessages[Math.min(clickCount, errorMessages.length - 1)];
    errorMsg.classList.add('show');
    
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
    
    const multiplier = 1 + (clickCount * 0.15);
    const clamped = Math.min(multiplier, 1.8);
    requestAnimationFrame(() => {
        btnYes.style.padding = `${16 * clamped}px ${44 * clamped}px`;
        btnYes.style.fontSize = `${17 * clamped}px`;
    });
    
    if (clickCount >= 6) {
        yesReady = true;
        btnYes.classList.add('ready');
        btnNo.classList.add('hide');
        btnYes.classList.add('full');
        btnRow.classList.add('full-width');
    }
}

function createConfetti() {
    const shapes = ['❤️', '💕'];
    
    for (let i = 0; i < 18; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.textContent = shapes[Math.floor(Math.random() * shapes.length)];
            
            const left = 25 + Math.random() * 50;
            const duration = 1.5 + Math.random() * 1.5;
            const delay = Math.random() * 0.3;
            const size = 12 + Math.random() * 10;
            
            confetti.style.left = left + '%';
            confetti.style.fontSize = size + 'px';
            confetti.style.animationDuration = duration + 's';
            confetti.style.animationDelay = delay + 's';
            confetti.style.color = '#ff6b9d';
            
            page2.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), (duration + delay) * 1000);
        }, i * 60);
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
            createConfetti();
        });
    }, 350);
}

btnNo.addEventListener('click', growYes);
btnYes.addEventListener('click', goToResult);

createHearts();