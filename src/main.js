/////////////=>транспиляция и полифиллы пашут;;////
//import Vue from 'vue';  // уже подключен через CDN
//import 'viewerjs/dist/viewer.css';import Viewer from 'v-viewer';  Vue.use(Viewer); // Viewer уже подключен через CDN
Vue.use(VueViewer.default); console.log(VueViewer.default) //Viewer должен быть уже подрублен из cdn(!)

import VueMask from 'v-mask';                                      Vue.use(VueMask);
var _ = require('lodash');
import axios from 'axios'; import VueAxios from 'vue-axios';      Vue.use(VueAxios, axios);
import App from './App.vue';
//require('vue2-animate/dist/vue2-animate.min.css');// набор анимашек;
new Vue({
    el: props.selector,
    render: h => h(App, {
      props: {
        'url': window.props.url+'/?action=getinspections_photos&json=1&'
      }
    })
  }) 
