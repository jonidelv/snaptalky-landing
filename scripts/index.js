document.addEventListener("DOMContentLoaded", () => {
  // Update footer year
  const dateElement = document.querySelector(".date-custom-footer");
  if (dateElement) {
    dateElement.textContent = new Date().getFullYear();
  }

  // Initialize Typed.js
  const typedOptions = {
    strings: ["Elevate your conversations with smart replies."],
    typeSpeed: 30,
    backSpeed: 20,
    loop: true,
    backDelay: 3000,
  };
  new Typed("#typing-text", typedOptions);

  // Slider functionality
  const sliderContainer = document.getElementById("slider-container");
  const prevButton = document.getElementById("prev-button");
  const nextButton = document.getElementById("next-button");
// Dots for indicating current slide (ensure there are exactly 5 dots in your HTML)
  const dots = document.querySelectorAll(".phone-showcase-dot");

// Use the number of dots as the number of slides
  const slidesCount = dots.length;

  let currentIndex = 0;
  let isAnimating = false;

  function updateSlider() {
    sliderContainer.style.transform = `translateY(-${currentIndex * 100}%)`;

    // Update dots indicator
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });
  }

  function nextSlide() {
    if (isAnimating) return;
    isAnimating = true;
    currentIndex = (currentIndex + 1) % slidesCount;
    updateSlider();
    setTimeout(() => isAnimating = false, 500);
  }

  function prevSlide() {
    if (isAnimating) return;
    isAnimating = true;
    currentIndex = (currentIndex - 1 + slidesCount) % slidesCount;
    updateSlider();
    setTimeout(() => isAnimating = false, 500);
  }

  function goToSlide(index) {
    if (isAnimating || index === currentIndex) return;
    isAnimating = true;
    currentIndex = index;
    updateSlider();
    setTimeout(() => isAnimating = false, 500);
  }

// Attach event listeners for navigation arrows
  if (prevButton && nextButton) {
    prevButton.addEventListener("click", prevSlide);
    nextButton.addEventListener("click", nextSlide);
  }

// Attach event listeners for dots
  dots.forEach(dot => {
    dot.addEventListener("click", function () {
      const index = parseInt(this.getAttribute("data-index"), 10);
      goToSlide(index);
    });
  });

// Auto-advance slides every 5 seconds
  setInterval(nextSlide, 5000);

// Initialize slider position
  updateSlider();
});