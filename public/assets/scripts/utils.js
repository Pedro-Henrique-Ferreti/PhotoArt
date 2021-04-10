import firebase from './firebase-app';

export function toggleButtonLoader(button, innerText = null) {
    if (!innerText) {
        button.disabled = true;
        button.innerHTML = `
            <div class="app-loader">
                <div class="loader">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        `;
    } else {
        button.disabled = false;
        button.innerHTML = innerText;
    }
}

export function createAlert(message, style = null) {

    const hideAlert = (alert) => {
        alert.classList.remove('show');
        setTimeout(() => alert.remove(), 500);
    }

    let alertContainer = document.querySelector('.alert-wrapper');

    if (!alertContainer) {
        const wrapper = document.createElement('div');

        wrapper.classList.add('alert-wrapper');
        document.body.append(wrapper);
        alertContainer = document.querySelector('.alert-wrapper')
    }
    
    const alert = document.createElement('div');
    alert.classList.add('alert', style);

    alert.innerHTML = `
        <div class="content">
            <p>${message}</p>
        </div>
        <div class="button">
            <button type="button" aria-label="Fechar alerta">
                <svg xmlns="http://www.w3.org/2000/svg" width="23.524" height="23.524" viewBox="0 0 23.524 23.524">
                    <g id="cancel" transform="translate(0 0)">
                    <g id="Grupo_154" data-name="Grupo 154" transform="translate(0 0)">
                        <path id="Caminho_63" data-name="Caminho 63" d="M12.3,11.76,23.413.647a.379.379,0,0,0-.536-.536L11.764,11.223.652.111A.379.379,0,0,0,.116.647L11.228,11.76.116,22.872a.379.379,0,0,0,.527.546l.009-.009L11.764,12.3,22.877,23.408a.379.379,0,0,0,.536-.536Z" transform="translate(0 0)"/>
                    </g>
                    </g>
                </svg>                      
            </button>
        </div>
        <div class="countdown"></div>
    `;

    alertContainer.append(alert);

    setTimeout(() => alert.classList.add('show'), 100);

    alert.querySelector('button').addEventListener('click', () => hideAlert(alert));
    
    setTimeout(() => hideAlert(alert), 7000);
}

export function getFormValues(form) {
    const values = {};

    form.querySelectorAll("[name]").forEach(field => {

        switch (field.type) {

            case "select":
                values[field.name] = field.querySelector("option:selected")?.value;
                break;

            case "radio":
                values[field.name] = form.querySelector(`[name=${field.name}]:checked`)?.value;
                break;

            case "checkbox":
                values[field.name] = [];
                form.querySelectorAll(`[name=${field.name}]:checked`).forEach(checkbox => {
                    values[field.name].push(checkbox.value);
                });
                break;

            default:    
                values[field.name] = field.value;
        }
    });

    return values;
}

export function resetFormValues(form) {
    const inputs = form.getElementsByTagName('input');
    const selects = form.getElementsByTagName('select');
    const textareas = form.getElementsByTagName('textarea');

    [...inputs].forEach(input => {
        switch (input.type) {
            case 'radio':
            case 'checkbox':
                input.checked = false;

            default:
                input.value = '';
        }
    });

    [...selects].forEach(select => select.selectedIndex = 0);

    [...textareas].forEach(textarea =>  textarea.value = '');
}

export async function fetchCollection (collection) {
    const data = [];
    const response = await firebase.firestore().collection(collection).get();
    
    response.forEach(responseItem => {
        data.push(responseItem.data());
    });

    return data;
}

export function translateError (message) {
    switch (message) {
        case 'auth/weak-password':
            return 'A senha deve conter ao menos 6 caracteres'
        case 'auth/email-already-in-use':
            return 'O endereço de e-mail já está em uso por outra conta'
        case 'auth/user-not-found':
            return 'Não há nenhum usuário cadastrado com esse e-mail'
        case 'auth/wrong-password':
            return 'E-mail ou senha incorretos'  
        default:
            return 'Erro ao realizar a operação. Por favor, tente novamente'
    }
}

export function loadCurrentUser() {
    return new Promise((resolve, reject) => {
        try {
            firebase.auth().onAuthStateChanged(user => resolve(user));
        } catch (error) {
            reject(error);
        }
    });
}

export function getQueryString() {
    const queryString = {};

    if (window.location.search) {

        window.location.search.split("?")[1].split("&").forEach(param => {

            param = param.split("=");

            queryString[param[0]] = decodeURIComponent(param[1]);
        });
    }

    return queryString;
}