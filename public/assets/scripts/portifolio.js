import { fetchCollection } from './utils';

const page = document.querySelector('#portifolio');

if (page) {

    const renderPortifolio = async (page) => {
        const portifolio = await fetchCollection('portifolio');

        const wrapper = page.querySelector('.recent-work');
        wrapper.innerHTML = '';
    
        portifolio.forEach(item => {
            wrapper.append(mountTemplate(item));
        });
    }   
    
    const mountTemplate = (item) => {
        let template = document.createElement('div');
    
        template.classList.add('card');
    
        template.innerHTML = `
            <img src="${item.mainPhoto}" alt="Casamentos">
            <span>${item.name}</span>
        `;
    
        return template;
    }

    renderPortifolio(page);
}