import firebase from './firebase-app';
import { getQueryString } from './utils';

const page = document.querySelector('#detailed-services');

if (page) {
    const database = firebase.firestore();

    const renderService = async (serviceId) => {

        const response = await database.collection('services').where('id', '==', +serviceId).limit(1).get();
        const data = [];
        response.forEach(item => data.push(item.data()));
        const service = data[0];

        const template = `
            <div class="breadcrumb">
                <div>
                    <a href="services.html">Serviços</a> / <a href="detailed-services.html?id=${service.id}" class="current">${service.name}</a>
                </div>
                <hr>
            </div>
            <div class="banner">
                <div>
                    <div class="overlay">
                        <h1>${service.name}</h1>
                    </div>
                </div>
            </div>
            <div class="description">
                <div>
                    <p>${service.description}</p>
                </div>
                <div class="topic-list">
                    <h2>Este serviço inclui:</h2>
                    <ul></ul>
                </div>
            </div>
        `;        

        const topicList = document.createElement('ul');

        service.topics.forEach(item => {
            let listItem = document.createElement('li'); 
            listItem.innerHTML = `<div></div>${item}`;
            topicList.appendChild(listItem);
        });

        page.querySelector('.details-wrapper').innerHTML = template;
        page.querySelector('.topic-list').appendChild(topicList);
        
    }

    const init = () => {
        const serviceId = getQueryString().id;
        if (!serviceId) {
            window.location.href = '/404.html';
        } else {
            renderService(serviceId);
        }
    }

    init();
}