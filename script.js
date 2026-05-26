/**
 * NOOR Productions - Mobile Portal Engine
 * Handles interface events and automated carousel transitions
 */

// ==========================================================================
// 1. AUTOMATED CONTENT CAROUSEL CONTROLLER
// ==========================================================================
const carouselWrapper = document.getElementById('carouselWrapper');
let scrollDirection = 1; // 1 = Forward, -1 = Backward

setInterval(() => {
    // Safety check to ensure the carousel element exists in the runtime DOM
    if (!carouselWrapper) return;

    // Dynamically look up the first visible slide card inside the wrapper
    const firstCard = carouselWrapper.querySelector('.slide-card');
    if (!firstCard) return;

    // Extract the precise rendering width of a single card including layout gaps
    const cardWidth = firstCard.offsetWidth + 15; // Width + 15px CSS grid gap
    const maxScrollLeft = carouselWrapper.scrollWidth - carouselWrapper.clientWidth;

    // Check boundary collisions to reverse the sliding direction smoothly
    if (carouselWrapper.scrollLeft >= maxScrollLeft - 10) {
        scrollDirection = -1; // End reached -> slide backward
    } else if (carouselWrapper.scrollLeft <= 5) {
        scrollDirection = 1;  // Start reached -> slide forward
    }

    // Execute the relative horizontal slide movement using the precise card math
    carouselWrapper.scrollBy({
        left: scrollDirection * cardWidth,
        behavior: 'smooth'
    });
    
}, 4500); // Transitions seamlessly every 4.5 seconds


// ==========================================================================
// 2. INTERACTIVE PORTFOLIO LIGHTBOX PORTAL
// ==========================================================================
function openLightbox(imagePath) {
    const portal = document.getElementById("lightboxPortal");
    const targetImg = document.getElementById("lightboxTargetImage");
    const caption = document.getElementById("lightboxCaption");

    if (!portal || !targetImg) return;

    targetImg.src = imagePath;
    if (caption) {
        caption.innerText = "NOOR Productions System View";
    }
    
    portal.style.display = "flex";
}

function closeLightbox() {
    const portal = document.getElementById("lightboxPortal");
    if (portal) {
        portal.style.display = "none";
    }
}