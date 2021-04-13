const burger = document.querySelector(".burger");

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
      { opacity: 1, maxWidth: "20rem", duration: 1, ease: "power2.inOut" }
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

function pageAnimation() {
  const navHeader = document.querySelector(".nav-header");
  gsap.fromTo(navHeader, { y: "-100%" }, { y: "0%" }, "-=0.5");
}

pageAnimation();
burger.addEventListener("click", burgerAnimation);
