// ==========================================
// Custom Cursor
// ==========================================
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    // Slight delay for the follower
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 50);
});

// Hover effect for links and buttons
const interactables = document.querySelectorAll('a, button, .project-card, .info-card, .timeline-content');
interactables.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorFollower.style.width = '50px';
        cursorFollower.style.height = '50px';
        cursorFollower.style.backgroundColor = 'rgba(0, 225, 255, 0.1)';
    });
    
    el.addEventListener('mouseleave', () => {
        cursorFollower.style.width = '30px';
        cursorFollower.style.height = '30px';
        cursorFollower.style.backgroundColor = 'transparent';
    });
});

// ==========================================
// Sticky Navbar & Mobile Menu
// ==========================================
const navbar = document.querySelector('.navbar');
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
    if(window.scrollY > 20) {
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }
});

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Change icon
    const icon = menuBtn.querySelector('i');
    if(navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close menu when clicking a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = menuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// ==========================================
// Typing Effect
// ==========================================
const typingText = document.querySelector('.typing-text');
const roles = ["AI&DS Engineering Student", "Web Developer"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentRole = roles[roleIndex];
    
    if(isDeleting) {
        typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let typeSpeed = parseInt(isDeleting ? 50 : 100);
    
    if(!isDeleting && charIndex === currentRole.length) {
        // Pause at end
        typeSpeed = parseInt(2000);
        isDeleting = true;
    } else if(isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = parseInt(500);
    }
    
    setTimeout(type, typeSpeed);
}

// Start typing on load
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(type, 1000);
});

// ==========================================
// Scroll Reveal Animation
// ==========================================
const reveals = document.querySelectorAll('.reveal');
const progressBars = document.querySelectorAll('.progress-line span');

function revealOnScroll() {
    const windowHeight = window.innerHeight;
    const elementVisible = 150;
    
    reveals.forEach(reveal => {
        const elementTop = reveal.getBoundingClientRect().top;
        if(elementTop < windowHeight - elementVisible) {
            reveal.classList.add('active');
            
            // Trigger progress bar animations if in skills section
            if(reveal.classList.contains('skill-category')) {
                const barsInReveal = reveal.querySelectorAll('.progress-line span');
                barsInReveal.forEach(bar => {
                    const progress = bar.parentElement.getAttribute('data-progress');
                    bar.style.width = progress;
                });
            }
        }
    });

    // Active Link Highlighting
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if(pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if(item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
// Trigger once on load
revealOnScroll();

// ==========================================
// Particle Background Canvas
// ==========================================
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let particlesArray;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }
    
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    
    update() {
        if(this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if(this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }
        
        this.x += this.directionX;
        this.y += this.directionY;
        
        this.draw();
    }
}

function init() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 12000; // Adjust density
    
    // Cap particle absolute amount for performance
    if(numberOfParticles > 150) numberOfParticles = 150;
    
    for(let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 0.5;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 1) - 0.5;
        let directionY = (Math.random() * 1) - 0.5;
        let color = 'rgba(0, 225, 255, 0.2)'; // Primary color faint
        
        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    
    for(let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connect();
}

// Connect particles close to each other
function connect() {
    let opacityValue = 1;
    for(let a = 0; a < particlesArray.length; a++) {
        for(let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) +
                           ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
                           
            if(distance < (canvas.width / 10) * (canvas.height / 10)) {
                opacityValue = 1 - (distance / 20000);
                if(opacityValue < 0) opacityValue = 0;
                
                ctx.strokeStyle = `rgba(0, 225, 255, ${opacityValue * 0.1})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

init();
animate();
