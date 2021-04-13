const burger = document.querySelector(".burger");
const submitBtn = document.querySelector(".submit-btn");
let firstName = document.getElementById("fname");
let lastName = document.getElementById("lname");
let yesBox = document.getElementById("yesBox");
let noBox = document.getElementById("noBox");
let message = document.getElementById("message");

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
  const mainBody = document.querySelector("main");
  gsap.fromTo(navHeader, { y: "-100%" }, { y: "0%" }, "-=0.5");
  gsap.fromTo(mainBody, 2.2, { opacity: 0 }, { opacity: 1 });
}

function checkBoxes(e) {
  if (yesBox.checked == true) {
    noBox.checked = false;
  }
  if (noBox.check == true) {
    yesBox.check = false;
  }
}

yesBox.addEventListener("click", (e) => {
  if (e.target.checked == true) {
    noBox.checked = false;
  }
});

noBox.addEventListener("click", (e) => {
  if (e.target.checked == true) {
    yesBox.checked = false;
  }
});

pageAnimation();
burger.addEventListener("click", burgerAnimation);
// submit button to get info
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (
    firstName.value == undefined ||
    lastName.value == undefined ||
    message.value == "" ||
    (yesBox.checked == false && noBox.checked == false)
  ) {
    alert("Please fill out the form in its entirety before submitting.");
  } else {
    function attending() {
      if (yesBox.checked == true) {
        return "will be in attendance!";
      } else {
        return "cannot attend.";
      }
    }
    // create an object with the information
    let formData = {
      fName: firstName.value,
      lName: lastName.value,
      yBox: yesBox.checked,
      nBox: noBox.checked,
      messg: message.value,
      attending: attending(),
    };

    // use xhr to send the data to my server.js file
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/");
    // set header to send my formData in a json format
    xhr.setRequestHeader("content-type", "application/json");
    xhr.onload = function () {
      console.log(xhr.responseText);
      if (xhr.responseText == "success") {
        alert("Form Submitted");
        firstName.value = "";
        lastName.value = "";
        yesBox.checked = false;
        noBox.checked = false;
        message.value = "";
      } else {
        alert("Form unable to submit");
      }
    };

    // send the data to the backend
    xhr.send(JSON.stringify(formData));
  }
});
