export default {
    props: ['path', 'isActive'],
    template: `<li><a :href="path" :class="{ 'active': isActive }"><slot></slot></a></li>`,
}