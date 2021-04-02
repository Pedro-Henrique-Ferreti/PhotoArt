import firebase from './firebase-app';
import { toggleButtonLoader, createAlert } from './utils';

const budgetForm = document.querySelector('.budget-form');

if (budgetForm) {
    
    const setSubmitFormEvent = (page) => {
        const form = page.querySelector('form');
        
        form.addEventListener('submit', event => {
            event.preventDefault();
            
            const submitButton = form.querySelector('button[type="submit"]');
            const submitButtonText = submitButton.innerHTML;
            
            toggleButtonLoader(submitButton);
            
            setTimeout(() => {

                toggleButtonLoader(submitButton, submitButtonText);

                createAlert(
                    'Sua solicitação foi cadastrada com sucesso. Em breve, você receberá um e-mail da nossa equipe!',
                    'success'
                );

            }, 300)
            
        });
    }

    setSubmitFormEvent(budgetForm);
}