const burger = document.querySelector(".burger");

function animateSlides() {
  const slides = document.querySelectorAll(".slide");
  const nav = document.querySelector(".nav-header");
  const title = document.querySelector(".title");

  slides.forEach((slide) => {
    const img = slide.querySelector("img");
    const imgReveal = slide.querySelector(".reveal-img");
    const textReaveal = slide.querySelector(".reveal-text");
    const tl = new gsap.timeline({
      defaults: {
        duration: 1,
        ease: "power2.inOut",
      },
      scrollTrigger: {
        trigger: slide,
        start: "top center",
        // markers: true,
        toggleActions: "play none none reverse",
      },
    });
    tl.fromTo(img, { scale: 1.8 }, { scale: 1 })
      .fromTo(imgReveal, { x: "0%" }, { x: "200%" }, "-=1")
      .fromTo(textReaveal, { x: "0%" }, { x: "200%" }, "-=0.75");
    const t2 = new gsap.timeline({
      defaults: {
        duration: 1,
        ease: "power2.inOut",
      },
      scrollTrigger: {
        trigger: nav,
        start: "top",
        markers: false,
        toggleActions: "play none none none",
      },
    });
    t2.fromTo(nav, { y: "-100%" }, { y: "0%" }, "-=0.5");
    ScrollTrigger.create({
      trigger: slide,
      start: "top top",
      end: "+=150px",
      pinSpacing: false,
      pin: true,
    });
  });
  gsap.fromTo(
    title,
    {
      opacity: 0,
    },
    {
      opacity: 1,
      duration: 7,
    }
  );
}

function burgerAnimation(e) {
  const burger = document.querySelector(".burger");
  const burgerLines = document.querySelector(".burger-lines");
  const navLinks = document.querySelector(".nav-links");

  if (burgerLines.classList.contains("hide")) {
    gsap.to(burgerLines, 0.5, { rotate: "45", y: 5 });
    burgerLines.classList.remove("hide");
    navLinks.style.display = "flex";
    gsap.fromTo(
      navLinks,
      { opacity: 0, maxWidth: "0%" },
      { opacity: 1, maxWidth: "20rem", duration: 1.2, ease: "power2.inOut" }
    );
  } else {
    gsap.to(burgerLines, 1.2, { rotate: "0", y: 0 });
    gsap.fromTo(
      navLinks,
      {
        opacity: 1,
        maxWidth: "20rem",
      },
      {
        opacity: 0,
        display: "none",
        maxWidth: "0rem",
        duration: 1.2,
        ease: "power2.inOut",
      }
    );
    burgerLines.classList.add("hide");
  }
}

burger.addEventListener("click", burgerAnimation);
animateSlides();
