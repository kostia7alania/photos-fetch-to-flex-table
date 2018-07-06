/////////////=>транспиляция и полифиллы пашут;;////
import Vue from 'vue';

import VueMask from 'v-mask'; Vue.use(VueMask);
var _ = require('lodash');

import App from './App.vue'; 
new Vue({
    el: props.selector,
    render: h => h(App, {
      props: {
        'url': window.props.url
      }
    })
  }) 
