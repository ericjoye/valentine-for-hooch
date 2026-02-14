const page1 = document.getElementById('page1');
const page2 = document.getElementById('page2');
const btnYes = document.getElementById('btnYes');
const btnNo = document.getElementById('btnNo');
const subtitle = document.getElementById('subtitle');

let clickCount = 0;

const subtitles = [
    "Well can I have some hooch? 😏",
    "Pretty please? 🥺",
    "How about a kis? 😜",
    "40 kis's behind... Ready to pay up? 😘",
    "You're really making me work for this, huh? 🤔",
    "Pretty please with a cherry on top? 🥲"
];

function growYes() {
    clickCount++;
    
    // Smooth subtitle transition
    if (clickCount <= subtitles.length) {
        subtitle.textContent = subtitles[clickCount - 1];
        subtitle.classList.add('show');
    }
    
    // After 6 clicks, Yes takes over completely
    if (clickCount >= 6) {
        btnNo.classList.add('hide');
        btnYes.classList.add('full');
        document.querySelector('.button-row').classList.add('full-width');
    } else {
        // Smooth incremental growth before final
        const multiplier = 1 + (clickCount * 0.15);
        const clamped = Math.min(multiplier, 1.8);
        
        requestAnimationFrame(() => {
            btnYes.style.padding = `${16 * clamped}px ${44 * clamped}px`;
            btnYes.style.fontSize = `${17 * clamped}px`;
        });
    }
}

function goToResult() {
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