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
            
        } catch (error) {
            console.error('Error initializing Driving Classic:', error);
        }
    }

    // Navigation system
    function initNavigation() {
        try {
            initMobileMenu();
            initDesktopDropdowns();
            console.log('Navigation system initialized');
        } catch (error) {
            console.error('Error initializing navigation:', error);
        }
    }

    function initMobileMenu() {
        const menuButtons = document.querySelectorAll('[data-menu-button]');
        
        menuButtons.forEach(button => {
            button.addEventListener('click', () => {
                const menuStatus = button.getAttribute('data-menu-status');
                const targetMenu = button.getAttribute('data-menu-target');
                
                if (menuStatus === 'closed') {
                    button.setAttribute('data-menu-status', 'open');
                    if (targetMenu) {
                        const menu = document.querySelector(targetMenu);
                        if (menu) menu.style.display = 'block';
                    }
                } else {
                    button.setAttribute('data-menu-status', 'closed');
                    if (targetMenu) {
                        const menu = document.querySelector(targetMenu);
                        if (menu) menu.style.display = 'none';
                    }
                }
            });
        });
    }

    function initDesktopDropdowns() {
        const dropdownToggles = document.querySelectorAll('[data-dropdown-toggle]');
        
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('mouseenter', () => {
                const dropdown = toggle.querySelector('.nav-dropdown');
                if (dropdown) {
                    dropdown.style.display = 'block';
                }
            });
            
            toggle.addEventListener('mouseleave', () => {
                const dropdown = toggle.querySelector('.nav-dropdown');
                if (dropdown) {
                    dropdown.style.display = 'none';
                }
            });
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

    // Masked text reveal system
    function initMaskedTextReveal() {
        try {
            // Wait for fonts to load
            document.fonts.ready.then(() => {
                console.log('Fonts loaded, initializing text reveal...');
                
                const headings = document.querySelectorAll('[data-split="heading"]');
                
                if (headings.length === 0) return;
                
                // Register GSAP plugins
                gsap.registerPlugin(SplitText, ScrollTrigger);
                
                // Create custom ease
                CustomEase.create("osmo-ease", "0.625, 0.05, 0, 1");
                
                const splitConfig = {
                    type: "chars,words,lines",
                    linesClass: "overflow-hidden"
                };
                
                headings.forEach(heading => {
                    // Ensure element is visible for GSAP to split it
                    gsap.set(heading, { visibility: 'visible' });
                    
                    const split = new SplitText(heading, splitConfig);
                    const revealType = heading.getAttribute('data-split-reveal') || 'lines';
                    
                    let elementsToAnimate;
                    switch (revealType) {
                        case 'lines':
                            elementsToAnimate = split.lines;
                            break;
                        case 'words':
                            elementsToAnimate = split.words;
                            break;
                        case 'chars':
                            elementsToAnimate = split.chars;
                            break;
                        default:
                            elementsToAnimate = split.lines;
                    }
                    
                    // Set initial state
                    gsap.set(elementsToAnimate, { 
                        y: "100%", 
                        opacity: 0,
                        visibility: 'visible'
                    });
                    
                    // Create reveal animation
                    gsap.fromTo(elementsToAnimate, 
                        { 
                            y: "100%", 
                            opacity: 0,
                            visibility: 'visible'
                        },
                        {
                            y: "0%",
                            opacity: 1,
                            visibility: 'visible',
                            duration: 1.2,
                            ease: "osmo-ease",
                            stagger: 0.1,
                            scrollTrigger: {
                                trigger: heading,
                                start: "top 80%",
                                end: "bottom 20%",
                                toggleActions: "play none none reverse"
                            }
                        }
                    );
                });
                
                console.log('Masked text reveal system initialized successfully');
                
            });
            
        } catch (error) {
            console.error('Error initializing masked text reveal:', error);
        }
    }

    // Centered looping slider system
    function initSliders() {
        // Wait for Collection List content to be fully rendered
        setTimeout(() => {
            const sliderWrappers = gsap.utils.toArray(document.querySelectorAll('[data-centered-slider="wrapper"]'));

            sliderWrappers.forEach((sliderWrapper, index) => {
                const slides = gsap.utils.toArray(sliderWrapper.querySelectorAll('[data-centered-slider="slide"]'));
                const bullets = gsap.utils.toArray(sliderWrapper.querySelectorAll('[data-centered-slider="bullet"]'));
                const prevButton = sliderWrapper.querySelector('[data-centered-slider="prev-button"]');
                const nextButton = sliderWrapper.querySelector('[data-centered-slider="next-button"]');

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
                    slide.setAttribute("id", `slide-${index}-${i}`);
                });
                
                // Set ARIA attributes on bullets if they exist
                if (bullets && bullets.length > 0) {
                    bullets.forEach((bullet, i) => {
                        bullet.setAttribute("aria-controls", `slide-${index}-${i}`);
                        bullet.setAttribute("aria-selected", i === currentIndex ? "true" : "false");
                    });
                }

                // Calculate center index dynamically based on number of slides
                const centerIndex = Math.floor(slides.length / 2);
                console.log(`Slider ${index}: Total slides: ${slides.length}, Center index: ${centerIndex}`);

                const loop = horizontalLoop(slides, {
                    paused: true,
                    draggable: true,
                    center: true, // Enable automatic centering
                    onChange: (element, index) => {
                        currentIndex = index;
                        
                        if (activeElement) activeElement.classList.remove("active");
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
                
                // On initialization, center the slider dynamically
                setTimeout(() => {
                    console.log(`Slider ${index}: Centering to index ${centerIndex} (center of ${slides.length} slides)`);
                    console.log(`Slider ${index}: Current active index: ${currentIndex}`);
                    
                    // Center to the calculated center index
                    loop.toIndex(centerIndex, { duration: 0.01 });
                    
                    // Verify centering worked
                    setTimeout(() => {
                        const activeSlide = sliderWrapper.querySelector('.centered-slider-slide.active');
                        const activeIndex = Array.from(slides).indexOf(activeSlide);
                        console.log(`Slider ${index}: After centering, active index: ${activeIndex}`);
                        
                        // Debug: Check the actual transform positions of all slides
                        console.log(`Slider ${index}: Slide transforms:`);
                        slides.forEach((slide, i) => {
                            const transform = slide.style.transform;
                            const isActive = slide.classList.contains('active');
                            console.log(`  Slide ${i}: transform="${transform}", active=${isActive}`);
                        });
                    }, 50);
                }, 100);

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
    }, 1000); // Wait 1000ms for Collection List to fully render
}

    // GSAP Helper function to create a looping slider
    // Read more: https://gsap.com/docs/v3/HelperFunctions/helpers/seamlessLoop
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
            init: initMaskedTextReveal
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
        }
    };

})();
