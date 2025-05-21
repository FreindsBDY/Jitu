// Quiz questions
const questions = [
  {
    question: "Where did we first meet?",
    options: ["School", "College", "At a party", "On Instagram"],
    answer: 1
  },
  {
    question: "What's their favorite food?",
    options: ["Pizza", "Sushi", "Biryani", "Pasta"],
    answer: 2
  },
  {
    question: "Which city do they love the most?",
    options: ["Paris", "New York", "Mumbai", "Tokyo"],
    answer: 2
  }
];

let currentQuestion = 0;
let correctAnswers = 0;

function loadQuestion() {
  const q = questions[currentQuestion];
  document.getElementById("question").innerText = q.question;
  const optionsContainer = document.getElementById("options");
  optionsContainer.innerHTML = "";

  q.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.innerText = option;
    btn.onclick = () => {
      if (index === q.answer) {
        correctAnswers++;
        btn.style.backgroundColor = '#4ecdc4';
        btn.style.color = 'white';
      } else {
        btn.style.backgroundColor = '#ff6b6b';
        btn.style.color = 'white';
      }
      document.getElementById("next-btn").disabled = false;
    };
    optionsContainer.appendChild(btn);
  });

  document.getElementById("next-btn").disabled = true;
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showPopup();
  }
}

function showPopup() {
  document.getElementById("quiz-container").classList.add("hidden");
  document.getElementById("popup").classList.remove("hidden");
  
  const popupContent = document.querySelector('#popup .popup-content');
  popupContent.innerHTML = `
    <h2>🎉 Quiz Complete! 🎂</h2>
    <p>You got ${correctAnswers} out of ${questions.length} questions correct!</p>
    <div class="action-buttons">
      <button onclick="location.reload()">Try Again</button>
      <a href="gallery.html" class="btn secondary">View Gallery</a>
      <a href="wishes.html" class="btn tertiary">Read Wishes</a>
    </div>
  `;

  // Add confetti effect when the quiz is complete
  for (let i = 0; i < 100; i++) {
    createConfetti();
  }
}

function createConfetti() {
  const confetti = document.createElement('div');
  confetti.style.position = 'fixed';
  confetti.style.width = '10px';
  confetti.style.height = '10px';
  confetti.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
  confetti.style.left = Math.random() * 100 + 'vw';
  confetti.style.top = '-10px';
  confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
  confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
  document.body.appendChild(confetti);

  setTimeout(() => confetti.remove(), 5000);
}

// Add confetti animation to CSS (needed for the general page background)
const style = document.createElement('style');
style.textContent = `
  @keyframes fall {
    to {
      transform: translateY(100vh) rotate(360deg);
    }
  }
`;
document.head.appendChild(style);

// Initialize quiz on page load
window.onload = loadQuestion;
