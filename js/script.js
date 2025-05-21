// Main JavaScript for Jitu's Birthday Website

// DOM Elements
const body = document.body;
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-links a');
const actionButtons = document.querySelectorAll('.action-buttons .btn');
const popup = document.getElementById('popup');

// Initialize the website
document.addEventListener('DOMContentLoaded', () => {
    // Add scroll event for navbar
    window.addEventListener('scroll', handleScroll);
    
    // Add click events for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavLinkClick);
    });
    
    // Add hover effects for action buttons
    actionButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-5px)';
            button.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
            button.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // Show popup after 5 seconds
    setTimeout(showBirthdayPopup, 5000);
    
    // Add confetti to the page
    createFloatingElements();
});

// Handle scroll events
function handleScroll() {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
}

// Handle navigation link clicks
function handleNavLinkClick(e) {
    // Remove active class from all links
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to clicked link
    this.classList.add('active');
    
    // Smooth scroll to section if it's a hash link
    const href = this.getAttribute('href');
    if (href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    }
}

// Show birthday popup
function showBirthdayPopup() {
    popup.classList.remove('hidden');
    popup.classList.add('visible');
    
    // Add animation class
    const popupContent = popup.querySelector('.popup-content');
    popupContent.classList.add('animate__animated', 'animate__zoomIn');
    
    // Close popup when clicking outside
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            closePopup();
        }
    });
    
    // Close popup after 10 seconds
    setTimeout(closePopup, 10000);
}

// Close popup
function closePopup() {
    const popupContent = popup.querySelector('.popup-content');
    popupContent.classList.remove('animate__zoomIn');
    popupContent.classList.add('animate__zoomOut');
    
    setTimeout(() => {
        popup.classList.remove('visible');
        popup.classList.add('hidden');
        popupContent.classList.remove('animate__zoomOut');
    }, 300);
}

// Create floating elements (balloons, confetti, etc.)
function createFloatingElements() {
    const container = document.querySelector('.floating-elements');
    if (!container) return;
    
    // Clear existing elements
    container.innerHTML = '';
    
    // Create confetti
    for (let i = 0; i < 30; i++) {
        createFloatingElement(container, 'confetti');
    }
    
    // Create some balloons
    for (let i = 0; i < 5; i++) {
        createFloatingElement(container, 'balloon');
    }
}

// Create a single floating element
function createFloatingElement(container, type) {
    const element = document.createElement('div');
    element.className = type;
    
    // Random position
    const posX = Math.random() * 100;
    const delay = Math.random() * 5;
    const duration = 10 + Math.random() * 20;
    const size = 10 + Math.random() * 20;
    
    // Set styles based on element type
    if (type === 'confetti') {
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        element.style.background = getRandomColor();
        element.style.borderRadius = '2px';
        element.style.opacity = '0.8';
    } else if (type === 'balloon') {
        element.style.width = `${size * 2}px`;
        element.style.height = `${size * 2.5}px`;
        element.style.background = getRandomColor();
        element.style.borderRadius = '50% 50% 50% 50% / 60% 60% 40% 40%';
        element.style.position = 'absolute';
        element.style.boxShadow = 'inset -5px -5px 10px rgba(0,0,0,0.1)';
        
        // Add balloon string
        const string = document.createElement('div');
        string.style.position = 'absolute';
        string.style.width = '2px';
        string.style.height = '50px';
        string.style.background = '#999';
        string.style.bottom = '-50px';
        string.style.left = '50%';
        string.style.transform = 'translateX(-50%)';
        element.appendChild(string);
    }
    
    // Common styles
    element.style.position = 'absolute';
    element.style.left = `${posX}%`;
    element.style.top = '100vh';
    element.style.animation = `floatUp ${duration}s linear ${delay}s infinite`;
    element.style.zIndex = '1';
    
    // Add to container
    container.appendChild(element);
}

// Generate random color
function getRandomColor() {
    const colors = [
        '#ff6b6b', '#4ecdc4', '#ffd93d', '#95e1d3', '#fce38a',
        '#ff9ff3', '#feca57', '#48dbfb', '#1dd1a1', '#ff9ff3'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Add CSS animation for floating elements
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add bounce animation for countdown numbers
const bounceStyle = document.createElement('style');
bounceStyle.textContent = `
    @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
    }
    .bounce {
        display: inline-block;
        animation: bounce 0.5s ease;
    }
`;
document.head.appendChild(bounceStyle);

// Add event listener for the popup close button
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('close-popup')) {
        closePopup();
    }
});
