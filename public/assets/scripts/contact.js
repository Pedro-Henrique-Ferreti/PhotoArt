import firebase from './firebase-app';
import { toggleButtonLoader, getFormValues, resetFormValues, createAlert } from './utils';

const page = document.querySelector('#contact-page');

if (page) {
    const database = firebase.firestore();

    const formIsValid = (email, name, message) => {
        if (name.trim() === '') {
            createAlert('Preencha o nome.', 'danger');
            return false;
        } 
        else if (email.trim() === '') {
            createAlert('Preencha o e-mail.', 'danger');
            return false;
        }
        else if (message.trim() === '') {
            createAlert('Preencha a mensagem.', 'danger');
            return false;
        }
        else return true;
    }

    const form = page.querySelector('.contact-form > form');
    
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const { email, name, message } = getFormValues(form);

        if (!formIsValid(email, name, message)) {
            return;
        }
            
        const submitButton = form.querySelector('button[type="submit"]');
        const submitButtonText = submitButton.innerHTML;

        toggleButtonLoader(submitButton);

        try {
            await database.collection('contacts').add({ name, email, message });

            toggleButtonLoader(submitButton, submitButtonText);

            createAlert('Sua mensagem foi cadastrada com sucesso. Em breve, você receberá um e-mail da nossa equipe!', 'success');

            resetFormValues(form);                

        } catch (error) {
            const defaultMessage = 'Não foi possível cadastrar a mensagem. Por favor, tente novamente.';

            createAlert(error.message || defaultMessage, 'danger');

            toggleButtonLoader(submitButton, submitButtonText);
        }  
    });
}