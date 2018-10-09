"use strict";
import Vue from "vue";
import App from "./App.vue";
import ElementUI from "element-ui";
import locale from "element-ui/lib/locale/lang/pl";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(ElementUI, { locale });

const vm = new Vue({
  el: "#app",
  render: h => h(App)
});

window.vm = vm;
