import firebase from './firebase-app';
import { getFormValues, toggleButtonLoader, createAlert, translateError, loadCurrentUser } from './utils';

const page = document.querySelector('#user-account');

if (page) {

    const auth = firebase.auth();

    const togglePage = () => {
        const buttons = page.querySelectorAll('.form-toggler li');
        const sections = page.querySelectorAll('.account-page');

        buttons.forEach(button => {
            button.addEventListener('click', event => {
                
                buttons.forEach(button =>{
                    if (event.target === button) {
                        button.classList.add('active');
                    } else {
                        button.classList.remove('active');
                    }
                });

                const sectionId = button.dataset.section;

                sections.forEach(section => {
                    if (section.id === sectionId) {
                        section.classList.add('active');
                    } else {
                        section.classList.remove('active');
                    }
                });
            });
        });
    }

    const validateChangePasswordForm = (password, passwordRepeat) => {
        if (password.trim() === '') {
            createAlert('Preencha a nova senha', 'danger');
            return false;
        }
        if (passwordRepeat.trim() === '') {
            createAlert('Preencha a repetição da nova senha', 'danger');
            return false;
        }
        if (password.length < 5) {
            createAlert('Sua senha deve conter ao menos 6 caracteres', 'danger');
            return false;
        }
        if (password !== passwordRepeat) {
            createAlert('As senhas devem ser iguais', 'danger');
            return false;
        }
        return true;
    }

    const submitChangePasswordForm = async (form) => {
        const submitButton = form.querySelector('button[type="submit"]');
        const submitButtonText = submitButton.innerHTML;
        const { password, passwordRepeat } = getFormValues(form);

        toggleButtonLoader(submitButton);

        if (!validateChangePasswordForm(password, passwordRepeat)) {
            toggleButtonLoader(submitButton, submitButtonText);
            return;
        }

        try {
            await auth.currentUser.updatePassword(password);
            createAlert('Sua senha foi alterada com succeso', 'success');
            toggleButtonLoader(submitButton, submitButtonText);

        } catch (error) {
            createAlert(translateError(error.code), 'danger');
            toggleButtonLoader(submitButton, submitButtonText);
        }
    }

    const init = async () => {
        const user = await loadCurrentUser();

        if (!user) {
            window.location.href = '/auth.html';
        } else {
            togglePage();
            
            const passwordForm = page.querySelector('#form-alter-password');

            passwordForm.addEventListener('submit', event => {
                event.preventDefault();
                submitChangePasswordForm(passwordForm);
            });
        }
    }

    init();
}