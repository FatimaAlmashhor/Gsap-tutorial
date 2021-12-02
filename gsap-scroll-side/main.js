import { gsap } from 'gsap';
import { Timeline } from 'gsap/gsap-core';
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger);
const hero = document.querySelector('[data-hero]')
const restartButton = document.getElementById("restart-button");
const reverseButton = document.getElementById("reverse-button");

window.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e
    const x = Math.round((clientX / window.innerWidth) * 100)
    const y = Math.round((clientY / window.innerHeight) * 100)

    // hero.style.setProperty('--x', `${x}%`)
    // hero.style.setProperty('--y', `${y}%`)
    gsap.to(hero, {
        '--x': `${x}%`,
        '--y': `${y}%`,
        duration: 0.3,
        ease: 'sine.out'
    })
})

const tween = gsap.fromTo(
    ".card-first-section",
    { opacity: 0, y: 100 },
    { opacity: 1, y: 0, duration: 1, stagger: 0.3 }
);

// play, pause, resume, reverse, restart
restartButton.addEventListener("click", () => {
    tween.restart();
});
reverseButton.addEventListener("click", () => {
    tween.reverse();
});



// time line

let tl = gsap.timeline({
    repeat: -1,
    yoyo: true
})



tl.to('.item1', {
    x: 500,
    // duration: 1.2
}).from('.item2', {
    x: 500,
}).to('.item3', {
    x: 500,
})


// scrolling 

function animateFrom(elem, direction) {
    direction = direction || 1;
    var x = 0,
        y = direction * 100;
    if (elem.classList.contains("fromLeft")) {
        x = -100;
        y = 0;
    } else if (elem.classList.contains("fromRight")) {
        x = 100;
        y = 0;
    }
    gsap.fromTo(elem, { x: x, y: y, autoAlpha: 0 }, {
        duration: 1.25,
        x: 0,
        y: 0,
        autoAlpha: 1,
        ease: "expo",
        overwrite: "auto"
    });
}

function hide(elem) {
    gsap.set(elem, { autoAlpha: 0 });
}



gsap.utils.toArray(".card-scroll-section").forEach(function (elem) {
    hide(elem); // assure that the element is hidden when scrolled into view

    ScrollTrigger.create({
        trigger: elem,
        // scroller: "body",
        start: 'top center',
        end: 'bottom center',
        markers: true,
        onEnter: function () { animateFrom(elem) },
        onEnterBack: function () { animateFrom(elem, -1) },
        onLeave: function () { hide(elem) } // assure that the element is hidden when scrolled into view
    });
});



// clippedHero.style.setProperty('--mask', `var(--${e.target.value})`)