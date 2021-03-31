import firebase from './firebase-app';
import { setButtonLoader } from './utils';

const budgetForm = document.querySelector('.budget-form');

const setSubmitFormEvent = (page) => {
    const form = page.querySelector('form');

    form.addEventListener('submit', event => {
        event.preventDefault();

        const submitButton = form.querySelector('button[type="submit"]');
        const submitButtonText = submitButton.innerHTML;

        setButtonLoader(submitButton);

        setTimeout(() => setButtonLoader(submitButton, submitButtonText), 1500)

    });
}

if (budgetForm) {
    setSubmitFormEvent(budgetForm);
}