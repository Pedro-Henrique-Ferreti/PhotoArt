import firebase from './firebase-app';
import { toggleButtonLoader, getFormValues, resetFormValues, createAlert } from './utils';

const budgetForm = document.querySelector('.budget-form');

if (budgetForm) {
    const database = firebase.firestore();

    const formIsValid = (email, name) => {
        if (name.trim() === '') {
            createAlert('Preencha o nome', 'danger');
            return false;
        } 
        else if (email.trim() === '') {
            createAlert('Preencha o e-mail', 'danger');
            return false;
        }
        else return true;
    }
    
    const setSubmitFormEvent = (page) => {
        const form = page.querySelector('form');
        
        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            const { email, name } = getFormValues(form);

            if (!formIsValid(email, name)) {
                return;
            }
            
            const submitButton = form.querySelector('button[type="submit"]');
            const submitButtonText = submitButton.innerHTML;
            
            toggleButtonLoader(submitButton);

            try {
                const response = await database.collection('budgetSolicitation').where('email', '==', email).get();
                const data = [];

                response.forEach(item => data.push(item.data()) );

                if (data.length > 0) {
                    throw new Error('O e-mail informado já possui uma solicitação de orçamento cadastrada')
                } 

                await database.collection('budgetSolicitation').add({ name, email });

                toggleButtonLoader(submitButton, submitButtonText);

                createAlert('Solicitação cadastrada com sucesso! Em breve, você receberá um e-mail da nossa equipe', 'success');

                resetFormValues(form);                

            } catch (error) {
                const defaultMessage = 'Não foi possível cadastrar a solicitação. Por favor, tente novamente';

                createAlert(error.message || defaultMessage, 'danger');

                toggleButtonLoader(submitButton, submitButtonText);
            }            
        });
    }

    setSubmitFormEvent(budgetForm);
}