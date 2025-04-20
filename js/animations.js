// Animations and Page Motions - Numani Kakembo Co - Optimized for Performance

document.addEventListener('DOMContentLoaded', function() {
    // Performance optimization - Debounce scroll events
    let scrollTimer;
    
    // Navbar background on scroll - optimized with debounce
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (!scrollTimer) {
            scrollTimer = setTimeout(function() {
                if (window.scrollY > 50) {
                    navbar.classList.add('navbar-bg');
                } else {
                    navbar.classList.remove('navbar-bg');
                }
                scrollTimer = null;
            }, 100);
        }
    });

    // Initialize optimized animations
    initScrollAnimations();
    
    // Initialize counter animations only when visible
    if (document.querySelector('.counter-stat')) {
        initCounterAnimations();
    }
    
    // Add back-to-top behavior
    initBackToTop();
});

// More efficient intersection observer with reduced recalculations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    // Skip if no elements to animate
    if (animatedElements.length === 0) return;
    
    // Performance: use single observer instance for all elements
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Once animated, stop observing for better performance
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px'
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Optimized counter animations
function initCounterAnimations() {
    const counters = document.querySelectorAll('.counter-stat .h3');
    
    // Skip if no counters
    if (counters.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            counters.forEach(counter => {
                startCounter(counter);
            });
            // Stop observing after triggering
            observer.disconnect();
        }
    }, {
        threshold: 0.5
    });
    
    // Only observe the counter section container rather than each counter
    const counterSection = document.querySelector('.cta-section');
    if (counterSection) {
        observer.observe(counterSection);
    }
}

// More efficient counter function with reduced DOM updates
function startCounter(element) {
    const target = parseInt(element.textContent, 10);
    const duration = 1500; // Reduced from 2000ms to 1500ms
    const step = target / (duration / 32); // Reduced from 16ms to 32ms frame rate
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 32); // Using 32ms instead of 16ms - still smooth but half the updates
}

// Optimized back-to-top behavior
function initBackToTop() {
    const scrollLinks = document.querySelectorAll('.js-scroll-trigger, .backtop');
    
    if (scrollLinks.length === 0) return;
    
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
    
    // Show/hide back to top button with debounce
    const backTopBtn = document.querySelector('.backtop');
    if (backTopBtn) {
        let scrollTimer;
        window.addEventListener('scroll', function() {
            if (!scrollTimer) {
                scrollTimer = setTimeout(function() {
                    if (window.scrollY > 300) {
                        backTopBtn.classList.add('reveal');
                    } else {
                        backTopBtn.classList.remove('reveal');
                    }
                    scrollTimer = null;
                }, 100);
            }
        });
    }
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