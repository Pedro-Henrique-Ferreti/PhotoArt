import firebase from './firebase-app';

const page = document.querySelector('#our-services');

if (page) {

    const renderServices = async (page) => {
        const categories = await fetchCollection('serviceCategories');
        const services = await fetchCollection('services');

        const data = [];
    
        services.forEach(service => {
            categories.forEach(category => {
                if (service.categoryId === category.id) {
                    data.push({
                        name: service.name,
                        category: category.name,
                        photo: service.photo,
                        description: service['short_description'],
                    });
                }
            });
        });
    
        const wrapper = page.querySelector('.service-wrapper');
        wrapper.innerHTML = '';
    
        data.forEach(service => {
            wrapper.append(mountTemplate(service));
        });
    }   
    
    const fetchCollection = async (collection) => {
        const data = [];
        const response = await firebase.firestore().collection(collection).get();
        
        response.forEach(responseItem => {
            data.push(responseItem.data());
        });
    
        return data;
    }
    
    const mountTemplate = (service) => {
        let template = document.createElement('div');
    
        template.classList.add('service-card');
    
        template.innerHTML = `
            <img src="${service.photo}" alt="Service Photo">
            <div class="tag">${service.category}</div>
            <div class="content">
                <h3>${service.name}</h3>
                <p>${service.description}</p>
                <div class="buttons">
                    <a href="#">Detalhes</a>
                </div>
            </div>
        `;
    
        return template;
    }


    renderServices(page);
}