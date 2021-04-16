import firebase from './firebase-app';
import IMask from 'imask';
import { toggleButtonLoader, getFormValues, resetFormValues, createAlert } from './utils';

const budgetForm = document.querySelector('.budget-form');

if (budgetForm) {
    const database = firebase.firestore();

    const formIsValid = (email, name, phone) => {
        if (name.trim() === '') {
            createAlert('Preencha o nome', 'danger');
            return false;
        } 
        if (email.trim() === '') {
            createAlert('Preencha o e-mail', 'danger');
            return false;
        }
        if (!email.includes('@')) {
            createAlert('O e-mail informado é inválido', 'danger');
            return false;
        }
        if (phone.trim() === '') {
            createAlert('Preencha o telefone', 'danger');
            return false;
        }
        else return true;
    }
    
    const submitSolicitation = async (form) => {
        const { email, name, phone } = getFormValues(form);

        if (!formIsValid(email, name, phone)) {
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

            await database.collection('budgetSolicitation').add({ name, email, phone });

            toggleButtonLoader(submitButton, submitButtonText);

            createAlert('Solicitação cadastrada com sucesso! Em breve, você receberá um e-mail da nossa equipe', 'success');

            resetFormValues(form);                

        } catch (error) {
            const defaultMessage = 'Não foi possível cadastrar a solicitação. Por favor, tente novamente';

            createAlert(error.message || defaultMessage, 'danger');

            toggleButtonLoader(submitButton, submitButtonText);
        }  
    }

    const init = () => {
        const form = budgetForm.querySelector('form');
        const phoneInput = form.querySelector('input[type=tel]')
        
        new IMask(phoneInput, { 
            mask: '(00) [0]0000-0000'
        });

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            submitSolicitation(form);
        });
    }

    init();
}