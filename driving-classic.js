/**
 * Driving Classic - Webflow Website JavaScript
 * 
 * This file contains all the JavaScript functionality for the Driving Classic website.
 * Update this file in Cursor and push to GitHub to deploy changes.
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
        
        // Example: Add smooth scrolling to navigation links
        setupSmoothScrolling();
        
        // Example: Initialize any custom components
        // setupCustomComponents();
        
        // Example: Add event listeners
        // setupEventListeners();
    }
    
    /**
     * Setup smooth scrolling for navigation links
     */
    function setupSmoothScrolling() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
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
        }
    };
    
})();
