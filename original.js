// dark mode toggle
window.onload = function () {
    let btn = document.getElementById("btn");
    let btnText = document.getElementById("btnText");
    let btnIcon = document.getElementById("btnIcon");

    btn.onclick = function () {
        document.body.classList.toggle("dark-theme");

        if (document.body.classList.contains("dark-theme")) {
            btnIcon.src = "images/sun.png";
            btnText.innerHTML = "Light";
        } else {
            btnIcon.src = "images/moon.png";
            btnText.innerHTML = "Dark";
        }
    };
};

// google form submit
const scriptURL = 'https://script.google.com/macros/s/AKfycbwcGAZiE6cAoynmBaPoqPedCFTf1H2PjL5AFymY4tx8oCYRABjnoCcR1FdXpu18lhXh/exec'
const form = document.forms['submit-to-google-sheet']
const msg = document.getElementById("msg");

form.addEventListener('submit', e => {
    e.preventDefault();
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
            msg.innerHTML = "Message sent successfully";
            msg.style.color = "#24b300"
            setTimeout(() => {
                msg.innerHTML = "";
            }, 5000)
            form.reset();
        })
        .catch(error => console.error('Error!', error.message))
})

// sidebar menu for small screens
var sidemenu = document.querySelector("nav ul");
function openmenu() {
    sidemenu.style.right = "0";
}
function closemenu() {
    sidemenu.style.right = "-200px";
}

// tab switching
var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");
function opentab(event, tabname) {
    for (let tablink of tablinks) {
        tablink.classList.remove("active-link");
    }
    for (let tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}

// scroll-to-top button
const scrollUpButton = document.getElementById('scrollUp');

window.addEventListener('scroll', () => {
    scrollUpButton.style.display = window.scrollY > 200 ? 'block' : 'none';
});

scrollUpButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
