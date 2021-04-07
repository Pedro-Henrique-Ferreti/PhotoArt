import firebase from './firebase-app';

const page = document.querySelector('#auth');

if (page) {

    const setToggleFormListener = () => { 
        const loginButton = page.querySelector('.form-toggler li.login');
        const loginForm = page.querySelector('form#form-login');
        const registerButton = page.querySelector('.form-toggler li.register');
        const registerForm = page.querySelector('form#form-register');

        loginButton.addEventListener('click', () => {
            loginButton.classList.add('active');
            loginForm.classList.add('show');

            registerButton.classList.remove('active');
            registerForm.classList.remove('show');
        });

        registerButton.addEventListener('click', () => {
            loginButton.classList.remove('active');
            loginForm.classList.remove('show');

            registerButton.classList.add('active');
            registerForm.classList.add('show');
        });
    }

    setToggleFormListener();
}