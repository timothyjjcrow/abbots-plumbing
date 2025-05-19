document.addEventListener("DOMContentLoaded", function () {
  // Initialize AOS animation library
  AOS.init({
    duration: 800,
    easing: "ease",
    once: true,
    offset: 100,
  });

  // Mobile menu toggle
  const mobileMenu = document.getElementById("mobile-menu");
  const navMenu = document.querySelector(".nav-menu");

  mobileMenu.addEventListener("click", function () {
    this.classList.toggle("active");
    navMenu.classList.toggle("active");
    document.body.classList.toggle("no-scroll");
  });

  // Close mobile menu when clicking a nav link
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      mobileMenu.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.classList.remove("no-scroll");
    });
  });

  // Active link highlighting on scroll
  const sections = document.querySelectorAll("section[id]");

  function highlightNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute("id");

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document
          .querySelector('.nav-link[href="#' + sectionId + '"]')
          .classList.add("active");
      } else {
        document
          .querySelector('.nav-link[href="#' + sectionId + '"]')
          .classList.remove("active");
      }
    });
  }

  // Testimonial slider
  const testimonialSlides = document.querySelectorAll(".testimonial-slide");
  const prevButton = document.getElementById("prev-testimonial");
  const nextButton = document.getElementById("next-testimonial");
  let currentSlide = 0;

  function showSlide(index) {
    testimonialSlides.forEach((slide) => (slide.style.display = "none"));
    testimonialSlides[index].style.display = "block";
  }

  if (testimonialSlides.length > 0 && prevButton && nextButton) {
    nextButton.addEventListener("click", function () {
      currentSlide = (currentSlide + 1) % testimonialSlides.length;
      showSlide(currentSlide);
    });

    prevButton.addEventListener("click", function () {
      currentSlide =
        (currentSlide - 1 + testimonialSlides.length) %
        testimonialSlides.length;
      showSlide(currentSlide);
    });

    // Auto-slide for testimonials
    setInterval(function () {
      currentSlide = (currentSlide + 1) % testimonialSlides.length;
      showSlide(currentSlide);
    }, 5000);
  }

  // Hide/Show Header on Scroll
  const header = document.querySelector(".header");
  let lastScrollTop = 0;

  function handleHeaderScroll() {
    const currentScrollTop = window.scrollY;

    // If we're at the very top, always show the header
    if (currentScrollTop <= 0) {
      header.classList.remove("header-hidden");
      header.classList.remove("scrolled");
      return;
    }

    // Add scrolled class when not at the top
    if (currentScrollTop > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    // Determine scroll direction
    if (currentScrollTop > lastScrollTop) {
      // Scrolling down
      header.classList.add("header-hidden");
    } else {
      // Scrolling up
      header.classList.remove("header-hidden");
    }

    lastScrollTop = currentScrollTop;
  }

  // Back to top button
  const backToTopBtn = document.querySelector(".back-to-top");

  function handleBackToTopBtn() {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add("active");
    } else {
      backToTopBtn.classList.remove("active");
    }
  }

  // Handle contact form submission
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const phone = document.getElementById("phone").value;
      const service = document.getElementById("service").value;
      const message = document.getElementById("message").value;

      // Simple validation
      if (!name || !email || !phone || !service || !message) {
        alert("Please fill in all fields");
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address");
        return;
      }

      // In a real application, you would send this data to a server
      // Here we'll just simulate a successful submission
      alert("Thank you for your message. We will get back to you soon!");
      contactForm.reset();
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Add scroll event listeners
  window.addEventListener("scroll", function () {
    handleHeaderScroll();
    handleBackToTopBtn();
    highlightNavLink();
  });

  // Initialize everything
  handleHeaderScroll();
  handleBackToTopBtn();
  highlightNavLink();
  if (testimonialSlides.length > 0) {
    showSlide(currentSlide);
  }

  // Create folder structure if needed
  function createCSSFolder() {
    const css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = `
        .no-scroll {
            overflow: hidden;
        }
        `;
    document.head.appendChild(css);
  }

  createCSSFolder();
});
