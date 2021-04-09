const footer = document.querySelector('footer#footer');

if (footer) {
    footer.querySelector('.year').innerHTML = new Date().getFullYear();
}