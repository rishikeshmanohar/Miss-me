const questionContainer = document.querySelector(".question-container");
const resultContainer = document.querySelector(".result-container");
const gifResult = document.querySelector(".gif-result");
const heartLoader = document.querySelector(".cssload-main");
const yesBtn = document.querySelector(".js-yes-btn");
const noBtn = document.querySelector(".js-no-btn");
const videoContainer = document.querySelector(".video-container");
const youtubeVideo = document.querySelector("#youtube-video");

const cuteMessages = [
  "Are you sure? 🥺",
  "Really really sure? 💔",
  "Think again! 💕",
  "You don't mean that! 😢",
  "Please say yes! 🙏",
  "I'll be so sad! 😭",
  "Don't break my heart! 💔",
  "Just kidding, right? 😅",
  "You're teasing me! 😤",
  "I know you miss me! 💖"
];

let messageIndex = 0;

function moveNoButton() {
  // Get button dimensions
  const buttonWidth = noBtn.offsetWidth;
  const buttonHeight = noBtn.offsetHeight;
  
  // Calculate safe boundaries (keeping button fully visible)
  const maxX = window.innerWidth - buttonWidth - 50;
  const maxY = window.innerHeight - buttonHeight - 50;
  const minX = 50;
  const minY = 50;
  
  // Generate random position within safe bounds
  const newX = Math.floor(Math.random() * (maxX - minX)) + minX;
  const newY = Math.floor(Math.random() * (maxY - minY)) + minY;

  // Set fixed positioning and new coordinates
  noBtn.style.position = "fixed";
  noBtn.style.left = `${newX}px`;
  noBtn.style.top = `${newY}px`;
  noBtn.style.right = "auto";
  noBtn.style.bottom = "auto";
  noBtn.style.zIndex = "1000";
  
  // Change button text to cute messages
  noBtn.textContent = cuteMessages[messageIndex % cuteMessages.length];
  messageIndex++;
  
  // Add a cute shake animation
  noBtn.style.animation = "shake 0.5s ease-in-out";
  setTimeout(() => {
    noBtn.style.animation = "";
  }, 500);
}

// Mouse events for desktop
noBtn.addEventListener("mouseover", moveNoButton);

// Touch events for mobile
noBtn.addEventListener("touchstart", (e) => {
  e.preventDefault();
  moveNoButton();
});

noBtn.addEventListener("touchend", (e) => {
  e.preventDefault();
});

// Additional mobile event listeners
noBtn.addEventListener("touchmove", (e) => {
  e.preventDefault();
  moveNoButton();
});

// Fallback for any interaction
noBtn.addEventListener("click", (e) => {
  e.preventDefault();
  moveNoButton();
});

const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0) scale(1.05); }
    25% { transform: translateX(-5px) scale(1.05); }
    75% { transform: translateX(5px) scale(1.05); }
  }
`;
document.head.appendChild(style);

yesBtn.addEventListener("click", () => {
  yesBtn.style.transform = "scale(0.95)";
  setTimeout(() => {
    yesBtn.style.transform = "scale(1.05)";
  }, 100);
  
  questionContainer.style.opacity = "0";
  questionContainer.style.transform = "translate(-50%, -50%) scale(0.9)";
  
  setTimeout(() => {
  questionContainer.style.display = "none";
  heartLoader.style.display = "inherit";
  }, 300);

  const timeoutId = setTimeout(() => {
    heartLoader.style.display = "none";
    resultContainer.style.display = "inherit";
    resultContainer.style.opacity = "0";
    resultContainer.style.transform = "translate(-50%, -50%) scale(0.8)";
    
    setTimeout(() => {
      resultContainer.style.opacity = "1";
      resultContainer.style.transform = "translate(-50%, -50%) scale(1)";
      resultContainer.style.transition = "all 0.5s ease";
      
      // Show video container and play immediately after result appears
      videoContainer.classList.add("show");
      
      // Play the YouTube video immediately
      const videoSrc = youtubeVideo.src;
      youtubeVideo.src = videoSrc + "&autoplay=1";
      
    }, 100);
    
    if (gifResult) {
    gifResult.play();
    }
  }, 3000);
});

function createFloatingHeart() {
  const heart = document.createElement('div');
  heart.innerHTML = '💕';
  heart.style.position = 'fixed';
  heart.style.left = Math.random() * window.innerWidth + 'px';
  heart.style.top = window.innerHeight + 'px';
  heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
  heart.style.opacity = '0.6';
  heart.style.pointerEvents = 'none';
  heart.style.zIndex = '-1';
  heart.style.animation = `floatUp ${Math.random() * 3 + 4}s linear`;
  
  document.body.appendChild(heart);
  
  setTimeout(() => {
    heart.remove();
  }, 7000);
}

const floatStyle = document.createElement('style');
floatStyle.textContent = `
  @keyframes floatUp {
    0% {
      transform: translateY(0) rotate(0deg);
      opacity: 0.6;
    }
    100% {
      transform: translateY(-100vh) rotate(360deg);
      opacity: 0;
    }
  }
`;
document.head.appendChild(floatStyle);

setInterval(createFloatingHeart, 2000);