const menu = document.getElementById('mobile-menu');

document.getElementById('open-menu').addEventListener('click', e => {
    menu.classList.add('open');
});

document.getElementById('close-menu').addEventListener('click', e => {
    menu.classList.remove('open');
});