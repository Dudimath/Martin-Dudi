// Split text into individual letters and wrap them in spans
let words = document.querySelectorAll(".word");
words.forEach((word) =>{
  let letters = word.textContent.split("");
  word.textContent = "";
  letters.forEach((letter) => {
    let span = document.createElement("span");
    span.textContent = letter;
    span.className = 'letter';
    word.append(span);
  });
});

// Initialize variables for text animation
let currentWordIndex = 0;
let maxWordIndex = words.length - 1;
words[currentWordIndex].style.opacity = '1';

// Function to change text with animation
let changeText = () => {
  let currentWord = words[currentWordIndex];
  let nextWord = currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];

  // Animate out the current word
  Array.from(currentWord.children).forEach((letter, i) => {
    setTimeout(() => {
      letter.className = 'letter out';
    }, i * 80);
  });

  // Set the next word to be visible
  nextWord.style.opacity = "1";

  // Animate in the next word
  Array.from(nextWord.children).forEach((letter, i) => {
    letter.className = "letter behind";
    setTimeout(() => {
      letter.className = "letter in";
    }, 340 + i * 80);
  });

  // Update current word index
  currentWordIndex = currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
};

// Initial call to changeText and set interval for text change
changeText();
setInterval(changeText, 3000);

// Process circles with data attributes
const circles = document.querySelectorAll('.circle');
circles.forEach(circle => {
  const dots = parseInt(circle.getAttribute('data-dots'));
  const marked = parseInt(circle.getAttribute('data-percent'));
  const percent = Math.floor((dots * marked) / 100);
  const rotate = 360 / dots;
  let points = '';

  // Generate points within the circle
  for (let i = 0; i < dots; i++) {
    points += `<div class="points" style="--i:${i};--rot:${rotate}deg"></div>`;
  }

  // Add points to the circle and mark as needed
  circle.innerHTML = points;
  const pointsMarked = circle.querySelectorAll('.points');

  for (let i = 0; i < percent; i++) {
    pointsMarked[i].classList.add('marked');
  }
});

// MixItUp for portfolio section
var mixer = mixitup('.portfolio-gallery');

// active menu//////
let menuLi = document.querySelectorAll('header ul li a');
let section = document.querySelectorAll('section');



function activeMenu(){
  let len = section.length;
  while(--len && window.scrollY + 97 < section[len].offsetTop){}
  menuLi.forEach(sec => sec.classList.remove("active"));
  menuLi[len].classList.add("active"); 

}

activeMenu();
window.addEventListener("scroll",activeMenu);

//strictly navbar/////////////
const header = document.querySelector("header");
window.addEventListener("scroll",function(){
  header.classList.toggle("sticky",this.window.scrollY > 50)
})

//toggle icon navbar/////////////
let menuIcon = document.querySelector("#menu-icon");
let navlist = document.querySelector(".navlist");
menuIcon.onclick = ()=>{
  menuIcon.classList.toggle("bx-x");
  navlist.classList.toggle("open");

  window.onscroll = ()=>{
    menuIcon.classList.remove("bx-x");
    navlist.classList.remove("open");
}
}
//parallax/////////////
const observer =new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("show-items");

    }else{
      entry.target.classList.remove("show-items");
    }

  });
});
const scrollScale = document.querySelectorAll(".scroll-scale");
scrollScale.forEach((el)=>observer.observe(el));

const scrollBottom = document.querySelectorAll(".scroll-bottom");
scrollBottom.forEach((el)=>observer.observe(el));

const scrollTop = document.querySelectorAll(".scroll-Top");
scrollTop.forEach((el)=>observer.observe(el));


// Elements to apply the parallax effect (including the video section)
const parallaxElements = document.querySelectorAll(".parallax-element");

// Function to apply parallax effect
const applyParallaxEffect = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show-items");
    } else {
      entry.target.classList.remove("show-items");
    }
  });
};

// Create a new Intersection Observer for the parallax effect
const parallaxObserver = new IntersectionObserver(applyParallaxEffect, {
  threshold: 0.5, // Adjust this threshold as needed
});

// Observe the parallax elements
parallaxElements.forEach((element) => {
  parallaxObserver.observe(element);
});