import Vue from 'vue';
import GameWordSearch from './components/NotebookCustomizer.vue';

new Vue({
    el: '#app',
    components: {
        'notebook-customizer': NotebookCustomizer,
    }
});
