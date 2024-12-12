const $cursor = document.querySelector('.pointer');
        let mouseX = 0, mouseY = 0;
        let isHovering = false;

        document.addEventListener('mousemove', function (e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
            requestAnimationFrame(updatePointerPosition);
        });

        const hoverElements = document.querySelectorAll('.concept_left1, .concept_left2, .concept_right1, .concept_right2, .circle-container, #circle_moem, .lines-container, .card, .back, .slider-bar, .slide, #topButton, .grids, .nav');

        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                isHovering = true;
                updatePointerStyle();
            });

            element.addEventListener('mouseleave', () => {
                isHovering = false;
                updatePointerStyle();
            });
        });

        function updatePointerPosition() {
            $cursor.style.left = mouseX + 'px';
            $cursor.style.top = mouseY + 'px';
        }

        function updatePointerStyle() {
            if (isHovering) {
                $cursor.style.transform = 'scale(1)';
                $cursor.style.border = '.15vw solid #373aeeb6';
                $cursor.style.backgroundColor = '#373aee';
            } else {
                $cursor.style.transform = 'scale(1)';
                $cursor.style.border = '.15vw solid #373aeeb6';
                $cursor.style.backgroundColor = '#373aee';
            }
        }

var myHeader = document.getElementById("header");
var isHeaderVisible = true;
var previousScrollY = window.scrollY;

myHeader.onmouseover = function() {
    this.classList.add("over");
};

myHeader.onmouseout = function() {
    this.classList.remove("over");
};

var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('header').outerHeight();
var hideTimeout;

$(window).scroll(function(event){
    didScroll = true;
});

setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

function hasScrolled() {
    var st = $(this).scrollTop();
    
    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta)
        return;
    
    if (st > lastScrollTop && st > navbarHeight){
        // Scroll Down
        if (!hideTimeout) {
            hideTimeout = setTimeout(function() {
                $('header').addClass('nav-up');
                hideTimeout = null;
            }, 4000); // 2초 대기
        }
    } else {
        if (hideTimeout) {
            clearTimeout(hideTimeout);
            hideTimeout = null;
        }
        $('header').removeClass('nav-up');
    }
    
    lastScrollTop = st;
}

let slides = document.querySelectorAll('.list-item');
let list = document.querySelector('.list');
let animatedSlides = [...slides];
let positions = [];
let timeline;
let circleLength;
let time = 0;

const RADIUS = 100;
const START_ANGLE = Math.PI / 2;
const MIN_SLIDES = 8;

//
const first = document.querySelectorAll(".first");
const sections = document.querySelectorAll("section");

const firstTop = sections[0].offsetTop;
const secondTop = sections[2].offsetTop;
const thirdTop = sections[3].offsetTop;
const fourthTop = sections[4].offsetTop;
const fiveTop = sections[5].offsetTop;


first[0].onclick = function(event) {
event.preventDefault(); // 기본 이벤트 막기
window.scroll({ top: firstTop, behavior: "smooth" });
};

first[1].onclick = function(event) {
event.preventDefault(); // 기본 이벤트 막기
window.scroll({ top: secondTop, behavior: "smooth" });
};

first[2].onclick = function(event) {
event.preventDefault(); // 기본 이벤트 막기
window.scroll({ top: thirdTop, behavior: "smooth" });
};
first[3].onclick = function(event) {
    event.preventDefault(); // 기본 이벤트 막기
    window.scroll({ top: fourthTop, behavior: "smooth" });
};
first[4].onclick = function(event) {
    event.preventDefault(); // 기본 이벤트 막기
    window.scroll({ top: fiveTop, behavior: "smooth" });
};

// Slider Data
let currentIndex = 0;

const tweenObject = {
    angle: START_ANGLE
}

function setup() {
    if (slides.length < MIN_SLIDES) {
        cloneSlides();
    }

    setupPosition();
    setupTween();
}

function cloneSlides() {
    while (animatedSlides.length < MIN_SLIDES) {
        for (let i = 0; i < slides.length; i++) {
            const slide = slides[i];
            const clone = slide.cloneNode(true);
            list.appendChild(clone);
            animatedSlides.push(clone);
        }
    }
}

function setupPosition() {
    const width = animatedSlides[0]
        .getBoundingClientRect()
        .width;
    const padding = 250;
    circleLength = (width + padding) * animatedSlides.length;
    const radius = circleLength / (Math.PI * 2);

    for (let i = 0; i < animatedSlides.length; i++) {
        const slide = animatedSlides[i];

        const value = i / animatedSlides.length;
        const angle = value * Math.PI * 2;

        const x = Math.cos(angle - tweenObject.angle) * radius * 8/ 8;
        const y = Math.sin(angle - tweenObject.angle) * radius + radius;
        gsap.set(slide, {x, y});
    }
}

function setupTween() {
    document
        .getElementById('moveButton')
        .addEventListener('click', clickHandler);
}

function clickHandler() {
    currentIndex += 1;

    gsap.to(tweenObject, 1, {
        angle: START_ANGLE + (currentIndex / animatedSlides.length) * (Math.PI * 2),
        onUpdate: () => {
            setupPosition();
        }
    });

    console.log('current index: ' + currentIndex);
    console.log('active slide: ', slides[currentIndex]);
}
setup();
//
document.querySelectorAll('.name-list button').forEach((button, index) => {
    button.addEventListener('click', () => {
      // Remove "active" class from all images
      document.querySelectorAll('.image').forEach(img => img.classList.remove('active'));
  
      // Add "active" class to the selected image
      document.querySelectorAll('.image')[index].classList.add('active');
    });
  });
  

//
const image = document.querySelector('.draggable-image');
const left = document.querySelector('.left');
const right = document.querySelector('.right');

let isDragging = false;
let targetX = 50; // 목표 위치 (퍼센트)
let currentX = 50; // 현재 위치 (퍼센트)

image.addEventListener('mousedown', () => {
  isDragging = true;
  image.style.cursor = 'grabbing';
});

document.addEventListener('mouseup', () => {
  isDragging = false;
  image.style.cursor = 'grab';
});

document.addEventListener('mousemove', (e) => {
  if (isDragging) {
    const rect = document.querySelector('.moveLight').getBoundingClientRect();
    const mouseX = e.clientX - rect.left; // 마우스가 컨테이너 안에서 움직이는 위치
    targetX = (mouseX / rect.width) * 100; // 목표 위치 계산
    targetX = Math.min(Math.max(targetX, 0), 100); // 0% ~ 100% 사이로 제한
  }
});

function animate() {
  if (isDragging) {
    // 현재 위치를 목표 위치로 부드럽게 이동
    currentX += (targetX - currentX) * 0.1; // 보간(interpolation)
  
    // 이미지 위치 조정
    image.style.left = `${currentX}%`;

    // 배경 퍼센트 변경
    left.style.flex = `${currentX}`;
    right.style.flex = `${100 - currentX}`;
  }

  requestAnimationFrame(animate); // 애니메이션 루프
}

// 애니메이션 시작
animate();

//
function toggleColor(element) {
    // 현재 배경색을 확인하고, 배경색을 변경
    const currentBackgroundColor = getComputedStyle(element).backgroundColor;
    if (currentBackgroundColor === 'rgb(25, 24, 27)') { // #19181B의 RGB 값
        element.style.backgroundColor = '#DFDFDB'; // 클릭 시 흰색으로 변경
    } else {
        element.style.backgroundColor = '#19181B'; // 클릭 시 원래 색으로 변경
    }
}
//
const buttons = document.querySelectorAll('.name-list button');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        buttons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to the clicked button
        button.classList.add('active');
    });
});

const sliderWrapper = document.querySelector('.slider-wrapper');
    const slidess = document.querySelectorAll('.slide');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const slideButtons = document.querySelectorAll('.slide-button');

    let currentIndexs = 0;

    function updateSlidePosition() {
        sliderWrapper.style.transform = `translateX(-${currentIndexs * 100}%)`;
        updateActiveButton();
    }

    function updateActiveButton() {
        slideButtons.forEach((button, index) => {
            button.classList.toggle('active', index === currentIndexs);
        });
    }

    prevButton.addEventListener('click', () => {
        currentIndexs = (currentIndexs > 0) ? currentIndexs - 1 : slidess.length - 1;
        updateSlidePosition();
    });

    nextButton.addEventListener('click', () => {
        currentIndexs = (currentIndexs < slidess.length - 1) ? currentIndexs + 1 : 0;
        updateSlidePosition();
    });

    slideButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            currentIndexs = parseInt(event.target.dataset.index);
            updateSlidePosition();
        });
    });

    // Initialize active button
    updateActiveButton();

    //
    document.addEventListener('scroll', () => {
        const circle = document.querySelector('.scrollcircle circle');
        const historySection = document.getElementById('HISTORY');
        const sectionTop = historySection.getBoundingClientRect().top;
        const sectionHeight = historySection.offsetHeight;
        
        // Calculate the scroll progress
        const scrollProgress = Math.min(Math.max(-sectionTop / sectionHeight, 0), 1);
        
        // Adjust stroke-dashoffset based on scroll progress
        const circlePerimeter = 2 * Math.PI * 640; // 2πr (r = 190px)
        circle.style.strokeDashoffset = circlePerimeter * (1 - scrollProgress);
    });
    