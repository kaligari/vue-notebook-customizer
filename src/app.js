import Vue from 'vue';
import NotebookCustomizer from './components/NotebookCustomizer.vue';

new Vue({
    el: '#app',
    components: {
        'notebook-customizer': NotebookCustomizer,
    }
});
