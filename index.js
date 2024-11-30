const circles = document.querySelectorAll(".progress_ring--circle");
const input = document.querySelector(".buttons_input");
const animated = document.querySelector(".switch_btn--animated");
const hide = document.querySelector(".switch_btn--hide");
const progressIndicator = document.querySelector(".progress_ring--circle");
const progressBlockHide = document.querySelector(".progress_ring");

function setProgress(circleElement, percent) {
    const radius = parseFloat(circleElement.getAttribute('r'));
    const circumference = 2 * Math.PI * radius;
    circleElement.style.strokeDasharray = circumference;
    const offset = circumference - (percent / 100) * circumference;
    circleElement.style.strokeDashoffset = offset;
}

input.addEventListener("change", (e) => {
    const percent = parseFloat(e.target.value);
    if (!isNaN(percent)) {
        updateCircles(percent);
    }
});

input.addEventListener('wheel', (e) => {
    e.preventDefault();
    let step = 1;
    const delta = Math.sign(e.deltaY);
    let newValue = parseFloat(input.value) || 0;
    newValue += delta * step;
    newValue = Math.max(0, Math.min(newValue, 100)); 
    input.value = newValue;
    updateCircles(newValue);
});

animated.addEventListener('click', (e) => {
    e.preventDefault();
    if( animated.classList.contains('switch_on')) {
        animated.classList.remove('switch_on')
        progressIndicator.classList.remove('animated_true')
    } else {
        animated.classList.add('switch_on')
        progressIndicator.classList.add('animated_true')
    }
})

hide.addEventListener('click', (e) => {
    e.preventDefault();
    if( hide.classList.contains('switch_on')) {
        hide.classList.remove('switch_on')
        progressBlockHide.classList.remove('progress_ring--hide-active')
    } else {
        hide.classList.add('switch_on')
        progressBlockHide.classList.add('progress_ring--hide-active')
    }
})

function updateCircles(percent) {
    circles.forEach(circle => {
        setProgress(circle, percent);
    });
}

updateCircles(60);