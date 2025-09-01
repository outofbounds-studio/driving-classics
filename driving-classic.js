/**
 * Driving Classic - Webflow Website JavaScript
 * 
 * This file contains all the JavaScript functionality for the Driving Classic website.
 * Update this file in Cursor and push to GitHub to deploy changes.
 * 
 * IMPORTANT: Before this script, you must include these required libraries in your Webflow project:
 * 
 * 1. Go to Site Settings → Custom Code → Head Code
 * 2. Add these scripts BEFORE your driving-classic.js:
 * 
 * <!-- CSS (Locomotive V5 is based on Lenis) -->
 * <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/lenis@1.2.3/dist/lenis.css">
 * 
 * <!-- GSAP Core and Plugins -->
 * <script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"></script>
 * <script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js"></script>
 * <script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/SplitText.min.js"></script>
 * 
 * <!-- JS -->
 * <script src="https://cdn.jsdelivr.net/npm/locomotive-scroll@beta/bundled/locomotive-scroll.min.js"></script>
 * 
 * Last Updated: 01/09/2025 12:37 PM
 * Version: 1.0.0
 */

(function() {
    'use strict';
    
    // Wait for DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', function() {
        console.log('Driving Classic website loaded successfully');
        
        // Initialize all functionality
        initDrivingClassic();
    });
    
    /**
     * Main initialization function
     */
    function initDrivingClassic() {
        // Add your custom functionality here
        
        // Initialize navigation system
        initNavigation();
        
        // Initialize image cycling system
        initImageCycle();
        
        // Initialize masked text reveal system
        initMaskedTextReveal();
        
        // Example: Add smooth scrolling to navigation links
        setupSmoothScrolling();
        
        // Example: Initialize any custom components
        // setupCustomComponents();
        
        // Example: Add event listeners
        // setupEventListeners();
    }
    
    /**
     * Setup Locomotive Scroll for smooth scrolling
     */
    function setupSmoothScrolling() {
        // Wait a bit for Locomotive Scroll to load
        setTimeout(() => {
            // Check if Locomotive Scroll is available
            if (typeof LocomotiveScroll === 'undefined') {
                console.warn('Locomotive Scroll not loaded. Make sure to include the script in your Webflow project.');
                return;
            }

            try {
                // Initialize Locomotive Scroll
                const locomotiveScroll = new LocomotiveScroll({
                    lenisOptions: {
                        lerp: 0.1,
                        duration: 1.2,
                        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                    }
                });

                // Store reference globally for access
                window.DrivingClassic.locomotiveScroll = locomotiveScroll;

                console.log('Locomotive Scroll initialized successfully');
                
                // Test smooth scrolling
                console.log('Testing smooth scroll functionality...');
                
            } catch (error) {
                console.error('Error initializing Locomotive Scroll:', error);
            }
        }, 100); // Wait 100ms for scripts to load
    }
    
    /**
     * Example function for custom components
     * Uncomment and modify as needed
     */
    /*
    function setupCustomComponents() {
        // Add your custom component initialization here
        console.log('Custom components initialized');
    }
    */
    
    /**
     * Example function for event listeners
     * Uncomment and modify as needed
     */
    /*
    function setupEventListeners() {
        // Add your custom event listeners here
        console.log('Event listeners setup complete');
    }
    */
    
    /**
     * Utility function to check if element is in viewport
     */
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    /**
     * Utility function to debounce function calls
     */
    function debounce(func, wait, immediate) {
        let timeout;
        return function executedFunction() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
    
    /**
     * Navigation System
     * Handles mobile and desktop navigation with dropdowns
     */
    function initNavigation() {
        if (!initNavigation._hasResizeListener) {
            initNavigation._hasResizeListener = true;
            window.addEventListener('resize', debounce(initNavigation, 200));
        }

        const isMobile = window.innerWidth < 768;
        if (isMobile && initNavigation._lastMode !== 'mobile') {
            initMobileMenu();
            initNavigation._lastMode = 'mobile';
        } else if (!isMobile && initNavigation._lastMode !== 'desktop') {
            initDesktopDropdowns();
            initNavigation._lastMode = 'desktop';
        }
    }

    function initMobileMenu() {
        const btn = document.querySelector('[data-menu-button]');
        const nav = document.querySelector('[data-menu-status]');
        if (!btn || !nav) return;

        btn.setAttribute('aria-expanded', 'false');
        btn.setAttribute('aria-controls', 'mobile-navigation');
        nav.setAttribute('id', 'mobile-navigation');
        nav.setAttribute('role', 'navigation');
        nav.setAttribute('aria-label', 'Main navigation');

        if (!btn._mobileClick) {
            btn._mobileClick = true;
            btn.addEventListener('click', () => {
                const open = nav.dataset.menuStatus === 'open';
                nav.dataset.menuStatus = open ? 'closed' : 'open';
                btn.setAttribute('aria-expanded', !open);
            });
        }

        Array.from(document.querySelectorAll('[data-dropdown-toggle]')).forEach((toggle, i) => {
            const dd = toggle.nextElementSibling;
            if (!dd || !dd.classList.contains('nav-dropdown')) return;
            if (toggle._mobileDropdownInit) return;
            toggle._mobileDropdownInit = true;

            toggle.setAttribute('aria-expanded', 'false');
            toggle.setAttribute('aria-haspopup', 'true');
            toggle.setAttribute('aria-controls', `dropdown-${i}`);
            
            dd.setAttribute('id', `dropdown-${i}`);
            dd.setAttribute('role', 'menu');
            dd.querySelectorAll('.nav-dropdown__link')
                .forEach(link => link.setAttribute('role', 'menuitem'));

            toggle.addEventListener('click', () => {
                const open = toggle.dataset.dropdownToggle === 'open';
                Array.from(document.querySelectorAll('[data-dropdown-toggle]'))
                    .forEach(other => {
                        if (other !== toggle) {
                            other.dataset.dropdownToggle = 'closed';
                            other.setAttribute('aria-expanded', 'false');
                            if (other === document.activeElement) other.blur();
                        }
                    });
                toggle.dataset.dropdownToggle = open ? 'closed' : 'open';
                toggle.setAttribute('aria-expanded', !open);
                if (open && toggle === document.activeElement) toggle.blur();
            });
        });
    }

    function initDesktopDropdowns() {
        const toggles = Array.from(document.querySelectorAll('[data-dropdown-toggle]'));
        const links = Array.from(document.querySelectorAll('.nav-link:not([data-dropdown-toggle])'));

        toggles.forEach((toggle, i) => {
            const dd = toggle.nextElementSibling;
            if (!dd || !dd.classList.contains('nav-dropdown') || toggle._desktopInit) return;
            toggle._desktopInit = true;

            toggle.setAttribute('aria-expanded', 'false');
            toggle.setAttribute('aria-haspopup', 'true');
            toggle.setAttribute('aria-controls', `desktop-dropdown-${i}`);
            
            dd.setAttribute('id', `desktop-dropdown-${i}`);
            dd.setAttribute('role', 'menu');
            dd.setAttribute('aria-hidden', 'true');
            dd.querySelectorAll('.nav-dropdown__link')
                .forEach(link => link.setAttribute('role', 'menuitem'));

            toggle.addEventListener('click', e => {
                e.preventDefault();
                toggles.forEach(other => {
                    if (other !== toggle) {
                        other.dataset.dropdownToggle = 'closed';
                        other.setAttribute('aria-expanded', 'false');
                        const otherDropdown = other.nextElementSibling;
                        if (otherDropdown) otherDropdown.setAttribute('aria-hidden', 'true');
                    }
                });
                const open = toggle.dataset.dropdownToggle !== 'open';
                toggle.dataset.dropdownToggle = 'open';
                toggle.setAttribute('aria-expanded', 'true');
                dd.setAttribute('aria-hidden', 'false');
                if (open) {
                    const first = dd.querySelector('.nav-dropdown__link');
                    if (first) first.focus();
                }
            });

            toggle.addEventListener('mouseenter', () => {
                const anyOpen = toggles.some(x => x.dataset.dropdownToggle === 'open');
                toggles.forEach(other => {
                    if (other !== toggle) {
                        other.dataset.dropdownToggle = 'closed';
                        other.setAttribute('aria-expanded', 'false');
                        const otherDropdown = other.nextElementSibling;
                        if (otherDropdown) otherDropdown.setAttribute('aria-hidden', 'true');
                    }
                });
                if (anyOpen) {
                    setTimeout(() => {
                        toggle.dataset.dropdownToggle = 'open';
                        toggle.setAttribute('aria-expanded', 'true');
                        dd.setAttribute('aria-hidden', 'false');
                    }, 20);
                } else {
                    toggle.dataset.dropdownToggle = 'open';
                    toggle.setAttribute('aria-expanded', 'true');
                    dd.setAttribute('aria-hidden', 'false');
                }
            });

            dd.addEventListener('mouseleave', () => {
                toggle.dataset.dropdownToggle = 'closed';
                toggle.setAttribute('aria-expanded', 'false');
                dd.setAttribute('aria-hidden', 'true');
            });

            toggle.addEventListener('keydown', e => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggle.click();
                } else if (e.key === 'Escape') {
                    toggle.dataset.dropdownToggle = 'closed';
                    toggle.setAttribute('aria-expanded', 'false');
                    dd.setAttribute('aria-hidden', 'true');
                    toggle.focus();
                }
            });

            dd.addEventListener('keydown', e => {
                const items = Array.from(dd.querySelectorAll('.nav-dropdown__link'));
                const idx = items.indexOf(document.activeElement);
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    items[(idx + 1) % items.length].focus();
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    items[(idx - 1 + items.length) % items.length].focus();
                } else if (e.key === 'Escape') {
                    e.preventDefault();
                    toggle.dataset.dropdownToggle = 'closed';
                    toggle.setAttribute('aria-expanded', 'false');
                    dd.setAttribute('aria-hidden', 'true');
                        toggle.focus();
                } else if (e.key === 'Tab' && !dd.contains(e.relatedTarget)) {
                    toggle.dataset.dropdownToggle = 'closed';
                    toggle.setAttribute('aria-expanded', 'false');
                    dd.setAttribute('aria-hidden', 'true');
                }
            });
        });

        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                toggles.forEach(toggle => {
                    toggle.dataset.dropdownToggle = 'closed';
                    toggle.setAttribute('aria-expanded', 'false');
                    const dd = toggle.nextElementSibling;
                    if (dd) dd.setAttribute('aria-hidden', 'true');
                });
            });
        });

        document.addEventListener('click', e => {
            const inside = toggles.some(toggle => {
                const dd = toggle.nextElementSibling;
                return toggle.contains(e.target) || (dd && dd.contains(e.target));
            });
            if (!inside) {
                toggles.forEach(toggle => {
                    toggle.dataset.dropdownToggle = 'closed';
                    toggle.setAttribute('aria-expanded', 'false');
                    const dd = toggle.nextElementSibling;
                    if (dd) dd.setAttribute('aria-hidden', 'true');
                });
            }
        });
    }
    
    /**
     * Image Cycling System
     * Automatically cycles through images with intersection observer for performance
     */
    function initImageCycle() {
        console.log('Initializing image cycle system...');
        
        const cycleElements = document.querySelectorAll("[data-image-cycle]");
        console.log('Found cycle elements:', cycleElements.length);
        
        cycleElements.forEach((cycleElement, index) => {
            const items = cycleElement.querySelectorAll("[data-image-cycle-item]");
            console.log(`Cycle element ${index}: ${items.length} items found`);
            
            if (items.length < 2) {
                console.log(`Cycle element ${index}: Skipping - need at least 2 items`);
                return;
            }

            let currentIndex = 0;
            let intervalId;

            // Get optional custom duration (in seconds), fallback to 2000ms
            const attrValue = cycleElement.getAttribute("data-image-cycle");
            const duration = attrValue && !isNaN(attrValue) ? parseFloat(attrValue) * 1000 : 2000;
            const isTwoItems = items.length === 2;
            
            console.log(`Cycle element ${index}: Duration set to ${duration}ms, Two items: ${isTwoItems}`);

            // Initial state
            items.forEach((item, i) => {
                const state = i === 0 ? "active" : "not-active";
                item.setAttribute("data-image-cycle-item", state);
                console.log(`Item ${i}: Set to ${state}`);
            });

            function cycleImages() {
                const prevIndex = currentIndex;
                currentIndex = (currentIndex + 1) % items.length;
                
                console.log(`Cycling: ${prevIndex} -> ${currentIndex}`);

                items[prevIndex].setAttribute("data-image-cycle-item", "previous");

                if (!isTwoItems) {
                    setTimeout(() => {
                        items[prevIndex].setAttribute("data-image-cycle-item", "not-active");
                    }, duration);
                }

                items[currentIndex].setAttribute("data-image-cycle-item", "active");
            }

            const observer = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting && !intervalId) {
                    console.log(`Cycle element ${index}: Starting cycle (visible)`);
                    intervalId = setInterval(cycleImages, duration);
                } else if (!entry.isIntersecting && intervalId) {
                    console.log(`Cycle element ${index}: Stopping cycle (not visible)`);
                    clearInterval(intervalId);
                    intervalId = null;
                }
            }, { threshold: 0 });

            observer.observe(cycleElement);
            console.log(`Cycle element ${index}: Observer attached`);
        });
        
        console.log('Image cycle system initialization complete');
    }
    
    /**
     * Masked Text Reveal System
     * Beautiful text reveal animations with GSAP SplitText and ScrollTrigger
     */
    function initMaskedTextReveal() {
        // Check if GSAP and required plugins are available
        if (typeof gsap === 'undefined' || typeof SplitText === 'undefined' || typeof ScrollTrigger === 'undefined') {
            console.warn('GSAP, SplitText, or ScrollTrigger not loaded. Make sure to include the required scripts in your Webflow project.');
            return;
        }

        try {
            // Register the plugins
            gsap.registerPlugin(SplitText, ScrollTrigger);
            
            // Configuration for different split types
            const splitConfig = {
                lines: { duration: 0.8, stagger: 0.08 },
                words: { duration: 0.6, stagger: 0.06 },
                chars: { duration: 0.4, stagger: 0.01 }
            };

            // Wait for fonts to be loaded for better text splitting
            document.fonts.ready.then(function () {
                console.log('Fonts loaded, initializing text reveal...');
                
                // Set initial state for all headings
                document.querySelectorAll('[data-split="heading"]').forEach(heading => {
                    gsap.set(heading, { visibility: 'visible' });
                });
                
                document.querySelectorAll('[data-split="heading"]').forEach(heading => {
                    // Find the split type, default is 'lines'
                    const type = heading.dataset.splitReveal || 'lines';
                    const typesToSplit =
                        type === 'lines' ? ['lines'] :
                        type === 'words' ? ['lines', 'words'] :
                        ['lines', 'words', 'chars'];
                    
                    // Split the text
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
                            
                            // Set initial state and animate
                            return gsap.fromTo(targets, 
                                {
                                    yPercent: 110,
                                    opacity: 0,
                                    visibility: 'hidden'
                                },
                                {
                                    yPercent: 0,
                                    opacity: 1,
                                    visibility: 'visible',
                                    duration: config.duration,
                                    stagger: config.stagger,
                                    ease: 'expo.out',
                                    scrollTrigger: {
                                        trigger: heading,
                                        start: 'clamp(top 80%)',
                                        once: true
                                    }
                                }
                            );
                        }
                    });
                });
                
                console.log('Masked text reveal system initialized successfully');
            });
            
        } catch (error) {
            console.error('Error initializing masked text reveal:', error);
        }
    }
    
    // Make functions available globally if needed
    window.DrivingClassic = {
        init: initDrivingClassic,
        utils: {
            isElementInViewport: isElementInViewport,
            debounce: debounce
        },
        navigation: {
            init: initNavigation,
            initMobile: initMobileMenu,
            initDesktop: initDesktopDropdowns
        },
        imageCycle: {
            init: initImageCycle,
            test: function() {
                console.log('Testing image cycle system...');
                const elements = document.querySelectorAll('[data-image-cycle]');
                console.log('Elements with data-image-cycle:', elements);
                elements.forEach((el, i) => {
                    const items = el.querySelectorAll('[data-image-cycle-item]');
                    console.log(`Element ${i}:`, el, `Items:`, items);
                });
            }
        },
        maskedTextReveal: {
            init: initMaskedTextReveal,
            test: function() {
                console.log('Testing masked text reveal system...');
                const elements = document.querySelectorAll('[data-split="heading"]');
                console.log('Elements with data-split="heading":', elements.length);
                elements.forEach((el, i) => {
                    const revealType = el.dataset.splitReveal || 'lines';
                    console.log(`Element ${i}:`, el, `Reveal type:`, revealType);
                });
            }
        },
        locomotiveScroll: null, // Will be set when Locomotive Scroll initializes
        test: function() {
            console.log('=== Driving Classic System Test ===');
            console.log('Locomotive Scroll available:', typeof LocomotiveScroll !== 'undefined');
            console.log('Locomotive Scroll instance:', window.DrivingClassic.locomotiveScroll);
            console.log('Image cycle elements:', document.querySelectorAll('[data-image-cycle]').length);
            console.log('Navigation elements:', document.querySelectorAll('[data-dropdown-toggle]').length);
            console.log('Text reveal elements:', document.querySelectorAll('[data-split="heading"]').length);
        }
    };
    
})();
