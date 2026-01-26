document.addEventListener("DOMContentLoaded", () => {
  // Update footer year
  const dateElement = document.querySelector(".date-custom-footer");
  if (dateElement) {
    dateElement.textContent = new Date().getFullYear();
  }

  // Slider functionality
  const sliderContainer = document.getElementById("slider-container");
  const prevButton = document.getElementById("prev-button");
  const nextButton = document.getElementById("next-button");
  const sliderWrapper = document.querySelector(".showcase-slider");
  const dots = document.querySelectorAll(".showcase-dot");

  // Use the number of dots as the number of slides
  const slidesCount = dots.length;

  let currentIndex = 0;
  let isAnimating = false;
  let autoSlideInterval;

  // Touch/swipe variables
  let touchStartX = 0;
  let touchEndX = 0;
  let touchStartY = 0;
  let touchEndY = 0;
  const swipeThreshold = 50;

  function updateSlider() {
    if (!sliderContainer) return;
    sliderContainer.style.transform = `translateX(-${currentIndex * 100}%)`;

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
    setTimeout(() => isAnimating = false, 400);
  }

  function prevSlide() {
    if (isAnimating) return;
    isAnimating = true;
    currentIndex = (currentIndex - 1 + slidesCount) % slidesCount;
    updateSlider();
    setTimeout(() => isAnimating = false, 400);
  }

  function goToSlide(index) {
    if (isAnimating || index === currentIndex) return;
    isAnimating = true;
    currentIndex = index;
    updateSlider();
    setTimeout(() => isAnimating = false, 400);
  }

  function handleSwipe() {
    const diffX = touchStartX - touchEndX;
    const diffY = touchStartY - touchEndY;

    // Only handle horizontal swipes (ignore if vertical movement is greater)
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > swipeThreshold) {
      if (diffX > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  }

  function resetAutoSlide() {
    if (autoSlideInterval) {
      clearInterval(autoSlideInterval);
    }
    autoSlideInterval = setInterval(nextSlide, 5000);
  }

  // Attach event listeners for navigation arrows
  if (prevButton && nextButton) {
    prevButton.addEventListener("click", () => {
      prevSlide();
      resetAutoSlide();
    });
    nextButton.addEventListener("click", () => {
      nextSlide();
      resetAutoSlide();
    });
  }

  // Touch event listeners for swipe support
  if (sliderWrapper) {
    sliderWrapper.addEventListener("touchstart", function(e) {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    sliderWrapper.addEventListener("touchend", function(e) {
      touchEndX = e.changedTouches[0].screenX;
      touchEndY = e.changedTouches[0].screenY;
      handleSwipe();
      resetAutoSlide();
    }, { passive: true });

    // Mouse drag support for desktop
    let mouseDown = false;
    let mouseStartX = 0;

    sliderWrapper.addEventListener("mousedown", function(e) {
      mouseDown = true;
      mouseStartX = e.clientX;
      sliderWrapper.style.cursor = "grabbing";
    });

    sliderWrapper.addEventListener("mouseup", function(e) {
      if (!mouseDown) return;
      mouseDown = false;
      sliderWrapper.style.cursor = "grab";
      const diffX = mouseStartX - e.clientX;
      if (Math.abs(diffX) > swipeThreshold) {
        if (diffX > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
        resetAutoSlide();
      }
    });

    sliderWrapper.addEventListener("mouseleave", function() {
      mouseDown = false;
      sliderWrapper.style.cursor = "grab";
    });

    sliderWrapper.style.cursor = "grab";
  }

  // Attach event listeners for dots
  dots.forEach(dot => {
    dot.addEventListener("click", function () {
      const index = parseInt(this.getAttribute("data-index"), 10);
      goToSlide(index);
      resetAutoSlide();
    });
  });

  // Start auto-advance slides
  if (slidesCount > 0) {
    autoSlideInterval = setInterval(nextSlide, 5000);
    updateSlider();
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const headerHeight = 72;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});
