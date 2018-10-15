'use strict';
import Vue from 'vue';
import App from './App.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPowerOff, faChevronLeft, faChevronRight, faUsers } from '@fortawesome/free-solid-svg-icons';

library.add(faPowerOff, faChevronLeft, faChevronRight, faUsers);

const vm = new Vue({
  el: '#app',
  render: h => h(App)
});

window.handleResponse = vm.$children[0].handleResponse;
window.vm = vm;
