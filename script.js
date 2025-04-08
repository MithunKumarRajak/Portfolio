// JavaScript
document.addEventListener("DOMContentLoaded", function () {
    // Show the home section by default
    document.querySelector(".section").classList.add("active");
});

function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });

    // Show the selected section
    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
        activeSection.classList.add('active');
    }
}

// Dark mode 
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

// Google form submit

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
// side bar menu for small device

var sidemenu = document.querySelector("nav ul");
function openmenu() {
    sidemenu.style.right = "0";
}
function closemenu() {
    sidemenu.style.right = "-200px";
}

// Tab link

var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");
function opentab(tabname) {
    for (let tablink of tablinks) {
        tablink.classList.remove("active-link");
    }
    for (let tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}

// scroll up button
const scrollUpButton = document.getElementById('scrollUp');

// Show the button when the user scrolls down 200px
window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
        scrollUpButton.style.display = 'block';
    } else {
        scrollUpButton.style.display = 'none';
    }
});

// Scroll to the top when the button is clicked
scrollUpButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});