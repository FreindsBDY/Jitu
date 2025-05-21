// Set Jitu's birthday date (Month is 0-indexed, so 0 = January, 11 = December)
const birthdayDate = new Date();
birthdayDate.setMonth(11); // December (0-11)
birthdayDate.setDate(31);  // 31st
birthdayDate.setHours(0, 0, 0, 0); // Start of the day

// If birthday has already passed this year, set it for next year
if (birthdayDate < new Date()) {
  birthdayDate.setFullYear(birthdayDate.getFullYear() + 1);
}

const birthdayTime = birthdayDate.getTime();
let countdownInterval;

// Fun messages to display during the countdown
const messages = [
  "Counting down to your special day!",
  "The party is coming soon!",
  "Get ready for an amazing celebration!",
  "Exciting times ahead!",
  "The countdown is on!"
];

// Update countdown timer with animations
function updateCountdown() {
  const now = new Date().getTime();
  const distance = birthdayTime - now;

  // Time calculations
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Update the countdown display with animation
  animateValue('days', days);
  animateValue('hours', hours);
  animateValue('minutes', minutes);
  animateValue('seconds', seconds);

  // Show a random fun message every 5 seconds
  if (seconds % 5 === 0) {
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    document.querySelector('.subtitle').textContent = randomMessage;
  }

  // If countdown is over
  if (distance < 0) {
    clearInterval(countdownInterval);
    document.querySelector('.countdown-container').innerHTML = `
      <h2>🎉 Happy Birthday Jitu! 🎉</h2>
      <p class="birthday-wish">Wishing you an amazing day filled with joy and laughter!</p>
      <div class="party-emoji">🎂🎈🎁🎊</div>
    `;
    
    // Trigger confetti
    triggerConfetti();
  }
}

// Animate number changes
function animateValue(id, newValue) {
  const element = document.getElementById(id);
  const current = parseInt(element.textContent) || 0;
  
  if (current !== newValue) {
    element.classList.add('bounce');
    setTimeout(() => {
      element.textContent = String(newValue).padStart(2, '0');
      element.classList.remove('bounce');
    }, 200);
  }
}

// Create confetti effect
function triggerConfetti() {
  const container = document.querySelector('.floating-elements');
  container.innerHTML = ''; // Clear previous confetti
  
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.animationDelay = Math.random() * 5 + 's';
    confetti.style.setProperty('--delay', Math.random() * 5);
    confetti.style.background = getRandomColor();
    container.appendChild(confetti);
  }
}

// Generate random bright colors
function getRandomColor() {
  const colors = [
    '#ff6b6b', '#4ecdc4', '#ffd93d', '#95e1d3', '#fce38a',
    '#ff9ff3', '#feca57', '#ff6b6b', '#48dbfb', '#1dd1a1'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Initialize countdown when the page loads
document.addEventListener('DOMContentLoaded', () => {
  updateCountdown();
  countdownInterval = setInterval(updateCountdown, 1000);
  
  // Initial confetti
  triggerConfetti();
});