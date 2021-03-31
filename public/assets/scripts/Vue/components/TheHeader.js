export default {
    props: ['page'],
    template: `
        <header id="header">
            <div class="container">
                <a href="index.html" class="logo"><img src="assets/images/logo.svg" alt="Logo PhotoArt"></a>    
                <div class="menu" id="mobile-menu" :class="{'open': menuIsOpen}">
                    <header>
                        <a href="index.html" class="logo"><img src="assets/images/logo.svg" alt="Logo PhotoArt"></a>
                        <button type="button" class="mobile-buttons" id="close-menu" aria-label="Fechar menu" @click="toggleMenu">
                            <svg fill="#333" xmlns="http://www.w3.org/2000/svg" width="23.524" height="23.524" viewBox="0 0 23.524 23.524">
                                <g id="cancel" transform="translate(0 0)">
                                <g id="Grupo_154" data-name="Grupo 154" transform="translate(0 0)">
                                    <path id="Caminho_63" data-name="Caminho 63" d="M12.3,11.76,23.413.647a.379.379,0,0,0-.536-.536L11.764,11.223.652.111A.379.379,0,0,0,.116.647L11.228,11.76.116,22.872a.379.379,0,0,0,.527.546l.009-.009L11.764,12.3,22.877,23.408a.379.379,0,0,0,.536-.536Z" transform="translate(0 0)"/>
                                </g>
                                </g>
                            </svg>
                        </button>
                    </header>
                    <nav>
                        <ul>
                            <li v-for="route in routes">
                                <a :href="route.path" :class="{ 'active': route.activeName === page }">{{ route.name }}</a>
                            </li>
                            <li><a href="auth.html" class="button">Minha conta</a></li>
                        </ul>
                    </nav>
                </div>
                <button type="button" class="mobile-buttons" id="open-menu" aria-label="Abrir menu" @click="toggleMenu">
                    <svg fill="#333" xmlns="http://www.w3.org/2000/svg" width="37.896" height="23.685" viewBox="0 0 37.896 23.685">
                        <g id="menu_1_" data-name="menu (1)" transform="translate(0 -96)">
                        <g id="Grupo_139" data-name="Grupo 139" transform="translate(0 96)">
                            <g id="Grupo_138" data-name="Grupo 138">
                            <path id="Caminho_60" data-name="Caminho 60" d="M37.107,96H.79a.79.79,0,1,0,0,1.579H37.107a.79.79,0,1,0,0-1.579Z" transform="translate(0 -96)" fill="#333"/>
                            </g>
                        </g>
                        <g id="Grupo_141" data-name="Grupo 141" transform="translate(0 107.053)">
                            <g id="Grupo_140" data-name="Grupo 140">
                            <path id="Caminho_61" data-name="Caminho 61" d="M37.107,245.333H.79a.79.79,0,0,0,0,1.579H37.107a.79.79,0,1,0,0-1.579Z" transform="translate(0 -245.333)" fill="#333"/>
                            </g>
                        </g>
                        <g id="Grupo_143" data-name="Grupo 143" transform="translate(0 118.106)">
                            <g id="Grupo_142" data-name="Grupo 142" transform="translate(0 0)">
                            <path id="Caminho_62" data-name="Caminho 62" d="M37.107,394.667H.79a.789.789,0,1,0,0,1.579H37.107a.789.789,0,1,0,0-1.579Z" transform="translate(0 -394.667)" fill="#333"/>
                            </g>
                        </g>
                        </g>
                    </svg>
                </button>
            </div>
        </header>
    `,
    data() {
        return {
            menuIsOpen: false,
            routes: [
                { name: 'Início', path: 'index.html', activeName: 'home' },
                { name: 'Portifólio', path: 'portifolio.html', activeName: 'portifolio' },
                { name: 'Serviços', path: 'services.html', activeName: 'services' },
                { name: 'Contato', path: 'contact.html', activeName: 'contact' },
            ]
        }
    },
    methods: {
        toggleMenu() {
            this.menuIsOpen = !this.menuIsOpen;
        }
    }
}