<template>
  <div class="container-xl flex flex-row h-screen max-h-screen flex-grow overflow-hidden">
    <div class="w-24 border-sidebar flex p-2">
      <div class="flex-1 self-end text-center h-24 pt-5">
        <a class="icon-color mx-auto" href="#"><font-awesome-icon icon="power-off" size="4x"></font-awesome-icon></a>
      </div>
    </div>
    <div class="flex flex-grow flex-col w-full">
      <div style="padding-right: 50px;" class="max-w-lg">
        <navbar :active.sync="active" :disabled="disabled"></navbar>
      </div>
      <div class="flex flex-row h-full justify-center items-center font-sans">
        <div :is="view" ref="currentView" v-bind="props"></div>
      </div>
    </div>
    <transition name="fade">
      <alert-box :messages.sync="alerts"></alert-box>
    </transition>
  </div>
</template>

<script>
import "../../assets/scss/style.scss"
import "../../assets/scss/transitions.scss"

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Navbar from "./components/Navbar.vue";
import AlertBox from "./components/AlertBox.vue";

export default {
  name: "loginParent",
  data() {
    return {
      view: 'home',
      active: 'home',
      disabled: ['webpage', 'friends', 'chars', 'settings'],
      alerts: null,
      allowedAfterLogin: ['chars'],
      characters: []
    };
  },
  computed: {
    props () {
      if(this.view === 'chars') return { characters: this.characters }
      return {};
    }
  },
  watch: {
    active (newValue, oldValue) {
      if(newValue === null) return false;

      document.body.style.background = `url(../assets/${this.view}.jpg) center`;
    }
  },
  methods: {
    handleResponse(response = {}) {
      if(response.errors) {
        this.alerts = {
          type: 'error',
          message: response.message || "Dane logowania są nieprawidłowe"
        }
        return true;
      }
      if(response.characters) {

        this.characters = response.characters
        this.active = 'chars'
        this.disabled = this.disabled.filter((x) => !this.allowedAfterLogin.includes(x))
        this.pushInformation('Aby wybrać postać skorzystaj ze strzałek na klawiaturze!')
        return true;
      }
      return false;
    },
    pushInformation(message) {
      this.alerts = {
        type: 'info',
        message
      }
    }
  },
  components: {
    FontAwesomeIcon,
    Navbar,
    'home': () => import('./components/LoginForm.vue'),
    'chars': () => import('./components/CharacterSelect.vue'),
    AlertBox,
  }
}
</script>

<style lang="scss">
html, body {
  user-select: none; 
  transition: background .5s linear;
  background-size: cover;
  background: url('../../assets/images/home.jpg') center;
}
.alert-box {
    position: absolute;
    right: 1.5rem;
    bottom: 1.5rem;
}
</style>
