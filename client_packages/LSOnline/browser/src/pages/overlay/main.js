"use strict";
import Vue from "vue";
import App from "./App.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

library.add(faInfoCircle);

const vm = new Vue({
  el: "#app",
  render: h => h(App)
});

window.showNotification =
  vm.$children[0].$refs["notifications"].showNotification;
window.vm = vm;
