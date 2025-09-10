/**
 * Driving Classic - Webflow Integration
 * time: 2025-09-02 14:36
 * 
 * External Dependencies (add to Webflow Head Code):
 * - Locomotive Scroll: https://cdn.jsdelivr.net/npm/lenis@1.2.3/dist/lenis.css
 * - Locomotive Scroll JS: https://cdn.jsdelivr.net/npm/locomotive-scroll@beta/bundled/locomotive-scroll.min.js
 * - GSAP: https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js
 * - ScrollTrigger: https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js
 * - SplitText: https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/SplitText.min.js
 * - Draggable: https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/Draggable.min.js
 * - InertiaPlugin: https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/InertiaPlugin.min.js
 * - CustomEase: https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/CustomEase.min.js
 */

(function() {
    'use strict';

    // Register GSAP plugins
    gsap.registerPlugin(CustomEase, ScrollTrigger, Draggable, InertiaPlugin);

    // Create custom ease
    CustomEase.create("osmo-ease", "0.625, 0.05, 0, 1");

    // Main initialization function
    function initDrivingClassic() {
        try {
            console.log('Driving Classic website loaded successfully');
            
            // Initialize all systems
            initNavigation();
            initImageCycle();
            setupSmoothScrolling();
            initMaskedTextReveal();
            initSliders();
            initAccordionCSS();
            initBasicFormValidation();
            
        } catch (error) {
            console.error('Error initializing Driving Classic:', error);
        }
    }

    // Navigation system
    function initNavigation() {
        try {
            initMobileMenu();
            initDesktopDropdowns();
            initScrollBasedNavColors();
            console.log('Navigation system initialized');
        } catch (error) {
            console.error('Error initializing navigation:', error);
        }
    }

    function initMobileMenu() {
        const menuButtons = document.querySelectorAll('[data-menu-button]');
        
        menuButtons.forEach(button => {
            button.addEventListener('click', () => {
                const nav = document.querySelector('.nav');
                const currentStatus = nav ? nav.getAttribute('data-menu-status') : 'closed';
                
                if (currentStatus === 'closed') {
                    // Open menu
                    if (nav) nav.setAttribute('data-menu-status', 'open');
                    button.setAttribute('data-menu-status', 'open');
                    console.log('Mobile menu opened');
                } else {
                    // Close menu
                    if (nav) nav.setAttribute('data-menu-status', 'closed');
                    button.setAttribute('data-menu-status', 'closed');
                    console.log('Mobile menu closed');
                }
            });
        });
    }

    function initDesktopDropdowns() {
        const dropdownToggles = document.querySelectorAll('[data-dropdown-toggle]');
        
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('mouseenter', () => {
                toggle.setAttribute('data-dropdown-toggle', 'open');
                console.log('Desktop dropdown opened');
            });
            
            toggle.addEventListener('mouseleave', () => {
                toggle.setAttribute('data-dropdown-toggle', 'closed');
                console.log('Desktop dropdown closed');
            });
        });
    }

    // Scroll-based navigation color changes
    function initScrollBasedNavColors() {
        // Look for various hero section selectors
        const heroSection = document.querySelector('.home-hero') || 
                           document.querySelector('[data-hero-section]') ||
                           document.querySelector('.page-hero') ||
                           document.querySelector('.hero-section') ||
                           document.querySelector('[data-page-hero]');
        
        const nav = document.querySelector('.nav');
        const navButtons = document.querySelectorAll('.nav-button');
        const navBg = document.querySelector('.nav-bg');
        const pageBg = document.querySelector('.page-bg');
        const menuButtonLines = document.querySelectorAll('.menu-button__line');
        
        // Function to apply dark theme
        const applyDarkTheme = () => {
            if (nav) nav.style.color = 'var(--color-dark)';
            navButtons.forEach(button => {
                button.style.borderColor = 'var(--color-dark)';
                button.style.color = 'var(--color-dark)';
                if (button.classList.contains('is--primary')) {
                    button.style.backgroundColor = 'var(--color-dark)';
                    button.style.borderColor = 'var(--color-dark)';
                    button.style.color = '#FFF';
                }
            });
            // Apply dark theme to burger menu lines (white for contrast)
            menuButtonLines.forEach(line => {
                line.style.backgroundColor = '#FFF';
            });
        };
        
        // Function to apply light theme
        const applyLightTheme = () => {
            if (nav) nav.style.color = '';
            navButtons.forEach(button => {
                button.style.borderColor = '';
                button.style.color = '';
                if (button.classList.contains('is--primary')) {
                    button.style.backgroundColor = '';
                    button.style.borderColor = '';
                    button.style.color = '';
                }
            });
            // Apply light theme to burger menu lines
            menuButtonLines.forEach(line => {
                line.style.backgroundColor = '';
            });
        };
        
        // Check if we're on a page that should start with light nav
        const isHeroPage = heroSection && (
            heroSection.classList.contains('home-hero') ||
            heroSection.hasAttribute('data-hero-section') ||
            heroSection.classList.contains('page-hero') ||
            heroSection.classList.contains('hero-section') ||
            heroSection.hasAttribute('data-page-hero')
        );
        
        // Set initial nav color based on page type
        if (isHeroPage) {
            applyLightTheme();
            console.log('Nav set to light theme (hero page detected)');
        } else {
            applyDarkTheme();
            console.log('Nav set to dark theme (no hero page)');
        }
        
        // Only add ScrollTrigger if hero section exists
        if (!heroSection) {
            console.log('No hero section found, nav will remain dark');
            return;
        }
        
        // Create ScrollTrigger for nav color changes
        ScrollTrigger.create({
            trigger: heroSection,
            start: "top bottom",
            end: "bottom top",
            onEnter: () => {
                applyLightTheme();
                console.log('Nav colors changed to light theme (over hero)');
            },
            onLeave: () => {
                applyDarkTheme();
                console.log('Nav colors changed to dark theme (left hero)');
            },
            onEnterBack: () => {
                applyLightTheme();
                console.log('Nav colors changed to light theme (back to hero)');
            },
            onLeaveBack: () => {
                applyDarkTheme();
                console.log('Nav colors changed to dark theme (away from hero)');
            }
        });
    }

    // Image cycle system
    function initImageCycle() {
        try {
            console.log('Initializing image cycle system...');
            
            const cycleElements = document.querySelectorAll('[data-image-cycle]');
            console.log('Found cycle elements:', cycleElements.length);
            
            cycleElements.forEach((cycleElement, index) => {
                const items = cycleElement.querySelectorAll('[data-image-cycle-item]');
                console.log(`Cycle element ${index}:`, items.length, 'items found');
                
                if (items.length === 0) return;
                
                // Get cycle settings
                const duration = parseInt(cycleElement.getAttribute('data-image-cycle-duration')) || 3000;
                const twoItems = cycleElement.getAttribute('data-image-cycle-two-items') === 'true';
                
                console.log(`Cycle element ${index}: Duration set to ${duration}ms, Two items: ${twoItems}`);
                
                // Set initial states
                items.forEach((item, i) => {
                    if (i === 0) {
                        item.setAttribute('data-image-cycle-item', 'active');
                        console.log(`Item ${i}: Set to active`);
                    } else {
                        item.setAttribute('data-image-cycle-item', 'not-active');
                        console.log(`Item ${i}: Set to not-active`);
                    }
                });
                
                // Create intersection observer for autoplay
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            startCycle(items, duration, twoItems);
                        } else {
                            stopCycle();
                        }
                    });
                }, { threshold: 0.1 });
                
                observer.observe(cycleElement);
                console.log(`Cycle element ${index}: Observer attached`);
            });
            
            console.log('Image cycle system initialization complete');
            
        } catch (error) {
            console.error('Error initializing image cycle system:', error);
        }
    }

    let cycleInterval;

    function startCycle(items, duration, twoItems) {
        if (cycleInterval) return;
        
        cycleInterval = setInterval(() => {
            const activeItem = document.querySelector('[data-image-cycle-item="active"]');
            const previousItem = document.querySelector('[data-image-cycle-item="previous"]');
            
            if (activeItem) {
                // Set current active to previous
                activeItem.setAttribute('data-image-cycle-item', 'previous');
                
                // Find next item
                let nextItem = activeItem.nextElementSibling;
                if (!nextItem || !nextItem.hasAttribute('data-image-cycle-item')) {
                    nextItem = items[0];
                }
                
                // Set next item to active
                nextItem.setAttribute('data-image-cycle-item', 'active');
                
                // Remove previous state from old previous item
                if (previousItem) {
                    previousItem.setAttribute('data-image-cycle-item', 'not-active');
                }
            }
        }, duration);
    }

    function stopCycle() {
        if (cycleInterval) {
            clearInterval(cycleInterval);
            cycleInterval = null;
        }
    }

    // Smooth scrolling system
    function setupSmoothScrolling() {
        try {
            // Wait for external scripts to load
            setTimeout(() => {
                if (typeof LocomotiveScroll !== 'undefined') {
                    const lenisOptions = {
                        duration: 1.2,
                        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                        direction: 'vertical',
                        gestureDirection: 'vertical',
                        smooth: true,
                        mouseMultiplier: 1,
                        smoothTouch: false,
                        touchMultiplier: 2,
                        infinite: false,
                    };
                    
                    const locomotiveScroll = new LocomotiveScroll({
                        el: document.querySelector('[data-scroll-container]'),
                        ...lenisOptions
                    });
                    
                    // Store instance globally
                    window.DrivingClassic = window.DrivingClassic || {};
                    window.DrivingClassic.locomotiveScroll = locomotiveScroll;
                    
                    console.log('Locomotive Scroll initialized successfully');
                    console.log('Testing smooth scroll functionality...');
                    
                } else {
                    console.warn('Locomotive Scroll not loaded');
                }
            }, 1000);
            
        } catch (error) {
            console.error('Error setting up smooth scrolling:', error);
        }
    }

    // Masked text reveal system (following Osmo best practices)
    function initMaskedTextReveal() {
        try {
            console.log('Initializing masked text reveal system...');
            
            // Prevent multiple initializations
            if (window.DrivingClassic && window.DrivingClassic.textRevealInitialized) {
                console.log('Text reveal already initialized, skipping...');
                return;
            }
                
                // Register GSAP plugins
                gsap.registerPlugin(SplitText, ScrollTrigger);
                
            // Configuration options (following Osmo pattern)
                const splitConfig = {
                lines: { duration: 0.8, stagger: 0.08 },
                words: { duration: 0.6, stagger: 0.06 },
                chars: { duration: 0.4, stagger: 0.01 }
            };
            
            // Function to initialize text reveal
            const initializeTextReveal = (retryCount = 0) => {
                console.log(`=== INITIALIZING TEXT REVEAL (attempt ${retryCount + 1}) ===`);
                const headings = document.querySelectorAll('[data-split="heading"]');
                console.log(`Found ${headings.length} headings to animate`);
                
                if (headings.length === 0) {
                    if (retryCount < 3) {
                        console.log('No headings found, retrying in 500ms...');
                        setTimeout(() => initializeTextReveal(retryCount + 1), 500);
                    }
                    return;
                }
                
                // Log all headings found
                headings.forEach((heading, i) => {
                    const rect = heading.getBoundingClientRect();
                    const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
                    console.log(`Heading ${i}: "${heading.textContent.substring(0, 30)}..." - In viewport: ${isInViewport}, Rect: top=${rect.top}, bottom=${rect.bottom}, windowHeight=${window.innerHeight}`);
                });
                
                headings.forEach((heading, index) => {
                    try {
                        console.log(`\n--- PROCESSING HEADING ${index} ---`);
                        console.log(`Heading ${index}: Text: "${heading.textContent.trim().substring(0, 50)}..."`);
                        
                        // Ensure element is visible and has content
                        if (!heading.textContent.trim()) {
                            console.warn(`Heading ${index}: No text content found`);
                            return;
                        }
                        
                        // Reset CSS visibility (following Osmo FOUC prevention)
                        gsap.set(heading, { autoAlpha: 1 });
                        console.log(`Heading ${index}: Set autoAlpha: 1`);
                        
                        // Find the split type, default is 'lines'
                        const type = heading.dataset.splitReveal || 'lines';
                        const typesToSplit = 
                            type === 'lines' ? ['lines'] :
                            type === 'words' ? ['lines', 'words'] :
                            ['lines', 'words', 'chars'];
                        
                        console.log(`Heading ${index}: Split type: ${type}, Types to split: ${typesToSplit.join(', ')}`);
                        
                        // Split the text using Osmo's approach
                        SplitText.create(heading, {
                            type: typesToSplit.join(', '), // split into required elements
                            mask: 'lines', // wrap each line in an overflow:hidden div
                            autoSplit: true,
                            linesClass: 'line',
                            wordsClass: 'word',
                            charsClass: 'letter',
                            onSplit: function(instance) {
                                const targets = instance[type]; // Register animation targets
                                const config = splitConfig[type]; // Find matching duration and stagger
                                
                                console.log(`Heading ${index}: SplitText created ${targets.length} ${type} elements`);
                                console.log(`Heading ${index}: Animation config: duration=${config.duration}, stagger=${config.stagger}`);
                                
                                // Check if heading is already in viewport
                                const rect = heading.getBoundingClientRect();
                                const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
                                
                                console.log(`Heading ${index}: Viewport check - top=${rect.top}, bottom=${rect.bottom}, windowHeight=${window.innerHeight}, isInViewport=${isInViewport}`);
                                
                                if (isInViewport) {
                                    console.log(`Heading ${index}: ✅ ALREADY IN VIEWPORT - Animating immediately (NO ScrollTrigger)`);
                                    // Animate immediately without ScrollTrigger
                                    return gsap.from(targets, {
                                        yPercent: 110,
                                        duration: config.duration,
                                        stagger: config.stagger,
                                        ease: 'expo.out'
                                    });
                                } else {
                                    console.log(`Heading ${index}: ⏳ NOT IN VIEWPORT - Setting up ScrollTrigger`);
                                    // Use ScrollTrigger for headings not yet visible
                                    return gsap.from(targets, {
                                        yPercent: 110,
                                        duration: config.duration,
                                        stagger: config.stagger,
                                        ease: 'expo.out',
                            scrollTrigger: {
                                trigger: heading,
                                            start: 'top bottom-=100px',
                                once: true
                            }
                                    });
                                }
                            }
                        });
                        
                    } catch (error) {
                        console.error(`Heading ${index}: Error processing heading:`, error);
                        // Fallback: show the heading without animation
                        gsap.set(heading, { 
                            opacity: 1,
                            visibility: 'visible'
                        });
                    }
                });
                
                console.log('Masked text reveal system initialized successfully');
                
                // Mark as initialized to prevent re-initialization
                window.DrivingClassic = window.DrivingClassic || {};
                window.DrivingClassic.textRevealInitialized = true;
                
                // Refresh ScrollTrigger after all animations are created
                setTimeout(() => {
                    console.log('🔄 REFRESHING ScrollTrigger after all animations created...');
                    ScrollTrigger.refresh();
                    console.log('✅ ScrollTrigger refreshed for text reveal animations');
                }, 100);
                
                // Listen for Jetboost events to refresh ScrollTrigger
                if (window.Jetboost) {
                    console.log('Jetboost detected, setting up ScrollTrigger refresh listeners');
                    
                    // Refresh ScrollTrigger when Jetboost loads more content
                    document.addEventListener('jetboost:loaded', () => {
                        console.log('Jetboost content loaded, refreshing ScrollTrigger');
                        setTimeout(() => {
                            ScrollTrigger.refresh();
                            console.log('ScrollTrigger refreshed after Jetboost load');
                        }, 200);
                    });
                    
                    // Also listen for any DOM changes that might affect layout
                    const observer = new MutationObserver((mutations) => {
                        let shouldRefresh = false;
                        mutations.forEach((mutation) => {
                            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                                // Check if any added nodes contain headings or affect layout
                                mutation.addedNodes.forEach((node) => {
                                    if (node.nodeType === 1) { // Element node
                                        if (node.querySelector && (
                                            node.querySelector('[data-split="heading"]') ||
                                            node.classList.contains('collection-list') ||
                                            node.classList.contains('jetboost-item')
                                        )) {
                                            shouldRefresh = true;
                                        }
                                    }
                                });
                            }
                        });
                        
                        if (shouldRefresh) {
                            console.log('DOM changes detected, refreshing ScrollTrigger');
                            setTimeout(() => {
                                ScrollTrigger.refresh();
                            }, 100);
                        }
                    });
                    
                    // Start observing
                    observer.observe(document.body, {
                        childList: true,
                        subtree: true
                    });
                }
            };
            
            // Initialize after fonts load and collection lists are rendered
            const initializeAfterLoad = () => {
                console.log('Initializing text reveal after load...');
                
                // Check if already initialized
                if (window.DrivingClassic && window.DrivingClassic.textRevealInitialized) {
                    console.log('Text reveal already initialized, skipping initializeAfterLoad...');
                    return;
                }
                
                initializeTextReveal();
            };
            
            // Wait for fonts to load
            if (document.fonts && document.fonts.ready) {
                document.fonts.ready.then(() => {
                    console.log('Fonts loaded, waiting for collection lists...');
                    // Wait additional time for Webflow collection lists to render
                    setTimeout(initializeAfterLoad, 1000);
                });
            } else {
                // Fallback - wait longer for collection lists
                setTimeout(initializeAfterLoad, 1500);
            }
            
            // Also initialize on window load as backup
            window.addEventListener('load', () => {
                console.log('Window loaded, reinitializing text reveal...');
                setTimeout(initializeAfterLoad, 500);
            });
            
            // Monitor collection lists to detect when they're fully rendered
            const collectionLists = document.querySelectorAll('.collection-list');
            if (collectionLists.length > 0) {
                console.log(`📋 Found ${collectionLists.length} collection lists, monitoring for full render...`);
                
                collectionLists.forEach((list, index) => {
                    const observer = new IntersectionObserver((entries) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                console.log(`📋 Collection list ${index} is visible, refreshing ScrollTrigger...`);
                                setTimeout(() => {
                                    ScrollTrigger.refresh();
                                    console.log('✅ ScrollTrigger refreshed after collection list render');
                                }, 300);
                                observer.unobserve(entry.target);
                            }
                        });
                    }, { threshold: 0.1 });
                    
                    observer.observe(list);
                });
            }
            
        } catch (error) {
            console.error('Error initializing masked text reveal:', error);
        }
    }

        // Centered looping slider system using Swiper.js (like MSC testimonial slider)
    function initSliders() {
        // Wait for Collection List content to be fully rendered
        setTimeout(() => {
            console.log('=== SLIDER DEBUG ===');
            
            // Check for different possible wrapper selectors
            const sliderWrappers = document.querySelectorAll('.centered-slider-group');
            const swiperElements = document.querySelectorAll('.swiper');
            const slideElements = document.querySelectorAll('.swiper-slide');
            const nextButtons = document.querySelectorAll('.swiper-next');
            const prevButtons = document.querySelectorAll('.swiper-prev');
            
            console.log('Found elements:', {
                'centered-slider-group': sliderWrappers.length,
                'swiper': swiperElements.length,
                'swiper-slide': slideElements.length,
                'swiper-next': nextButtons.length,
                'swiper-prev': prevButtons.length
            });

            // Log all found elements for debugging
            console.log('All centered-slider-group elements:', sliderWrappers);
            console.log('All swiper elements:', swiperElements);
            console.log('All navigation buttons:', { next: nextButtons, prev: prevButtons });

            // Initialize Swiper directly on the swiper element
            swiperElements.forEach((swiperElement, index) => {
                console.log(`Swiper ${index}: Initializing`);
                console.log(`Swiper ${index}: Element:`, swiperElement);
                
                // Find the closest wrapper for navigation buttons
                const wrapper = swiperElement.closest('.centered-slider-group') || 
                              swiperElement.parentElement;
                
                console.log(`Swiper ${index}: Using wrapper:`, wrapper);

                // Create Swiper instance (exact MSC testimonial slider configuration)
                const swiper = new Swiper(swiperElement, {
                    speed: 450,
                    loop: true,
                    autoHeight: false,
                    centeredSlides: true,
                    followFinger: true,
                    freeMode: false,
                    slideToClickedSlide: false,
                    slidesPerView: 1,
                    spaceBetween: "4%",
                    rewind: false,
                    autoplay: {
                        delay: 4000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true
                    },
                    mousewheel: {
                        forceToAxis: true
                    },
                    keyboard: {
                        enabled: true,
                        onlyInViewport: true
                    },
                    breakpoints: {
                        480: {
                            slidesPerView: 1,
                            spaceBetween: "1%"
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: "4%"
                        },
                        992: {
                            slidesPerView: 2.5,
                            spaceBetween: "2%"
                        }
                    },
                    pagination: {
                        el: document.querySelector('.swiper-bullet-wrapper'),
                        bulletActiveClass: "is-active",
                        bulletClass: "swiper-bullet",
                        bulletElement: "button",
                        clickable: true
                    },
                    navigation: {
                        nextEl: document.querySelector('.swiper-next'),
                        prevEl: document.querySelector('.swiper-prev'),
                        disabledClass: "is-disabled"
                    },
                    scrollbar: {
                        el: document.querySelector('.swiper-drag-wrapper'),
                        draggable: true,
                        dragClass: "swiper-drag",
                        snapOnRelease: true
                    },
                    slideActiveClass: "is-active",
                    slideDuplicateActiveClass: "is-active",
                    on: {
                        slideChange: function () {
                            console.log(`Swiper ${index}: Slide changed to index ${this.activeIndex}`);
                            // Remove active class from all slides
                            this.slides.forEach(slide => {
                                slide.classList.remove('is-active');
                            });
                            // Add active class to current slide
                            this.slides[this.activeIndex].classList.add('is-active');
                        },
                        init: function () {
                            console.log(`Swiper ${index}: Swiper initialized successfully`);
                            console.log(`Swiper ${index}: Navigation buttons found:`, {
                                next: document.querySelector('.swiper-next'),
                                prev: document.querySelector('.swiper-prev')
                            });
                            console.log(`Swiper ${index}: Total slides:`, this.slides.length);
                            
                            // Debug button detection
                            const nextButton = document.querySelector('.swiper-next');
                            const prevButton = document.querySelector('.swiper-prev');
                            
                            console.log(`Swiper ${index}: Button details:`, {
                                nextButton: nextButton,
                                prevButton: prevButton,
                                nextButtonClasses: nextButton?.className,
                                prevButtonClasses: prevButton?.className
                            });
                            
                            // Test button click events
                            if (nextButton) {
                                nextButton.addEventListener('click', () => {
                                    console.log(`Swiper ${index}: Next button clicked`);
                                });
                            }
                            if (prevButton) {
                                prevButton.addEventListener('click', () => {
                                    console.log(`Swiper ${index}: Prev button clicked`);
                                });
                            }
                        }
                    }
                });

                // Store swiper instance for potential future use
                swiperElement.swiper = swiper;
                
                // Ensure Link Block clicks work with Swiper
                const linkBlocks = swiperElement.querySelectorAll('a[href]');
                linkBlocks.forEach(link => {
                    link.addEventListener('click', (e) => {
                        // Allow the link to work normally
                        e.stopPropagation();
                        e.preventDefault();
                        console.log('Link Block clicked:', link.href);
                        
                        // Navigate to the link
                        window.location.href = link.href;
                    });
                });
                
                // Disable Swiper's touch/click handling on links
                swiperElement.addEventListener('touchstart', (e) => {
                    if (e.target.closest('a[href]')) {
                        e.stopPropagation();
                    }
                });
                
                swiperElement.addEventListener('click', (e) => {
                    if (e.target.closest('a[href]')) {
                        e.stopPropagation();
                    }
                });
            });
        }, 1000); // Wait 1000ms for Collection List to fully render
    }

    // Accordion CSS system
    function initAccordionCSS() {
        try {
            console.log('Initializing accordion CSS system...');
            
            document.querySelectorAll('[data-accordion-css-init]').forEach((accordion) => {
                const closeSiblings = accordion.getAttribute('data-accordion-close-siblings') === 'true';
                console.log('Accordion found with closeSiblings:', closeSiblings);

                accordion.addEventListener('click', (event) => {
                    const toggle = event.target.closest('[data-accordion-toggle]');
                    if (!toggle) return; // Exit if the clicked element is not a toggle

                    const singleAccordion = toggle.closest('[data-accordion-status]');
                    if (!singleAccordion) return; // Exit if no accordion container is found

                    const isActive = singleAccordion.getAttribute('data-accordion-status') === 'active';
                    singleAccordion.setAttribute('data-accordion-status', isActive ? 'not-active' : 'active');
                    
                    console.log(`Accordion toggled: ${isActive ? 'closed' : 'opened'}`);
                    
                    // When [data-accordion-close-siblings="true"]
                    if (closeSiblings && !isActive) {
                        accordion.querySelectorAll('[data-accordion-status="active"]').forEach((sibling) => {
                            if (sibling !== singleAccordion) {
                                sibling.setAttribute('data-accordion-status', 'not-active');
                                console.log('Closed sibling accordion');
                            }
                        });
                    }
                });
            });
            
            console.log('Accordion CSS system initialized successfully');
            
        } catch (error) {
            console.error('Error initializing accordion CSS system:', error);
        }
    }

    // Basic form validation system
    function initBasicFormValidation() {
        try {
            console.log('Initializing basic form validation system...');
            
            const forms = document.querySelectorAll('[data-form-validate]');
            console.log('Found forms to validate:', forms.length);

            forms.forEach((form, formIndex) => {
                const fields = form.querySelectorAll('[data-validate] input, [data-validate] textarea');
                const submitButtonDiv = form.querySelector('[data-submit]'); // The div wrapping the submit button
                const submitInput = submitButtonDiv?.querySelector('input[type="submit"]'); // The actual submit button

                console.log(`Form ${formIndex}: Found ${fields.length} fields, submit button:`, !!submitButtonDiv);

                // Capture the form load time
                const formLoadTime = new Date().getTime(); // Timestamp when the form was loaded

                // Function to validate individual fields (input or textarea)
                const validateField = (field) => {
                    const parent = field.closest('[data-validate]'); // Get the parent div
                    const minLength = field.getAttribute('min');
                    const maxLength = field.getAttribute('max');
                    const type = field.getAttribute('type');
                    let isValid = true;

                    // Check if the field has content
                    if (field.value.trim() !== '') {
                        parent.classList.add('is--filled');
                    } else {
                        parent.classList.remove('is--filled');
                    }

                    // Validation logic for min and max length
                    if (minLength && field.value.length < minLength) {
                        isValid = false;
                    }

                    if (maxLength && field.value.length > maxLength) {
                        isValid = false;
                    }

                    // Validation logic for email input type
                    if (type === 'email' && field.value.trim() !== '' && !/\S+@\S+\.\S+/.test(field.value)) {
                        isValid = false;
                    }

                    // Add or remove success/error classes on the parent div
                    if (isValid) {
                        parent.classList.remove('is--error');
                        parent.classList.add('is--success');
                    } else {
                        parent.classList.remove('is--success');
                        parent.classList.add('is--error');
                    }

                    return isValid;
                };

                // Function to start live validation for a field
                const startLiveValidation = (field) => {
                    field.addEventListener('input', function () {
                        validateField(field);
                    });
                };

                // Function to validate and start live validation for all fields, focusing on the first field with an error
                const validateAndStartLiveValidationForAll = () => {
                    let allValid = true;
                    let firstInvalidField = null;

                    fields.forEach((field) => {
                        const valid = validateField(field);
                        if (!valid && !firstInvalidField) {
                            firstInvalidField = field; // Track the first invalid field
                        }
                        if (!valid) {
                            allValid = false;
                        }
                        startLiveValidation(field); // Start live validation for all fields
                    });

                    // If there is an invalid field, focus on the first one
                    if (firstInvalidField) {
                        firstInvalidField.focus();
                    }

                    return allValid;
                };

                // Anti-spam: Check if form was filled too quickly
                const isSpam = () => {
                    const currentTime = new Date().getTime();
                    const timeDifference = (currentTime - formLoadTime) / 1000; // Convert milliseconds to seconds
                    return timeDifference < 5; // Return true if form is filled within 5 seconds
                };

                // Handle clicking the custom submit button
                if (submitButtonDiv && submitInput) {
                    submitButtonDiv.addEventListener('click', function () {
                        console.log(`Form ${formIndex}: Submit button clicked`);
                        
                        // Validate the form first
                        if (validateAndStartLiveValidationForAll()) {
                            // Only check for spam after all fields are valid
                            if (isSpam()) {
                                console.log(`Form ${formIndex}: Spam detected - submission blocked`);
                                alert('Form submitted too quickly. Please try again.');
                                return; // Stop form submission
                            }
                            console.log(`Form ${formIndex}: Validation passed, submitting form`);
                            submitInput.click(); // Simulate a click on the <input type="submit">
                        } else {
                            console.log(`Form ${formIndex}: Validation failed`);
                        }
                    });
                }

                // Handle pressing the "Enter" key
                form.addEventListener('keydown', function (event) {
                    if (event.key === 'Enter' && event.target.tagName !== 'TEXTAREA') {
                        event.preventDefault(); // Prevent the default form submission
                        console.log(`Form ${formIndex}: Enter key pressed`);

                        // Validate the form first
                        if (validateAndStartLiveValidationForAll()) {
                            // Only check for spam after all fields are valid
                            if (isSpam()) {
                                console.log(`Form ${formIndex}: Spam detected - submission blocked`);
                                alert('Form submitted too quickly. Please try again.');
                                return; // Stop form submission
                            }
                            console.log(`Form ${formIndex}: Validation passed, submitting form`);
                            if (submitInput) {
                                submitInput.click(); // Trigger our custom form submission
                            }
                        } else {
                            console.log(`Form ${formIndex}: Validation failed`);
                        }
                    }
                });

                console.log(`Form ${formIndex}: Form validation initialized successfully`);
            });
            
            console.log('Basic form validation system initialized successfully');
            
        } catch (error) {
            console.error('Error initializing basic form validation system:', error);
        }
    }

    // Utility functions
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    function debounce(func, wait, immediate) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func(...args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func(...args);
        };
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initDrivingClassic);
    } else {
        initDrivingClassic();
    }

    // Expose functions globally for debugging
    window.DrivingClassic = {
        navigation: {
            init: initNavigation,
            initMobileMenu: initMobileMenu,
            initDesktopDropdowns: initDesktopDropdowns
        },
        imageCycle: {
            init: initImageCycle,
            test: function() {
                console.log('Testing image cycle system...');
                const elements = document.querySelectorAll('[data-image-cycle]');
                console.log('Image cycle elements found:', elements.length);
                elements.forEach((el, i) => {
                    const items = el.querySelectorAll('[data-image-cycle-item]');
                    console.log(`Cycle ${i}:`, items.length, 'items');
                });
            }
        },
        smoothScroll: {
            init: setupSmoothScrolling
        },
        maskedTextReveal: {
            init: initMaskedTextReveal,
            test: function() {
                console.log('Testing masked text reveal system...');
                const headings = document.querySelectorAll('[data-split="heading"]');
                console.log('Headings found:', headings.length);
                headings.forEach((heading, i) => {
                    const text = heading.textContent.trim();
                    const revealType = heading.getAttribute('data-split-reveal') || 'lines';
                    const isVisible = heading.style.visibility !== 'hidden' && heading.style.display !== 'none';
                    console.log(`Heading ${i}: "${text.substring(0, 30)}...", reveal: ${revealType}, visible: ${isVisible}`);
                });
            },
            forceShow: function(headingIndex = 0) {
                const headings = document.querySelectorAll('[data-split="heading"]');
                if (headings[headingIndex]) {
                    const heading = headings[headingIndex];
                    gsap.set(heading, { 
                        opacity: 1,
                        visibility: 'visible',
                        y: 0
                    });
                    console.log(`Forced heading ${headingIndex} to show`);
                }
            },
            refresh: function() {
                console.log('Refreshing ScrollTrigger for text reveal...');
                ScrollTrigger.refresh();
            },
            forceRefresh: function() {
                console.log('Force refreshing ScrollTrigger and reinitializing text reveal...');
                // Reset initialization flag
                if (window.DrivingClassic) {
                    window.DrivingClassic.textRevealInitialized = false;
                }
                ScrollTrigger.refresh();
                // Reinitialize text reveal
                initMaskedTextReveal();
            },
            debug: function() {
                console.log('=== TEXT REVEAL DEBUG ===');
                const headings = document.querySelectorAll('[data-split="heading"]');
                console.log('Total headings found:', headings.length);
                
                headings.forEach((heading, i) => {
                    const rect = heading.getBoundingClientRect();
                    const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
                    const scrollY = window.scrollY;
                    const elementTop = rect.top + scrollY;
                    const elementBottom = rect.bottom + scrollY;
                    
                    console.log(`Heading ${i}:`, {
                        text: heading.textContent.substring(0, 30) + '...',
                        isInViewport: isInViewport,
                        rect: rect,
                        scrollY: scrollY,
                        elementTop: elementTop,
                        elementBottom: elementBottom,
                        windowHeight: window.innerHeight
                    });
                });
                
                console.log('ScrollTrigger instances:', ScrollTrigger.getAll().length);
                ScrollTrigger.getAll().forEach((st, i) => {
                    if (st.vars.id && st.vars.id.startsWith('heading-')) {
                        console.log(`ScrollTrigger ${i}:`, {
                            id: st.vars.id,
                            trigger: st.trigger,
                            start: st.start,
                            end: st.end,
                            isActive: st.isActive,
                            progress: st.progress
                        });
                    }
                });
            },
            forceAnimate: function(headingIndex = 0) {
                const headings = document.querySelectorAll('[data-split="heading"]');
                if (headings[headingIndex]) {
                    const heading = headings[headingIndex];
                    const splitElements = heading.querySelectorAll('.line, .word, .letter');
                    
                    if (splitElements.length > 0) {
                        gsap.fromTo(splitElements, 
                            { yPercent: 110, opacity: 0 },
                            { 
                                yPercent: 0, 
                                opacity: 1, 
                                duration: 0.8, 
                                ease: "expo.out", 
                                stagger: 0.08 
                            }
                        );
                        console.log(`Force animated heading ${headingIndex} with ${splitElements.length} elements`);
                    } else {
                        console.log(`Heading ${headingIndex}: No split elements found`);
                    }
                }
            }
        },
        sliders: {
            init: initSliders,
            test: function() {
                console.log('Testing slider system...');
                const sliders = document.querySelectorAll('[data-centered-slider="wrapper"]');
                console.log('Sliders found:', sliders.length);
                sliders.forEach((slider, i) => {
                    const slides = slider.querySelectorAll('[data-centered-slider="slide"]');
                    const activeSlide = slider.querySelector('.centered-slider-slide.active');
                    const activeIndex = Array.from(slides).indexOf(activeSlide);
                    console.log(`Slider ${i}: ${slides.length} slides, active index: ${activeIndex}`);
                });
            },
            forceCenter: function(sliderIndex = 0, targetIndex = 1) {
                const sliders = document.querySelectorAll('[data-centered-slider="wrapper"]');
                if (sliders[sliderIndex]) {
                    const slides = sliders[sliderIndex].querySelectorAll('[data-centered-slider="slide"]');
                    console.log(`Force centering slider ${sliderIndex} to index ${targetIndex}`);
                    
                    // Remove active class from all slides
                    slides.forEach(slide => slide.classList.remove('active'));
                    
                    // Add active class to target slide
                    if (slides[targetIndex]) {
                        slides[targetIndex].classList.add('active');
                        console.log(`Slider ${sliderIndex}: Forced active to index ${targetIndex}`);
                    }
                }
            },
            compareSliders: function() {
                console.log('=== COMPARING SLIDER POSITIONS ===');
                const sliders = document.querySelectorAll('[data-centered-slider="wrapper"]');
                
                sliders.forEach((slider, sliderIndex) => {
                    const slides = slider.querySelectorAll('[data-centered-slider="slide"]');
                    const activeSlide = slider.querySelector('.centered-slider-slide.active');
                    const activeIndex = Array.from(slides).indexOf(activeSlide);
                    
                    console.log(`Slider ${sliderIndex}: Active index = ${activeIndex}`);
                    console.log(`Slider ${sliderIndex}: Slide positions:`);
                    
                    slides.forEach((slide, slideIndex) => {
                        const transform = slide.style.transform;
                        const isActive = slide.classList.contains('active');
                        const rect = slide.getBoundingClientRect();
                        console.log(`  Slide ${slideIndex}: transform="${transform}", active=${isActive}, left=${rect.left}, width=${rect.width}`);
                    });
                });
            }
        },
        accordionCSS: {
            init: initAccordionCSS,
            test: function() {
                console.log('Testing accordion CSS system...');
                const accordions = document.querySelectorAll('[data-accordion-css-init]');
                console.log('Accordion containers found:', accordions.length);
                accordions.forEach((accordion, i) => {
                    const toggles = accordion.querySelectorAll('[data-accordion-toggle]');
                    const statuses = accordion.querySelectorAll('[data-accordion-status]');
                    const closeSiblings = accordion.getAttribute('data-accordion-close-siblings') === 'true';
                    console.log(`Accordion ${i}: ${toggles.length} toggles, ${statuses.length} status elements, closeSiblings: ${closeSiblings}`);
                });
            }
        },
        formValidation: {
            init: initBasicFormValidation,
            test: function() {
                console.log('Testing form validation system...');
                const forms = document.querySelectorAll('[data-form-validate]');
                console.log('Forms found:', forms.length);
                forms.forEach((form, i) => {
                    const fields = form.querySelectorAll('[data-validate] input, [data-validate] textarea');
                    const submitButtonDiv = form.querySelector('[data-submit]');
                    const submitInput = submitButtonDiv?.querySelector('input[type="submit"]');
                    console.log(`Form ${i}: ${fields.length} fields, submit button div: ${!!submitButtonDiv}, submit input: ${!!submitInput}`);
                });
            },
            validateForm: function(formIndex = 0) {
                const forms = document.querySelectorAll('[data-form-validate]');
                if (forms[formIndex]) {
                    const fields = forms[formIndex].querySelectorAll('[data-validate] input, [data-validate] textarea');
                    console.log(`Manually validating form ${formIndex}...`);
                    fields.forEach((field, i) => {
                        const parent = field.closest('[data-validate]');
                        const value = field.value.trim();
                        const hasContent = value !== '';
                        const isEmail = field.getAttribute('type') === 'email';
                        const isValidEmail = !isEmail || value === '' || /\S+@\S+\.\S+/.test(value);
                        console.log(`Field ${i}: "${field.name || field.id || 'unnamed'}" = "${value}", filled: ${hasContent}, valid: ${isValidEmail}`);
                    });
                }
            }
        }
    };

})();