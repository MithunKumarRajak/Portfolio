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
