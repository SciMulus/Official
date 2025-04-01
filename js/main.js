// SciMulus Club - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate on Scroll)
    // Note: AOS library needs to be included in the HTML files
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease',
            once: false,
            offset: 50
        });
    }

    // Universal navbar functionality
    const toggler = document.querySelector(".navbar-toggler");
    const menu = document.querySelector(".navbar-collapse");
    const navbar = document.querySelector('.navbar');

    if (toggler && menu) {
        // Toggle menu
        toggler.addEventListener("click", function(e) {
            e.preventDefault();
            menu.classList.toggle('show');
            toggler.classList.toggle('active');
        });
        
        // Close menu when clicking on links
        document.querySelectorAll(".nav-link").forEach(link => {
            link.addEventListener("click", () => {
                menu.classList.remove("show");
                toggler.classList.remove("active");
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!toggler.contains(e.target) && 
                !menu.contains(e.target) && 
                menu.classList.contains('show')) {
                menu.classList.remove('show');
                toggler.classList.remove('active');
            }
        });
    }

    // Ensure navbar is always visible
    if (navbar) {
        navbar.style.opacity = '1';
        navbar.style.visibility = 'visible';
        
        // Update on scroll
        window.addEventListener('scroll', function() {
            navbar.style.opacity = '1';
            navbar.style.visibility = 'visible';
            
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjusted for header height
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active nav link updater
    const updateActiveNavLink = () => {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (navLink && scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                navLink.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', updateActiveNavLink);

    // Update active nav link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });

    // Custom fade-up animation
    const fadeElements = document.querySelectorAll('.fade-up');
    const checkFade = () => {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 50) {
                element.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', checkFade);
    window.addEventListener('resize', checkFade);
    checkFade(); // Check on initial load

    // Responsive behavior
    const handleWindowResize = () => {
        if (window.innerWidth >= 992 && menu && menu.classList.contains('show')) {
            menu.classList.remove('show');
            toggler.classList.remove('active');
        }
    };

    window.addEventListener('resize', handleWindowResize);

    // Contact form validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            let isValid = true;
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');
            
            if (!name.value.trim()) {
                highlightError(name);
                isValid = false;
            } else {
                removeError(name);
            }
            
            if (!email.value.trim() || !validateEmail(email.value)) {
                highlightError(email);
                isValid = false;
            } else {
                removeError(email);
            }
            
            if (!subject.value.trim()) {
                highlightError(subject);
                isValid = false;
            } else {
                removeError(subject);
            }
            
            if (!message.value.trim()) {
                highlightError(message);
                isValid = false;
            } else {
                removeError(message);
            }
            
            if (isValid) {
                // In a real application, you would submit the form data to a server here
                // For now, we'll just show a success message
                showFormMessage('Your message has been sent successfully!', 'success');
                contactForm.reset();
            }
        });
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function highlightError(element) {
        element.classList.add('is-invalid');
    }

    function removeError(element) {
        element.classList.remove('is-invalid');
    }

    function showFormMessage(message, type) {
        const formMessage = document.getElementById('formMessage');
        if (formMessage) {
            formMessage.textContent = message;
            formMessage.className = 'alert alert-' + type;
            formMessage.style.display = 'block';
            
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }
    }

    // Store items filtering (if applicable)
    const filterButtons = document.querySelectorAll('.store-filter-btn');
    const storeItems = document.querySelectorAll('.store-item');
    
    if (filterButtons.length && storeItems.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                storeItems.forEach(item => {
                    if (filterValue === 'all') {
                        item.style.display = 'block';
                    } else if (item.classList.contains(filterValue)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
}); 