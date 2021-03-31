import HeaderComponent from './components/TheHeader';
import FooterComponent from './components/TheFooter';

const App = Vue.createApp({});

App.component('the-header', HeaderComponent);
App.component('the-footer', FooterComponent);

App.mount('#app');