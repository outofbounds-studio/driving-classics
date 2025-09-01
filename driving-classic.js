/**
 * Driving Classic - Webflow Website JavaScript
 * 
 * This file contains all the JavaScript functionality for the Driving Classic website.
 * Update this file in Cursor and push to GitHub to deploy changes.
 * 
 * Last Updated: [Date]
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
    
    // Make functions available globally if needed
    window.DrivingClassic = {
        init: initDrivingClassic,
        utils: {
            isElementInViewport: isElementInViewport,
            debounce: debounce
        }
    };
    
})();
