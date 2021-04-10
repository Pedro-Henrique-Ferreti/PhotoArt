import { fetchCollection } from './utils';

const page = document.querySelector('#portifolio');

if (page) {
    const displayCarroussel = (item) => {
        const carroussel = page.querySelector('.carroussel-wrapper');
        carroussel.classList.add('open');

        const slider = carroussel.querySelector('.swiper-container');
        const sliderWrapper = carroussel.querySelector('.swiper-wrapper');

        carroussel.querySelector('.name').innerHTML = item.name;

        sliderWrapper.innerHTML = '';

        item.photos.forEach(photo => {
            let template = document.createElement('div');
            template.classList.add('swiper-slide');

            template.innerHTML = `<img src="${photo}" alt="Produto">`;

            sliderWrapper.append(template);
        });

        const sliderInstance = new Swiper(slider, {
            slidesPerView: 1,
            lazy: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            keyboard: {
                enabled: true,
                onlyInViewport: false,
            }
        });

        carroussel.querySelector('.button-close').addEventListener('click', () => {
            carroussel.classList.remove('open');
            sliderInstance.destroy();
        });
    }

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

        item.photos.unshift(item.mainPhoto);

        template.addEventListener('click', event => {
            displayCarroussel(item);
        });
    
        return template;
    }

    renderPortifolio(page);
}