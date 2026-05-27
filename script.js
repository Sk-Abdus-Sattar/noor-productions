/**
 * NOOR Productions - Mobile Portal Engine
 * Handles interface events and automated carousel transitions
 * 
 * This file controls two things:
 * 1. The image carousel that auto-scrolls every 4.5 seconds
 * 2. The lightbox that opens when you tap a card image
 */


// ==========================================================================
// 1. AUTOMATED CONTENT CAROUSEL CONTROLLER
//
// This section makes the image slider move on its own, back and forth,
// without the user needing to swipe. Like a TV slideshow.
// ==========================================================================

// Grab the carousel track element from the HTML using its unique id="carouselWrapper"
// Think of this like pointing to a specific box on the page by its name tag
const carouselWrapper = document.getElementById('carouselWrapper');

// This variable remembers which DIRECTION the carousel is sliding
// 1 means "slide forward (to the right)" and -1 means "slide backward (to the left)"
let scrollDirection = 1; // 1 = Forward, -1 = Backward


// setInterval is like a TIMER that runs the same code repeatedly on a schedule
// Everything inside the { } below will run automatically every 4500 milliseconds (4.5 seconds)
setInterval(() => {

    // SAFETY CHECK: Before doing anything, make sure the carousel element actually exists
    // on the page. If it somehow doesn't exist, stop here and do nothing.
    // This prevents JavaScript errors from crashing the whole page.
    if (!carouselWrapper) return;

    // Find the FIRST slide card inside the carousel wrapper
    // We need it to measure how wide one card is, so we know how far to scroll
    const firstCard = carouselWrapper.querySelector('.slide-card');

    // SAFETY CHECK: If there are no cards at all, stop here
    if (!firstCard) return;

    // Calculate the EXACT width to scroll by (one full card + the 15px gap between cards)
    // offsetWidth = the actual rendered pixel width of the card on screen
    // Adding 15 accounts for the CSS gap between cards — so we scroll exactly one card at a time
    const cardWidth = firstCard.offsetWidth + 15; // Width + 15px CSS grid gap

    // Calculate the MAXIMUM scroll position — how far right we can go before hitting the end
    // scrollWidth = total width of ALL content inside the wrapper (all cards combined)
    // clientWidth = the visible window width (what the user sees at one time)
    // Subtracting them tells us: "how much is hidden off to the right?"
    const maxScrollLeft = carouselWrapper.scrollWidth - carouselWrapper.clientWidth;


    // DIRECTION CHECK: Has the carousel reached the RIGHT END?
    // We check if the current scroll position is within 10px of the maximum
    // (The -10 gives a small tolerance so the check doesn't miss the boundary)
    if (carouselWrapper.scrollLeft >= maxScrollLeft - 10) {
        scrollDirection = -1; // End reached -> reverse direction: slide backward
    
    // Has the carousel reached the LEFT END (the beginning)?
    // scrollLeft of 5 or less means we're basically at the start
    } else if (carouselWrapper.scrollLeft <= 5) {
        scrollDirection = 1;  // Start reached -> reverse direction: slide forward
    }


    // NOW ACTUALLY SCROLL the carousel by one card width in the current direction
    // scrollBy() moves the scroll position RELATIVE to where it currently is
    // 'left' value: positive = scroll right, negative = scroll left
    // scrollDirection * cardWidth gives us either +cardWidth (forward) or -cardWidth (backward)
    carouselWrapper.scrollBy({
        left: scrollDirection * cardWidth, // How far and which direction to move
        behavior: 'smooth'                 // Glide smoothly instead of jumping instantly
    });

}, 4500); 
// This number (4500) is the INTERVAL in milliseconds between each scroll
// 4500ms = 4.5 seconds — the carousel moves to the next card every 4.5 seconds


// ==========================================================================
// 2. INTERACTIVE PORTFOLIO LIGHTBOX PORTAL
//
// This section controls the full-screen image viewer.
// When a user taps a card image, the page goes dark and the image
// appears large — like opening a photo in full screen on your phone.
// ==========================================================================

// OPEN LIGHTBOX FUNCTION
// This function runs when a user taps any clickable image card
// It receives 'imagePath' — the file path of the image to display (e.g. "Assets/catalog.png")
function openLightbox(imagePath) {

    // Find the lightbox overlay container by its id
    // This is the dark full-screen overlay div in the HTML
    const portal = document.getElementById("lightboxPortal");

    // Find the <img> tag inside the lightbox where we'll load the tapped image
    const targetImg = document.getElementById("lightboxTargetImage");

    // Find the caption text box below the lightbox image
    const caption = document.getElementById("lightboxCaption");

    // SAFETY CHECK: If either the portal or image element don't exist, stop here
    // This prevents errors if the HTML structure is ever changed
    if (!portal || !targetImg) return;

    // Set the image source to the path that was passed in when the card was tapped
    // This is what actually LOADS the correct image into the lightbox viewer
    // e.g. targetImg.src becomes "Assets/catalog.png"
    targetImg.src = imagePath;

    // If the caption box exists, fill it with a standard label text
    if (caption) {
        caption.innerText = "NOOR Productions System View";
        // Visually: this small text appears below the full-screen image
    }

    // Make the lightbox VISIBLE by changing its CSS display from 'none' to 'flex'
    // 'flex' also activates the centering rules we set in CSS
    // Visually: the dark overlay appears and the image zooms in with the animation
    portal.style.display = "flex";
}


// CLOSE LIGHTBOX FUNCTION
// This function runs when the user taps anywhere on the dark overlay (or the × button)
// It hides the lightbox and returns the page to normal
function closeLightbox() {

    // Find the lightbox overlay element again
    const portal = document.getElementById("lightboxPortal");

    // If it exists, hide it by setting display back to 'none'
    // Visually: the dark overlay disappears and the normal page is visible again
    if (portal) {
        portal.style.display = "none";
    }
}