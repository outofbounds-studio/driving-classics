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
 * <script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/Draggable.min.js"></script>
 * <script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/InertiaPlugin.min.js"></script>
 * <script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/CustomEase.min.js"></script>
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
        
        // Initialize centered looping sliders
        initSliders();
        
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
    
    /**
     * Centered Looping Slider System
     * Professional slider with drag support, autoplay, and smooth animations
     */
    function initSliders() {
        // Check if GSAP and required plugins are available
        if (typeof gsap === 'undefined' || typeof CustomEase === 'undefined' || typeof ScrollTrigger === 'undefined' || typeof Draggable === 'undefined' || typeof InertiaPlugin === 'undefined') {
            console.warn('GSAP or required plugins not loaded. Make sure to include all required scripts in your Webflow project.');
            return;
        }

        try {
            // Register the plugins
            gsap.registerPlugin(CustomEase, ScrollTrigger, Draggable, InertiaPlugin);
            
            // Create custom ease
            CustomEase.create("osmo-ease", "0.625, 0.05, 0, 1");
            
            console.log('Initializing centered looping sliders...');
            
            const sliderWrappers = gsap.utils.toArray(document.querySelectorAll('[data-centered-slider="wrapper"]'));
            console.log('Found slider wrappers:', sliderWrappers.length);
            
            sliderWrappers.forEach((sliderWrapper, wrapperIndex) => {
                const slides = gsap.utils.toArray(sliderWrapper.querySelectorAll('[data-centered-slider="slide"]'));
                const bullets = gsap.utils.toArray(sliderWrapper.querySelectorAll('[data-centered-slider="bullet"]'));
                const prevButton = sliderWrapper.querySelector('[data-centered-slider="prev-button"]');
                const nextButton = sliderWrapper.querySelector('[data-centered-slider="next-button"]');

                console.log(`Slider ${wrapperIndex}: ${slides.length} slides, ${bullets.length} bullets`);

                let activeElement;
                let activeBullet;
                let currentIndex = 0;
                let autoplay;

                // Autoplay is now enabled/disabled via a boolean attribute.
                const autoplayEnabled = sliderWrapper.getAttribute('data-slider-autoplay') === 'true';
                
                // If enabled, get the autoplay duration (in seconds) from the separate attribute.
                const autoplayDuration = autoplayEnabled ? parseFloat(sliderWrapper.getAttribute('data-slider-autoplay-duration')) || 0 : 0;

                // Dynamically assign unique IDs to slides
                slides.forEach((slide, i) => {
                    slide.setAttribute("id", `slide-${wrapperIndex}-${i}`);
                });
                
                // Set ARIA attributes on bullets if they exist
                if (bullets && bullets.length > 0) {
                    bullets.forEach((bullet, i) => {
                        bullet.setAttribute("aria-controls", `slide-${wrapperIndex}-${i}`);
                        bullet.setAttribute("aria-selected", i === currentIndex ? "true" : "false");
                    });
                }

                const loop = horizontalLoop(slides, {
                    paused: true,
                    draggable: true,
                    center: true,
                    onChange: (element, index) => {
                        currentIndex = index;
                        
                        // Remove active class from all slides and add to current
                        slides.forEach(slide => slide.classList.remove("active"));
                        element.classList.add("active");
                        activeElement = element;

                        if (bullets && bullets.length > 0) {
                            if (activeBullet) activeBullet.classList.remove("active");
                            if (bullets[index]) {
                                bullets[index].classList.add("active");
                                activeBullet = bullets[index];
                            }
                            bullets.forEach((bullet, i) => {
                                bullet.setAttribute("aria-selected", i === index ? "true" : "false");
                            });
                        }
                        
                    }
                });
                
                // On initialization, center the slider
                loop.toIndex(2, { duration: 0.01 });
                
                // Set initial active state
                if (slides[2]) {
                    slides[2].classList.add("active");
                    activeElement = slides[2];
                }

                function startAutoplay() {
                    if (autoplayDuration > 0 && !autoplay) {
                        const repeat = () => {
                            loop.next({ ease: "osmo-ease", duration: 0.725 });
                            autoplay = gsap.delayedCall(autoplayDuration, repeat);
                        };
                        autoplay = gsap.delayedCall(autoplayDuration, repeat);
                    }
                }

                function stopAutoplay() {
                    if (autoplay) {
                        autoplay.kill();
                        autoplay = null;
                    }
                }

                // Start/stop autoplay based on viewport visibility via ScrollTrigger
                ScrollTrigger.create({
                    trigger: sliderWrapper,
                    start: "top bottom",
                    end: "bottom top",
                    onEnter: startAutoplay,
                    onLeave: stopAutoplay,
                    onEnterBack: startAutoplay,
                    onLeaveBack: stopAutoplay
                });

                // Pause autoplay on mouse hover over the slider
                sliderWrapper.addEventListener("mouseenter", stopAutoplay);
                sliderWrapper.addEventListener("mouseleave", () => {
                    if (ScrollTrigger.isInViewport(sliderWrapper)) startAutoplay();
                });

                // Slide click event for direct navigation
                slides.forEach((slide, i) => {
                    slide.addEventListener("click", () => {
                        loop.toIndex(i, { ease: "osmo-ease", duration: 0.725 });
                    });
                });

                // Bullets click event for direct navigation (if available)
                if (bullets && bullets.length > 0) {
                    bullets.forEach((bullet, i) => {
                        bullet.addEventListener("click", () => {
                            loop.toIndex(i, { ease: "osmo-ease", duration: 0.725 });
                            if (activeBullet) activeBullet.classList.remove("active");
                            bullet.classList.add("active");
                            activeBullet = bullet;
                            bullets.forEach((b, j) => {
                                b.setAttribute("aria-selected", j === i ? "true" : "false");
                            });
                        });
                    });
                }

                // Prev/Next button listeners (if the buttons exist)
                if (prevButton) {
                    prevButton.addEventListener("click", () => {
                        let newIndex = currentIndex - 1;
                        if (newIndex < 0) newIndex = slides.length - 1;
                        loop.toIndex(newIndex, { ease: "osmo-ease", duration: 0.725 });
                    });
                }

                if (nextButton) {
                    nextButton.addEventListener("click", () => {
                        let newIndex = currentIndex + 1;
                        if (newIndex >= slides.length) newIndex = 0;
                        loop.toIndex(newIndex, { ease: "osmo-ease", duration: 0.725 });
                    });
                }
                
            });
            
            console.log('Centered looping sliders initialized successfully');
            
        } catch (error) {
            console.error('Error initializing centered looping sliders:', error);
        }
    }
    
    /**
     * GSAP Helper function to create a looping slider
     * Read more: https://gsap.com/docs/v3/HelperFunctions/helpers/seamlessLoop
     */
    function horizontalLoop(items, config) {
        let timeline;
        items = gsap.utils.toArray(items);
        config = config || {};
        gsap.context(() => { 
            let onChange = config.onChange,
                lastIndex = 0,
                tl = gsap.timeline({repeat: config.repeat, onUpdate: onChange && function() {
                        let i = tl.closestIndex();
                        if (lastIndex !== i) {
                            lastIndex = i;
                            onChange(items[i], i);
                        }
                    }, paused: config.paused, defaults: {ease: "none"}, onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100)}),
                length = items.length,
                startX = items[0].offsetLeft,
                times = [],
                widths = [],
                spaceBefore = [],
                xPercents = [],
                curIndex = 0,
                indexIsDirty = false,
                center = config.center,
                pixelsPerSecond = (config.speed || 1) * 100,
                snap = config.snap === false ? v => v : gsap.utils.snap(config.snap || 1),
                timeOffset = 0,
                container = center === true ? items[0].parentNode : gsap.utils.toArray(center)[0] || items[0].parentNode,
                totalWidth,
                getTotalWidth = () => items[length-1].offsetLeft + xPercents[length-1] / 100 * widths[length-1] - startX + spaceBefore[0] + items[length-1].offsetWidth * gsap.getProperty(items[length-1], "scaleX") + (parseFloat(config.paddingRight) || 0),
                populateWidths = () => {
                    let b1 = container.getBoundingClientRect(), b2;
                    items.forEach((el, i) => {
                        widths[i] = parseFloat(gsap.getProperty(el, "width", "px"));
                        xPercents[i] = snap(parseFloat(gsap.getProperty(el, "x", "px")) / widths[i] * 100 + gsap.getProperty(el, "xPercent"));
                        b2 = el.getBoundingClientRect();
                        spaceBefore[i] = b2.left - (i ? b1.right : b1.left);
                        b1 = b2;
                    });
                    gsap.set(items, {
                        xPercent: i => xPercents[i]
                    });
                    totalWidth = getTotalWidth();
                },
                timeWrap,
                populateOffsets = () => {
                    timeOffset = center ? tl.duration() * (container.offsetWidth / 2) / totalWidth : 0;
                    center && times.forEach((t, i) => {
                        times[i] = timeWrap(tl.labels["label" + i] + tl.duration() * widths[i] / 2 / totalWidth - timeOffset);
                    });
                },
                getClosest = (values, value, wrap) => {
                    let i = values.length,
                        closest = 1e10,
                        index = 0, d;
                    while (i--) {
                        d = Math.abs(values[i] - value);
                        if (d > wrap / 2) {
                            d = wrap - d;
                        }
                        if (d < closest) {
                            closest = d;
                            index = i;
                        }
                    }
                    return index;
                },
                populateTimeline = () => {
                    let i, item, curX, distanceToStart, distanceToLoop;
                    tl.clear();
                    for (i = 0; i < length; i++) {
                        item = items[i];
                        curX = xPercents[i] / 100 * widths[i];
                        distanceToStart = item.offsetLeft + curX - startX + spaceBefore[0];
                        distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
                        tl.to(item, {xPercent: snap((curX - distanceToLoop) / widths[i] * 100), duration: distanceToLoop / pixelsPerSecond}, 0)
                            .fromTo(item, {xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100)}, {xPercent: xPercents[i], duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond, immediateRender: false}, distanceToLoop / pixelsPerSecond)
                            .add("label" + i, distanceToStart / pixelsPerSecond);
                        times[i] = distanceToStart / pixelsPerSecond;
                    }
                    timeWrap = gsap.utils.wrap(0, tl.duration());
                },
                refresh = (deep) => {
                    let progress = tl.progress();
                    tl.progress(0, true);
                    populateWidths();
                    deep && populateTimeline();
                    populateOffsets();
                    deep && tl.draggable ? tl.time(times[curIndex], true) : tl.progress(progress, true);
                },
                onResize = () => refresh(true),
                proxy;
            gsap.set(items, {x: 0});
            populateWidths();
            populateTimeline();
            populateOffsets();
            window.addEventListener("resize", onResize);
            function toIndex(index, vars) {
                vars = vars || {};
                (Math.abs(index - curIndex) > length / 2) && (index += index > curIndex ? -length : length); // always go in the shortest direction
                let newIndex = gsap.utils.wrap(0, length, index),
                    time = times[newIndex];
                if (time > tl.time() !== index > curIndex && index !== curIndex) { // if we're wrapping the timeline's playhead, make the proper adjustments
                    time += tl.duration() * (index > curIndex ? 1 : -1);
                }
                if (time < 0 || time > tl.duration()) {
                    vars.modifiers = {time: timeWrap};
                }
                curIndex = newIndex;
                vars.overwrite = true;
                gsap.killTweensOf(proxy);    
                return vars.duration === 0 ? tl.time(timeWrap(time)) : tl.tweenTo(time, vars);
            }
            tl.toIndex = (index, vars) => toIndex(index, vars);
            tl.closestIndex = setCurrent => {
                let index = getClosest(times, tl.time(), tl.duration());
                if (setCurrent) {
                    curIndex = index;
                    indexIsDirty = false;
                }
                return index;
            };
            tl.current = () => indexIsDirty ? tl.closestIndex(true) : curIndex;
            tl.next = vars => toIndex(tl.current()+1, vars);
            tl.previous = vars => toIndex(tl.current()-1, vars);
            tl.times = times;
            tl.progress(1, true).progress(0, true); // pre-render for performance
            if (config.reversed) {
                tl.vars.onReverseComplete();
                tl.reverse();
            }
            if (config.draggable && typeof(Draggable) === "function") {
                proxy = document.createElement("div")
                let wrap = gsap.utils.wrap(0, 1),
                    ratio, startProgress, draggable, dragSnap, lastSnap, initChangeX, wasPlaying,
                    align = () => tl.progress(wrap(startProgress + (draggable.startX - draggable.x) * ratio)),
                    syncIndex = () => tl.closestIndex(true);
                typeof(InertiaPlugin) === "undefined" && console.warn("InertiaPlugin required for momentum-based scrolling and snapping. https://greensock.com/club");
                draggable = Draggable.create(proxy, {
                    trigger: items[0].parentNode,
                    type: "x",
                    onPressInit() {
                        let x = this.x;
                        gsap.killTweensOf(tl);
                        wasPlaying = !tl.paused();
                        tl.pause();
                        startProgress = tl.progress();
                        refresh();
                        ratio = 1 / totalWidth;
                        initChangeX = (startProgress / -ratio) - x;
                        gsap.set(proxy, {x: startProgress / -ratio});
                    },
                    onDrag: align,
                    onThrowUpdate: align,
                    overshootTolerance: 0,
                    inertia: true,
                    snap(value) {
                        if (Math.abs(startProgress / -ratio - this.x) < 10) {
                            return lastSnap + initChangeX
                        }
                        let time = -(value * ratio) * tl.duration(),
                            wrappedTime = timeWrap(time),
                            snapTime = times[getClosest(times, wrappedTime, tl.duration())],
                            dif = snapTime - wrappedTime;
                        Math.abs(dif) > tl.duration() / 2 && (dif += dif < 0 ? tl.duration() : -tl.duration());
                        lastSnap = (time + dif) / tl.duration() / -ratio;
                        return lastSnap;
                    },
                    onRelease() {
                        syncIndex();
                        draggable.isThrowing && (indexIsDirty = true);
                    },
                    onThrowComplete: () => {
                        syncIndex();
                        wasPlaying && tl.play();
                    }
                })[0];
                tl.draggable = draggable;
            }
            tl.closestIndex(true);
            lastIndex = curIndex;
            onChange && onChange(items[curIndex], curIndex);
            timeline = tl;
            return () => window.removeEventListener("resize", onResize); 
        });
        return timeline;
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
        sliders: {
            init: initSliders,
            test: function() {
                console.log('Testing centered looping sliders...');
                const elements = document.querySelectorAll('[data-centered-slider="wrapper"]');
                console.log('Elements with data-centered-slider="wrapper":', elements.length);
                elements.forEach((el, i) => {
                    const slides = el.querySelectorAll('[data-centered-slider="slide"]');
                    const bullets = el.querySelectorAll('[data-centered-slider="bullet"]');
                    console.log(`Slider ${i}:`, el, `Slides:`, slides.length, `Bullets:`, bullets.length);
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
            console.log('Slider elements:', document.querySelectorAll('[data-centered-slider="wrapper"]').length);
        }
    };
    
})();
