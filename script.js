// document.addEventListener("DOMContentLoaded", function () {
//     let currentIndex = 0;
//     const items = document.querySelector('.carousel-items');
//     const totalItems = document.querySelectorAll('.carousel-cards').length;
//     const itemsPerPage = 3;
//     const itemWidth = 100 / itemsPerPage;
//     let startX, currentTranslate, prevTranslate, isDragging, dragStartTime;

//     const prevButton = document.querySelector('.prev-button');
//     const nextButton = document.querySelector('.next-button');

//     function showItems(index) {
//         items.style.transform = `translateX(-${index * itemWidth}%)`;
//     }

//     function updateIndex(direction) {
//         currentIndex += direction;
//         if (currentIndex < 0) {
//             currentIndex = totalItems - itemsPerPage;
//         } else if (currentIndex >= totalItems) {
//             currentIndex = 0;
//         }
//         showItems(currentIndex);
//         updateButtonState(); // Update button state after changing index
//     }

//     function handleDragStart(e) {
//         isDragging = true;
//         startX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
//         prevTranslate = currentIndex * itemWidth;
//         items.style.transition = 'none';
//         dragStartTime = new Date().getTime();
//     }

//     function handleDragMove(e) {
//         if (!isDragging) return;

//         const currentX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
//         const diffX = currentX - startX;

//         const slowFactor = 0.1;
//         currentTranslate = prevTranslate + (diffX * slowFactor);
//         items.style.transform = `translateX(${currentTranslate}%)`;
//     }

//     function handleDragEnd(e) {
//         isDragging = false;
//         items.style.transition = 'transform 0.5s ease';
//         const threshold = itemWidth / 3;

//         const dragDuration = new Date().getTime() - dragStartTime;

//         if (dragDuration < 150 && Math.abs(currentTranslate - prevTranslate) > threshold) {
//             if (currentTranslate < prevTranslate) {
//                 updateIndex(1); // Move to the next item
//             } else {
//                 updateIndex(-1); // Move to the previous item
//             }
//         } else {
//             if (currentTranslate < prevTranslate - threshold) {
//                 updateIndex(1); // Move to the next item
//             } else if (currentTranslate > prevTranslate + threshold) {
//                 updateIndex(-1); // Move to the previous item
//             } else {
//                 showItems(currentIndex); // Snap back to current item
//             }
//         }
//     }

//     function updateButtonState() {
//         // Disable buttons if there are no items
//         if (totalItems === 0) {
//             prevButton.disabled = true;
//             nextButton.disabled = true;
//         } else {
//             prevButton.disabled = currentIndex === 0;
//             nextButton.disabled = currentIndex >= totalItems - itemsPerPage;
//         }
//     }

//     // Event listeners for buttons
//     prevButton.addEventListener('click', () => updateIndex(-1));
//     nextButton.addEventListener('click', () => updateIndex(1));

//     // Initialize the carousel
//     showItems(currentIndex);
//     updateButtonState(); // Check button state on initialization
// });

const wrapper = document.querySelector('.wrapper');
const carousel = document.querySelector('.carousel');
const arrowBtns = document.querySelectorAll(".wrapper i")
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const carouselChildrens = [...carousel.children];

let isDragging = false, startX, startScrollLeft, timeoutId;

let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// for infinite scrolling effect
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
})

carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
})


arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id === "left" ?
            -firstCardWidth : firstCardWidth;
    })
})


const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add('dragging');

    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}


const dragging = (e) => {

    if (!isDragging) return;
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);

}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove('dragging');
}


const autoPlay = () => {
    if (window.innerWidth < 800) return;
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
}

autoPlay();

const infiniteScroll = () => {
    if (carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    } else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }

    clearTimeout(timeoutId);
    if (!wrapper.matches(":hover")) autoPlay();
}


carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);



// scrolling


// school
function scrollToAboutSchool() {
    const section = document.getElementById('about-school');
    const headerOffset = 60; // Adjust this value based on your header height
    const elementPosition = section.getBoundingClientRect().top;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollBy({
        top: offsetPosition,
        behavior: 'smooth'
    });
}


// home
function scrollToHome() {
    const section = document.getElementById('home');
    const headerOffset = 85; // Adjust based on your header height
    const elementPosition = section.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

// offering section
// function scrollToOffering() {
//     const section = document.getElementById('offering-section');
//     const headerOffset = 0; // Adjust based on your header height
//     const elementPosition = section.getBoundingClientRect().top;
//     const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

//     window.scrollTo({
//         top: offsetPosition,
//         behavior: 'smooth'
//     });
// }

// gallery
// function scrollToGallery() {
//     const section = document.getElementById('gallery');
//     const headerOffset = 80; // Adjust based on your header height
//     const elementPosition = section.getBoundingClientRect().top;
//     const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

//     window.scrollTo({
//         top: offsetPosition,
//         behavior: 'smooth'
//     });
// }


document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll('.nav-links a');
    const navLinksContainer = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    const closeIcon = document.querySelector('.close-icon');

    // Function to handle link click
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            // Close the navigation menu when a link is clicked
            navLinksContainer.classList.remove('nav-active');
            // Smooth scroll to the section
            const targetSection = document.querySelector(this.getAttribute('href'));
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Handle hamburger click to open the menu
    hamburger.addEventListener('click', function () {
        navLinksContainer.classList.add('nav-active');
    });

    // Handle close icon click to close the menu
    closeIcon.addEventListener('click', function () {
        navLinksContainer.classList.remove('nav-active');
    });
});



// recent 
function scrollToRecentNews() {
    const section = document.getElementById('recent-news-section');
    const headerOffset = 30; // Adjust based on your header height
    const elementPosition = section.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

// contact
function scrollToContact() {
    const section = document.getElementById('cta-section');
    const headerOffset = 200; // Adjust based on your header height
    const elementPosition = section.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

// navbar
function toggleMenu() {
    const navLinks = document.getElementById('nav-links');
    const hamburger = document.getElementById('hamburger');

    navLinks.classList.toggle('nav-active'); // Toggle class to slide menu
    hamburger.classList.toggle('active'); // Toggle hamburger to cross
}



// navbar

// Function to add active class and remove from others
function setActiveNavLink(event) {
    // Remove the active class from all nav links
    const navLinks = document.querySelectorAll('.nav-links li a');
    navLinks.forEach(link => link.classList.remove('active'));

    // Add the active class to the clicked link
    event.target.classList.add('active');
}

// Attach the setActiveNavLink function to each link
const navLinks = document.querySelectorAll('.nav-links li a');
navLinks.forEach(link => {
    link.addEventListener('click', setActiveNavLink);
});

