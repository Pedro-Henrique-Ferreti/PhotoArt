import { fetchCollection } from './utils';

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
                        id: service.id,
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
                    <a href="/detailed-services.html?id=${service.id}">Detalhes</a>
                </div>
            </div>
        `;
    
        return template;
    }


    renderServices(page);
}