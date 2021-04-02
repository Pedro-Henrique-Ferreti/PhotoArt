import firebase from './firebase-app';
import { toggleButtonLoader, getFormValues, resetFormValues, createAlert } from './utils';

const page = document.querySelector('#home');

if (page) {
    const database = firebase.firestore();
    
    const setNewsletterFormListener = (newsletter) => {
        const form = newsletter.querySelector('form');

        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            const { email } = getFormValues(form);

            const submitButton = form.querySelector('button[type="submit"]');
            const submitButtonText = submitButton.innerHTML;

            toggleButtonLoader(submitButton);

            try {
                const response = await database.collection('newsletter').where('email', '==', email).get();
                const data = [];

                response.forEach(item => data.push(item.data()) );

                if (data.length > 0) {
                    throw new Error('O e-mail informado já está cadastrado.')
                } 

                await database.collection('newsletter').add({ email });

                toggleButtonLoader(submitButton, submitButtonText);

                createAlert('Seu e-mail foi cadastrado com sucesso!', 'success');

                resetFormValues(form);                

            } catch (error) {
                const defaultMessage = 'Não foi possível cadastrar o e-mail. Por favor, tente novamente.';

                createAlert(error.message || defaultMessage, 'danger');

                toggleButtonLoader(submitButton, submitButtonText);
            }
        });
    }

    setNewsletterFormListener(page.querySelector('#newsletter'));
}