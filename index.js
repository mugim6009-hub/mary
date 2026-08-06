// Mobile menu toggle
const menuIcon = document.getElementById('menu-icon');
const navLinks = document.querySelector('.nav-links');

menuIcon.onclick = () => {
    navLinks.classList.toggle('active');
};

// Close menu when link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.onclick = () => navLinks.classList.remove('active');
});
//Contact form alert
const form = document.getElementById('contact-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Message sent! I will get back to you soon.');
    form.requestFullscreen();
})
//Active nav link on scroll 
window.addEventListener('scroll', () => {
    let sections = document.querySelectorAll('selection');
    let navs = document.querySelectorAll('.nav-links a');
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');
        if(top >= offset && top < offset + height){
            navs.forEach(nav => {
                nav.classList.remove('active')
                document.querySelector('.nav-links a[href*=' + id + ']').classList.add('active');
            })
        }
    })
})