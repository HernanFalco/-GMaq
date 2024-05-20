
window.addEventListener('scroll', function() {
    var backToTopButton = document.getElementById('back_to_top');
    if (window.scrollY > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

document.getElementById('back_to_top').addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

