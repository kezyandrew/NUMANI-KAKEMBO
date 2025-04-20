// Animations and Page Motions - Numani Kakembo Co

document.addEventListener('DOMContentLoaded', function() {
    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-bg');
        } else {
            navbar.classList.remove('navbar-bg');
        }
    });

    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize counter animations
    initCounterAnimations();
    
    // Add hover effects to service cards
    initHoverEffects();
    
    // Add shimmer effect to CTA buttons
    initCTAEffects();
    
    // Add mineral animations
    initMineralAnimations();
});

// Detect when elements enter the viewport and trigger animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // If it's a counter, start the counter
                if (entry.target.classList.contains('counter-stat')) {
                    startCounter(entry.target.querySelector('.h3'));
                }
            }
        });
    }, {
        threshold: 0.2 // Trigger when 20% of the element is visible
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Counter animations
function initCounterAnimations() {
    const counterSection = document.querySelector('.cta-section');
    
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            const counters = document.querySelectorAll('.counter-stat .h3');
            counters.forEach((counter, index) => {
                setTimeout(() => {
                    startCounter(counter);
                }, index * 200); // Stagger the counter animations
            });
            observer.unobserve(counterSection);
        }
    }, {
        threshold: 0.5
    });
    
    if (counterSection) {
        observer.observe(counterSection);
    }
}

// Animated counting function
function startCounter(element) {
    const target = parseInt(element.textContent, 10);
    const duration = 2000; // 2 seconds
    const step = target / (duration / 16); // 16ms is approx one frame at 60fps
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Initialize hover effects for service cards
function initHoverEffects() {
    const cards = document.querySelectorAll('.service-item, .team-block, .metamorphic-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('img')?.classList.add('scale-hover');
            this.querySelector('i')?.classList.add('rotate-hover');
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('img')?.classList.remove('scale-hover');
            this.querySelector('i')?.classList.remove('rotate-hover');
        });
    });
}

// Add shimmer effect to CTA buttons
function initCTAEffects() {
    const ctaButtons = document.querySelectorAll('.btn-main, .btn-main-2');
    
    ctaButtons.forEach(button => {
        // Add shine effect on hover
        button.addEventListener('mouseenter', function() {
            this.classList.add('shine');
        });
        
        button.addEventListener('mouseleave', function() {
            this.classList.remove('shine');
        });
        
        // Add pulse effect on click
        button.addEventListener('click', function() {
            this.classList.add('pulse-once');
            setTimeout(() => {
                this.classList.remove('pulse-once');
            }, 600);
        });
    });
}

// Special animations for mineral and energy sections
function initMineralAnimations() {
    const mineralImages = document.querySelectorAll('.about-img img');
    
    // Float animation on hover
    mineralImages.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.classList.add('float');
        });
        
        img.addEventListener('mouseleave', function() {
            this.classList.remove('float');
        });
    });
    
    // Add animated highlight to mineral text
    const mineralText = document.querySelectorAll('.section-title h2, .title-color');
    
    mineralText.forEach(text => {
        // Highlight minerals and energy keywords
        if (text.innerHTML.includes('Mineral') || 
            text.innerHTML.includes('mineral') || 
            text.innerHTML.includes('Energy') || 
            text.innerHTML.includes('energy')) {
            
            text.innerHTML = text.innerHTML.replace(/(Mineral|mineral|Energy|energy)/g, '<span class="highlight">$1</span>');
        }
    });
}

// Add scroll to top smooth behavior
window.addEventListener('load', function() {
    const scrollLinks = document.querySelectorAll('.js-scroll-trigger, .backtop');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.hash !== '') {
                e.preventDefault();
                const hash = this.hash;
                
                document.querySelector(hash).scrollIntoView({
                    behavior: 'smooth'
                });
            } else if (this.classList.contains('backtop')) {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Add parallax effect to hero section background
window.addEventListener('scroll', function() {
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        const scrollPosition = window.scrollY;
        heroSection.style.backgroundPosition = 'center ' + (scrollPosition * 0.4) + 'px';
    }
});

// Add extra animation to mineral cards 
document.addEventListener('DOMContentLoaded', function() {
    // Special animation for minerals section
    const mineralCards = document.querySelectorAll('.service-item:nth-child(5), .service-item:nth-child(6)');
    
    mineralCards.forEach(card => {
        card.classList.add('special-card');
        
        card.addEventListener('mouseenter', function() {
            this.classList.add('glow');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('glow');
        });
    });
}); 