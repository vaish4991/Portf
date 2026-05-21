// Portfolio App JavaScript
class PortfolioApp {
    constructor() {
        this.init();
    }

    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.setupApp();
            });
        } else {
            this.setupApp();
        }
    }

    setupApp() {
        this.setupEventListeners();
        this.initPreloader();
        this.initTypingAnimation();
        this.initScrollAnimations();
        this.initThemeToggle();
        this.initProjectModals();
        this.initContactForm();
        this.initScrollToTop();
        this.initSmoothScrolling();
        this.initNavigation();
    }

    setupEventListeners() {
        window.addEventListener('scroll', this.handleScroll.bind(this));
        window.addEventListener('resize', this.handleResize.bind(this));
        window.addEventListener('load', this.handleLoad.bind(this));
    }

    // Preloader
    initPreloader() {
        const preloader = document.getElementById('preloader');
        if (!preloader) return;
        
        // Hide preloader after a minimum time
        setTimeout(() => {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1500);
    }

    // Typing Animation
    initTypingAnimation() {
        const typingElement = document.getElementById('typing-text');
        if (!typingElement) return;

        const text = "Cybersecurity Enthusiast | AI/ML Explorer | BTech Computer Science Student";
        let index = 0;
        let isDeleting = false;
        let speed = 100;
        
        const typeWriter = () => {
            if (!isDeleting && index < text.length) {
                typingElement.textContent = text.substring(0, index + 1);
                index++;
                speed = 100;
            } else if (isDeleting && index > 0) {
                typingElement.textContent = text.substring(0, index - 1);
                index--;
                speed = 50;
            } else if (index === text.length) {
                isDeleting = true;
                speed = 2000; // Pause at end
            } else if (index === 0) {
                isDeleting = false;
                speed = 500; // Pause at beginning
            }
            
            setTimeout(typeWriter, speed);
        };
        
        typeWriter();
    }

    // Navigation
    initNavigation() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        if (navToggle && navMenu) {
            // Mobile menu toggle
            navToggle.addEventListener('click', (e) => {
                e.preventDefault();
                navToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }

        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                if (navToggle && navMenu) {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            });
        });

        // Update active navigation link based on scroll position
        this.updateActiveNavLink();
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        if (sections.length === 0 || navLinks.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const currentId = entry.target.getAttribute('id');
                    
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${currentId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, {
            threshold: 0.6
        });

        sections.forEach(section => observer.observe(section));
    }

    // Smooth Scrolling
    initSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Scroll Effects
    handleScroll() {
        const navbar = document.getElementById('navbar');
        const scrollTop = window.pageYOffset;
        
        // Navbar scroll effect
        if (navbar) {
            if (scrollTop > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        // Scroll to top button
        const scrollTopBtn = document.getElementById('scroll-top');
        if (scrollTopBtn) {
            if (scrollTop > 500) {
                scrollTopBtn.classList.remove('hidden');
            } else {
                scrollTopBtn.classList.add('hidden');
            }
        }

        // Animate elements on scroll
        this.animateOnScroll();
    }

    // Scroll Animations
    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animationElements = document.querySelectorAll('.project-card, .cert-card, .interest-card, .contact-item');
        animationElements.forEach(el => observer.observe(el));
    }

    animateOnScroll() {
        // Additional scroll-based animations can be added here
    }

    // Theme Toggle
    initThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        const themeIcon = themeToggle?.querySelector('.theme-icon');
        
        if (!themeToggle || !themeIcon) return;

        // Check for saved theme preference or default to light mode
        const currentTheme = document.documentElement.getAttribute('data-color-scheme') || 'light';
        document.documentElement.setAttribute('data-color-scheme', currentTheme);
        this.updateThemeIcon(themeIcon, currentTheme);

        themeToggle.addEventListener('click', (e) => {
            e.preventDefault();
            const currentTheme = document.documentElement.getAttribute('data-color-scheme') || 'light';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            document.documentElement.setAttribute('data-color-scheme', newTheme);
            this.updateThemeIcon(themeIcon, newTheme);
        });
    }

    updateThemeIcon(icon, theme) {
        if (icon) {
            icon.textContent = theme === 'light' ? '🌙' : '☀️';
        }
    }

    // Project Modals
    initProjectModals() {
        const projectCards = document.querySelectorAll('.project-card');
        const modal = document.getElementById('project-modal');
        const modalOverlay = document.getElementById('modal-overlay');
        const modalClose = document.getElementById('modal-close');
        
        if (!modal || !modalOverlay || !modalClose) return;

        const projectData = {
            
            2: {
                title: "Basic Calculator Project",
                description: "A functional calculator application with clean UI and essential mathematical operations implementation. Built using vanilla JavaScript with a focus on user experience and error handling.",
                techStack: ["HTML", "CSS", "JavaScript"],
                details: "Includes basic arithmetic operations, decimal support, keyboard input handling, and responsive design. Features error handling for division by zero and invalid operations."
            },
            3: {
                title: "SRS on Farm Management App",
                description: "Comprehensive Software Requirements Specification document for a farm management application, demonstrating software engineering principles and systematic approach to requirement gathering.",
                techStack: ["Software Engineering", "Documentation", "System Analysis"],
                details: "Detailed analysis including functional and non-functional requirements, use case diagrams, system architecture, and implementation guidelines for a complete farm management solution."
            },
            4: {
                title: "Library Management System",
                description: "A mini project implementing a complete library management system with book inventory, member management, and transaction handling. Built with focus on database design and user interface.",
                techStack: ["Database Design", "System Development", "User Interface"],
                details: "Features include book cataloging, member registration, book issuing/returning, fine calculation, and reporting system. Designed with proper database normalization and user-friendly interface."
            }
        };

        projectCards.forEach(card => {
            const projectBtn = card.querySelector('.project-btn');
            const projectId = card.getAttribute('data-project');
            
            if (projectBtn && projectId && projectData[projectId]) {
                projectBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.openProjectModal(projectId, projectData[projectId]);
                });
            }

            if (projectId && projectData[projectId]) {
                card.addEventListener('click', (e) => {
                    // Only open modal if not clicking on button
                    if (!e.target.closest('.project-btn')) {
                        this.openProjectModal(projectId, projectData[projectId]);
                    }
                });
            }
        });

        // Close modal events
        modalClose.addEventListener('click', (e) => {
            e.preventDefault();
            this.closeProjectModal();
        });
        
        modalOverlay.addEventListener('click', () => {
            this.closeProjectModal();
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
                this.closeProjectModal();
            }
        });
    }

    openProjectModal(projectId, projectData) {
        const modal = document.getElementById('project-modal');
        const modalTitle = document.getElementById('modal-title');
        const modalDescription = document.getElementById('modal-description');
        const modalTech = document.getElementById('modal-tech');
        const modalDetails = document.getElementById('modal-details');

        if (!modal || !modalTitle || !modalDescription || !modalTech || !modalDetails) return;

        modalTitle.textContent = projectData.title;
        modalDescription.textContent = projectData.description;
        modalDetails.innerHTML = `<h4>Project Details</h4><p>${projectData.details}</p>`;
        
        modalTech.innerHTML = '';
        projectData.techStack.forEach(tech => {
            const techTag = document.createElement('span');
            techTag.className = 'tech-tag';
            techTag.textContent = tech;
            modalTech.appendChild(techTag);
        });

        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    closeProjectModal() {
        const modal = document.getElementById('project-modal');
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    }

    // Contact Form
    initContactForm() {
        const form = document.getElementById('contact-form');
        const formStatus = document.getElementById('form-status');
        
        if (!form || !formStatus) return;
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmission(form, formStatus);
        });

        // Real-time validation
        const inputs = form.querySelectorAll('.form-control');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    validateField(field) {
        const fieldName = field.name;
        const value = field.value.trim();
        const errorElement = document.getElementById(`${fieldName}-error`);
        
        let isValid = true;
        let errorMessage = '';

        switch (fieldName) {
            case 'name':
                if (value.length < 2) {
                    isValid = false;
                    errorMessage = 'Name must be at least 2 characters long';
                }
                break;
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
                break;
            case 'subject':
                if (value.length < 5) {
                    isValid = false;
                    errorMessage = 'Subject must be at least 5 characters long';
                }
                break;
            case 'message':
                if (value.length < 10) {
                    isValid = false;
                    errorMessage = 'Message must be at least 10 characters long';
                }
                break;
        }

        if (errorElement) {
            errorElement.textContent = errorMessage;
            field.style.borderColor = isValid ? '' : 'var(--color-error)';
        }

        return isValid;
    }

    clearFieldError(field) {
        const errorElement = document.getElementById(`${field.name}-error`);
        if (errorElement) {
            errorElement.textContent = '';
            field.style.borderColor = '';
        }
    }

    handleFormSubmission(form, statusElement) {
        const formData = new FormData(form);
        const data = {};
        let isFormValid = true;

        // Collect and validate all form data
        for (let [key, value] of formData.entries()) {
            data[key] = value.trim();
            const field = form.querySelector(`[name="${key}"]`);
            if (field && !this.validateField(field)) {
                isFormValid = false;
            }
        }

        if (!isFormValid) {
            this.showFormStatus(statusElement, 'Please correct the errors above.', 'error');
            return;
        }

        // Simulate form submission
        const submitButton = form.querySelector('button[type="submit"]');
        if (!submitButton) return;

        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        // Simulate API call delay
        setTimeout(() => {
            // Reset form and show success message
            form.reset();
            this.showFormStatus(statusElement, 'Thank you for your message! I\'ll get back to you soon.', 'success');
            
            submitButton.textContent = originalText;
            submitButton.disabled = false;

            // Clear success message after 5 seconds
            setTimeout(() => {
                statusElement.textContent = '';
                statusElement.className = 'form-status';
            }, 5000);
        }, 2000);
    }

    showFormStatus(element, message, type) {
        if (element) {
            element.textContent = message;
            element.className = `form-status ${type}`;
        }
    }

    // Scroll to Top
    initScrollToTop() {
        const scrollTopBtn = document.getElementById('scroll-top');
        
        if (!scrollTopBtn) return;

        scrollTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Handle window resize
    handleResize() {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768) {
            const navMenu = document.getElementById('nav-menu');
            const navToggle = document.getElementById('nav-toggle');
            
            if (navMenu && navToggle) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        }
    }

    // Handle window load
    handleLoad() {
        // Initialize any load-dependent functionality
        this.initScrollAnimations();
    }

    // Utility method for smooth scrolling to element
    scrollToElement(elementId, offset = 80) {
        const element = document.getElementById(elementId);
        if (element) {
            const elementPosition = element.offsetTop - offset;
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        }
    }
}

// Initialize the portfolio app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioApp();
});

// Also initialize if DOM is already loaded
if (document.readyState !== 'loading') {
    new PortfolioApp();
}

// Handle any uncaught errors gracefully
window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.error);
});

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PortfolioApp;
}