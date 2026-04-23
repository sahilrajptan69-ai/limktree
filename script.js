const card = document.getElementById('tilt-card');
const container = document.querySelector('.container');

// Tilt factor - higher is more intense
const TILT_FACTOR = 15;

const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = card.getBoundingClientRect();

    // Calculate mouse position relative to card center
    const x = clientX - left;
    const y = clientY - top;
    
    const centerX = width / 2;
    const centerY = height / 2;

    // Calculate rotation angles
    const rotateX = ((y - centerY) / centerY) * -TILT_FACTOR;
    const rotateY = ((x - centerX) / centerX) * TILT_FACTOR;

    // Apply transformation
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
};

const handleMouseLeave = () => {
    // Smoothly return to original position
    card.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
    card.style.transform = 'rotateX(0deg) rotateY(0deg)';
};

const handleMouseEnter = () => {
    // Remove transition for snappier response during movement
    card.style.transition = 'none';
};

// Only apply on desktop (devices with hover capability)
if (window.matchMedia('(hover: hover)').matches) {
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('mouseenter', handleMouseEnter);
}

// Initial entry animation for links
const links = document.querySelectorAll('.link-card');
links.forEach((link, index) => {
    link.style.opacity = '0';
    link.style.transform = 'translateY(20px) translateZ(0)';
    
    setTimeout(() => {
        link.style.transition = `all 0.6s cubic-bezier(0.23, 1, 0.32, 1) ${index * 0.1}s`;
        link.style.opacity = '1';
        link.style.transform = 'translateY(0) translateZ(0)';
    }, 100);
});
