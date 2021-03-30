import HeaderComponent from './components/TheHeader';
import FooterComponent from './components/TheFooter';
import HeaderLink from './components/TheHeaderLink';

const App = Vue.createApp({
    data() {
        return {
            
        }
    }
});

App.component('the-header', HeaderComponent);
App.component('the-footer', FooterComponent);
App.component('header-link', HeaderLink);

App.mount('#app');