"use strict";

import Vue from "vue";
import App from "./App.vue";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faUser, faUsers, faChevronRight} from "@fortawesome/free-solid-svg-icons";

library.add(faUser, faUsers, faChevronRight);

const vm = new Vue({
    el: "#app",
    render: h => h(App)
});

window.showCharacters = vm.$children[0].showCharacters;
window.hideCharacters = vm.$children[0].hideCharacters;
window.vm = vm;
