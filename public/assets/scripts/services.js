import firebase from './firebase-app';

const page = document.querySelector('#our-services');

if (page) {

    const renderServices = async (page) => {
        const categories = await fetchCollection('serviceCategories');
        const services = await fetchCollection('services');
    
        const data = [];
    
        categories.forEach(category => {
            const categoryServices = [];
    
            services.forEach(service => {
                if (service.categoryId === category.id) {
                    categoryServices.push(service);
                }
            });
    
            data.push({
                name: category.name,
                id: category.id,
                services: categoryServices
            });
        });
    
        const wrapper = page.querySelector('.service-wrapper');
        wrapper.innerHTML = '';
    
        data.forEach(category => {
            wrapper.append(mountTemplate(category));
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
    
    const mountTemplate = (category) => {
        let template = document.createElement('section');
    
        template.classList.add('service-category');
    
        template.innerHTML = `
            <header class="section-title">
                <hr>
                <h2>${category.name}</h2>
                <hr>
            </header>
            <div id="services"></div>
        `;
    
        category.services.forEach(service => {
            let wrapper = document.createElement('a');
    
            wrapper.classList.add('item');
            wrapper.href = "detailed-services.html";
    
            wrapper.innerHTML = `
                <div>
                    <img src="assets/images/calendar.svg" alt="Calendário">
                    <h3>${service.name}</h3>
                    <p>Agilidade e qualidade para cobrir qualquer tipo de evento corporativo e pessoal. Eternize e compartilhe esses momentos com fotos profissionais!</p>
                </div>
            `;
    
            template.querySelector('#services').append(wrapper);
        });        
    
        return template;
    }


    renderServices(page);
}