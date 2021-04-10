import { loadCurrentUser } from './utils';

const header = document.querySelector('header#header');

if (header) {
    if (!header.classList.contains('login')) {
        const menu = header.querySelector('#mobile-menu');
        const btnOpenMenu = header.querySelector('#open-menu');
        const btnCloseMenu = header.querySelector('#close-menu');

        btnOpenMenu.addEventListener('click', () => menu.classList.add('open'));
        btnCloseMenu.addEventListener('click', () => menu.classList.remove('open'));

        const init = async () => {
            const user = await loadCurrentUser();
            if (user) {
                const buttonSignIn = header.querySelector('.button-signin');

                buttonSignIn.href = '/auth.html?action=logout'

                buttonSignIn.querySelector('span').innerHTML = 'Sair';
            }
        }
    
        init();
    }
}