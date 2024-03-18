'use strict';



/**
 * PRELOAD
 * 
 * loading will be end after document is loaded
 */

const preloader = document.querySelector("[data-preaload]");

window.addEventListener("load", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});



/**
 * add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}



/**
 * NAVBAR
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNavbar);



/**
 * HEADER & BACK TOP BTN
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

let lastScrollPos = 0;

const hideHeader = function () {
  const isScrollBottom = lastScrollPos < window.scrollY;
  if (isScrollBottom) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }

  lastScrollPos = window.scrollY;
}

window.addEventListener("scroll", function () {
  if (window.scrollY >= 50) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
    hideHeader();
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});



/**
 * HERO SLIDER
 */

const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSliderPos = function () {
  lastActiveSliderItem.classList.remove("active");
  heroSliderItems[currentSlidePos].classList.add("active");
  lastActiveSliderItem = heroSliderItems[currentSlidePos];
}

const slideNext = function () {
  if (currentSlidePos >= heroSliderItems.length - 1) {
    currentSlidePos = 0;
  } else {
    currentSlidePos++;
  }

  updateSliderPos();
}

heroSliderNextBtn.addEventListener("click", slideNext);

const slidePrev = function () {
  if (currentSlidePos <= 0) {
    currentSlidePos = heroSliderItems.length - 1;
  } else {
    currentSlidePos--;
  }

  updateSliderPos();
}

heroSliderPrevBtn.addEventListener("click", slidePrev);

/**
 * auto slide
 */

let autoSlideInterval;

const autoSlide = function () {
  autoSlideInterval = setInterval(function () {
    slideNext();
  }, 7000);
}

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", function () {
  clearInterval(autoSlideInterval);
});

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseout", autoSlide);

window.addEventListener("load", autoSlide);



var swiper = new Swiper(".special_swiper", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  loop: true,
  speed: 1000,
  autoplay:{
   delay:2000,
  },
});


//menu swipper
var swiper = new Swiper(".menu_swipper", {
  slidesPerView: 3,
  spaceBetween: 30,
  loop: true,
  speed: 1000,
  autoplay:{
   delay:2000,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    640: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
      // spaceBetween: 40,
    },
    1024: {
      slidesPerView: 4,
      // spaceBetween: 50,
    },
  },
});

let menuBtn = document.querySelectorAll(".btn-view-menu");
console.log(menuBtn);
let menuContainer = document.querySelector("#popup-section");
let closebtn = document.querySelectorAll(".cross");
let head = document.querySelector("header");
let itemNum;

for(let btn of menuBtn){
  
  btn.addEventListener("click", () => {
    // console.log("clicked");
    itemNum = btn.getAttribute("id").slice(-1);
    document.body.classList.add("popup");
    menuContainer.classList.add("show-item" + itemNum);
    head.style.visibility = "hidden";
  }); 
}

for(let btn of closebtn){
  btn.addEventListener("click", () => {
    // console.log(btn);
    document.body.classList.remove("popup");
    menuContainer.classList.remove("show-item"+itemNum);
    head.style.visibility = "visible";
  });
}

/**
 * TESTIMONIAL SLIDER
 */

const testiSlider = document.querySelector("[data-testi-slider]");
const testiSliderItems = document.querySelectorAll("[data-testi-slider-item]");
const testiSliderPrevBtn = document.querySelector("[testi-data-prev-btn]");
const testiSliderNextBtn = document.querySelector("[testi-data-next-btn]");

let currentTestiSlidePos = 0;
let lastActiveTestiSliderItem = heroSliderItems[0];

const updateTestiSliderPos = function () {
  lastActiveTestiSliderItem.classList.remove("active");
  testiSliderItems[currentTestiSlidePos].classList.add("active");
  lastActiveTestiSliderItem = testiSliderItems[currentTestiSlidePos];
}

const slideTestiNext = function () {
  if (currentTestiSlidePos >= testiSliderItems.length - 1) {
    currentTestiSlidePos = 0;
  } else {
    currentTestiSlidePos++;
  }

  updateTestiSliderPos();
}

testiSliderNextBtn.addEventListener("click", slideTestiNext);

const slideTestiPrev = function () {
  if (currentTestiSlidePos <= 0) {
    currentTestiSlidePos = testiSliderItems.length - 1;
  } else {
    currentTestiSlidePos--;
  }

  updateTestiSliderPos();
}

testiSliderPrevBtn.addEventListener("click", slideTestiPrev);



/**
 * PARALLAX EFFECT
 */

const parallaxItems = document.querySelectorAll("[data-parallax-item]");

let x, y;

window.addEventListener("mousemove", function (event) {

  x = (event.clientX / window.innerWidth * 10) - 5;
  y = (event.clientY / window.innerHeight * 10) - 5;

  // reverse the number eg. 20 -> -20, -5 -> 5
  x = x - (x * 2);
  y = y - (y * 2);

  for (let i = 0, len = parallaxItems.length; i < len; i++) {
    x = x * Number(parallaxItems[i].dataset.parallaxSpeed);
    y = y * Number(parallaxItems[i].dataset.parallaxSpeed);
    parallaxItems[i].style.transform = `translate3d(${x}px, ${y}px, 0px)`;
  }

});

/**
 * COUNTDOWN TIMER
 */

// Set the date and time of the coffee workshop
const workshopDate = new Date('2024-01-31T12:00:00'); // Replace with the actual date and time

// Function to update the countdown timer
function updateCountdown() {
  const now = new Date();
  const timeDifference = workshopDate - now;

  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  const countdownElement = document.getElementById('countdown');
  countdownElement.innerHTML = `
    <div class="countdown-item">
      <span class="countdown-number">${days}</span>
      <span class="countdown-label">Days</span>
    </div>
    <div class="countdown-item">
      <span class="countdown-number">${hours}</span>
      <span class="countdown-label">Hours</span>
    </div>
    <div class="countdown-item">
      <span class="countdown-number">${minutes}</span>
      <span class="countdown-label">Minutes</span>
    </div>
    <div class="countdown-item">
      <span class="countdown-number">${seconds}</span>
      <span class="countdown-label">Seconds</span>
    </div>
  `;
}

// Update the countdown every second
setInterval(updateCountdown, 1000);

// Form submission logic
const signupForm = document.getElementById('signupForm');
signupForm.addEventListener('submit', function (event) {
  // event.preventDefault();
  // Handle form submission, e.g., send data to server
  // You can add your own logic here
  alert('Sign up successful!');
});
// script.js



document.addEventListener("DOMContentLoaded", function () {
  // Get references to the select elements
  var coffeeSelector = document.getElementById("coffeeSelector");
  var cheeseSelector = document.getElementById("cheeseSelector");

  // Get references to the img elements
  var coffeeImage = document.getElementById("coffeeImage");
  var cheeseImage = document.getElementById("cheeseImage");

  // Add event listener to both selectors
  coffeeSelector.addEventListener("change", updatePairing);
  cheeseSelector.addEventListener("change", updatePairing);


  const pairings = {
    mediumRoast: {
      brie: 'Try pairing Medium Roast coffee with creamy Brie for a delightful balance of flavors.',
      gouda: 'Medium Roast coffee complements the nutty flavor of Gouda cheese.',
      blue: 'The boldness of Blue Cheese is enhanced by the subtle notes of Medium Roast coffee.'
    },
    darkRoast: {
      brie: 'Dark Roast coffee and Brie create a rich and robust combination.',
      gouda: 'Pair Dark Roast coffee with Gouda for a strong and savory pairing.',
      blue: 'The intense flavors of Dark Roast coffee complement the boldness of Blue Cheese.'
    },
    flavoredCoffee: {
      brie: 'The sweetness of flavored coffee goes well with the creaminess of Brie.',
      gouda: 'Enhance the unique flavors of flavored coffee with Gouda cheese.',
      blue: 'Pair your flavored coffee with the strong taste of Blue Cheese for a bold experience.'
    }
  };

    // Initial pairing update
    updatePairing();

  
  // Function to update pairing based on selected options
  function updatePairing() {
    // Get the selected coffee and cheese
    var selectedCoffee = coffeeSelector.value;
    var selectedCheese = cheeseSelector.value;

    // Update the images
    coffeeImage.src = "./assets/images/" + selectedCoffee + ".jpg";
    cheeseImage.src = "./assets/images/" + selectedCheese + ".jpg";

    // Display the pairing result
    var pairingResult = document.getElementById("pairingResult");
    if (pairings[selectedCoffee] && pairings[selectedCoffee][selectedCheese]) {
      pairingResult.textContent = pairings[selectedCoffee][selectedCheese];
    } else {
      pairingResult.textContent = 'Please select a valid coffee and cheese combination.';
    }
  }
});


// Special Dish Slider

const specialDishSlider = document.querySelector("[data-special-dish-slider]");
const specialDishSliderItems = document.querySelectorAll("[data-special-dish-slider-item]");
const specialDishSliderPrevBtn = document.querySelector("[data-hero-prev-btn]");
const specialDishSliderNextBtn = document.querySelector("[data-hero-next-btn]");

currentSlidePos = 0;
let lastActiveSpecialSliderItem = specialDishSliderItems[0];

console.log(specialDishSliderItems[0].innerHTML);
// console.log(specialDishSliderNextBtn.innerHTML);

const updateSpecialDishSliderPos = function () {
  lastActiveSpecialSliderItem.classList.remove("active");
  specialDishSliderItems[currentSlidePos].classList.add("active");
  lastActiveSpecialSliderItem = specialDishSliderItems[currentSlidePos];
}

const slideSpecialDishNext = function () {
  // console.log("Before changing, Slide no :", currentSlidePos);
  if (currentSlidePos >= specialDishSliderItems.length - 1) {
    currentSlidePos = 0;
  } else {
    currentSlidePos++;
  }
  // console.log(lastActiveSliderItem.innerHTML);
  updateSpecialDishSliderPos();
  console.log("After Changing, Current Slide no :", currentSlidePos);
}

specialDishSliderNextBtn.addEventListener("click", slideSpecialDishNext);

const slideSpecialDishPrev = function () {
  // console.log("Before changing, Slide no :", currentSlidePos);
  if (currentSlidePos <= 0) {
    currentSlidePos = specialDishSliderItems.length - 1;
  } else {
    currentSlidePos--;
  }
  // console.log(lastActiveSliderItem.innerHTML);
  updateSpecialDishSliderPos();
  console.log("After Changing, Current Slide no :", currentSlidePos);
}

specialDishSliderPrevBtn.addEventListener("click", slideSpecialDishPrev);



const autoSpecialSlide = function () {
  autoSlideInterval = setInterval(function () {
    slideNext();
  }, 10000);
}

addEventOnElements([specialDishSliderNextBtn, specialDishSliderPrevBtn], "mouseover", function () {
  clearInterval(autoSlideInterval);
});

addEventOnElements([specialDishSliderNextBtn, specialDishSliderPrevBtn], "mouseout", autoSlide);

window.addEventListener("load", autoSlide);


//about

var currentIndex = 0;
var bannerImages = document.getElementsByClassName("banner-image");

function showNextImage() {
  // Hide the current image
  bannerImages[currentIndex].style.display = "none";

  // Increment the index or reset to 0 if it exceeds the number of images
  currentIndex = (currentIndex + 1) % bannerImages.length;

  // Display the next image
  bannerImages[currentIndex].style.display = "block";

  // Set a timeout for the next image
  setTimeout(showNextImage, 5000); // Adjust the time interval (in milliseconds) as needed
}

// Start the slideshow
showNextImage();
