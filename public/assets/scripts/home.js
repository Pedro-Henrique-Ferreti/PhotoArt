import firebase from './firebase-app';
import { toggleButtonLoader, getFormValues, resetFormValues, createAlert } from './utils';

const page = document.querySelector('#home');

if (page) {
    const database = firebase.firestore();
    
    const setNewsletterFormListener = (newsletter) => {
        const form = newsletter.querySelector('form');

        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const data = getFormValues(form);

            const submitButton = form.querySelector('button[type="submit"]');
            const submitButtonText = submitButton.innerHTML;
            toggleButtonLoader(submitButton);

            database.collection('newsletter').add({ email: data.email })
            .then(() => {
                createAlert('Seu e-mail foi cadastrado com sucesso!', 'success');
                resetFormValues(form);
            })
            .catch(() => {
                createAlert('Não foi possível cadastrar seu e-mail. Por favor, tente novamente.', 'success');
            })
            .finally(() => toggleButtonLoader(submitButton, submitButtonText));
        });
    }

    setNewsletterFormListener(page.querySelector('#newsletter'));
}