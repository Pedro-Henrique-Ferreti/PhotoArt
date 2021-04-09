import firebase from './firebase-app';
import { getFormValues, toggleButtonLoader, createAlert, translateError, loadCurrentUser } from './utils';

const page = document.querySelector('#auth');

if (page) {
    const loginButton = page.querySelector('.form-toggler li.login');
    const loginForm = page.querySelector('form#form-login');
    const registerButton = page.querySelector('.form-toggler li.register');
    const registerForm = page.querySelector('form#form-register');
    const auth = firebase.auth();

    const validateLoginForm = (email, password) => {
        if (email.trim() === '') {
            createAlert('Preencha o nome', 'danger');
            return false;
        }
        if (password.trim() === '') {
            createAlert('Preencha o nome', 'danger');
            return false;
        }
        return  true;
    }

    const validateRegisterForm = (name, email, password, passwordConfirm) => {
        if (name.trim() === '') {
            createAlert('Preencha o nome', 'danger');
            return false;
        }
        if (email.trim() === '') {
            createAlert('Preencha o e-mail', 'danger');
            return false;
        }
        if (password.trim() === '') {
            createAlert('Preencha a senha', 'danger');
            return false;
        }
        if (passwordConfirm.trim() === '') {
            createAlert('Preencha a confirmação de senha', 'danger');
            return false;
        }
        if (password.length < 6) {
            createAlert('Sua senha deve conter ao menos 6 caracteres.', 'danger');
            return false;
        }
        if (password !== passwordConfirm) {
            createAlert('A senha e a confirmação de senha devem ser iguais', 'danger');
            return false;
        }
        return true;
    }
    
    const submitLoginForm = async (event) => {
        const form = event.target;
        const submitButton = form.querySelector('button[type="submit"]');
        const submitButtonText = submitButton.innerHTML;
        const { email, password } = getFormValues(form);

        toggleButtonLoader(submitButton);

        if (!validateLoginForm(email, password)) {
            toggleButtonLoader(submitButton, submitButtonText);
            return;
        }

        try {
            await auth.signInWithEmailAndPassword(email, password)
            window.location.href = '/'
        } catch (error) {
            createAlert(translateError(error.code), 'danger');
            toggleButtonLoader(submitButton, submitButtonText);
        }
    }

    const submitRegisterForm = async (event) => {
        const form = event.target;
        const submitButton = form.querySelector('button[type="submit"]');
        const submitButtonText = submitButton.innerHTML;
        const { name, email, password, passwordConfirm } = getFormValues(form);

        toggleButtonLoader(submitButton);
        
        if (!validateRegisterForm(name, email, password, passwordConfirm)) {
            toggleButtonLoader(submitButton, submitButtonText);
            return;
        }

        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            await user.updateProfile({ displayName: name });
            
            window.location.href = '/';
        } catch (error) {
            createAlert(translateError(error.code), 'danger');
            toggleButtonLoader(submitButton, submitButtonText);
        }
    }

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

    loginForm.addEventListener('submit', event => {
        event.preventDefault();
        submitLoginForm(event);
    });

    registerForm.addEventListener('submit', event => {
        event.preventDefault();
        submitRegisterForm(event);
    });

    const init = async () => {
        const user = await loadCurrentUser();

        if (user) {
            window.location.href = '/';
        }
    }

    init();
}