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

    const validateUserDataForm = (name) => {
        if (name.trim() === '') {
            createAlert('Preencha o nome', 'danger');
            return false;
        }
        return true;
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

    const submitUserDataForm = async (form) => {
        const submitButton = form.querySelector('button[type="submit"]');
        const submitButtonText = submitButton.innerHTML;
        const { name } = getFormValues(form);

        toggleButtonLoader(submitButton);

        if (!validateUserDataForm(name)) {
            toggleButtonLoader(submitButton, submitButtonText);
            return;
        }

        try {
            await auth.currentUser.updateProfile({ 
                displayName: name
            });
            createAlert('Alterações salvas com sucesso', 'success');
            toggleButtonLoader(submitButton, submitButtonText);
            
            renderUserData();

        } catch (error) {
            createAlert(translateError(error.code), 'danger');
            toggleButtonLoader(submitButton, submitButtonText);
        }
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

    const renderUserData = async () => {
        const user = await loadCurrentUser();

        const userDataForm = page.querySelector('#form-user-data');
        const header = page.querySelector('.header');
        const picture = header.querySelector('.picture');
        const name = header.querySelector('.name');
        const email = header.querySelector('.email');

        picture.innerHTML = user.displayName.split('')[0];
        name.innerHTML = user.displayName;
        email.innerHTML = user.email;

        userDataForm.querySelector('input[name="name"]').value = user.displayName;
    }

    const init = async () => {
        const user = await loadCurrentUser();

        if (!user) {
            window.location.href = '/auth.html';
        } else {

            const userDataForm = page.querySelector('#form-user-data');
            const passwordForm = page.querySelector('#form-alter-password');

            togglePage();
            renderUserData(user, userDataForm);

            userDataForm.addEventListener('submit', event => {
                event.preventDefault();
                submitUserDataForm(userDataForm);
            });

            passwordForm.addEventListener('submit', event => {
                event.preventDefault();
                submitChangePasswordForm(passwordForm);
            });
        }
    }

    init();
}