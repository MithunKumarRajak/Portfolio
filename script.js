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
