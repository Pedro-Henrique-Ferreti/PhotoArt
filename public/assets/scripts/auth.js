import firebase from './firebase-app';
import { getFormValues, toggleButtonLoader, createAlert, translateError, loadCurrentUser, getQueryString } from './utils';

const page = document.querySelector('#auth');

if (page) {
    const loginButton = page.querySelector('.form-toggler li.login');
    const loginForm = page.querySelector('form#form-login');
    const registerButton = page.querySelector('.form-toggler li.register');
    const registerForm = page.querySelector('form#form-register');
    const resetPasswordButton = page.querySelector('.button-forget-password');
    const resetPasswordForm = page.querySelector('form#form-reset-password');
    const auth = firebase.auth();

    const toggleResetPasswordForm = () => {
        page.querySelector('.modal-reset-password').classList.toggle('open');
    }

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

    const validateResetPasswordForm = (email) => {
        if (email.trim() === '') {
            createAlert('Preencha o e-mail', 'danger');
            return false;
        }
        if (!email.includes('@')) {
            createAlert('O endereço de e-mail informado é inválido', 'danger');
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

    const submitResetPasswordForm = async (event) => {
        const form = event.target;
        const submitButton = form.querySelector('button[type="submit"]');
        const submitButtonText = submitButton.innerHTML;
        const { email } = getFormValues(form);

        toggleButtonLoader(submitButton);

        if (!validateResetPasswordForm(email)) {
            toggleButtonLoader(submitButton, submitButtonText);
            return;
        }

        try {
            await auth.sendPasswordResetEmail(email);
            createAlert('Instruções para recuperar a senha foram enviadas para o seu e-mail', 'success');
            toggleButtonLoader(submitButton, submitButtonText);
            toggleResetPasswordForm();

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

    resetPasswordButton.addEventListener('click', toggleResetPasswordForm);
    resetPasswordForm.querySelector('.button-close').addEventListener('click', toggleResetPasswordForm);

    loginForm.addEventListener('submit', event => {
        event.preventDefault();
        submitLoginForm(event);
    });

    registerForm.addEventListener('submit', event => {
        event.preventDefault();
        submitRegisterForm(event);
    });

    resetPasswordForm.addEventListener('submit', event => {
        event.preventDefault();
        submitResetPasswordForm(event);
    });

    const init = async () => {
        const user = await loadCurrentUser();
        const logoutUser = Boolean(getQueryString().action);

        if (user && logoutUser) { 

            auth.signOut();

        } else if (user && !logoutUser) {
            
            window.location.href = '/';
        }
    }

    init();
}